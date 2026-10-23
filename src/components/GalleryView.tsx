import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  Trash2, 
  ExternalLink, 
  Camera, 
  Sparkles, 
  X, 
  Calendar,
  Layers
} from 'lucide-react';
import { SavedStrip } from '../types/photobooth';
import { useI18n } from '../utils/i18n';

interface GalleryViewProps {
  savedStrips: SavedStrip[];
  onDeleteStrip: (id: string) => void;
  onSelectForStudio?: (strip: SavedStrip) => void;
  onGoToCamera: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  savedStrips,
  onDeleteStrip,
  onGoToCamera
}) => {
  const { lang, t } = useI18n();
  const [activeLightboxStrip, setActiveLightboxStrip] = useState<SavedStrip | null>(null);

  const handleDownload = (strip: SavedStrip) => {
    const link = document.createElement('a');
    link.download = `snapbooth_${strip.layout}_${strip.createdAt}.png`;
    link.href = strip.dataUrl;
    link.click();
  };

  const handlePrint = (strip: SavedStrip) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${strip.title}</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; }
            img { max-height: 95vh; max-width: 95vw; object-fit: contain; box-shadow: none; }
            @media print {
              body { margin: 0; }
              img { max-height: 100%; max-width: 100%; }
            }
          </style>
        </head>
        <body>
          <img src="${strip.dataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      
      {/* Gallery Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-white tracking-tight">
            {t.galleryHeading}
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-0.5">
            {t.gallerySubheading}
          </p>
        </div>

        <button
          onClick={onGoToCamera}
          className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm shadow-rose-900/40"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'New Booth Shoot' : 'ถ่ายรูปใหม่ที่ตู้'}</span>
        </button>
      </div>

      {/* Empty State */}
      {savedStrips.length === 0 ? (
        <div className="bg-[#14151b] border border-[#262833] rounded-3xl p-12 text-center max-w-xl mx-auto my-8">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold font-serif text-white mb-2">
            {t.noSavedStripsTitle}
          </h2>
          <p className="text-xs text-zinc-400 mb-6 leading-relaxed max-w-md mx-auto">
            {t.noSavedStripsDesc}
          </p>
          <button
            onClick={onGoToCamera}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-900/40 inline-flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>{lang === 'en' ? 'Launch Booth Camera' : 'เปิดตู้ถ่ายรูปเลย'}</span>
          </button>
        </div>
      ) : (
        /* Strips Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedStrips.map((strip) => {
            const dateStr = new Date(strip.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div
                key={strip.id}
                className="group bg-[#14151b] border border-[#262833] hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col shadow-lg"
              >
                {/* Thumbnail Container */}
                <div 
                  onClick={() => setActiveLightboxStrip(strip)}
                  className="p-4 bg-[#0e0f13] flex items-center justify-center cursor-pointer relative overflow-hidden"
                >
                  <img
                    src={strip.dataUrl}
                    alt={strip.title}
                    className="max-h-[360px] w-auto object-contain rounded shadow-md group-hover:scale-[1.02] transition-transform duration-200"
                  />

                  {/* Hover Inspect badge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-xs text-white flex items-center gap-1.5 border border-white/20">
                      <ExternalLink className="w-3 h-3" />
                      <span>View Full Strip</span>
                    </span>
                  </div>
                </div>

                {/* Metadata & Actions Card Footer */}
                <div className="p-4 flex flex-col gap-3 flex-1 justify-between bg-[#14151b]">
                  <div>
                    <h3 className="text-sm font-bold text-white truncate">
                      {strip.title || 'SnapBooth Memory'}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        <span>{dateStr}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3 text-zinc-500" />
                        <span className="capitalize">{strip.layout.replace('-', ' ')}</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#262833]">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDownload(strip)}
                        className="p-2 text-zinc-400 hover:text-white bg-[#1c1d25] hover:bg-[#282a35] rounded-lg transition-colors"
                        title="Download PNG"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handlePrint(strip)}
                        className="p-2 text-zinc-400 hover:text-white bg-[#1c1d25] hover:bg-[#282a35] rounded-lg transition-colors"
                        title="Print strip"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onDeleteStrip(strip.id)}
                      className="p-2 text-zinc-500 hover:text-rose-400 bg-transparent hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete strip"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxStrip && (
        <div 
          onClick={() => setActiveLightboxStrip(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-2xl bg-[#14151b] border border-[#2b2d3a] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#262833]">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {activeLightboxStrip.title}
                </h3>
                <span className="text-[11px] text-zinc-400">
                  {activeLightboxStrip.frameName} · {activeLightboxStrip.layout}
                </span>
              </div>
              <button
                onClick={() => setActiveLightboxStrip(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="p-6 overflow-y-auto flex items-center justify-center bg-[#0d0e12] max-h-[70vh]">
              <img
                src={activeLightboxStrip.dataUrl}
                alt={activeLightboxStrip.title}
                className="max-h-[60vh] w-auto object-contain rounded shadow-2xl"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#262833] bg-[#14151b]">
              <span className="text-xs text-zinc-400">
                Created on {new Date(activeLightboxStrip.createdAt).toLocaleString()}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePrint(activeLightboxStrip)}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-[#1f202a] hover:bg-[#2b2d3a] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => handleDownload(activeLightboxStrip)}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download High-Res</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
