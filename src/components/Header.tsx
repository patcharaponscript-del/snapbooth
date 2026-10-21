import React from 'react';
import { Camera, Sparkles, Image, Palette, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentTab: 'camera' | 'studio' | 'gallery';
  onSelectTab: (tab: 'camera' | 'studio' | 'gallery') => void;
  onOpenPresets: () => void;
  onResetSession: () => void;
  photosCount: number;
  savedStripsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenPresets,
  onResetSession,
  photosCount,
  savedStripsCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0d10]/90 backdrop-blur-md border-b border-[#22242c] px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('camera')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-900/30 group-hover:scale-105 transition-transform duration-200">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white font-serif block leading-none">
              SnapBooth
            </span>
            <span className="text-[11px] text-zinc-400 font-sans tracking-wide">
              Photobooth Studio
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Single-line whitespace-nowrap) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('camera')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'camera'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Booth Camera</span>
            {photosCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-rose-500/20 text-rose-400 rounded-full font-mono">
                {photosCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('studio')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'studio'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Darkroom Studio</span>
          </button>

          <button
            onClick={() => onSelectTab('gallery')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'gallery'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Gallery</span>
            {savedStripsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-zinc-700 text-zinc-300 rounded-full font-mono">
                {savedStripsCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenPresets}
            className="hidden md:flex px-3 py-2 text-xs sm:text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 rounded-lg transition-colors whitespace-nowrap shrink-0 items-center gap-1.5"
            title="Theme Presets"
          >
            <Palette className="w-4 h-4" />
            <span>Presets</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onResetSession}
            className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors"
            title="Start New Session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              if (currentTab === 'camera') {
                onSelectTab('studio');
              } else {
                onSelectTab('camera');
              }
            }}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-lg transition-colors shadow-sm shadow-rose-900/40 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            {currentTab === 'camera' ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Customize Strip</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                <span>Take Photos</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
