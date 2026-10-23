import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'th';

export interface Translations {
  // Navigation & Branding
  brandSubtitle: string;
  tabCamera: string;
  tabStudio: string;
  tabGallery: string;
  themePresets: string;
  cocoaTip: string;
  resetSession: string;
  installApp: string;
  installIos: string;
  privacyBadge: string;

  // Camera Booth
  cameraHeading: string;
  cameraSubheading: string;
  liveARBadge: string;
  filmToneRibbonTitle: string;
  filmToneRibbonDesc: string;
  faceARBtn: string;
  uploadBtn: string;
  demoPosesBtn: string;
  retakingShot: string;
  needMorePhotos: string;
  readyToCustomize: string;
  clearPhotos: string;
  emptySlot: string;
  customizePhotostrip: string;
  customizeHint: string;
  burstMode: string;
  snapPhoto: string;
  spacebarSnap: string;

  // Face Filter Modal
  faceFilterModalTitle: string;
  faceFilterModalSub: string;
  catAll: string;
  catCute: string;
  catTrendy: string;
  catBeauty: string;
  catFunny: string;
  filterNone: string;

  // Studio Editor
  studioHeading: string;
  studioSubheading: string;
  tabFrames: string;
  tabStickers: string;
  tabDoodle: string;
  tabText: string;
  tabFilters: string;
  boomerangGif: string;
  stopMotion: string;
  copyBtn: string;
  copiedBtn: string;
  saveBtn: string;
  savedBtn: string;
  printBtn: string;
  shareBtn: string;
  sharingBtn: string;
  downloadBtn: string;
  generatingBtn: string;
  emptyStudioTitle: string;
  emptyStudioDesc: string;
  backToCameraBtn: string;
  doodleActiveBadge: string;
  undoDoodle: string;
  clearDoodles: string;
  penColorLabel: string;
  strokeSizeLabel: string;

  // Donation / Cocoa Modal
  tipModalTitle: string;
  tipModalBadge: string;
  tipModalSub: string;
  trueMoneyPromptPayTitle: string;
  scanToPayNotice: string;
  accountNameLabel: string;
  accountNumberLabel: string;
  copyNumberBtn: string;
  copiedNumberBtn: string;
  cupsCalculated: string;
  milestoneTitle: string;
  topDonatorsTitle: string;
  selectCupsLabel: string;
  customAmountLabel: string;
  donorNameLabel: string;
  donorNamePlaceholder: string;
  donorMessageLabel: string;
  donorMessagePlaceholder: string;
  confirmDonationBtn: string;
  thankYouTitle: string;
  thankYouDesc: string;

  // Gallery
  galleryHeading: string;
  gallerySubheading: string;
  noSavedStripsTitle: string;
  noSavedStripsDesc: string;
  downloadStrip: string;
  deleteStrip: string;
}

