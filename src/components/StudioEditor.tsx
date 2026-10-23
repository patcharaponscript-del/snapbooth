import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Printer, 
  Copy, 
  BookmarkCheck, 
  RotateCw, 
  Trash2, 
  Sparkles, 
  Sliders, 
  Type, 
  Sticker, 
  Layers, 
  ArrowLeft,
  Check,
  ZoomIn,
  ZoomOut,
  PenTool,
  Undo,
  Play,
  Square,
  Coffee,
  Heart,
  Search,
  Shuffle,
  CopyPlus,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  CapturedPhoto, 
  StripSettings, 
  PlacedSticker, 
  DoodleStroke, 
  FilterType, 
  LayoutType, 
  SavedStrip 
} from '../types/photobooth';
import { FRAME_THEMES } from '../data/frameThemes';
import { AVAILABLE_STICKERS, StickerDefinition } from '../data/stickers';
import { ILLUSTRATED_STICKERS, GraphicSticker } from '../data/illustratedStickers';
import { soundFX } from '../utils/audio';
import { 
  getFilterCssString, 
  renderPhotostripToCanvas, 
  formatPhotoboothDate 
} from '../utils/canvasExport';

interface StudioEditorProps {
  photos: CapturedPhoto[];
  settings: StripSettings;
  onChangeSettings: (settings: StripSettings) => void;
  onSaveToGallery: (strip: SavedStrip) => void;
  onBackToCamera: () => void;
  onOpenCocoaModal?: () => void;
}

const DOODLE_COLORS = [
  { name: 'White Chalk', hex: '#FFFFFF' },
  { name: 'Neon Pink', hex: '#F43F5E' },
  { name: 'Sunflower Yellow', hex: '#FACC15' },
  { name: 'Matcha Green', hex: '#22C55E' },
  { name: 'Sky Cyan', hex: '#38BDF8' },
  { name: 'Lilac Purple', hex: '#C084FC' },
  { name: 'Charcoal Black', hex: '#18181B' }
];

