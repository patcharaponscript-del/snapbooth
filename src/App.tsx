import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CameraBooth } from './components/CameraBooth';
import { StudioEditor } from './components/StudioEditor';
import { GalleryView } from './components/GalleryView';
import { ThemePresetsModal, ThemePreset } from './components/ThemePresetsModal';
import { CocoaTipModal } from './components/CocoaTipModal';
import { ExportHelpModal } from './components/ExportHelpModal';
import { 
  CapturedPhoto, 
  StripSettings, 
  SavedStrip, 
  CocoaDonation,
  FilterType, 
  LayoutType 
} from './types/photobooth';
import { SAMPLE_PHOTO_POSES } from './data/samplePhotos';
import { renderPhotostripToCanvas } from './utils/canvasExport';

import { ILLUSTRATED_STICKERS } from './data/illustratedStickers';

const DEFAULT_SETTINGS: StripSettings = {
  layout: '4-cut-strip',
  filter: 'softglow',
  frameThemeId: 'pastel-blush',
  title: 'SNAPBOOTH',
  subtitle: 'Seoul Photo Studio ♡',
  showDate: true,
  dateFormat: 'korean',
  fontFamily: 'sans',
  stickers: [
    {
      id: 'init_stk_1',
      stickerId: 'kawaii-pink-bow',
      symbol: 'Pink Satin Bow',
      type: 'graphic',
      svgContent: ILLUSTRATED_STICKERS[0].svg,
      x: 78,
      y: 16,
      scale: 1.15,
      rotation: 10
    },
    {
      id: 'init_stk_2',
      stickerId: 'badge-snap',
      symbol: 'SNAP!',
      type: 'badge',
      x: 20,
      y: 72,
      scale: 0.9,
      rotation: -8
    }
  ],
  doodles: [],
  grainIntensity: 15,
  brightness: 104,
  contrast: 102
};

const INITIAL_DONATIONS: CocoaDonation[] = [
  {
    id: 'cocoa_1',
    name: 'น้องมินนี่ 💖',
    amount: 500,
    cups: 10,
    message: 'ชอบโทนสี 90s และกรอบ 35mm มากๆ เลยค่า เลี้ยงโกโก้ 10 แก้ว!',
    timestamp: Date.now() - 3600000 * 5
  },
  {
    id: 'cocoa_2',
    name: 'P\'Tae Senior Dev 🚀',
    amount: 350,
    cups: 7,
    message: 'แอปเขียนลื่นมาก UI สวยจัด เอาโกโก้เข้มๆ ดับเบิ้ลช็อตไปเลยน้อง',
    timestamp: Date.now() - 3600000 * 14
  },
  {
    id: 'cocoa_3',
    name: 'แก๊งเด็กสยาม 📸',
    amount: 250,
    cups: 5,
    message: 'ถ่ายรูป 4 ช่องปริ้นท์แจกเพื่อนทั้งห้อง ชอบสติกเกอร์โบว์มากก',
    timestamp: Date.now() - 3600000 * 26
  },
  {
    id: 'cocoa_4',
    name: 'Anonymous Cocoa Fan 🧋',
    amount: 150,
    cups: 3,
    message: 'ขอให้คนสร้างมีแรงเขียนฟีเจอร์ใหม่เยอะๆ ครับ',
    timestamp: Date.now() - 3600000 * 48
  }
];

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'camera' | 'studio' | 'gallery'>('camera');
  
  // Start with empty photo queue so user can snap photos directly from a clean slate
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);

  const [settings, setSettings] = useState<StripSettings>(DEFAULT_SETTINGS);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isCocoaModalOpen, setIsCocoaModalOpen] = useState(false);
  const [isExportHelpOpen, setIsExportHelpOpen] = useState(false);

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

  // Cocoa Donations in localStorage
  const [donations, setDonations] = useState<CocoaDonation[]>(() => {
    try {
      const stored = localStorage.getItem('snapbooth_cocoa_donations');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_DONATIONS;
  });

  // Pre-seed 1 initial showcase strip in gallery on very first visit without polluting active photo booth queue
  useEffect(() => {
    if (savedStrips.length === 0) {
      const demoPhotos: CapturedPhoto[] = SAMPLE_PHOTO_POSES.map((dataUrl, idx) => ({
        id: `demo_pose_${idx + 1}`,
        dataUrl,
        timestamp: Date.now() - (4 - idx) * 10000
      }));
      renderPhotostripToCanvas(demoPhotos, DEFAULT_SETTINGS).then((canvas) => {
        const initialStrip: SavedStrip = {
          id: 'initial_demo_strip',
          dataUrl: canvas.toDataURL('image/jpeg', 0.92),
          createdAt: Date.now() - 3600000 * 24,
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

  // Save strips to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('snapbooth_saved_strips', JSON.stringify(savedStrips));
    } catch {
      // ignore
    }
  }, [savedStrips]);

  // Save donations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('snapbooth_cocoa_donations', JSON.stringify(donations));
    } catch {
      // ignore
    }
  }, [donations]);

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
      setPhotos([]);
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

  const handleAddDonation = (newDonation: CocoaDonation) => {
    setDonations((prev) => [newDonation, ...prev]);
  };

  const totalCocoaCups = Math.floor(donations.reduce((sum, d) => sum + d.amount, 0) / 50);

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f3f4f6] flex flex-col selection:bg-rose-500 selection:text-white">
      
      {/* Top Bar Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenPresets={() => setIsPresetsOpen(true)}
        onOpenCocoaTip={() => setIsCocoaModalOpen(true)}
        onOpenExportHelp={() => setIsExportHelpOpen(true)}
        onResetSession={handleResetSession}
        photosCount={photos.length}
        savedStripsCount={savedStrips.length}
        totalCocoaCups={totalCocoaCups}
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
            onOpenCocoaModal={() => setIsCocoaModalOpen(true)}
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

      {/* Cocoa Tip Modal */}
      <CocoaTipModal
        isOpen={isCocoaModalOpen}
        onClose={() => setIsCocoaModalOpen(false)}
        donations={donations}
        onAddDonation={handleAddDonation}
      />

      {/* GitHub Export Guidance Modal */}
      <ExportHelpModal
        isOpen={isExportHelpOpen}
        onClose={() => setIsExportHelpOpen(false)}
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
            <button
              onClick={() => setIsCocoaModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>เลี้ยงโกโก้คนสร้าง ({totalCocoaCups} แก้วแล้ว ☕)</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsExportHelpOpen(true)}
              className="hover:text-zinc-200 transition-colors"
            >
              วิธี Export ไปยัง GitHub
            </button>
            <span aria-hidden="true">·</span>
            <span>300 DPI High-Res Prints</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
