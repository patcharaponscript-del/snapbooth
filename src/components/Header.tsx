import React, { useState } from 'react';
import { Camera, Sparkles, Image, Palette, RotateCcw, Globe, Download, ShieldCheck, X, Share2 } from 'lucide-react';
import { useI18n } from '../utils/i18n';
import { usePWAInstall } from '../utils/usePWAInstall';

interface HeaderProps {
  currentTab: 'camera' | 'studio' | 'gallery';
  onSelectTab: (tab: 'camera' | 'studio' | 'gallery') => void;
  onOpenPresets: () => void;
  onOpenCocoaTip: () => void;
  onOpenExportHelp: () => void;
  onResetSession: () => void;
  photosCount: number;
  savedStripsCount: number;
  totalCocoaCups: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenPresets,
  onOpenCocoaTip,
  onOpenExportHelp,
  onResetSession,
  photosCount,
  savedStripsCount,
  totalCocoaCups
}) => {
  const { lang, setLang, t } = useI18n();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  return (
    <>
      {/* Privacy & Safe Guarantee Top Notice (Dismissible or subtle) */}
      <div className="bg-[#12131a] border-b border-[#20222a] py-1 px-3 text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1.5 overflow-hidden">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="truncate">{t.privacyBadge}</span>
      </div>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0c0d10]/95 backdrop-blur-md border-b border-[#22242c] px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Wordmark */}
          <button
            onClick={() => onSelectTab('camera')}
            className="flex items-center gap-2 text-left group focus:outline-none rounded-lg shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-900/30 group-hover:scale-105 transition-transform shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white font-serif block leading-none">
                SnapBooth
              </span>
              <span className="text-[10px] text-zinc-400 font-sans tracking-wide hidden sm:block">
                {t.brandSubtitle}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onSelectTab('camera')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'camera'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.tabCamera}</span>
              {photosCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] bg-rose-500/20 text-rose-300 rounded-full font-mono font-bold">
                  {photosCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('studio')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'studio'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.tabStudio}</span>
            </button>

            <button
              onClick={() => onSelectTab('gallery')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'gallery'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <Image className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.tabGallery}</span>
              {savedStripsCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] bg-zinc-700 text-zinc-300 rounded-full font-mono font-bold">
                  {savedStripsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenPresets}
              className="px-2.5 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors flex items-center gap-1"
              title="Theme Presets"
            >
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.themePresets}</span>
            </button>
          </nav>

          {/* Right Actions: Language Switcher, PWA, Cocoa Tip & Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher (EN / TH) */}
            <button
              onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
              className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-[#181922] hover:bg-[#222430] border border-[#2b2d3c] text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
              title={lang === 'en' ? 'เปลี่ยนเป็นภาษาไทย' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-rose-400" />
              <span>{lang === 'en' ? 'EN' : 'TH'}</span>
            </button>

            {/* In-App PWA Install Button */}
            {!isInstalled && isInstallable && (
              <button
                onClick={install}
                className="hidden sm:flex px-2.5 py-1.5 rounded-lg bg-[#181922] hover:bg-[#222430] border border-sky-500/40 text-sky-300 text-xs font-semibold transition-colors items-center gap-1.5"
                title="Install SnapBooth on desktop/device"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.installApp}</span>
              </button>
            )}

            {!isInstalled && isIOS && (
              <button
                onClick={() => setShowIOSModal(true)}
                className="hidden sm:flex px-2.5 py-1.5 rounded-lg bg-[#181922] hover:bg-[#222430] border border-sky-500/40 text-sky-300 text-xs font-semibold transition-colors items-center gap-1.5"
                title="Add to Home Screen on iPhone / iPad"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.installIos}</span>
              </button>
            )}

            {/* Cocoa Tip Button */}
            <button
              onClick={onOpenCocoaTip}
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600/30 to-amber-500/20 hover:from-amber-600/40 hover:to-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
              title="เลี้ยงค่าน้ำโกโก้คนสร้าง SnapBooth"
            >
              <span className="text-sm">☕</span>
              <span className="hidden sm:inline">{t.cocoaTip}</span>
              <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/30 text-amber-300 font-mono rounded-full font-bold">
                {totalCocoaCups}
              </span>
            </button>

            {/* Desktop Reset Button */}
            <button
              onClick={onResetSession}
              className="hidden lg:flex p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
              title="Start New Session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                if (currentTab === 'camera') {
                  onSelectTab('studio');
                } else {
                  onSelectTab('camera');
                }
              }}
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-lg transition-colors shadow-sm shadow-rose-900/40 whitespace-nowrap flex items-center gap-1.5"
            >
              {currentTab === 'camera' ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span className="hidden sm:inline">{t.customizePhotostrip}</span>
                  <span className="sm:hidden">Studio</span>
                </>
              ) : (
                <>
                  <Camera className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.snapPhoto}</span>
                  <span className="sm:hidden">Camera</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* iOS Safari Guided Install Modal */}
      {showIOSModal && (
        <div 
          onClick={() => setShowIOSModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-[#161720] border border-[#2b2d3c] p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#262835]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-rose-400" />
                <span>{lang === 'en' ? 'Install on iPhone / iPad' : 'วิธีติดตั้งบน iPhone / iPad'}</span>
              </h3>
              <button 
                onClick={() => setShowIOSModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-zinc-300 space-y-2.5 leading-relaxed">
              <p>
                {lang === 'en' 
                  ? '1. Tap the Share button in Safari toolbar below.' 
                  : '1. กดปุ่มแชร์ (Share) ที่แถบด้านล่างของ Safari'}
              </p>
              <p>
                {lang === 'en' 
                  ? '2. Scroll down and choose "Add to Home Screen" 📲' 
                  : '2. เลื่อนลงแล้วเลือก "เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen) 📲'}
              </p>
              <p className="text-[11px] text-zinc-400">
                {lang === 'en' 
                  ? 'SnapBooth will launch in fullscreen with optimal camera performance!' 
                  : 'ใช้งานเต็มหน้าจอเหมือนแอปจริง และเปิดกล้องถ่ายได้เร็วขึ้น!'}
              </p>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              {lang === 'en' ? 'Got It' : 'เข้าใจแล้ว'}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sub-Navigation Bar (Separated row so it NEVER overlaps on mobile phones) */}
      <nav className="md:hidden sticky top-[49px] z-30 bg-[#121319]/95 backdrop-blur-md border-b border-[#22242c] px-2 py-1.5 flex items-center justify-around gap-1">
        <button
          onClick={() => onSelectTab('camera')}
          className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
            currentTab === 'camera'
              ? 'bg-zinc-800 text-white shadow-xs'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span>{lang === 'en' ? 'Camera' : 'ตู้กล้อง'}</span>
          {photosCount > 0 && (
            <span className="px-1.5 py-0.2 text-[9px] bg-rose-500/20 text-rose-300 rounded-full font-mono font-bold">
              {photosCount}
            </span>
          )}
        </button>

        <button
          onClick={() => onSelectTab('studio')}
          className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
            currentTab === 'studio'
              ? 'bg-zinc-800 text-white shadow-xs'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'en' ? 'Studio' : 'สตูดิโอ'}</span>
        </button>

        <button
          onClick={() => onSelectTab('gallery')}
          className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
            currentTab === 'gallery'
              ? 'bg-zinc-800 text-white shadow-xs'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Image className="w-3.5 h-3.5 text-sky-400" />
          <span>{lang === 'en' ? 'Gallery' : 'แกลเลอรี'}</span>
          {savedStripsCount > 0 && (
            <span className="px-1.5 py-0.2 text-[9px] bg-zinc-700 text-zinc-300 rounded-full font-mono font-bold">
              {savedStripsCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenPresets}
          className="py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors flex items-center justify-center gap-1"
          title="Presets"
        >
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          <span>{lang === 'en' ? 'Themes' : 'ธีม'}</span>
        </button>
      </nav>
    </>
  );
};
