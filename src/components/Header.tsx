import React from 'react';
import { Camera, Sparkles, Image, Palette, RotateCcw, HelpCircle } from 'lucide-react';

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
  return (
    <>
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
                Photobooth Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Hidden on mobile to prevent overlapping) */}
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
              <span>Booth Camera</span>
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
              <span>Darkroom Studio</span>
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
              <span>Gallery</span>
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
              <span>Presets</span>
            </button>
          </nav>

          {/* Right Actions: Cocoa Tip & Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Cocoa Tip Button */}
            <button
              onClick={onOpenCocoaTip}
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600/30 to-amber-500/20 hover:from-amber-600/40 hover:to-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
              title="เลี้ยงค่าน้ำโกโก้คนสร้าง SnapBooth"
            >
              <span className="text-sm">☕</span>
              <span className="hidden sm:inline">เลี้ยงโกโก้</span>
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
                  <span className="hidden sm:inline">Customize Strip</span>
                  <span className="sm:hidden">Customize</span>
                </>
              ) : (
                <>
                  <Camera className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Take Photos</span>
                  <span className="sm:hidden">Shoot</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

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
          <span>Camera</span>
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
          <span>Studio</span>
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
          <span>Gallery</span>
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
          <span>Presets</span>
        </button>
      </nav>
    </>
  );
};
