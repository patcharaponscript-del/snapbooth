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
  Copy,
  Download,
  Flame,
  Award,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CocoaDonation } from '../types/photobooth';
import { soundFX } from '../utils/audio';
import { useI18n } from '../utils/i18n';

const COCOA_PRICE_PER_CUP = 50; // 50 THB per delicious cocoa cup
const REAL_QR_IMAGE = '/assets/aistudio/image_62d3a133.png';
const ACCOUNT_NAME = 'พัชรพล เพียรอนุกูลบุตร';
const ACCOUNT_NUMBER = '09*-***-4406';

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
  const { lang, t } = useI18n();
  const [selectedCups, setSelectedCups] = useState<number>(2);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [lastDonatedCups, setLastDonatedCups] = useState<number>(0);
  const [copiedNumber, setCopiedNumber] = useState(false);

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

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopiedNumber(true);
    soundFX.playPop();
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const { amount, cups } = calculateCurrentDonation();
    const name = donorName.trim() || (lang === 'en' ? 'Anonymous Friend 🧋' : 'ผู้ไม่ประสงค์ออกนาม 🧋');
    const message = donorMessage.trim() || (lang === 'en' ? 'Love SnapBooth! Keep up the awesome work!' : 'ชอบ SnapBooth มากๆ ครับ เป็นกำลังใจให้คนสร้าง!');

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
        particleCount: 120,
        spread: 75,
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
                  {t.tipModalTitle}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-semibold border border-amber-500/30">
                  {t.tipModalBadge}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {t.tipModalSub}
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
                {t.thankYouTitle}
              </h3>
              <p className="text-xs text-amber-200/90 leading-relaxed max-w-sm mx-auto">
                {t.thankYouDesc}
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-colors shadow-md shadow-amber-900/30"
              >
                {lang === 'en' ? 'Treat another cup or view board' : 'เลี้ยงเพิ่มอีกแก้ว หรือดูยอดรวม'}
              </button>
            </div>
          ) : null}

          {/* REAL TRUEMONEY & PROMPTPAY QR CODE SECTION */}
          <div className="rounded-2xl bg-gradient-to-b from-[#1b1c26] to-[#14151e] border border-amber-500/30 p-5 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              
              {/* QR Image Frame */}
              <div className="relative group shrink-0">
                <div className="w-48 sm:w-44 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-white p-2">
                  <img 
                    src={REAL_QR_IMAGE} 
                    alt="TrueMoney PromptPay QR Code" 
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
                <a
                  href={REAL_QR_IMAGE}
                  download="snapbooth_qr_payment.png"
                  className="mt-2 text-[11px] text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Save QR Image' : 'บันทึกรูป QR Code'}</span>
                </a>
              </div>

              {/* QR Information & Details */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] font-bold">
                    TrueMoney
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-400 text-[10px] font-bold">
                    PromptPay
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-400 block">{t.accountNameLabel}</span>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {ACCOUNT_NAME}
                  </h4>
                  <span className="text-xs text-zinc-400 font-mono block mt-0.5">
                    Patcharapon
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-400 block">{t.accountNumberLabel}</span>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-[#222430] border border-[#2f3242] font-mono text-xs text-amber-300 font-bold">
                      {ACCOUNT_NUMBER}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="px-2 py-1 rounded-lg bg-[#262836] hover:bg-[#323546] text-[11px] text-zinc-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {copiedNumber ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedNumber ? t.copiedNumberBtn : t.copyNumberBtn}</span>
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {t.scanToPayNotice}
                </p>
              </div>

            </div>
          </div>

          {/* TOTAL AMOUNT & COCOA CALCULATOR DISPLAY */}
          <div className="relative rounded-2xl bg-[#1a1b24] border border-[#2b2d3c] p-5 overflow-hidden shadow-lg">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#292b3a] pb-4">
              <div>
                <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'en' ? 'Total Cocoa Tips Received' : 'ยอดค่าน้ำโกโก้ที่ได้รับทั้งหมด'}</span>
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
                <span className="text-[11px] text-zinc-400 block">{lang === 'en' ? 'Conversion Rate' : 'อัตราแปลงแก้ว'}</span>
                <span className="text-xs font-mono text-amber-300 font-semibold bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-md inline-block mt-0.5">
                  1 Cup = 50 THB
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
                      {t.cupsCalculated}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      (50฿ / Cup)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black font-mono text-amber-400">
                    {totalCups} {lang === 'en' ? 'Cups!' : 'แก้ว!'}
                  </span>
                </div>
              </div>

              {/* Progress bar towards 100 cups milestone */}
              <div>
                <div className="flex justify-between text-[11px] text-zinc-400 mb-1 font-mono">
                  <span>{t.milestoneTitle}</span>
                  <span>{totalCups} / 100 ({Math.min(100, Math.round((totalCups / 100) * 100))}%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#121318] rounded-full overflow-hidden border border-zinc-800">
                  <div 
                    style={{ width: `${Math.min(100, (totalCups / 100) * 100)}%` }}
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* TOP DONATE LEADERBOARD */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>{t.topDonatorsTitle}</span>
              </h3>
              <span className="text-[11px] text-zinc-500">
                {donations.length} {lang === 'en' ? 'Supporters' : 'ผู้สนับสนุน'}
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
                            {d.cups} {lang === 'en' ? 'Cups 🧋' : 'แก้ว 🧋'}
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

          {/* TIP DONATION CONFIRMATION FORM */}
          <form onSubmit={handleDonate} className="space-y-4 pt-2 border-t border-[#262833]">
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-2">
                {t.selectCupsLabel}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { cups: 1, label: lang === 'en' ? '1 Cup' : '1 แก้ว', price: '฿50', desc: lang === 'en' ? 'Iced Cocoa' : 'โกโก้เย็น' },
                  { cups: 2, label: lang === 'en' ? '2 Cups' : '2 แก้ว', price: '฿100', desc: lang === 'en' ? 'Double Shot ⚡' : 'ดับเบิ้ลช็อต ⚡' },
                  { cups: 3, label: lang === 'en' ? '3 Cups' : '3 แก้ว', price: '฿150', desc: lang === 'en' ? 'Whipped Cream' : 'วิปครีมหวานมัน' },
                  { cups: 5, label: lang === 'en' ? '5 Cups' : '5 แก้ว', price: '฿250', desc: lang === 'en' ? 'VIP Sponsor 👑' : 'VIP Sponsor 👑' }
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
                        ? 'border-amber-500 bg-amber-950/40 text-white shadow-sm ring-1 ring-amber-500/50'
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
                  {t.customAmountLabel}
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
                      placeholder={lang === 'en' ? 'Amount (e.g. 300)' : 'ใส่จำนวนเงิน (เช่น 300)'}
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
                  {t.donorNameLabel}
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder={t.donorNamePlaceholder}
                  className="w-full px-3 py-2 text-xs bg-[#181922] border border-[#2b2d3c] rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">
                  {t.donorMessageLabel}
                </label>
                <input
                  type="text"
                  maxLength={60}
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder={t.donorMessagePlaceholder}
                  className="w-full px-3 py-2 text-xs bg-[#181922] border border-[#2b2d3c] rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>
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
                  ? (lang === 'en' ? 'Brewing Cocoa...' : 'กำลังชงโกโก้...')
                  : `${t.confirmDonationBtn} (฿${currentSelection.amount.toLocaleString()}) ☕`}
              </span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
