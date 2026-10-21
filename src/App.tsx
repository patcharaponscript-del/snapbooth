import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CameraBooth } from './components/CameraBooth';
import { StudioEditor } from './components/StudioEditor';
import { GalleryView } from './components/GalleryView';
import { ThemePresetsModal, ThemePreset } from './components/ThemePresetsModal';
import { 
  CapturedPhoto, 
  StripSettings, 
  SavedStrip, 
  FilterType, 
  LayoutType 
} from './types/photobooth';
import { SAMPLE_PHOTO_POSES } from './data/samplePhotos';
import { renderPhotostripToCanvas } from './utils/canvasExport';

const DEFAULT_SETTINGS: StripSettings = {
  layout: '4-cut-strip',
  filter: 'vintage',
  frameThemeId: 'classic-white',
  title: 'SNAPBOOTH',
  subtitle: 'Photobooth Studio',
  showDate: true,
  dateFormat: 'korean',
  fontFamily: 'sans',
  stickers: [
    {
      id: 'init_stk_1',
      stickerId: 'sparkles',
      symbol: '✨',
      type: 'emoji',
      x: 82,
      y: 18,
      scale: 1.1,
      rotation: 12
    },
    {
      id: 'init_stk_2',
      stickerId: 'badge-snap',
      symbol: 'SNAP!',
      type: 'badge',
      x: 18,
      y: 72,
      scale: 0.9,
      rotation: -8
    }
  ],
  grainIntensity: 25,
  brightness: 100,
  contrast: 105
};

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'camera' | 'studio' | 'gallery'>('camera');
  
  // Initialize photos with default sample poses
  const [photos, setPhotos] = useState<CapturedPhoto[]>(() => {
    return SAMPLE_PHOTO_POSES.map((dataUrl, idx) => ({
      id: `sample_${idx + 1}`,
      dataUrl,
      timestamp: Date.now() - (4 - idx) * 10000
    }));
  });

  const [settings, setSettings] = useState<StripSettings>(DEFAULT_SETTINGS);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);

  // Saved gallery strips in localStorage
  const [savedStrips, setSavedStrips] = useState<SavedStrip[]>(() => {
    try {
      const stored = localStorage.getItem('snapbooth_saved_strips');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Pre-seed 1 initial showcase strip in gallery on very first visit
  useEffect(() => {
    if (savedStrips.length === 0 && photos.length > 0) {
      renderPhotostripToCanvas(photos, DEFAULT_SETTINGS).then((canvas) => {
        const initialStrip: SavedStrip = {
          id: 'initial_demo_strip',
          dataUrl: canvas.toDataURL('image/jpeg', 0.92),
          createdAt: Date.now() - 3600000 * 24, // 1 day ago
          layout: '4-cut-strip',
          filter: 'vintage',
          frameName: 'Paper White',
          photoCount: 4,
          title: 'Welcome to SnapBooth'
        };
        setSavedStrips([initialStrip]);
        try {
          localStorage.setItem('snapbooth_saved_strips', JSON.stringify([initialStrip]));
        } catch {
          // ignore
        }
      }).catch(() => {});
    }
  }, []);

  // Save strips to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('snapbooth_saved_strips', JSON.stringify(savedStrips));
    } catch {
      // ignore
    }
  }, [savedStrips]);

  // Photo handlers
  const handleAddPhoto = (photo: CapturedPhoto) => {
    setPhotos((prev) => [...prev, photo]);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReplacePhoto = (id: string, newPhoto: CapturedPhoto) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? newPhoto : p)));
  };

  const handleClearPhotos = () => {
    setPhotos([]);
  };

  const handleLoadSamplePhotos = () => {
    const samples: CapturedPhoto[] = SAMPLE_PHOTO_POSES.map((dataUrl, idx) => ({
      id: `sample_${Date.now()}_${idx}`,
      dataUrl,
      timestamp: Date.now() - idx * 2000
    }));
    setPhotos(samples);
  };

  const handleResetSession = () => {
    if (window.confirm('Reset current photobooth session?')) {
      handleLoadSamplePhotos();
      setSettings(DEFAULT_SETTINGS);
      setCurrentTab('camera');
    }
  };

  const handleSaveToGallery = (strip: SavedStrip) => {
    setSavedStrips((prev) => [strip, ...prev]);
  };

  const handleDeleteSavedStrip = (id: string) => {
    setSavedStrips((prev) => prev.filter((s) => s.id !== id));
  };

  const handleApplyPreset = (preset: ThemePreset) => {
    setSettings((prev) => ({
      ...prev,
      ...preset.settings
    }));
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f3f4f6] flex flex-col selection:bg-rose-500 selection:text-white">
      
      {/* Top Bar Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenPresets={() => setIsPresetsOpen(true)}
        onResetSession={handleResetSession}
        photosCount={photos.length}
        savedStripsCount={savedStrips.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'camera' && (
          <CameraBooth
            photos={photos}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
            onReplacePhoto={handleReplacePhoto}
            onClearPhotos={handleClearPhotos}
            onLoadSamplePhotos={handleLoadSamplePhotos}
            onProceedToStudio={() => setCurrentTab('studio')}
            activeFilter={settings.filter}
            onChangeFilter={(filter: FilterType) => setSettings((s) => ({ ...s, filter }))}
            layout={settings.layout}
            onChangeLayout={(layout: LayoutType) => setSettings((s) => ({ ...s, layout }))}
          />
        )}

        {currentTab === 'studio' && (
          <StudioEditor
            photos={photos}
            settings={settings}
            onChangeSettings={setSettings}
            onSaveToGallery={handleSaveToGallery}
            onBackToCamera={() => setCurrentTab('camera')}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryView
            savedStrips={savedStrips}
            onDeleteStrip={handleDeleteSavedStrip}
            onGoToCamera={() => setCurrentTab('camera')}
          />
        )}
      </main>

      {/* Preset Styles Modal */}
      <ThemePresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onApplyPreset={handleApplyPreset}
      />

      {/* Editorial Footer */}
      <footer className="no-print border-t border-[#1c1d25] py-6 px-4 md:px-8 bg-[#0c0d10] text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-zinc-300">SnapBooth</span>
            <span aria-hidden="true">·</span>
            <span>Vintage & Modern Photobooth Darkroom</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span>High-Res 300 DPI Prints</span>
            <span aria-hidden="true">·</span>
            <span>Web Audio Shutter</span>
            <span aria-hidden="true">·</span>
            <span>Analog Film Tones</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
