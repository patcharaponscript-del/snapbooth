import React, { useState } from 'react';
import { 
  X, 
  Coffee, 
  Heart, 
  Trophy, 
  Sparkles, 
  Check, 
  Send, 
  QrCode, 
  CreditCard,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CocoaDonation } from '../types/photobooth';
import { soundFX } from '../utils/audio';

const COCOA_PRICE_PER_CUP = 50; // 50 THB per delicious cocoa cup

interface CocoaTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  donations: CocoaDonation[];
  onAddDonation: (donation: CocoaDonation) => void;
}

export const CocoaTipModal: React.FC<CocoaTipModalProps> = ({
  isOpen,
  onClose,
  donations,
  onAddDonation
}) => {
  const [selectedCups, setSelectedCups] = useState<number>(2);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'card'>('promptpay');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [lastDonatedCups, setLastDonatedCups] = useState<number>(0);

  if (!isOpen) return null;

  // Calculate total money raised and total cocoa cups
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalCups = Math.floor(totalAmount / COCOA_PRICE_PER_CUP);

  // Top Donators sorted by amount descending
  const topDonators = [...donations].sort((a, b) => b.amount - a.amount).slice(0, 5);

  const calculateCurrentDonation = (): { amount: number; cups: number } => {
    if (isCustom) {
      const amt = Math.max(10, parseInt(customAmount) || 50);
      return {
        amount: amt,
        cups: Math.max(1, Math.round(amt / COCOA_PRICE_PER_CUP))
      };
    }
    return {
      amount: selectedCups * COCOA_PRICE_PER_CUP,
      cups: selectedCups
    };
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const { amount, cups } = calculateCurrentDonation();
    const name = donorName.trim() || 'ผู้ไม่ประสงค์ออกนาม 🧋';
    const message = donorMessage.trim() || 'ชอบ SnapBooth มากๆ ครับ เป็นกำลังใจให้คนสร้าง!';

    setIsSubmitting(true);
    soundFX.playPop();

    setTimeout(() => {
      const newDonation: CocoaDonation = {
        id: `cocoa_${Date.now()}`,
        name,
        amount,
        cups,
        message,
        timestamp: Date.now()
      };

      onAddDonation(newDonation);
      setIsSubmitting(false);
      setLastDonatedCups(cups);
      setShowThankYou(true);
      soundFX.playChime();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Reset form
      setDonorMessage('');
    }, 600);
  };

  const currentSelection = calculateCurrentDonation();

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#14151b] border border-[#2e303d] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-4 max-h-[92vh]"
      >
        
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-amber-950/60 via-[#181922] to-amber-900/40 border-b border-[#2b2d3a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-2xl shadow-inner">
              ☕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-serif text-white tracking-tight">
                  เลี้ยงค่าน้ำโกโก้คนสร้าง
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-semibold border border-amber-500/30">
                  Tip Creator
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                สนับสนุนค่าเครื่องดื่มและเซิร์ฟเวอร์ SnapBooth เพื่อพัฒนาฟีเจอร์ใหม่ๆ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Thank You Celebration Card if just donated */}
          {showThankYou ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/40 text-center animate-fade-in space-y-3">
              <div className="text-4xl animate-bounce">🧋✨</div>
              <h3 className="text-lg font-bold text-white">
                ขอบคุณมากๆ เลยครับ! ได้รับโกโก้ {lastDonatedCups} แก้วแล้ว!
              </h3>
              <p className="text-xs text-amber-200/90 leading-relaxed max-w-sm mx-auto">
                ชื่อและข้อความของคุณขึ้นแท่น Top Donator เรียบร้อยแล้ว คนสร้างมีกำลังใจอัปเดตสติกเกอร์และกรอบรูปสวยๆ เพิ่มแน่นอน!
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-colors shadow-md shadow-amber-900/30"
              >
                เลี้ยงเพิ่มอีกแก้ว หรือดูยอดรวม
              </button>
            </div>
          ) : null}

          {/* TOTAL AMOUNT & COCOA CALCULATOR DISPLAY */}
          <div className="relative rounded-2xl bg-[#1a1b24] border border-[#2b2d3c] p-5 overflow-hidden shadow-lg">
            
            {/* Background Cocoa Accent Glow */}
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#292b3a] pb-4">
              <div>
                <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>ยอดค่าน้ำโกโก้ที่ได้รับทั้งหมด (Total Donated)</span>
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    ฿{totalAmount.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    THB
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-zinc-400 block">อัตราแปลงแก้ว</span>
                <span className="text-xs font-mono text-amber-300 font-semibold bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-md inline-block mt-0.5">
                  1 แก้ว = 50 บาท
                </span>
              </div>
            </div>

            {/* COCOA CALCULATOR & METER */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    🥤
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      ระบบคำนวณซื้อโกโก้ได้:
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Calculated Cocoa Cups
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black font-mono text-amber-400">
                    {totalCups} แก้ว!
                  </span>
                  <span className="text-[10px] text-zinc-400 block">
                    (แก้วละ 50฿)
                  </span>
                </div>
              </div>

              {/* Progress bar towards 100 cups milestone */}
              <div>
                <div className="flex justify-between text-[11px] text-zinc-400 mb-1 font-mono">
                  <span>เป้าหมายถาดโกโก้ (Milestone)</span>
                  <span>{totalCups} / 100 แก้ว ({Math.min(100, Math.round((totalCups / 100) * 100))}%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#121318] rounded-full overflow-hidden border border-zinc-800">
                  <div 
                    style={{ width: `${Math.min(100, (totalCups / 100) * 100)}%` }}
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              {/* Fun visual cocoa cups representation */}
              <div className="p-3 bg-[#13141a] rounded-xl border border-zinc-800/80 flex items-center justify-between gap-3 text-xs text-zinc-300">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {Array.from({ length: Math.min(8, totalCups) }).map((_, i) => (
                    <span key={i} className="text-base inline-block hover:scale-125 transition-transform" title={`โกโก้แก้วที่ ${i + 1}`}>
                      🧋
                    </span>
                  ))}
                  {totalCups > 8 && (
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      +{totalCups - 8} แก้ว
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-amber-300/90 font-medium shrink-0">
                  ✨ พลังคาเฟอีนทำงานต่อได้อีก {totalCups * 2} ชม.!
                </span>
              </div>
            </div>

          </div>

          {/* TOP DONATE LEADERBOARD */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Top Donators (ผู้สนับสนุนสูงสุด)</span>
              </h3>
              <span className="text-[11px] text-zinc-500">
                {donations.length} ผู้สนับสนุน
              </span>
            </div>

            <div className="space-y-2">
              {topDonators.map((d, index) => {
                const rankBadges = ['🥇', '🥈', '🥉'];
                const badge = rankBadges[index] || `#${index + 1}`;

                return (
                  <div 
                    key={d.id}
                    className="p-3 rounded-xl bg-[#181922] border border-[#282a38] flex items-center justify-between gap-3 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0 font-mono">
                        {badge}
                      </span>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white truncate">
                            {d.name}
                          </span>
                          <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-400 text-[10px] rounded font-mono font-medium shrink-0">
                            {d.cups} แก้ว 🧋
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                          "{d.message}"
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono text-emerald-400 block">
                        ฿{d.amount.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">
                        {new Date(d.timestamp).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TIP DONATION FORM */}
          <form onSubmit={handleDonate} className="space-y-4 pt-2 border-t border-[#262833]">
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-2">
                เลือกจำนวนแก้วโกโก้ที่ต้องการเลี้ยง:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { cups: 1, label: '1 แก้ว', price: '฿50', desc: 'โกโก้เย็น' },
                  { cups: 2, label: '2 แก้ว', price: '฿100', desc: 'ดับเบิ้ลช็อต ⚡' },
                  { cups: 3, label: '3 แก้ว', price: '฿150', desc: 'วิปครีมหวานมัน' },
                  { cups: 5, label: '5 แก้ว', price: '฿250', desc: 'VIP Sponsor 👑' }
                ].map((tier) => (
                  <button
                    key={tier.cups}
                    type="button"
                    onClick={() => {
                      setSelectedCups(tier.cups);
                      setIsCustom(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      !isCustom && selectedCups === tier.cups
                        ? 'border-amber-500 bg-amber-950/40 text-white shadow-sm'
                        : 'border-[#282a38] bg-[#181922] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold">{tier.label}</span>
                      <span className="text-xs font-mono font-semibold text-amber-400">{tier.price}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 block truncate">{tier.desc}</span>
                  </button>
                ))}
              </div>

              {/* Custom Amount Option */}
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    isCustom
                      ? 'border-amber-500 bg-amber-950/40 text-white'
                      : 'border-[#282a38] bg-[#181922] text-zinc-400 hover:text-white'
                  }`}
                >
                  กำหนดจำนวนเงินเอง (Custom)
                </button>
                {isCustom && (
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-mono">฿</span>
                    <input
                      type="number"
                      min="20"
                      max="10000"
                      step="10"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="ใส่จำนวนเงิน (เช่น 300)"
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-[#181922] border border-[#2b2d3c] rounded-lg text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Donor Name & Message */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">
                  ชื่อผู้เลี้ยงโกโก้ (Your Name / Alias)
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="เช่น น้องแพรว / Anon"
                  className="w-full px-3 py-2 text-xs bg-[#181922] border border-[#2b2d3c] rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">
                  ข้อความให้กำลังใจ (Encouraging Message)
                </label>
                <input
                  type="text"
                  maxLength={60}
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder="เช่น ถ่ายรูปสวยมากเลยครับ!"
                  className="w-full px-3 py-2 text-xs bg-[#181922] border border-[#2b2d3c] rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Simulated Payment Channel Selector */}
            <div className="p-3 bg-[#181922] rounded-xl border border-[#282a38] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('promptpay')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                    paymentMethod === 'promptpay'
                      ? 'bg-amber-600 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>PromptPay QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-amber-600 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>บัตร / ชำระจำลอง</span>
                </button>
              </div>

              <span className="text-[11px] text-zinc-500">
                ระบบจำลอง (Simulation)
              </span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-amber-900/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Heart className="w-4 h-4 text-rose-200 fill-rose-200 animate-pulse" />
              <span>
                {isSubmitting
                  ? 'กำลังชงโกโก้...'
                  : `ยืนยันเลี้ยงโกโก้ ฿${currentSelection.amount.toLocaleString()} (${currentSelection.cups} แก้ว) ☕`}
              </span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
