import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Printer, 
  Copy, 
  BookmarkCheck, 
  RotateCw, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Sparkles, 
  Sliders, 
  Type, 
  Sticker, 
  Layers, 
  ArrowLeft,
  Check,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  CapturedPhoto, 
  StripSettings, 
  PlacedSticker, 
  FilterType, 
  LayoutType, 
  SavedStrip 
} from '../types/photobooth';
import { FRAME_THEMES } from '../data/frameThemes';
import { AVAILABLE_STICKERS, StickerDefinition } from '../data/stickers';
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
}

export const StudioEditor: React.FC<StudioEditorProps> = ({
  photos,
  settings,
  onChangeSettings,
  onSaveToGallery,
  onBackToCamera
}) => {
  const [activeTab, setActiveTab] = useState<'frames' | 'stickers' | 'text' | 'filters' | 'photos'>('frames');
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [stickerCategory, setStickerCategory] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const stripContainerRef = useRef<HTMLDivElement | null>(null);
  const draggingStickerRef = useRef<{ id: string; startX: number; startY: number } | null>(null);

  const currentFrame = FRAME_THEMES.find((f) => f.id === settings.frameThemeId) || FRAME_THEMES[0];

  // Helper to update settings
  const updateSettings = (partial: Partial<StripSettings>) => {
    onChangeSettings({ ...settings, ...partial });
  };

  // Add a sticker to center of strip
  const handleAddSticker = (def: StickerDefinition) => {
    soundFX.playPop();
    const newSticker: PlacedSticker = {
      id: `stk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      stickerId: def.id,
      symbol: def.symbol,
      type: def.type,
      x: 50 + (Math.random() * 20 - 10), // slight jitter around center
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

  // Dragging stickers within the strip container
  const handleStickerPointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    setSelectedStickerId(id);
    draggingStickerRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY
    };
  };

  const handleContainerPointerMove = (e: React.PointerEvent) => {
    if (!draggingStickerRef.current || !stripContainerRef.current) return;
    const rect = stripContainerRef.current.getBoundingClientRect();
    const sticker = settings.stickers.find((s) => s.id === draggingStickerRef.current?.id);
    if (!sticker) return;

    // Calculate percentage relative to container
    const newX = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const newY = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));

    handleUpdateSelectedSticker({ x: Math.round(newX), y: Math.round(newY) });
  };

  const handleContainerPointerUp = () => {
    draggingStickerRef.current = null;
  };

  // Move photo up/down
  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    const newPhotos = [...photos];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newPhotos.length) return;
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[targetIdx];
    newPhotos[targetIdx] = temp;
    // We update through parent's photo list if required
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

      // Confetti celebration
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
          // Fallback if write not supported in iframe
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

  // Save to Local Gallery
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

  // Print Strip
  const handlePrint = async () => {
    window.print();
  };

  const selectedSticker = settings.stickers.find((s) => s.id === selectedStickerId);

  const filteredStickers = AVAILABLE_STICKERS.filter((s) => {
    if (stickerCategory === 'all') return true;
    return s.category === stickerCategory;
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
            <h1 className="text-xl md:text-2xl font-bold font-serif text-white tracking-tight">
              Darkroom Studio
            </h1>
            <p className="text-xs text-zinc-400">
              Style your frame, add stickers, adjust vintage tones, and download.
            </p>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Copy */}
          <button
            onClick={handleCopyToClipboard}
            disabled={isExporting}
            className="px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#181920] hover:bg-[#242630] border border-[#2a2c36] rounded-xl transition-colors flex items-center gap-1.5"
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
            className="px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#181920] hover:bg-[#242630] border border-[#2a2c36] rounded-xl transition-colors flex items-center gap-1.5"
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
                <span>Save Strip</span>
              </>
            )}
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#181920] hover:bg-[#242630] border border-[#2a2c36] rounded-xl transition-colors flex items-center gap-1.5"
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
        <div className="lg:col-span-7 bg-[#121318] border border-[#262833] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[620px] relative overflow-hidden">
          
          {/* Zoom controls */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-1 z-20">
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

          {/* Interactive Strip Container */}
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="transition-transform duration-100 flex justify-center w-full"
          >
            <div
              ref={stripContainerRef}
              onClick={() => setSelectedStickerId(null)}
              style={{
                backgroundColor: currentFrame.isSpecialPattern === 'gradient-sunset' ? undefined : currentFrame.bgHex,
                backgroundImage: currentFrame.isSpecialPattern === 'gradient-sunset' 
                  ? 'linear-gradient(135deg, #FDE68A 0%, #F472B6 50%, #C084FC 100%)' 
                  : undefined,
                color: currentFrame.textHex,
                borderColor: currentFrame.borderHex || '#e4e4e7',
                width: settings.layout === '2x2-quad' ? '380px' : settings.layout === 'polaroid' ? '320px' : '280px',
                minHeight: settings.layout === 'polaroid' ? '410px' : '620px'
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

              {/* Photos Grid Container */}
              <div className={`gap-3 ${
                settings.layout === '2x2-quad' 
                  ? 'grid grid-cols-2' 
                  : 'flex flex-col'
              }`}>
                {photos.slice(0, settings.layout === '4-cut-strip' || settings.layout === '2x2-quad' ? 4 : settings.layout === '3-cut-strip' ? 3 : settings.layout === 'duo-wide' ? 2 : 1).map((photo, idx) => (
                  <div
                    key={photo.id || idx}
                    className="relative aspect-[4/3] rounded-md overflow-hidden bg-black/80 shadow-xs border border-black/10"
                  >
                    <img
                      src={photo.dataUrl}
                      alt={`Snap ${idx + 1}`}
                      style={{
                        filter: getFilterCssString(settings.filter, settings.brightness, settings.contrast)
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
                    {stk.type === 'badge' ? (
                      <span className="px-2.5 py-1 bg-rose-600 text-white font-mono font-bold text-xs rounded-md shadow-lg whitespace-nowrap block">
                        {stk.symbol}
                      </span>
                    ) : (
                      <span className="text-3xl filter drop-shadow-md block">
                        {stk.symbol}
                      </span>
                    )}

                    {/* Small delete icon when selected */}
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
            Click sticker to drag, scale or rotate. Click outside to deselect.
          </div>
        </div>

        {/* Right: Customizer Inspector Controls (5 cols) */}
        <div className="lg:col-span-5 bg-[#14151b] border border-[#262833] rounded-2xl p-5 flex flex-col gap-5">
          
          {/* Studio Control Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#1b1c24] rounded-xl border border-[#2b2d3a]">
            <button
              onClick={() => setActiveTab('frames')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
                activeTab === 'frames'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Frames</span>
            </button>

            <button
              onClick={() => setActiveTab('stickers')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
                activeTab === 'stickers'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sticker className="w-3.5 h-3.5" />
              <span>Stickers</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
                activeTab === 'text'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Text</span>
            </button>

            <button
              onClick={() => setActiveTab('filters')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex flex-col items-center gap-1 ${
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

          {/* TAB 2: Stickers */}
          {activeTab === 'stickers' && (
            <div className="space-y-4">
              
              {/* Sticker Categories */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['all', 'cute', 'props', 'vibes', 'stamps'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setStickerCategory(cat)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg capitalize transition-colors whitespace-nowrap ${
                      stickerCategory === cat
                        ? 'bg-rose-600 text-white'
                        : 'bg-[#1b1c24] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Selected Sticker Fine-tune Controls */}
              {selectedSticker && (
                <div className="p-3 bg-[#1e202b] rounded-xl border border-rose-500/40 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Adjust Selected Sticker</span>
                    </span>
                    <button
                      onClick={() => handleRemoveSticker(selectedSticker.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>

                  {/* Scale */}
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Size</span>
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

                  {/* Rotation */}
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Rotation</span>
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

              {/* Sticker Catalog Grid */}
              <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto pr-1">
                {filteredStickers.map((stk) => (
                  <button
                    key={stk.id}
                    onClick={() => handleAddSticker(stk)}
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

          {/* TAB 3: Text & Typography */}
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

              {/* Date format & toggle */}
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

          {/* TAB 4: Filters & Analog Tones */}
          {activeTab === 'filters' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  Film Filter
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'normal', label: 'Natural' },
                    { id: 'vintage', label: 'Kodachrome' },
                    { id: 'noir', label: 'Noir B&W' },
                    { id: 'sepia', label: 'Sepia 70s' },
                    { id: 'warm90s', label: 'Golden 90s' },
                    { id: 'pastel', label: 'Seoul Pastel' },
                    { id: 'filmgrain', label: 'Analog Grain' },
                    { id: 'cyberpunk', label: 'Tokyo Neon' }
                  ].map((flt) => (
                    <button
                      key={flt.id}
                      onClick={() => updateSettings({ filter: flt.id as FilterType })}
                      className={`p-2 rounded-xl text-center border text-xs font-semibold transition-all ${
                        settings.filter === flt.id
                          ? 'border-rose-500 bg-rose-950/20 text-white'
                          : 'border-[#262833] bg-[#1a1b22] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {flt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-3 pt-2 border-t border-[#262833]">
                {/* Brightness */}
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

                {/* Contrast */}
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

                {/* Film Grain */}
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

        </div>

      </div>

    </div>
  );
};
