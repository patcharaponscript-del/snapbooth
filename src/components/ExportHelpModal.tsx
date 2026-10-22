import React from 'react';
import { X, GitBranch, ArrowUpRight, Download, CheckCircle, ExternalLink } from 'lucide-react';

interface ExportHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHelpModal: React.FC<ExportHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#14151b] border border-[#2b2d3a] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262833] bg-[#181922]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-white">
                ตำแหน่งปุ่ม Export ใน AI Studio
              </h2>
              <p className="text-xs text-zinc-400">
                วิธีส่งโค้ดกลับไปยัง GitHub: patcharaponscript-del/snapbooth
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

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto text-xs leading-relaxed text-zinc-300">
          
          <div className="p-4 rounded-2xl bg-[#1a1b24] border border-[#2c2e3d] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                1
              </span>
              <span>มองไปที่มุมบนขวาสุดของหน้าต่าง Google AI Studio</span>
            </div>
            <p className="text-zinc-400 pl-8">
              ที่แถบเมนูด้านบนสุดของ AI Studio (ข้างๆ รูปโปรไฟล์ของคุณ) จะมีปุ่มหลักอยู่ 2 ปุ่ม:
            </p>
            <ul className="list-disc pl-12 space-y-1 text-zinc-300">
              <li><strong>ปุ่ม Share (แชร์)</strong>: สำหรับแชร์ลิงก์ให้เพื่อนลองเล่น</li>
              <li><strong>ปุ่มรูปจุด 3 จุด (⋯) หรือไอคอน GitHub / Export</strong>: เมนูจัดการโปรเจกต์</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#1a1b24] border border-[#2c2e3d] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                2
              </span>
              <span>กดเลือก "Push to GitHub" หรือ "Export to GitHub"</span>
            </div>
            <p className="text-zinc-400 pl-8">
              เมื่อคลิกที่เมนูดังกล่าว ระบบจะให้คุณกดยืนยันการส่งไฟล์ทั้งหมดเข้าไปยัง Repo <code>patcharaponscript-del/snapbooth</code> ทันที
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1a1b24] border border-[#2c2e3d] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                3
              </span>
              <span>หรือเลือก "Download Code (ZIP)"</span>
            </div>
            <p className="text-zinc-400 pl-8">
              หากต้องการดาวน์โหลดไฟล์ทั้งหมดมาไว้ที่เครื่องคอมพิวเตอร์ของคุณ สามารถเลือกเมนู <strong>Download ZIP</strong> เพื่อนำโค้ดไปเปิดใน VS Code ได้เช่นกันครับ
            </p>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-md shadow-rose-900/30"
            >
              เข้าใจแล้ว ปิดหน้าต่างนี้
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
