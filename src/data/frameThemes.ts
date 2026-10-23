import { FrameTheme } from '../types/photobooth';

export const FRAME_THEMES: FrameTheme[] = [
  // --- ANIMAL FRAMES (กรอบรูปสัตว์น่ารัก) ---
  {
    id: 'puppy-paws',
    name: 'Golden Pup & Paws',
    category: 'animals',
    emojiIcon: '🐶',
    description: 'น้องหมาปั๊กโผล่หน้า & รอยเท้าเดินรอบกรอบรูป',
    bgHex: '#FFFBEB',
    textHex: '#78350F',
    subtextHex: '#B45309',
    borderHex: '#FDE68A',
    isSpecialPattern: 'puppy'
  },
  {
    id: 'kitty-cat',
    name: 'Kitty & Paws',
    category: 'animals',
    emojiIcon: '🐱',
    description: 'แมวเหมียวน่ารักเกาะขอบ & รอยเท้าแมวสีชมพู',
    bgHex: '#FDF2F8',
    textHex: '#831843',
    subtextHex: '#BE185D',
    borderHex: '#FCE7F3',
    isSpecialPattern: 'kitty'
  },
  {
    id: 'fluffy-bunny',
    name: 'Fluffy Bunny',
    category: 'animals',
    emojiIcon: '🐰',
    description: 'หูกระต่ายนุ่มฟู & ลูกแครอทสดใสบนกรอบ',
    bgHex: '#FFF1F2',
    textHex: '#9F1239',
    subtextHex: '#E11D48',
    borderHex: '#FFE4E6',
    isSpecialPattern: 'bunny'
  },
  {
    id: 'teddy-bear',
    name: 'Teddy & Honey',
    category: 'animals',
    emojiIcon: '🐻',
    description: 'หมีเท็ดดี้ตัวอุ่นเกาะขอบ & โถน้ำผึ้งหวานฉ่ำ',
    bgHex: '#FEF3C7',
    textHex: '#713F12',
    subtextHex: '#A16207',
    borderHex: '#FDE68A',
    isSpecialPattern: 'bear'
  },
  {
    id: 'capybara-spa',
    name: 'Capybara Onsen',
    category: 'animals',
    emojiIcon: '🦫',
    description: 'คาปิบาร่าแช่น้ำส้มยูซุ สบายใจไร้กังวล',
    bgHex: '#F0FDF4',
    textHex: '#14532D',
    subtextHex: '#166534',
    borderHex: '#BBF7D0',
    isSpecialPattern: 'capybara'
  },
  {
    id: 'matcha-frog',
    name: 'Matcha Froggy',
    category: 'animals',
    emojiIcon: '🐸',
    description: 'กบน้อยแก้มชมพู & ใบบัวสดชื่นริมบึง',
    bgHex: '#ECFDF5',
    textHex: '#064E3B',
    subtextHex: '#047857',
    borderHex: '#A7F3D0',
    isSpecialPattern: 'froggy'
  },
  {
    id: 'yellow-chick',
    name: 'Duckling Friends',
    category: 'animals',
    emojiIcon: '🐥',
    description: 'เป็ดเหลืองน้อยก้าบๆ & ดอกเดซี่สดใส',
    bgHex: '#FEFCE8',
    textHex: '#713F12',
    subtextHex: '#CA8A04',
    borderHex: '#FEF08A',
    isSpecialPattern: 'chick'
  },

  // --- AESTHETIC & TRENDING (สไตล์เกาหลี & Y2K) ---
  {
    id: 'coquette-bows',
    name: 'Coquette Ballet',
    category: 'aesthetic',
    emojiIcon: '🎀',
    description: 'ริบบิ้นโบว์ซาตินสีชมพู & หัวใจลูกไม้สุดคิ้วท์',
    bgHex: '#FDF4FF',
    textHex: '#701A75',
    subtextHex: '#A21CAF',
    borderHex: '#F5D0FE',
    isSpecialPattern: 'coquette'
  },
  {
    id: 'cyber-angel',
    name: 'Cyber Angel Y2K',
    category: 'aesthetic',
    emojiIcon: '🛸',
    description: 'ปีกนางฟ้าโครเมียม & ดาวประกายแสงเมทัลลิก',
    bgHex: '#0F172A',
    textHex: '#38BDF8',
    subtextHex: '#818CF8',
    borderHex: '#38BDF8',
    isSpecialPattern: 'cyber-angel'
  },
  {
    id: 'sunset-aura',
    name: 'Sunset Aura',
    category: 'aesthetic',
    emojiIcon: '🌇',
    description: 'ไล่เฉดสีพระอาทิตย์ตกละมุน โทนส้มชมพูม่วง',
    bgHex: '#FFFBEB',
    textHex: '#4A044E',
    subtextHex: '#86198F',
    borderHex: '#FDE68A',
    isSpecialPattern: 'gradient-sunset'
  },
  {
    id: 'holographic',
    name: 'Holographic Silver',
    category: 'aesthetic',
    emojiIcon: '💿',
    description: 'เงาสะท้อนโฮโลแกรม ปริซึมสีรุ้งเหลือบแสง',
    bgHex: '#F3F4F6',
    textHex: '#1E1B4B',
    subtextHex: '#4338CA',
    borderHex: '#C7D2FE',
    isSpecialPattern: 'hologram'
  },
  {
    id: 'checker-retro',
    name: 'Y2K Checker',
    category: 'aesthetic',
    emojiIcon: '🏁',
    description: 'ลายตารางหมากรุกม่วง Y2K ยอดนิยม',
    bgHex: '#1E1B4B',
    textHex: '#F5D0FE',
    subtextHex: '#D8B4FE',
    borderHex: '#312E81',
    isSpecialPattern: 'checker'
  },
  {
    id: 'pastel-blush',
    name: 'Blush Blossom',
    category: 'aesthetic',
    emojiIcon: '💕',
    description: 'หัวใจมินิมอลสีชมพู โฟโต้บูธเกาหลีฮิต',
    bgHex: '#FFF1F2',
    textHex: '#881337',
    subtextHex: '#BE123C',
    borderHex: '#FFE4E6',
    isSpecialPattern: 'hearts'
  },
  {
    id: 'seoul-lavender',
    name: 'Seoul Lilac',
    category: 'aesthetic',
    emojiIcon: '💜',
    description: 'โทนม่วงพาสเทลละมุนตา ร้านดังย่านฮงแด',
    bgHex: '#F5F3FF',
    textHex: '#4C1D95',
    subtextHex: '#6D28D9',
    borderHex: '#EDE9FE',
    isSpecialPattern: 'none'
  },

  // --- RETRO & FILM (ฟิล์ม & วินเทจ) ---
  {
    id: 'film-negative',
    name: '35mm Film Roll',
    category: 'retro',
    emojiIcon: '🎞️',
    description: 'รูหนามเตยฟิล์มสตรีท 35 มม. เหมือนล้างฟิล์มจริง',
    bgHex: '#0B0C10',
    textHex: '#FB923C',
    subtextHex: '#EA580C',
    borderHex: '#222222',
    isSpecialPattern: 'sprockets'
  },
  {
    id: 'retro-arcade',
    name: '8-Bit Pixel Arcade',
    category: 'retro',
    emojiIcon: '🕹️',
    description: 'ตู้เกมเรโทร 8-bit หลอดหัวใจ HP และคะแนน',
    bgHex: '#180B2B',
    textHex: '#F43F5E',
    subtextHex: '#38BDF8',
    borderHex: '#4C1D95',
    isSpecialPattern: 'arcade'
  },
  {
    id: 'newspaper',
    name: 'Retro Broadsheet',
    category: 'retro',
    emojiIcon: '📰',
    description: 'หน้าหนังสือพิมพ์วินเทจ บาร์โค้ด & ตัวพิมพ์คลาสสิก',
    bgHex: '#FAF7F0',
    textHex: '#1C1917',
    subtextHex: '#57534E',
    borderHex: '#D6D3D1',
    isSpecialPattern: 'newspaper'
  },
  {
    id: 'vintage-cream',
    name: '1970s Warm Cream',
    category: 'retro',
    emojiIcon: '📜',
    description: 'สีกระดาษการ์ดเนื้อทรายอบอุ่น สไตล์โพลารอยด์เก่า',
    bgHex: '#FDFBF7',
    textHex: '#3E2723',
    subtextHex: '#795548',
    borderHex: '#EFEBE9',
    isSpecialPattern: 'none'
  },

  // --- CLASSIC & MINIMAL (คลาสสิก & สะอาดตา) ---
  {
    id: 'classic-white',
    name: 'Paper White',
    category: 'classic',
    emojiIcon: '🤍',
    description: 'สีขาวบริสุทธิ์ เน้นรูปถ่ายให้เด่นคมชัด',
    bgHex: '#FFFFFF',
    textHex: '#18181B',
    subtextHex: '#71717A',
    borderHex: '#E4E4E7',
    isSpecialPattern: 'none'
  },
  {
    id: 'studio-black',
    name: 'Studio Noir',
    category: 'classic',
    emojiIcon: '🖤',
    description: 'สีดำสตูดิโอดาร์กรูม เรียบหรูมีสไตล์',
    bgHex: '#111215',
    textHex: '#FAFAFA',
    subtextHex: '#A1A1AA',
    borderHex: '#27272A',
    isSpecialPattern: 'none'
  },
  {
    id: 'powder-blue',
    name: 'Sky Mist',
    category: 'classic',
    emojiIcon: '💙',
    description: 'สีฟ้าละมุน สบายตา เหมือนท้องฟ้ายามเช้า',
    bgHex: '#F0F9FF',
    textHex: '#0C4A6E',
    subtextHex: '#0369A1',
    borderHex: '#E0F2FE',
    isSpecialPattern: 'none'
  },
  {
    id: 'retro-mint',
    name: 'Matcha Breeze',
    category: 'classic',
    emojiIcon: '🍵',
    description: 'สีเขียวมัทฉะกริดตาราง มินิมอลโมเดิร์น',
    bgHex: '#F0FDF4',
    textHex: '#14532D',
    subtextHex: '#15803D',
    borderHex: '#DCFCE7',
    isSpecialPattern: 'grid'
  }
];
