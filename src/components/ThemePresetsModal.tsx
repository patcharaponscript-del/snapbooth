import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { StripSettings } from '../types/photobooth';

export interface ThemePreset {
  id: string;
  name: string;
  tagline: string;
  previewBg: string;
  previewText: string;
  previewBorder?: string;
  settings: Partial<StripSettings>;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'seoul-4cut',
    name: 'Seoul 4-Cut Studio',
    tagline: 'Soft lilac frame, dreamy pastel tones & Korean date stamp',
    previewBg: '#F5F3FF',
    previewText: '#4C1D95',
    previewBorder: '#EDE9FE',
    settings: {
      layout: '4-cut-strip',
      frameThemeId: 'seoul-lavender',
      filter: 'pastel',
      title: 'LIFE 4 CUT',
      subtitle: 'Hongdae Studio ♡',
      fontFamily: 'sans',
      dateFormat: 'korean',
      showDate: true,
      grainIntensity: 15,
      brightness: 104,
      contrast: 98
    }
  },
  {
    id: 'analog-1978',
    name: '1978 Analog Kodachrome',
    tagline: 'Warm amber tones, 35mm film grain & retro typography',
    previewBg: '#FDFBF7',
    previewText: '#3E2723',
    previewBorder: '#EFEBE9',
    settings: {
      layout: '4-cut-strip',
      frameThemeId: 'vintage-cream',
      filter: 'vintage',
      title: "SNAPBOOTH '78",
      subtitle: 'Kodachrome 64 Color Film',
      fontFamily: 'mono',
      dateFormat: 'vintage',
      showDate: true,
      grainIntensity: 45,
      brightness: 100,
      contrast: 110
    }
  },
  {
    id: 'studio-noir',
    name: 'Atelier Monochrome',
    tagline: 'Dramatic high-contrast black & white with editorial serif',
    previewBg: '#111215',
    previewText: '#FAFAFA',
    previewBorder: '#27272A',
    settings: {
      layout: '2x2-quad',
      frameThemeId: 'studio-black',
      filter: 'noir',
      title: 'ATELIER NOIR',
      subtitle: 'Paris Autumn Collection',
      fontFamily: 'serif',
      dateFormat: 'minimal',
      showDate: true,
      grainIntensity: 25,
      brightness: 95,
      contrast: 125
    }
  },
  {
    id: 'film-roll-35mm',
    name: '35mm Film Roll Negative',
    tagline: 'Perforated film sprockets with amber negative numbering',
    previewBg: '#0B0C10',
    previewText: '#FB923C',
    previewBorder: '#333333',
    settings: {
      layout: '4-cut-strip',
      frameThemeId: 'film-negative',
      filter: 'filmgrain',
      title: 'ILFORD HP5 PLUS',
      subtitle: 'Exposures 01 - 04',
      fontFamily: 'mono',
      dateFormat: 'vintage',
      showDate: true,
      grainIntensity: 55,
      brightness: 102,
      contrast: 115
    }
  },
  {
    id: 'golden-polaroid',
    name: 'Golden Hour Polaroid',
    tagline: 'Classic white polaroid frame with warm sunset glow',
    previewBg: '#FFFFFF',
    previewText: '#18181B',
    previewBorder: '#E4E4E7',
    settings: {
      layout: 'polaroid',
      frameThemeId: 'classic-white',
      filter: 'warm90s',
      title: 'Golden Memories',
      subtitle: 'Forever in the Sun ♡',
      fontFamily: 'serif',
      dateFormat: 'standard',
      showDate: true,
      grainIntensity: 20,
      brightness: 105,
      contrast: 102
    }
  },
  {
    id: 'y2k-harajuku',
    name: 'Y2K Cyber Purikura',
    tagline: 'Vibrant neon hues, checker accent & cheerful pop energy',
    previewBg: '#1E1B4B',
    previewText: '#F5D0FE',
    previewBorder: '#312E81',
    settings: {
      layout: '4-cut-strip',
      frameThemeId: 'checker-retro',
      filter: 'cyberpunk',
      title: 'PURIKURA ★ CLUB',
      subtitle: 'Tokyo Station Neon Snap',
      fontFamily: 'sans',
      dateFormat: 'korean',
      showDate: true,
      grainIntensity: 10,
      brightness: 108,
      contrast: 115
    }
  }
];

interface ThemePresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPreset: (preset: ThemePreset) => void;
}

export const ThemePresetsModal: React.FC<ThemePresetsModalProps> = ({
  isOpen,
  onClose,
  onApplyPreset
}) => {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#14151b] border border-[#2b2d3a] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262833]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-white">
                Preset Booth Styles
              </h2>
              <p className="text-xs text-zinc-400">
                Instantly transform your photostrip with curated aesthetic packages
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets List */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                onApplyPreset(preset);
                onClose();
              }}
              className="p-4 rounded-2xl bg-[#1a1b22] hover:bg-[#232530] border border-[#2a2c38] hover:border-rose-500/60 transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    style={{
                      backgroundColor: preset.previewBg,
                      color: preset.previewText,
                      borderColor: preset.previewBorder || '#555'
                    }}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border shadow-xs"
                  >
                    PRESET
                  </div>
                  <span className="text-[11px] text-zinc-500 capitalize">
                    {preset.settings.layout?.replace('-', ' ')}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                  {preset.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {preset.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#262833] flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400">
                  {preset.settings.filter} tone
                </span>
                <span className="text-xs font-semibold text-rose-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Apply Style</span>
                  <Check className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