export const StudioEditor: React.FC<StudioEditorProps> = ({
  photos,
  settings,
  onChangeSettings,
  onSaveToGallery,
  onBackToCamera,
  onOpenCocoaModal
}) => {
  const [activeTab, setActiveTab] = useState<'frames' | 'stickers' | 'doodle' | 'text' | 'filters' | 'photos'>('frames');
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [stickerTypeTab, setStickerTypeTab] = useState<'graphic' | 'emoji'>('graphic');
  const [graphicCategory, setGraphicCategory] = useState<string>('all');
  const [emojiCategory, setEmojiCategory] = useState<string>('all');
  const [stickerSearch, setStickerSearch] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Doodle pen states
  const [isDoodleMode, setIsDoodleMode] = useState<boolean>(false);
  const [doodleColor, setDoodleColor] = useState<string>('#FFFFFF');
  const [doodleSize, setDoodleSize] = useState<number>(4);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[] | null>(null);

  // Boomerang GIF playback state
  const [isBoomerangPlaying, setIsBoomerangPlaying] = useState<boolean>(false);
  const [activeBoomerangIndex, setActiveBoomerangIndex] = useState<number>(0);

  const stripContainerRef = useRef<HTMLDivElement | null>(null);
  const draggingStickerRef = useRef<{ id: string; startX: number; startY: number } | null>(null);

  const currentFrame = FRAME_THEMES.find((f) => f.id === settings.frameThemeId) || FRAME_THEMES[0];

  const updateSettings = (partial: Partial<StripSettings>) => {
    onChangeSettings({ ...settings, ...partial });
  };

  // Boomerang effect loop
  useEffect(() => {
    if (!isBoomerangPlaying || photos.length === 0) return;
    const interval = setInterval(() => {
      setActiveBoomerangIndex((prev) => (prev + 1) % photos.length);
    }, 380);
    return () => clearInterval(interval);
  }, [isBoomerangPlaying, photos.length]);

  // Add an illustrated vector graphic sticker
  const handleAddGraphicSticker = (graphic: GraphicSticker) => {
    soundFX.playPop();
    const newSticker: PlacedSticker = {
      id: `gstk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      stickerId: graphic.id,
      symbol: graphic.name,
      type: 'graphic',
      svgContent: graphic.svg,
      x: 50 + (Math.random() * 20 - 10),
      y: 40 + (Math.random() * 20 - 10),
      scale: 1.1,
      rotation: Math.round(Math.random() * 20 - 10)
    };

    updateSettings({
      stickers: [...settings.stickers, newSticker]
    });
    setSelectedStickerId(newSticker.id);
  };

  // Add an emoji or stamp sticker
  const handleAddEmojiSticker = (def: StickerDefinition) => {
    soundFX.playPop();
    const newSticker: PlacedSticker = {
      id: `stk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      stickerId: def.id,
      symbol: def.symbol,
      type: def.type,
      x: 50 + (Math.random() * 20 - 10),
      y: 40 + (Math.random() * 20 - 10),
      scale: 1,
      rotation: Math.round(Math.random() * 20 - 10)
    };

    updateSettings({
      stickers: [...settings.stickers, newSticker]
    });
    setSelectedStickerId(newSticker.id);
  };

  const handleRemoveSticker = (id: string) => {
    updateSettings({
      stickers: settings.stickers.filter((s) => s.id !== id)
    });
    if (selectedStickerId === id) setSelectedStickerId(null);
  };

  const handleUpdateSelectedSticker = (partial: Partial<PlacedSticker>) => {
    if (!selectedStickerId) return;
    updateSettings({
      stickers: settings.stickers.map((s) => 
        s.id === selectedStickerId ? { ...s, ...partial } : s
      )
    });
  };

  const handleDuplicateSticker = (id: string) => {
    const stk = settings.stickers.find((s) => s.id === id);
    if (!stk) return;
    soundFX.playPop();
    const copy: PlacedSticker = {
      ...stk,
      id: `copy_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      x: Math.min(85, stk.x + 5),
      y: Math.min(85, stk.y + 5)
    };
    updateSettings({ stickers: [...settings.stickers, copy] });
    setSelectedStickerId(copy.id);
  };

  const handleBringToFront = (id: string) => {
    const stk = settings.stickers.find((s) => s.id === id);
    if (!stk) return;
    updateSettings({
      stickers: [...settings.stickers.filter((s) => s.id !== id), stk]
    });
  };

  const handleSendToBack = (id: string) => {
    const stk = settings.stickers.find((s) => s.id === id);
    if (!stk) return;
    updateSettings({
      stickers: [stk, ...settings.stickers.filter((s) => s.id !== id)]
    });
  };

  const handleRandomSticker = () => {
    soundFX.playPop();
    const randomG = ILLUSTRATED_STICKERS[Math.floor(Math.random() * ILLUSTRATED_STICKERS.length)];
    handleAddGraphicSticker(randomG);
  };

  // Sticker dragging
  const handleStickerPointerDown = (e: React.PointerEvent, id: string) => {
    if (isDoodleMode) return;
    e.preventDefault();
    e.stopPropagation();
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
    setSelectedStickerId(id);
    draggingStickerRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY
    };
  };

  // Doodle drawing handlers on strip container
  const handleContainerPointerDown = (e: React.PointerEvent) => {
    if (!isDoodleMode || !stripContainerRef.current) return;
    e.preventDefault();
    try { stripContainerRef.current.setPointerCapture(e.pointerId); } catch {}
    const rect = stripContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setCurrentStroke([{ x, y }]);
  };

  const handleContainerPointerMove = (e: React.PointerEvent) => {
    if ((isDoodleMode && currentStroke) || draggingStickerRef.current) e.preventDefault();
    if (isDoodleMode && currentStroke && stripContainerRef.current) {
      const rect = stripContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setCurrentStroke((prev) => (prev ? [...prev, { x, y }] : [{ x, y }]));
      return;
    }

    if (!draggingStickerRef.current || !stripContainerRef.current) return;
    const rect = stripContainerRef.current.getBoundingClientRect();
    const sticker = settings.stickers.find((s) => s.id === draggingStickerRef.current?.id);
    if (!sticker) return;

    const newX = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const newY = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));

    handleUpdateSelectedSticker({ x: Math.round(newX), y: Math.round(newY) });
  };

  const handleContainerPointerUp = () => {
    if (isDoodleMode && currentStroke && currentStroke.length > 1) {
      const newDoodle: DoodleStroke = {
        id: `doodle_${Date.now()}`,
        points: currentStroke,
        color: doodleColor,
        size: doodleSize
      };
      updateSettings({
        doodles: [...(settings.doodles || []), newDoodle]
      });
      setCurrentStroke(null);
    } else {
      setCurrentStroke(null);
    }
    draggingStickerRef.current = null;
  };

  const handleUndoDoodle = () => {
    const list = settings.doodles || [];
    if (list.length === 0) return;
    updateSettings({
      doodles: list.slice(0, list.length - 1)
    });
  };

  const handleClearDoodles = () => {
    updateSettings({ doodles: [] });
  };

  // Export & Download High-Res Canvas
  const handleDownload = async () => {
    try {
      setIsExporting(true);
      const canvas = await renderPhotostripToCanvas(photos, settings);
      const dataUrl = canvas.toDataURL('image/png', 1.0);

      const link = document.createElement('a');
      link.download = `snapbooth_${settings.layout}_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (err) {
      console.error('Download export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy to Clipboard
  const handleCopyToClipboard = async () => {
    try {
      setIsExporting(true);
      const canvas = await renderPhotostripToCanvas(photos, settings);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        } catch {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Save to Gallery
  const handleSaveStrip = async () => {
    try {
      setIsExporting(true);
      const canvas = await renderPhotostripToCanvas(photos, settings);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

      const saved: SavedStrip = {
        id: `strip_${Date.now()}`,
        dataUrl,
        createdAt: Date.now(),
        layout: settings.layout,
        filter: settings.filter,
        frameName: currentFrame.name,
        photoCount: photos.length,
        title: settings.title || 'SnapBooth Memory'
      };

      onSaveToGallery(saved);
      soundFX.playChime();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);

      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.85 }
      });
    } catch (err) {
      console.error('Failed to save to gallery:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = async () => {
    window.print();
  };

  const selectedSticker = settings.stickers.find((s) => s.id === selectedStickerId);

  const filteredGraphics = ILLUSTRATED_STICKERS.filter((g) => {
    const matchesCategory = graphicCategory === 'all' || g.category === graphicCategory;
    if (!matchesCategory) return false;
    if (!stickerSearch.trim()) return true;
    const q = stickerSearch.toLowerCase().trim();
    const nameMatch = g.name.toLowerCase().includes(q);
    const tagMatch = g.tags && g.tags.some((t) => t.toLowerCase().includes(q));
    return nameMatch || tagMatch;
  });

  const filteredEmojis = AVAILABLE_STICKERS.filter((s) => {
    const matchesCategory = emojiCategory === 'all' || s.category === emojiCategory;
    if (!matchesCategory) return false;
    if (!stickerSearch.trim()) return true;
    const q = stickerSearch.toLowerCase().trim();
    return s.label.toLowerCase().includes(q) || s.symbol.includes(q);
  });

  return (
    <div 
      className="max-w-7xl mx-auto px-4 md:px-8 py-6 select-none"
      onPointerMove={handleContainerPointerMove}
      onPointerUp={handleContainerPointerUp}
    >
      
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCamera}
            className="p-2 text-zinc-400 hover:text-white bg-[#181920] hover:bg-[#242630] border border-[#2a2c36] rounded-xl transition-colors"
            title="Back to camera booth"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-serif text-white tracking-tight flex items-center gap-2">
              <span>Darkroom Studio</span>
              <span className="text-[11px] font-sans font-medium text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-full">
                Customizer
              </span>
            </h1>
            <p className="text-xs text-zinc-400">
              Style your frame, place cute vector stickers, doodle on photos, and export prints.
            </p>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Boomerang Animated Preview Toggle */}
          <button
            onClick={() => {
              setIsBoomerangPlaying(!isBoomerangPlaying);
              if (!isBoomerangPlaying) soundFX.playPop();
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
              isBoomerangPlaying
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse shadow-md shadow-rose-900/40'
                : 'text-zinc-300 hover:text-white bg-[#181920] hover:bg-[#242630] border-[#2a2c36]'
            }`}
            title="Play looping motion preview of your photos"
          >
            {isBoomerangPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-rose-400" />}
            <span>{isBoomerangPlaying ? 'Stop Motion' : 'Boomerang GIF'}</span>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopyToClipboard}
            disabled={isExporting}
            className="px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#181920] hover:bg-[#242630] border border-[#2a2c36] rounded-xl transition-colors flex items-center gap-1.5"
            title="Copy high-res image to clipboard"
          >
            {copySuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Save to Gallery */}
          <button
            onClick={handleSaveStrip}
            disabled={isExporting}
            className="px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#181920] hover:bg-[#242630] border border-[#2a2c36] rounded-xl transition-colors flex items-center gap-1.5"
            title="Save into your in-app booth gallery"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Saved!</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Save</span>
              </>
            )}
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#181920] hover:bg-[#242630] border border-[#2a2c36] rounded-xl transition-colors flex items-center gap-1.5"
            title="Print photo strip"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          {/* High Res Download CTA */}
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-xl transition-all shadow-md shadow-rose-900/40 flex items-center gap-1.5"
            title="Export full resolution PNG image"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating...' : 'Download Print'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Split: Canvas Stage + Customizer Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left / Center: Interactive Strip Preview Stage (7 cols) */}
        <div className="lg:col-span-7 bg-[#121318] border border-[#262833] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[640px] relative overflow-hidden">
          
          {/* Zoom controls & Doodle Mode status */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            {isDoodleMode && (
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-[11px] font-semibold rounded-md border border-amber-500/30 flex items-center gap-1">
                <PenTool className="w-3 h-3" />
                <span>Doodle Pen Active</span>
              </span>
            )}

            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                className="p-1 text-zinc-400 hover:text-white rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-zinc-300 px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
                className="p-1 text-zinc-400 hover:text-white rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Strip Container */}
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="transition-transform duration-100 flex justify-center w-full"
          >
            <div
              ref={stripContainerRef}
              onPointerDown={handleContainerPointerDown}
              onClick={() => {
                if (!isDoodleMode) setSelectedStickerId(null);
              }}
              style={{
                touchAction: (isDoodleMode || selectedStickerId) ? 'none' : 'pan-y',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                backgroundColor: currentFrame.isSpecialPattern === 'gradient-sunset' ? undefined : currentFrame.bgHex,
                backgroundImage: currentFrame.isSpecialPattern === 'gradient-sunset' 
                  ? 'linear-gradient(135deg, #FDE68A 0%, #F472B6 50%, #C084FC 100%)' 
                  : currentFrame.isSpecialPattern === 'hologram'
                    ? 'linear-gradient(135deg, #E0E7FF 0%, #FCE7F3 30%, #CFFAFE 70%, #EDE9FE 100%)'
                    : undefined,
                color: currentFrame.textHex,
                borderColor: currentFrame.borderHex || '#e4e4e7',
                width: settings.layout === '2x2-quad' ? '380px' : settings.layout === 'polaroid' ? '320px' : '280px',
                minHeight: settings.layout === 'polaroid' ? '410px' : '620px',
                cursor: isDoodleMode ? 'crosshair' : 'default'
              }}
              className={`relative rounded-xl p-4 shadow-2xl transition-all duration-200 border select-none ${
                currentFrame.isSpecialPattern === 'sprockets' ? 'px-8' : ''
              }`}
            >
              
              {/* Special 35mm film sprockets pattern */}
              {currentFrame.isSpecialPattern === 'sprockets' && (
                <>
                  <div className="absolute top-4 bottom-4 left-2 flex flex-col justify-between pointer-events-none">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="w-2.5 h-3.5 bg-black rounded-xs border border-zinc-800" />
                    ))}
                  </div>
                  <div className="absolute top-4 bottom-4 right-2 flex flex-col justify-between pointer-events-none">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="w-2.5 h-3.5 bg-black rounded-xs border border-zinc-800" />
                    ))}
                  </div>
                </>
              )}

              {/* Special Hearts pattern */}
              {currentFrame.isSpecialPattern === 'hearts' && (
                <div className="absolute top-1 left-4 right-4 flex justify-between text-xs text-rose-500 pointer-events-none">
                  <span>♡</span><span>♡</span><span>♡</span><span>♡</span><span>♡</span>
                </div>
              )}

              {/* Special Grid Pattern */}
              {currentFrame.isSpecialPattern === 'grid' && (
                <div 
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(20,83,45,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,83,45,0.08) 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                />
              )}

              {/* Boomerang Single Full Preview Mode */}
              {isBoomerangPlaying ? (
                <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-black shadow-lg border border-black/20 my-4">
                  <img
                    src={photos[activeBoomerangIndex]?.dataUrl || photos[0]?.dataUrl}
                    alt="Boomerang Frame"
                    style={{
                      filter: getFilterCssString(settings.filter, settings.brightness, settings.contrast)
                    }}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-mono font-bold animate-pulse">
                    POSE #{activeBoomerangIndex + 1}
                  </div>
                </div>
              ) : (
                /* Standard Photobooth Photos Grid Container */
                <div className={`gap-3 ${
                  settings.layout === '2x2-quad' 
                    ? 'grid grid-cols-2' 
                    : 'flex flex-col'
                }`}>
                  {photos.slice(0, settings.layout === '4-cut-strip' || settings.layout === '2x2-quad' ? 4 : settings.layout === '3-cut-strip' ? 3 : settings.layout === 'duo-wide' ? 2 : 1).map((photo, idx) => (
                    <div
                      key={photo.id || idx}
                      className="relative aspect-[4/3] rounded-md overflow-hidden bg-black/80 shadow-xs border border-black/10 group"
                    >
                      <img
                        src={photo.dataUrl}
                        alt={`Snap ${idx + 1}`}
                        style={{
                          filter: getFilterCssString(settings.filter, settings.brightness, settings.contrast),
                          transform: photo.flipped ? 'scaleX(-1)' : undefined
                        }}
                        className="w-full h-full object-cover pointer-events-none"
                      />

                      {/* Film Grain overlay */}
                      {settings.grainIntensity > 0 && (
                        <div 
                          style={{ opacity: (settings.grainIntensity || 30) / 100 }}
                          className="absolute inset-0 film-grain pointer-events-none"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Strip Footer / Branding Typography */}
              <div className="mt-4 pt-2 text-center">
                {settings.title && (
                  <h3 
                    style={{
                      fontFamily: settings.fontFamily === 'serif' ? 'Fraunces, serif' : settings.fontFamily === 'mono' ? 'Space Mono, monospace' : 'Plus Jakarta Sans, sans-serif'
                    }}
                    className="text-base font-bold tracking-tight leading-tight"
                  >
                    {settings.title}
                  </h3>
                )}

                {settings.subtitle && (
                  <p 
                    style={{ color: currentFrame.subtextHex }}
                    className="text-xs font-medium mt-0.5 tracking-wide"
                  >
                    {settings.subtitle}
                  </p>
                )}

                {settings.showDate && (
                  <p 
                    style={{ color: currentFrame.subtextHex }}
                    className="text-[11px] font-mono mt-1 opacity-80"
                  >
                    {formatPhotoboothDate(Date.now(), settings.dateFormat)}
                  </p>
                )}
              </div>

              {/* Render Doodles SVG Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                {(settings.doodles || []).map((stroke) => {
                  if (!stroke.points || stroke.points.length < 2) return null;
                  const pathData = stroke.points.reduce((acc, pt, i) => {
                    return i === 0 ? `M ${pt.x}% ${pt.y}%` : `${acc} L ${pt.x}% ${pt.y}%`;
                  }, '');
                  return (
                    <path
                      key={stroke.id}
                      d={pathData}
                      fill="none"
                      stroke={stroke.color}
                      strokeWidth={stroke.size}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  );
                })}

                {/* Live Current Drawing Stroke */}
                {currentStroke && currentStroke.length > 1 && (
                  <path
                    d={currentStroke.reduce((acc, pt, i) => {
                      return i === 0 ? `M ${pt.x}% ${pt.y}%` : `${acc} L ${pt.x}% ${pt.y}%`;
                    }, '')}
                    fill="none"
                    stroke={doodleColor}
                    strokeWidth={doodleSize}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>

              {/* Placed Interactive Stickers */}
              {settings.stickers.map((stk) => {
                const isSelected = selectedStickerId === stk.id;
                return (
                  <div
                    key={stk.id}
                    onPointerDown={(e) => handleStickerPointerDown(e, stk.id)}
                    style={{
                      left: `${stk.x}%`,
                      top: `${stk.y}%`,
                      transform: `translate(-50%, -50%) rotate(${stk.rotation}deg) scale(${stk.scale})`
                    }}
                    className={`absolute cursor-grab active:cursor-grabbing z-30 transition-shadow ${
                      isSelected ? 'ring-2 ring-rose-500 ring-offset-2 ring-offset-black rounded-lg' : ''
                    }`}
                  >
                    {stk.type === 'graphic' && stk.svgContent ? (
                      <div 
                        className="w-16 h-16 flex items-center justify-center filter drop-shadow-md select-none pointer-events-none"
                        dangerouslySetInnerHTML={{ __html: stk.svgContent }}
                      />
                    ) : stk.type === 'badge' ? (
                      <span className="px-2.5 py-1 bg-rose-600 text-white font-mono font-bold text-xs rounded-md shadow-lg whitespace-nowrap block">
                        {stk.symbol}
                      </span>
                    ) : (
                      <span className="text-3xl filter drop-shadow-md block">
                        {stk.symbol}
                      </span>
                    )}

                    {isSelected && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSticker(stk.id);
                        }}
                        className="absolute -top-3 -right-3 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px] shadow hover:bg-rose-700"
                        title="Delete sticker"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}

            </div>
          </div>

          <div className="text-[11px] text-zinc-500 mt-4 text-center">
            {isDoodleMode 
              ? 'Draw freely on photos with pen. Click "Doodle" tab to change colors or undo.' 
              : 'Click sticker to drag, scale or rotate. Click "Boomerang" to see moving photos.'}
          </div>
        </div>

        {/* Right: Customizer Inspector Controls (5 cols) */}
        <div className="lg:col-span-5 bg-[#14151b] border border-[#262833] rounded-2xl p-5 flex flex-col gap-5">
          
          {/* Studio Control Tabs */}
          <div className="grid grid-cols-5 gap-1 p-1 bg-[#1b1c24] rounded-xl border border-[#2b2d3a]">
            <button
              onClick={() => {
                setActiveTab('frames');
                setIsDoodleMode(false);
              }}
              className={`py-2 text-[11px] font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
                activeTab === 'frames'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Frames</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('stickers');
                setIsDoodleMode(false);
              }}
              className={`py-2 text-[11px] font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
                activeTab === 'stickers'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sticker className="w-3.5 h-3.5" />
              <span>Stickers</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('doodle');
                setIsDoodleMode(true);
              }}
              className={`py-2 text-[11px] font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
                activeTab === 'doodle'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Doodle</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('text');
                setIsDoodleMode(false);
              }}
              className={`py-2 text-[11px] font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
                activeTab === 'text'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Text</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('filters');
                setIsDoodleMode(false);
              }}
              className={`py-2 text-[11px] font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
                activeTab === 'filters'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Tones</span>
            </button>
          </div>

          {/* TAB 1: Frames & Layouts */}
          {activeTab === 'frames' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  Photobooth Layout
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '4-cut-strip', label: '4-Cut Strip', desc: 'Classic Vertical' },
                    { id: '3-cut-strip', label: '3-Cut Strip', desc: 'Shorter 3 Poses' },
                    { id: '2x2-quad', label: '2x2 Quad Grid', desc: 'Square Postcard' },
                    { id: 'polaroid', label: 'Polaroid Solo', desc: 'Single Frame' }
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => updateSettings({ layout: l.id as LayoutType })}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        settings.layout === l.id
                          ? 'border-rose-500 bg-rose-950/30 text-white'
                          : 'border-[#262833] bg-[#1a1b22] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-semibold block">{l.label}</span>
                      <span className="text-[10px] text-zinc-400 block">{l.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  Frame Aesthetic & Colors
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {FRAME_THEMES.map((theme) => {
                    const isSelected = settings.frameThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => updateSettings({ frameThemeId: theme.id })}
                        className={`p-2.5 rounded-xl text-left border flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'border-rose-500 bg-rose-950/20 text-white'
                            : 'border-[#262833] bg-[#1a1b22] text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div
                          style={{
                            backgroundColor: theme.isSpecialPattern === 'gradient-sunset' ? undefined : theme.bgHex,
                            backgroundImage: theme.isSpecialPattern === 'gradient-sunset' 
                              ? 'linear-gradient(135deg, #FDE68A 0%, #F472B6 50%, #C084FC 100%)' 
                              : theme.isSpecialPattern === 'hologram'
                                ? 'linear-gradient(135deg, #E0E7FF 0%, #FCE7F3 30%, #CFFAFE 70%, #EDE9FE 100%)'
                                : undefined,
                            borderColor: theme.borderHex || '#555'
                          }}
                          className="w-6 h-6 rounded-md border shrink-0 shadow-xs"
                        />
                        <div className="truncate">
                          <span className="text-xs font-semibold block truncate">
                            {theme.name}
                          </span>
                          <span className="text-[10px] text-zinc-400 block capitalize">
                            {theme.isSpecialPattern !== 'none' ? theme.isSpecialPattern : 'Solid'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Stickers & Graphic Vectors */}
          {activeTab === 'stickers' && (
            <div className="space-y-4">
              
              {/* Type Switcher: Illustrated Graphic Stickers vs Emoji & Badges */}
              <div className="flex p-1 bg-[#1a1b22] border border-[#292b38] rounded-xl">
                <button
                  onClick={() => setStickerTypeTab('graphic')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    stickerTypeTab === 'graphic'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>สติกเกอร์ภาพวาด (Graphics)</span>
                </button>
                <button
                  onClick={() => setStickerTypeTab('emoji')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    stickerTypeTab === 'emoji'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 text-rose-300" />
                  <span>ไอคอน & แสตมป์</span>
                </button>
              </div>

              {/* Selected Sticker Fine-tune Controls */}
              {selectedSticker && (
                <div className="p-3 bg-[#1e202b] rounded-xl border border-rose-500/40 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>จัดการสติกเกอร์ที่เลือก ({selectedSticker.symbol})</span>
                    </span>
                    <button
                      onClick={() => handleRemoveSticker(selectedSticker.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded-md"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>ลบ</span>
                    </button>
                  </div>

                  {/* Layer & Duplicate Actions */}
                  <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                    <button
                      onClick={() => handleDuplicateSticker(selectedSticker.id)}
                      className="px-2 py-1 bg-[#282a38] hover:bg-[#34374a] text-[11px] font-medium text-zinc-200 rounded-lg flex items-center justify-center gap-1 transition-colors"
                      title="คัดลอกสติกเกอร์นี้"
                    >
                      <CopyPlus className="w-3 h-3 text-rose-400" />
                      <span>คัดลอก</span>
                    </button>
                    <button
                      onClick={() => handleBringToFront(selectedSticker.id)}
                      className="px-2 py-1 bg-[#282a38] hover:bg-[#34374a] text-[11px] font-medium text-zinc-200 rounded-lg flex items-center justify-center gap-1 transition-colors"
                      title="นำขึ้นมาไว้ข้างหน้าสุด"
                    >
                      <ArrowUp className="w-3 h-3 text-emerald-400" />
                      <span>หน้าสุด</span>
                    </button>
                    <button
                      onClick={() => handleSendToBack(selectedSticker.id)}
                      className="px-2 py-1 bg-[#282a38] hover:bg-[#34374a] text-[11px] font-medium text-zinc-200 rounded-lg flex items-center justify-center gap-1 transition-colors"
                      title="ส่งลงไปไว้ข้างหลังสุด"
                    >
                      <ArrowDown className="w-3 h-3 text-amber-400" />
                      <span>หลังสุด</span>
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>ขนาด</span>
                      <span>{Math.round(selectedSticker.scale * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={selectedSticker.scale}
                      onChange={(e) => handleUpdateSelectedSticker({ scale: parseFloat(e.target.value) })}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>หมุนองศา</span>
                      <span>{selectedSticker.rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="5"
                      value={selectedSticker.rotation}
                      onChange={(e) => handleUpdateSelectedSticker({ rotation: parseInt(e.target.value) })}
                      className="w-full accent-rose-500"
                    />
                  </div>
                </div>
              )}

              {/* Search Bar & Random Sticker Action */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={stickerSearch}
                    onChange={(e) => setStickerSearch(e.target.value)}
                    placeholder="ค้นหา เช่น โบว์, โกโก้, แมว, ดาว, y2k..."
                    className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#1a1b22] border border-[#2a2c38] rounded-xl text-white placeholder-zinc-500 focus:outline-hidden focus:border-rose-500"
                  />
                  {stickerSearch && (
                    <button
                      onClick={() => setStickerSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  onClick={handleRandomSticker}
                  className="px-2.5 py-1.5 bg-[#20222d] hover:bg-rose-950/40 border border-[#303342] hover:border-rose-500/60 rounded-xl text-xs font-semibold text-rose-300 flex items-center gap-1 shrink-0 transition-colors"
                  title="สุ่มสติกเกอร์น่ารักมาติด 1 ชิ้น"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>สุ่มของตกแต่ง</span>
                </button>
              </div>

              {/* Graphic Stickers Catalog */}
              {stickerTypeTab === 'graphic' ? (
                <>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      { id: 'all', label: `ทั้งหมด (${ILLUSTRATED_STICKERS.length})` },
                      { id: 'ribbons', label: '🎀 โบว์ & ริบบิ้น' },
                      { id: 'cafe', label: '☕ คาเฟ่ & โกโก้' },
                      { id: 'animals', label: '🐾 สัตว์น่ารัก' },
                      { id: 'y2k', label: '✨ Y2K & โครเมียม' },
                      { id: 'flowers', label: '🌸 ดอกไม้ & ผลไม้' },
                      { id: 'stamps', label: '🏷️ วาชิเทป & แสตมป์' },
                      { id: 'props', label: '👓 พร็อพ & แว่น' },
                      { id: 'doodles', label: '💬 สปีชบับเบิล' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setGraphicCategory(cat.id)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap ${
                          graphicCategory === cat.id
                            ? 'bg-rose-600 text-white'
                            : 'bg-[#1b1c24] text-zinc-400 hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {filteredGraphics.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => handleAddGraphicSticker(g)}
                        className="p-2.5 bg-[#1a1b22] hover:bg-[#252733] border border-[#2a2c38] hover:border-rose-500/60 rounded-xl flex flex-col items-center justify-center transition-all group"
                      >
                        <div 
                          className="w-12 h-12 flex items-center justify-center group-hover:scale-115 transition-transform duration-150"
                          dangerouslySetInnerHTML={{ __html: g.svg }}
                        />
                        <span className="text-[10px] text-zinc-300 font-medium mt-1 truncate max-w-full text-center">
                          {g.name}
                        </span>
                      </button>
                    ))}
                    {filteredGraphics.length === 0 && (
                      <div className="col-span-full py-8 text-center text-xs text-zinc-500">
                        ไม่พบสติกเกอร์ที่ตรงกับคำค้นหา ลองเปลี่ยนคำค้นหาดูนะ
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Emoji & Badges Catalog */
                <>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {['all', 'cute', 'props', 'vibes', 'stamps'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setEmojiCategory(cat)}
                        className={`px-3 py-1 text-xs font-medium rounded-lg capitalize transition-colors whitespace-nowrap ${
                          emojiCategory === cat
                            ? 'bg-rose-600 text-white'
                            : 'bg-[#1b1c24] text-zinc-400 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto pr-1">
                    {filteredEmojis.map((stk) => (
                      <button
                        key={stk.id}
                        onClick={() => handleAddEmojiSticker(stk)}
                        className="p-3 bg-[#1a1b22] hover:bg-[#252733] border border-[#2a2c38] hover:border-rose-500/60 rounded-xl flex flex-col items-center justify-center transition-all group"
                      >
                        {stk.type === 'badge' ? (
                          <span className="text-[10px] font-mono font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded leading-tight">
                            {stk.symbol}
                          </span>
                        ) : (
                          <span className="text-2xl group-hover:scale-110 transition-transform">
                            {stk.symbol}
                          </span>
                        )}
                        <span className="text-[9px] text-zinc-400 mt-1 truncate max-w-full">
                          {stk.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {settings.stickers.length > 0 && (
                <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 border-t border-[#262833]">
                  <span>{settings.stickers.length} stickers on strip</span>
                  <button
                    onClick={() => updateSettings({ stickers: [] })}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    Remove All
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Freehand Doodle Pen */}
          {activeTab === 'doodle' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#191b24] border border-[#2c2e3d] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    โหมดปากกาวาดเขียน (Freehand Pen)
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    วาดลวดลาย หัวใจ หรือเขียนข้อความลงบนภาพได้อิสระ
                  </span>
                </div>
                <button
                  onClick={() => setIsDoodleMode(!isDoodleMode)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isDoodleMode 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {isDoodleMode ? 'กำลังวาด' : 'เปิดปากกา'}
                </button>
              </div>

              {/* Color Palette */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  สีปากกา (Pen Color)
                </label>
                <div className="flex items-center gap-2">
                  {DOODLE_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setDoodleColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        doodleColor === c.hex 
                          ? 'border-rose-500 scale-110 shadow-md ring-2 ring-white/20' 
                          : 'border-zinc-700 hover:scale-105'
                      }`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Pen Thickness */}
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                  <span>ขนาดหัวปากกา (Stroke Size)</span>
                  <span className="font-mono">{doodleSize}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={doodleSize}
                  onChange={(e) => setDoodleSize(parseInt(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#262833]">
                <button
                  onClick={handleUndoDoodle}
                  disabled={!settings.doodles || settings.doodles.length === 0}
                  className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-[#1e202a] hover:bg-[#282a38] border border-[#2b2d3c] rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Undo className="w-3.5 h-3.5" />
                  <span>ย้อนกลับ (Undo)</span>
                </button>

                <button
                  onClick={handleClearDoodles}
                  disabled={!settings.doodles || settings.doodles.length === 0}
                  className="text-xs text-rose-400 hover:text-rose-300 disabled:opacity-40"
                >
                  ล้างลายเส้นทั้งหมด
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Text & Typography */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Strip Title
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={settings.title}
                  onChange={(e) => updateSettings({ title: e.target.value })}
                  placeholder="SNAPBOOTH"
                  className="w-full px-3 py-2 text-xs bg-[#1a1b22] border border-[#2a2c38] rounded-xl text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Subtitle / Custom Quote
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={settings.subtitle}
                  onChange={(e) => updateSettings({ subtitle: e.target.value })}
                  placeholder="Best Memories With Friends ♡"
                  className="w-full px-3 py-2 text-xs bg-[#1a1b22] border border-[#2a2c38] rounded-xl text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Font Family
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sans', label: 'Modern Sans' },
                    { id: 'serif', label: 'Editorial Serif' },
                    { id: 'mono', label: 'Vintage Stamp' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => updateSettings({ fontFamily: f.id as StripSettings['fontFamily'] })}
                      className={`p-2 rounded-xl text-center border text-xs font-medium transition-all ${
                        settings.fontFamily === f.id
                          ? 'border-rose-500 bg-rose-950/20 text-white'
                          : 'border-[#262833] bg-[#1a1b22] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#262833] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-300">
                    Include Date Stamp
                  </label>
                  <input
                    type="checkbox"
                    checked={settings.showDate}
                    onChange={(e) => updateSettings({ showDate: e.target.checked })}
                    className="w-4 h-4 accent-rose-500 rounded"
                  />
                </div>

                {settings.showDate && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      { id: 'korean', label: 'YYYY.MM.DD HH:MM' },
                      { id: 'standard', label: 'MM/DD/YYYY' },
                      { id: 'minimal', label: 'YYYY · MM · DD' },
                      { id: 'vintage', label: `'YY MM DD (Kodak)` }
                    ].map((df) => (
                      <button
                        key={df.id}
                        onClick={() => updateSettings({ dateFormat: df.id as StripSettings['dateFormat'] })}
                        className={`p-2 rounded-lg text-left border text-[11px] font-mono transition-all ${
                          settings.dateFormat === df.id
                            ? 'border-rose-500 bg-rose-950/20 text-white'
                            : 'border-[#262833] bg-[#1a1b22] text-zinc-400 hover:text-white'
                        }`}
                      >
                        {df.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: Filters & Film Tones */}
          {activeTab === 'filters' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  Film Color Filter (12 สไตล์)
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1">
                  {[
                    { id: 'normal', label: 'Natural', desc: 'คลีนใสธรรมชาติ' },
                    { id: 'softglow', label: 'Seoul Glow', desc: 'ละมุนผิว เกาหลี' },
                    { id: 'vintage', label: 'Kodachrome', desc: 'ฟิล์มโกดัก 70s' },
                    { id: 'fujifilm', label: 'Fuji Chrome', desc: 'เขียวมัทฉะสดใส' },
                    { id: 'warm90s', label: 'Golden 90s', desc: 'แดดสีทองอบอุ่น' },
                    { id: 'sunset', label: 'Sunset Aura', desc: 'แสงอาทิตย์ตกดิน' },
                    { id: 'pastel', label: 'Pastel Dream', desc: 'ฮาราจูกุนุ่มฟุ้ง' },
                    { id: 'noir', label: 'Noir B&W', desc: 'ขาวดำสตรีทเข้ม' },
                    { id: 'sepia', label: 'Sepia Vintage', desc: 'แอมเบอร์ย้อนยุค' },
                    { id: 'filmgrain', label: '35mm Grain', desc: 'เกรนฟิล์มอะนาล็อก' },
                    { id: 'cyberpunk', label: 'Tokyo Neon', desc: 'ม่วงนีออนไซเบอร์' },
                    { id: 'cinematic', label: 'Teal & Orange', desc: 'โทนภาพยนตร์' }
                  ].map((flt) => (
                    <button
                      key={flt.id}
                      onClick={() => updateSettings({ filter: flt.id as FilterType })}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        settings.filter === flt.id
                          ? 'border-rose-500 bg-rose-950/30 text-white'
                          : 'border-[#262833] bg-[#1a1b22] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-bold block">{flt.label}</span>
                      <span className="text-[10px] text-zinc-400 block">{flt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#262833]">
                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Brightness</span>
                    <span className="font-mono">{settings.brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="130"
                    value={settings.brightness}
                    onChange={(e) => updateSettings({ brightness: parseInt(e.target.value) })}
                    className="w-full accent-rose-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Contrast</span>
                    <span className="font-mono">{settings.contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="140"
                    value={settings.contrast}
                    onChange={(e) => updateSettings({ contrast: parseInt(e.target.value) })}
                    className="w-full accent-rose-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>35mm Film Grain</span>
                    <span className="font-mono">{settings.grainIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.grainIntensity}
                    onChange={(e) => updateSettings({ grainIntensity: parseInt(e.target.value) })}
                    className="w-full accent-rose-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Cocoa Tip Banner */}
          {onOpenCocoaModal && (
            <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-amber-950/40 to-[#181922] border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">☕</span>
                <div>
                  <span className="text-xs font-bold text-amber-200 block">
                    ชอบโฟโต้บูธนี้ไหม?
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    เลี้ยงค่าน้ำโกโก้คนสร้างสักแก้ว
                  </span>
                </div>
              </div>
              <button
                onClick={onOpenCocoaModal}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors shadow-xs shrink-0"
              >
                เลี้ยงโกโก้
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