const translations: Record<Language, Translations> = {
  en: {
    brandSubtitle: 'Photobooth Studio',
    tabCamera: 'Booth Camera',
    tabStudio: 'Darkroom Studio',
    tabGallery: 'Gallery Prints',
    themePresets: 'Theme Presets',
    cocoaTip: 'Support Creator',
    resetSession: 'Reset',
    installApp: 'Install App',
    installIos: 'Install on iOS',
    privacyBadge: '🔒 100% Private & Safe: Photos are processed in your browser and never saved to any external servers.',

    cameraHeading: 'Booth Camera',
    cameraSubheading: 'Live aesthetic 35mm film tones & real-time AR face filters!',
    liveARBadge: 'Live TikTok Face AR',
    filmToneRibbonTitle: 'Photobooth Film Color Tones',
    filmToneRibbonDesc: '35mm Film, Y2K Flash, B&W High Contrast, Kodak Portra, Pastel Dream',
    faceARBtn: 'Face AR Filters',
    uploadBtn: 'Upload',
    demoPosesBtn: 'Demo Poses',
    retakingShot: 'Retaking Shot',
    needMorePhotos: 'Need {n} more',
    readyToCustomize: 'Ready to customize!',
    clearPhotos: 'Clear',
    emptySlot: 'Empty Slot',
    customizePhotostrip: 'Customize Photostrip',
    customizeHint: 'Add cute vector stickers, doodles, custom title & print',
    burstMode: '4-Shot Burst',
    snapPhoto: 'Snap Photo',
    spacebarSnap: 'Spacebar to snap',

    faceFilterModalTitle: 'Interactive AR Face Filters',
    faceFilterModalSub: 'Fun accessories moving dynamically with your head, mouth & face tilt',
    catAll: 'All',
    catCute: '🐾 Kawaii Pets',
    catTrendy: '🕶️ Y2K & Fashion',
    catBeauty: '👑 Princess & Glam',
    catFunny: '😭 Funny Memes',
    filterNone: 'None (Natural)',

    studioHeading: 'Darkroom Studio',
    studioSubheading: 'Style your frame, place cute vector stickers, doodle on photos, and export prints.',
    tabFrames: 'Frames',
    tabStickers: 'Stickers',
    tabDoodle: 'Doodle',
    tabText: 'Text',
    tabFilters: 'Tones',
    boomerangGif: 'Boomerang GIF',
    stopMotion: 'Stop Motion',
    copyBtn: 'Copy',
    copiedBtn: 'Copied!',
    saveBtn: 'Save',
    savedBtn: 'Saved!',
    printBtn: 'Print',
    shareBtn: 'Share Story',
    sharingBtn: 'Sharing...',
    downloadBtn: 'Download Print',
    generatingBtn: 'Generating...',
    emptyStudioTitle: 'No photos captured yet',
    emptyStudioDesc: 'Snap 1 to 4 poses in the booth to begin designing your custom photostrip.',
    backToCameraBtn: 'Go to Booth Camera',
    doodleActiveBadge: 'Doodle Pen Active',
    undoDoodle: 'Undo',
    clearDoodles: 'Clear All Strokes',
    penColorLabel: 'Pen Color',
    strokeSizeLabel: 'Stroke Size',

    tipModalTitle: 'Support the Creator',
    tipModalBadge: 'Tip & Cocoa',
    tipModalSub: 'Scan via TrueMoney Wallet or PromptPay to support development and server costs!',
    trueMoneyPromptPayTitle: 'TrueMoney Wallet & PromptPay QR',
    scanToPayNotice: 'Open any Thai Banking App or TrueMoney Wallet to scan and pay:',
    accountNameLabel: 'Account Name',
    accountNumberLabel: 'PromptPay / Wallet Number',
    copyNumberBtn: 'Copy',
    copiedNumberBtn: 'Copied!',
    cupsCalculated: 'Total Cocoa Cups Fueled:',
    milestoneTitle: 'Community Milestone',
    topDonatorsTitle: 'Top Donators & Supporters',
    selectCupsLabel: 'Select Cocoa Cups to treat:',
    customAmountLabel: 'Custom Amount',
    donorNameLabel: 'Your Nickname / Alias',
    donorNamePlaceholder: 'e.g. Sarah / Anonymous',
    donorMessageLabel: 'Encouraging Message',
    donorMessagePlaceholder: 'e.g. Loved the puppy frame! Keep up the great work!',
    confirmDonationBtn: 'Confirm & Post to Leaderboard',
    thankYouTitle: 'Thank You So Much! 💖',
    thankYouDesc: 'Your cocoa tip means the world and fuels exciting new photobooth features!',

    galleryHeading: 'Memory Gallery',
    gallerySubheading: 'Your downloaded and saved photostrips stored privately on your device.',
    noSavedStripsTitle: 'No saved strips yet',
    noSavedStripsDesc: 'Design and save your favorite photostrips from the Darkroom Studio!',
    downloadStrip: 'Download',
    deleteStrip: 'Delete'
  },
  th: {
    brandSubtitle: 'สตูดิโอตู้ถ่ายรูป',
    tabCamera: 'ตู้ถ่ายรูป (Camera)',
    tabStudio: 'ห้องมืดแต่งรูป (Studio)',
    tabGallery: 'แกลเลอรีรูป (Gallery)',
    themePresets: 'ธีมสำเร็จรูป',
    cocoaTip: 'เลี้ยงโกโก้คนสร้าง',
    resetSession: 'รีเซ็ต',
    installApp: 'ติดตั้งแอป',
    installIos: 'ติดตั้งบน iPhone',
    privacyBadge: '🔒 ปลอดภัย 100%: รูปภาพประมวลผลในเบราว์เซอร์ของคุณเท่านั้น ไม่มีการส่งรูปขึ้นเซิร์ฟเวอร์ภายนอก',

    cameraHeading: 'Booth Camera',
    cameraSubheading: 'โทนสีฟิล์ม 35mm สไตล์เกาหลี พร้อมฟิลเตอร์หน้า AR ขยับตามหน้าจริง!',
    liveARBadge: 'Live TikTok Face AR',
    filmToneRibbonTitle: 'โทนสีฟิล์ม Photobooth',
    filmToneRibbonDesc: 'ฟิล์ม 35mm, Y2K Flash, B&W High Contrast, Kodak Portra, Pastel Dream',
    faceARBtn: 'ลูกเล่นฟิลเตอร์หน้า AR',
    uploadBtn: 'อัปโหลดรูป',
    demoPosesBtn: 'รูปตัวอย่าง',
    retakingShot: 'กำลังถ่ายซ่อมภาพ',
    needMorePhotos: 'ต้องการอีก {n} รูป',
    readyToCustomize: 'พร้อมตกแต่งแล้ว!',
    clearPhotos: 'เคลียร์',
    emptySlot: 'ช่องว่าง',
    customizePhotostrip: 'ไปตกแต่งโฟโต้สตริป',
    customizeHint: 'ใส่สติกเกอร์เวกเตอร์น่ารัก, วาดเส้นเล่น, เปลี่ยนกรอบรูป & สั่งพิมพ์',
    burstMode: 'กดรัว 4 แอ็ก',
    snapPhoto: 'กดชัตเตอร์',
    spacebarSnap: 'กด Spacebar เพื่อถ่าย',

    faceFilterModalTitle: 'ลูกเล่นฟิลเตอร์หน้า AR (Face Filters)',
    faceFilterModalSub: 'ลูกเล่นขยับตามการเอียงหน้า ขยับปาก และมุมกล้องจริง (น้องหมา, หูแมว, แว่นตา)',
    catAll: 'ทั้งหมด',
    catCute: '🐾 สัตว์คาวาอี้',
    catTrendy: '🕶️ Y2K & แฟชั่น',
    catBeauty: '👑 มงกุฎ & เจ้าหญิง',
    catFunny: '😭 มีมฮาๆ',
    filterNone: 'ไม่ใส่ฟิลเตอร์ (หน้าสดใสธรรมชาติ)',

    studioHeading: 'Darkroom Studio',
    studioSubheading: 'เลือกกรอบลายสัตว์/Y2K, แปะสติกเกอร์เวกเตอร์, วาดรูป Doodle, แล้วส่งออกภาพพิมพ์คมชัด',
    tabFrames: 'กรอบรูป',
    tabStickers: 'สติกเกอร์',
    tabDoodle: 'วาดรูป',
    tabText: 'ข้อความ',
    tabFilters: 'โทนฟิล์ม',
    boomerangGif: 'บูมเมอแรง GIF',
    stopMotion: 'หยุดเคลื่อนไหว',
    copyBtn: 'คัดลอกรูป',
    copiedBtn: 'คัดลอกแล้ว!',
    saveBtn: 'บันทึก',
    savedBtn: 'บันทึกแล้ว!',
    printBtn: 'สั่งพิมพ์',
    shareBtn: 'แชร์สตอรี่',
    sharingBtn: 'กำลังแชร์...',
    downloadBtn: 'ดาวน์โหลดรูปพิมพ์',
    generatingBtn: 'กำลังสร้างไฟล์...',
    emptyStudioTitle: 'ยังไม่มีรูปถ่ายในสตูดิโอ',
    emptyStudioDesc: 'ถ่ายรูป 1-4 แอ็กที่ตู้กล้องเพื่อเริ่มทำโฟโต้สตริปของคุณ',
    backToCameraBtn: 'ไปที่ตู้ถ่ายรูป (Booth Camera)',
    doodleActiveBadge: 'โหมดปากกาวาดรูปเปิดอยู่',
    undoDoodle: 'ย้อนกลับ',
    clearDoodles: 'ล้างลายเส้นทั้งหมด',
    penColorLabel: 'สีปากกา',
    strokeSizeLabel: 'ขนาดหัวปากกา',

    tipModalTitle: 'เลี้ยงค่าน้ำโกโก้คนสร้าง',
    tipModalBadge: 'สนับสนุนคนพัฒนา',
    tipModalSub: 'สแกนผ่าน TrueMoney Wallet หรือ PromptPay เพื่อสนับสนุนค่าเครื่องดื่มและเซิร์ฟเวอร์!',
    trueMoneyPromptPayTitle: 'TrueMoney Wallet & PromptPay QR',
    scanToPayNotice: 'เปิดแอปธนาคารหรือ TrueMoney Wallet สแกนคิวอาร์โค้ดนี้:',
    accountNameLabel: 'ชื่อบัญชี',
    accountNumberLabel: 'เบอร์พร้อมเพย์ / วอลเล็ท',
    copyNumberBtn: 'คัดลอกเบอร์',
    copiedNumberBtn: 'คัดลอกแล้ว!',
    cupsCalculated: 'ระบบคำนวณซื้อโกโก้ได้:',
    milestoneTitle: 'เป้าหมายถาดโกโก้ (Milestone)',
    topDonatorsTitle: 'Top Donators (ผู้สนับสนุนสูงสุด)',
    selectCupsLabel: 'เลือกจำนวนแก้วโกโก้ที่ต้องการเลี้ยง:',
    customAmountLabel: 'กำหนดจำนวนเงินเอง',
    donorNameLabel: 'ชื่อผู้เลี้ยงโกโก้ (Your Name / Alias)',
    donorNamePlaceholder: 'เช่น น้องแพรว / Anon',
    donorMessageLabel: 'ข้อความให้กำลังใจ',
    donorMessagePlaceholder: 'เช่น ถ่ายรูปสวยมากเลยครับ เป็นกำลังใจให้!',
    confirmDonationBtn: 'ยืนยัน & แสดงบนบอร์ดผู้สนับสนุน',
    thankYouTitle: 'ขอบคุณมากๆ เลยครับ! 💖',
    thankYouDesc: 'ค่าน้ำโกโก้ของคุณคือพลังขับเคลื่อนที่ช่วยให้เรามีแรงพัฒนาฟีเจอร์ใหม่ๆ ต่อไป!',

    galleryHeading: 'คลังรูปถ่าย (Memory Gallery)',
    gallerySubheading: 'โฟโต้สตริปที่คุณตกแต่งและบันทึกไว้ในเครื่องของคุณ',
    noSavedStripsTitle: 'ยังไม่มีโฟโต้สตริปที่บันทึกไว้',
    noSavedStripsDesc: 'สร้างและบันทึกโฟโต้สตริปแรกของคุณจากหน้า Darkroom Studio!',
    downloadStrip: 'ดาวน์โหลด',
    deleteStrip: 'ลบรูป'
  }
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('snapbooth_lang') as Language;
      if (saved === 'en' || saved === 'th') return saved;
      // Default to Thai if user browser language is Thai, otherwise English
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('th')) return 'th';
    } catch {}
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('snapbooth_lang', newLang);
    } catch {}
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n() {
  return useContext(I18nContext);
}
