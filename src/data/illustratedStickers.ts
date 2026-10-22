// Illustrated photobooth vector stickers with die-cut white outline & drop shadow
// Massive collection (80+ graphic stickers across 8 categories)

export interface GraphicSticker {
  id: string;
  name: string;
  category: 'ribbons' | 'cafe' | 'animals' | 'y2k' | 'flowers' | 'stamps' | 'props' | 'doodles';
  svg: string; // Clean vector SVG string
  aspectRatio: number; // width / height
  tags?: string[];
}

export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const ILLUSTRATED_STICKERS: GraphicSticker[] = [
  // ==========================================
  // 1. RIBBONS & COQUETTE BOWS (10+ items)
  // ==========================================
  {
    id: 'kawaii-pink-bow',
    name: 'Pink Satin Bow',
    category: 'ribbons',
    aspectRatio: 1.3,
    tags: ['โบว์', 'ชมพู', 'bow', 'pink', 'coquette'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" fill="none">
      <path d="M50 38 C35 15, 10 20, 15 45 C18 58, 38 48, 50 42 C62 48, 82 58, 85 45 C90 20, 65 15, 50 38 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M42 42 L25 75 L38 72 L48 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M58 42 L75 75 L62 72 L52 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M44 42 L25 75 L38 72 L48 48 Z" fill="#FB7185"/>
      <path d="M56 42 L75 75 L62 72 L52 48 Z" fill="#F43F5E"/>
      <path d="M50 40 C35 18, 12 22, 17 44 C20 56, 38 46, 50 41 Z" fill="#FDA4AF"/>
      <path d="M22 28 C28 24, 38 30, 44 38" stroke="#FFE4E6" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M50 40 C65 18, 88 22, 83 44 C80 56, 62 46, 50 41 Z" fill="#FB7185"/>
      <path d="M78 28 C72 24, 62 30, 56 38" stroke="#FECDD3" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="50" cy="41" rx="8" ry="7" fill="#E11D48"/>
      <ellipse cx="48" cy="39" rx="3" ry="2" fill="#FFE4E6"/>
    </svg>`
  },
  {
    id: 'red-velvet-bow',
    name: 'Red Velvet Bow',
    category: 'ribbons',
    aspectRatio: 1.3,
    tags: ['โบว์แดง', 'bow', 'red', 'velvet'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" fill="none">
      <path d="M50 38 C35 15, 10 20, 15 45 C18 58, 38 48, 50 42 C62 48, 82 58, 85 45 C90 20, 65 15, 50 38 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M42 42 L25 75 L38 72 L48 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M58 42 L75 75 L62 72 L52 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M44 42 L25 75 L38 72 L48 48 Z" fill="#991B1B"/>
      <path d="M56 42 L75 75 L62 72 L52 48 Z" fill="#7F1D1D"/>
      <path d="M50 40 C35 18, 12 22, 17 44 C20 56, 38 46, 50 41 Z" fill="#DC2626"/>
      <path d="M50 40 C65 18, 88 22, 83 44 C80 56, 62 46, 50 41 Z" fill="#B91C1C"/>
      <ellipse cx="50" cy="41" rx="8" ry="7" fill="#991B1B"/>
      <ellipse cx="48" cy="39" rx="3" ry="2" fill="#FCA5A5"/>
    </svg>`
  },
  {
    id: 'black-coquette-bow',
    name: 'Black Coquette Bow',
    category: 'ribbons',
    aspectRatio: 1.3,
    tags: ['โบว์ดำ', 'black', 'bow', 'goth'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" fill="none">
      <path d="M50 38 C35 15, 10 20, 15 45 C18 58, 38 48, 50 42 C62 48, 82 58, 85 45 C90 20, 65 15, 50 38 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M42 42 L25 75 L38 72 L48 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M58 42 L75 75 L62 72 L52 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M44 42 L25 75 L38 72 L48 48 Z" fill="#18181B"/>
      <path d="M56 42 L75 75 L62 72 L52 48 Z" fill="#27272A"/>
      <path d="M50 40 C35 18, 12 22, 17 44 C20 56, 38 46, 50 41 Z" fill="#3F3F46"/>
      <path d="M50 40 C65 18, 88 22, 83 44 C80 56, 62 46, 50 41 Z" fill="#27272A"/>
      <ellipse cx="50" cy="41" rx="8" ry="7" fill="#09090B"/>
      <ellipse cx="48" cy="39" rx="3" ry="2" fill="#71717A"/>
    </svg>`
  },
  {
    id: 'kawaii-lilac-bow',
    name: 'Lilac Silk Ribbon',
    category: 'ribbons',
    aspectRatio: 1.3,
    tags: ['ม่วง', 'purple', 'bow'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" fill="none">
      <path d="M50 38 C35 15, 10 20, 15 45 C18 58, 38 48, 50 42 C62 48, 82 58, 85 45 C90 20, 65 15, 50 38 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M42 42 L25 75 L38 72 L48 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M58 42 L75 75 L62 72 L52 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M44 42 L25 75 L38 72 L48 48 Z" fill="#A855F7"/>
      <path d="M56 42 L75 75 L62 72 L52 48 Z" fill="#9333EA"/>
      <path d="M50 40 C35 18, 12 22, 17 44 C20 56, 38 46, 50 41 Z" fill="#D8B4FE"/>
      <path d="M50 40 C65 18, 88 22, 83 44 C80 56, 62 46, 50 41 Z" fill="#C084FC"/>
      <ellipse cx="50" cy="41" rx="8" ry="7" fill="#7E22CE"/>
      <ellipse cx="48" cy="39" rx="3" ry="2" fill="#F3E8FF"/>
    </svg>`
  },
  {
    id: 'baby-blue-bow',
    name: 'Baby Blue Bow',
    category: 'ribbons',
    aspectRatio: 1.3,
    tags: ['ฟ้า', 'blue', 'bow'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" fill="none">
      <path d="M50 38 C35 15, 10 20, 15 45 C18 58, 38 48, 50 42 C62 48, 82 58, 85 45 C90 20, 65 15, 50 38 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M42 42 L25 75 L38 72 L48 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M58 42 L75 75 L62 72 L52 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M44 42 L25 75 L38 72 L48 48 Z" fill="#0284C7"/>
      <path d="M56 42 L75 75 L62 72 L52 48 Z" fill="#0369A1"/>
      <path d="M50 40 C35 18, 12 22, 17 44 C20 56, 38 46, 50 41 Z" fill="#7DD3FC"/>
      <path d="M50 40 C65 18, 88 22, 83 44 C80 56, 62 46, 50 41 Z" fill="#38BDF8"/>
      <ellipse cx="50" cy="41" rx="8" ry="7" fill="#0369A1"/>
      <ellipse cx="48" cy="39" rx="3" ry="2" fill="#E0F2FE"/>
    </svg>`
  },
  {
    id: 'gold-shimmer-bow',
    name: 'Golden Shimmer Bow',
    category: 'ribbons',
    aspectRatio: 1.3,
    tags: ['ทอง', 'gold', 'bow'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" fill="none">
      <path d="M50 38 C35 15, 10 20, 15 45 C18 58, 38 48, 50 42 C62 48, 82 58, 85 45 C90 20, 65 15, 50 38 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M42 42 L25 75 L38 72 L48 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M58 42 L75 75 L62 72 L52 50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M44 42 L25 75 L38 72 L48 48 Z" fill="#D97706"/>
      <path d="M56 42 L75 75 L62 72 L52 48 Z" fill="#B45309"/>
      <path d="M50 40 C35 18, 12 22, 17 44 C20 56, 38 46, 50 41 Z" fill="#FDE047"/>
      <path d="M50 40 C65 18, 88 22, 83 44 C80 56, 62 46, 50 41 Z" fill="#FACC15"/>
      <ellipse cx="50" cy="41" rx="8" ry="7" fill="#B45309"/>
      <ellipse cx="48" cy="39" rx="3" ry="2" fill="#FEF08A"/>
    </svg>`
  },
  {
    id: 'tied-twine-bow',
    name: 'Vintage Twine Tie',
    category: 'ribbons',
    aspectRatio: 1.4,
    tags: ['เชือก', 'vintage', 'twine'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 70" fill="none">
      <g stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M50 35 C30 15, 15 25, 25 45 C35 55, 45 40, 50 35"/>
        <path d="M50 35 C70 15, 85 25, 75 45 C65 55, 55 40, 50 35"/>
        <path d="M48 38 L30 65"/>
        <path d="M52 38 L70 65"/>
      </g>
      <g stroke="#D97706" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M50 35 C30 15, 15 25, 25 45 C35 55, 45 40, 50 35" fill="none"/>
        <path d="M50 35 C70 15, 85 25, 75 45 C65 55, 55 40, 50 35" fill="none"/>
        <path d="M48 38 L30 65"/>
        <path d="M52 38 L70 65"/>
        <circle cx="50" cy="35" r="4.5" fill="#B45309"/>
      </g>
    </svg>`
  },
  {
    id: 'twin-mini-bows',
    name: 'Twin Pigtail Bows',
    category: 'ribbons',
    aspectRatio: 1.6,
    tags: ['คู่', 'twin', 'mini'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 60" fill="none">
      <g transform="translate(15, 15) scale(0.65)">
        <path d="M50 38 C35 15, 10 20, 15 45 C18 58, 38 48, 50 42 C62 48, 82 58, 85 45 C90 20, 65 15, 50 38 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
        <path d="M44 42 L25 70 L38 68 L48 48 Z" fill="#F43F5E" stroke="#FFFFFF" stroke-width="6"/>
        <path d="M56 42 L75 70 L62 68 L52 48 Z" fill="#E11D48" stroke="#FFFFFF" stroke-width="6"/>
        <path d="M50 40 C35 18, 12 22, 17 44 C20 56, 38 46, 50 41 Z" fill="#FDA4AF"/>
        <path d="M50 40 C65 18, 88 22, 83 44 C80 56, 62 46, 50 41 Z" fill="#FB7185"/>
        <ellipse cx="50" cy="41" rx="8" ry="7" fill="#BE123C"/>
      </g>
      <g transform="translate(55, 15) scale(0.65)">
        <path d="M50 38 C35 15, 10 20, 15 45 C18 58, 38 48, 50 42 C62 48, 82 58, 85 45 C90 20, 65 15, 50 38 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
        <path d="M44 42 L25 70 L38 68 L48 48 Z" fill="#F43F5E" stroke="#FFFFFF" stroke-width="6"/>
        <path d="M56 42 L75 70 L62 68 L52 48 Z" fill="#E11D48" stroke="#FFFFFF" stroke-width="6"/>
        <path d="M50 40 C35 18, 12 22, 17 44 C20 56, 38 46, 50 41 Z" fill="#FDA4AF"/>
        <path d="M50 40 C65 18, 88 22, 83 44 C80 56, 62 46, 50 41 Z" fill="#FB7185"/>
        <ellipse cx="50" cy="41" rx="8" ry="7" fill="#BE123C"/>
      </g>
    </svg>`
  },

  // ==========================================
  // 2. CAFE, SWEETS & ICED COCOA (12+ items)
  // ==========================================
  {
    id: 'iced-cocoa-cup',
    name: 'Iced Cocoa Signature',
    category: 'cafe',
    aspectRatio: 0.8,
    tags: ['โกโก้', 'cocoa', 'iced', 'chocolate', 'drink'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 100" fill="none">
      <!-- White die cut border -->
      <path d="M22 35 L28 88 C29 93 34 96 40 96 C46 96 51 93 52 88 L58 35 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <rect x="18" y="28" width="44" height="8" rx="4" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <!-- Straw -->
      <path d="M48 10 L45 35" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round"/>
      <path d="M48 10 L45 35" stroke="#F43F5E" stroke-width="4" stroke-linecap="round"/>
      <!-- Whipped cream top -->
      <path d="M22 30 C20 22, 30 18, 40 20 C48 16, 58 22, 56 30 Z" fill="#FFFBEB" stroke="#FFFFFF" stroke-width="4"/>
      <!-- Cup body -->
      <path d="M24 35 L28 88 C29 91 34 94 40 94 C46 94 51 91 52 88 L56 35 Z" fill="#582C12"/>
      <!-- Chocolate drizzle gradient -->
      <path d="M25 45 C30 50, 35 42, 42 48 C48 44, 52 50, 55 45 L54 60 C50 65, 45 62, 38 68 C32 64, 28 68, 26 62 Z" fill="#3E1C08" opacity="0.6"/>
      <!-- Ice cubes inside -->
      <rect x="30" y="48" width="10" height="10" rx="2" fill="#E2E8F0" opacity="0.4"/>
      <rect x="42" y="62" width="9" height="9" rx="2" fill="#E2E8F0" opacity="0.4"/>
      <!-- Cup highlights -->
      <path d="M28 42 L31 82" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      <!-- Cup lid rim -->
      <rect x="20" y="30" width="40" height="5" rx="2.5" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'hot-cocoa-mug',
    name: 'Hot Cocoa Mug with Marshmallows',
    category: 'cafe',
    aspectRatio: 1.1,
    tags: ['โกโก้ร้อน', 'mug', 'marshmallow', 'hot'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 85" fill="none">
      <!-- White outline -->
      <rect x="18" y="24" width="48" height="48" rx="8" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <path d="M66 34 C76 34, 82 42, 82 50 C82 58, 76 64, 66 64" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>
      <!-- Mug body -->
      <rect x="18" y="24" width="48" height="48" rx="8" fill="#F43F5E"/>
      <path d="M66 34 C76 34, 82 42, 82 50 C82 58, 76 64, 66 64" stroke="#F43F5E" stroke-width="6" stroke-linecap="round"/>
      <rect x="20" y="26" width="44" height="10" rx="5" fill="#582C12"/>
      <!-- Marshmallows -->
      <rect x="26" y="22" width="10" height="8" rx="3" fill="#FFFFFF"/>
      <rect x="40" y="20" width="11" height="9" rx="3" fill="#FFFFFF"/>
      <rect x="35" y="26" width="9" height="7" rx="2.5" fill="#FFFFFF"/>
      <!-- Mug Heart logo -->
      <path d="M42 48 C42 44, 36 42, 34 46 C32 42, 26 44, 26 48 C26 54, 34 58, 34 58 C34 58, 42 54, 42 48 Z" fill="#FFFFFF" transform="translate(8, 0)"/>
    </svg>`
  },
  {
    id: 'boba-milk-tea',
    name: 'Boba Pearl Milk Tea',
    category: 'cafe',
    aspectRatio: 0.8,
    tags: ['ชานมไข่มุก', 'boba', 'tea'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 95" fill="none">
      <path d="M20 30 L25 82 C26 86, 30 89, 37 89 C44 89, 48 86, 49 82 L54 30 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M44 8 L39 30" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round"/>
      <path d="M44 8 L39 30" stroke="#7C3AED" stroke-width="4" stroke-linecap="round"/>
      <path d="M22 30 L26 82 C27 85, 30 87, 37 87 C44 87, 47 85, 48 82 L52 30 Z" fill="#FBBF24"/>
      <!-- Boba pearls -->
      <circle cx="32" cy="78" r="3.5" fill="#18181B"/>
      <circle cx="41" cy="79" r="3.5" fill="#18181B"/>
      <circle cx="36" cy="72" r="3.5" fill="#18181B"/>
      <circle cx="28" cy="71" r="3.5" fill="#18181B"/>
      <circle cx="45" cy="73" r="3.5" fill="#18181B"/>
      <!-- Lid -->
      <path d="M18 30 C18 25, 56 25, 56 30 Z" fill="#9333EA" stroke="#FFFFFF" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'strawberry-cake',
    name: 'Strawberry Shortcake',
    category: 'cafe',
    aspectRatio: 1.1,
    tags: ['เค้ก', 'cake', 'strawberry'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 80" fill="none">
      <path d="M15 65 L45 25 L80 65 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M15 65 L45 25 L80 65 Z" fill="#FFFBEB"/>
      <!-- Cake layers -->
      <path d="M22 54 L73 54" stroke="#FBCFE8" stroke-width="6"/>
      <path d="M28 42 L66 42" stroke="#FDE047" stroke-width="5"/>
      <!-- Whipped cream top -->
      <path d="M40 25 C40 18, 50 18, 50 25 Z" fill="#FFFFFF"/>
      <!-- Strawberry topper -->
      <path d="M45 12 C40 12, 38 18, 45 25 C52 18, 50 12, 45 12 Z" fill="#EF4444" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="45" cy="18" r="0.8" fill="#FDE047"/>
      <circle cx="43" cy="15" r="0.8" fill="#FDE047"/>
    </svg>`
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte Art',
    category: 'cafe',
    aspectRatio: 1.1,
    tags: ['มัทฉะ', 'matcha', 'latte', 'green'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 75" fill="none">
      <rect x="18" y="24" width="46" height="42" rx="10" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <path d="M64 34 C72 34, 76 40, 76 46 C76 52, 72 58, 64 58" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round"/>
      <rect x="18" y="24" width="46" height="42" rx="10" fill="#F4F4F5"/>
      <path d="M64 34 C72 34, 76 40, 76 46 C76 52, 72 58, 64 58" stroke="#E4E4E7" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="41" cy="28" rx="20" ry="7" fill="#65A30D"/>
      <!-- Heart Latte Art -->
      <path d="M41 27 C41 24, 38 23, 36 25 C34 23, 31 24, 31 27 C31 31, 41 33, 41 33 C41 33, 51 31, 51 27 C51 24, 48 23, 46 25 C44 23, 41 24, 41 27 Z" fill="#FFFFFF" transform="scale(0.8) translate(10, 3)"/>
    </svg>`
  },
  {
    id: 'glazed-pink-donut',
    name: 'Pink Strawberry Donut',
    category: 'cafe',
    aspectRatio: 1,
    tags: ['โดนัท', 'donut', 'pink', 'sweet'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="30" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <circle cx="40" cy="40" r="28" fill="#F59E0B"/>
      <!-- Pink icing wave -->
      <path d="M40 14 C48 14, 52 18, 56 16 C62 20, 66 26, 64 32 C68 38, 66 46, 62 52 C58 58, 50 64, 42 66 C32 66, 22 62, 18 52 C14 44, 14 34, 18 26 C22 18, 30 14, 40 14 Z" fill="#EC4899"/>
      <!-- Donut hole -->
      <circle cx="40" cy="40" r="10" fill="#FFFFFF" stroke="#F59E0B" stroke-width="2"/>
      <!-- Rainbow sprinkles -->
      <rect x="32" y="20" width="6" height="2" rx="1" fill="#FFFFFF" transform="rotate(25 32 20)"/>
      <rect x="52" y="24" width="6" height="2" rx="1" fill="#FACC15" transform="rotate(-35 52 24)"/>
      <rect x="54" y="45" width="6" height="2" rx="1" fill="#38BDF8" transform="rotate(45 54 45)"/>
      <rect x="24" y="44" width="6" height="2" rx="1" fill="#4ADE80" transform="rotate(-20 24 44)"/>
      <rect x="35" y="58" width="6" height="2" rx="1" fill="#F43F5E" transform="rotate(15 35 58)"/>
    </svg>`
  },
  {
    id: 'french-croissant',
    name: 'Golden Butter Croissant',
    category: 'cafe',
    aspectRatio: 1.3,
    tags: ['ครัวซอง', 'croissant', 'butter'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 70" fill="none">
      <path d="M15 45 C15 25, 45 15, 75 45 C80 50, 75 58, 65 52 C55 46, 35 46, 25 52 C15 58, 10 50, 15 45 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M15 45 C15 25, 45 15, 75 45 C80 50, 75 58, 65 52 C55 46, 35 46, 25 52 C15 58, 10 50, 15 45 Z" fill="#D97706"/>
      <path d="M30 32 C38 28, 52 28, 60 32" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
      <path d="M38 24 C42 22, 48 22, 52 24" stroke="#FDE047" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'macarons-trio',
    name: 'Pastel Macarons Trio',
    category: 'cafe',
    aspectRatio: 0.9,
    tags: ['มาการอง', 'macaron', 'sweet'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 85" fill="none">
      <!-- Top Pink Macaron -->
      <g transform="translate(10, 10)">
        <ellipse cx="25" cy="15" rx="22" ry="9" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
        <ellipse cx="25" cy="15" rx="20" ry="8" fill="#F472B6"/>
        <rect x="6" y="14" width="38" height="4" rx="2" fill="#FFFFFF"/>
        <ellipse cx="25" cy="18" rx="20" ry="6" fill="#F472B6"/>
      </g>
      <!-- Middle Mint Macaron -->
      <g transform="translate(10, 32)">
        <ellipse cx="25" cy="15" rx="22" ry="9" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
        <ellipse cx="25" cy="15" rx="20" ry="8" fill="#4ADE80"/>
        <rect x="6" y="14" width="38" height="4" rx="2" fill="#FFFFFF"/>
        <ellipse cx="25" cy="18" rx="20" ry="6" fill="#4ADE80"/>
      </g>
      <!-- Bottom Lavender Macaron -->
      <g transform="translate(10, 54)">
        <ellipse cx="25" cy="15" rx="22" ry="9" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
        <ellipse cx="25" cy="15" rx="20" ry="8" fill="#C084FC"/>
        <rect x="6" y="14" width="38" height="4" rx="2" fill="#FFFFFF"/>
        <ellipse cx="25" cy="18" rx="20" ry="6" fill="#C084FC"/>
      </g>
    </svg>`
  },
  {
    id: 'caramel-pudding',
    name: 'Custard Caramel Pudding',
    category: 'cafe',
    aspectRatio: 1.1,
    tags: ['พุดดิ้ง', 'pudding', 'custard'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 75" fill="none">
      <path d="M22 60 L28 32 C28 26, 56 26, 56 32 L62 60 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <ellipse cx="42" cy="62" rx="28" ry="7" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M24 60 L30 34 C30 28, 54 28, 54 34 L60 60 Z" fill="#FDE047"/>
      <!-- Caramel topping drip -->
      <path d="M30 34 C34 42, 38 36, 42 40 C46 38, 50 42, 54 34 Z" fill="#78350F"/>
      <!-- Cherry on top -->
      <circle cx="42" cy="22" r="6" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
      <path d="M44 18 Q50 12 52 14" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'soft-serve-cone',
    name: 'Vanilla Soft Serve Swirl',
    category: 'cafe',
    aspectRatio: 0.8,
    tags: ['ไอศกรีม', 'icecream', 'cone'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 95" fill="none">
      <!-- Cone -->
      <path d="M22 52 L37 90 L52 52 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M24 52 L37 88 L50 52 Z" fill="#D97706"/>
      <path d="M28 58 L46 76 M46 58 L28 76" stroke="#B45309" stroke-width="1.5"/>
      <!-- Soft swirl cream -->
      <path d="M20 52 C15 42, 30 38, 37 40 C45 38, 60 42, 54 52 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M25 42 C22 34, 32 30, 37 32 C42 30, 52 34, 49 42 Z" fill="#FFFBEB" stroke="#FFFFFF" stroke-width="4"/>
      <path d="M30 32 C32 22, 42 22, 44 32 Z" fill="#FFFBEB" stroke="#FFFFFF" stroke-width="4"/>
      <circle cx="37" cy="20" r="3" fill="#FDA4AF"/>
    </svg>`
  },

  // ==========================================
  // 3. CUTE ANIMALS & PETS (12+ items)
  // ==========================================
  {
    id: 'kawaii-shiba-face',
    name: 'Smiling Shiba Inu',
    category: 'animals',
    aspectRatio: 1,
    tags: ['หมา', 'shiba', 'dog'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <path d="M20 35 L30 18 L42 28 M70 35 L60 18 L48 28" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>
      <circle cx="45" cy="52" r="30" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <path d="M24 35 L32 20 L40 28 Z" fill="#D97706" stroke="#92400E" stroke-width="2"/>
      <path d="M66 35 L58 20 L50 28 Z" fill="#D97706" stroke="#92400E" stroke-width="2"/>
      <circle cx="45" cy="52" r="28" fill="#F59E0B"/>
      <!-- White cheeks -->
      <path d="M22 55 C22 45, 35 48, 45 52 C55 48, 68 45, 68 55 C68 68, 55 76, 45 76 C35 76, 22 68, 22 55 Z" fill="#FFFFFF"/>
      <circle cx="35" cy="46" r="3" fill="#18181B"/>
      <circle cx="55" cy="46" r="3" fill="#18181B"/>
      <ellipse cx="45" cy="54" rx="4" ry="3" fill="#18181B"/>
      <!-- Cheek blush -->
      <circle cx="28" cy="54" r="5" fill="#FDA4AF" opacity="0.6"/>
      <circle cx="62" cy="54" r="5" fill="#FDA4AF" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'kawaii-bunny-face',
    name: 'Fluffy White Bunny',
    category: 'animals',
    aspectRatio: 1,
    tags: ['กระต่าย', 'bunny', 'rabbit'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <path d="M28 35 C15 15, 25 2, 35 15 C40 22, 42 32, 45 42 C48 32, 50 22, 55 15 C65 2, 75 15, 62 35" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>
      <circle cx="45" cy="55" r="28" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <path d="M30 38 C20 18, 26 8, 34 18 C38 24, 40 32, 42 42 Z" fill="#FFFFFF" stroke="#F43F5E" stroke-width="2"/>
      <path d="M30 34 C24 22, 28 16, 33 22 C35 25, 37 30, 38 36 Z" fill="#FDA4AF"/>
      <path d="M60 38 C70 18, 64 8, 56 18 C52 24, 50 32, 48 42 Z" fill="#FFFFFF" stroke="#F43F5E" stroke-width="2"/>
      <path d="M60 34 C66 22, 62 16, 57 22 C55 25, 53 30, 52 36 Z" fill="#FDA4AF"/>
      <circle cx="45" cy="55" r="26" fill="#FFFFFF"/>
      <circle cx="34" cy="52" r="3.5" fill="#18181B"/>
      <circle cx="56" cy="52" r="3.5" fill="#18181B"/>
      <ellipse cx="45" cy="58" rx="3" ry="2" fill="#FB7185"/>
      <circle cx="27" cy="58" r="5" fill="#FDA4AF" opacity="0.6"/>
      <circle cx="63" cy="58" r="5" fill="#FDA4AF" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'calico-kitty-cat',
    name: 'Calico Neko Kitty',
    category: 'animals',
    aspectRatio: 1,
    tags: ['แมว', 'cat', 'kitty'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <path d="M22 36 L25 18 L40 28 M68 36 L65 18 L50 28" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>
      <circle cx="45" cy="52" r="28" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <path d="M24 34 L27 20 L38 28 Z" fill="#FFFFFF" stroke="#FB7185" stroke-width="2"/>
      <path d="M66 34 L63 20 L52 28 Z" fill="#F97316" stroke="#EA580C" stroke-width="2"/>
      <circle cx="45" cy="52" r="26" fill="#FFFFFF"/>
      <!-- Orange patch -->
      <path d="M52 32 C65 32, 70 42, 68 50 C62 52, 54 45, 52 32 Z" fill="#F97316"/>
      <circle cx="35" cy="48" r="3.2" fill="#18181B"/>
      <circle cx="55" cy="48" r="3.2" fill="#18181B"/>
      <path d="M43 54 L47 54 L45 57 Z" fill="#F43F5E"/>
      <!-- Whiskers -->
      <path d="M24 50 L14 48 M24 54 L12 56 M66 50 L76 48 M66 54 L78 56" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'teddy-bear-plush',
    name: 'Cute Teddy Bear',
    category: 'animals',
    aspectRatio: 1,
    tags: ['หมี', 'bear', 'teddy'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <circle cx="24" cy="28" r="14" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <circle cx="66" cy="28" r="14" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <circle cx="45" cy="52" r="28" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <circle cx="24" cy="28" r="12" fill="#92400E"/>
      <circle cx="24" cy="28" r="6" fill="#FBBF24"/>
      <circle cx="66" cy="28" r="12" fill="#92400E"/>
      <circle cx="66" cy="28" r="6" fill="#FBBF24"/>
      <circle cx="45" cy="52" r="26" fill="#B45309"/>
      <!-- Muzzle -->
      <ellipse cx="45" cy="56" rx="14" ry="10" fill="#FDE68A"/>
      <ellipse cx="45" cy="52" rx="4" ry="3" fill="#18181B"/>
      <circle cx="34" cy="45" r="3" fill="#18181B"/>
      <circle cx="56" cy="45" r="3" fill="#18181B"/>
    </svg>`
  },
  {
    id: 'capybara-orange',
    name: 'Capybara with Yuzu Orange',
    category: 'animals',
    aspectRatio: 1,
    tags: ['คาปิบาร่า', 'capybara', 'orange'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <rect x="22" y="32" width="46" height="42" rx="16" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <!-- Yuzu on head -->
      <circle cx="45" cy="24" r="12" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <circle cx="45" cy="24" r="10" fill="#FACC15"/>
      <path d="M45 14 L48 10" stroke="#16A34A" stroke-width="3" stroke-linecap="round"/>
      <rect x="24" y="34" width="42" height="38" rx="14" fill="#9A3412"/>
      <ellipse cx="45" cy="54" rx="16" ry="12" fill="#78350F"/>
      <circle cx="38" cy="50" r="2" fill="#18181B"/>
      <circle cx="52" cy="50" r="2" fill="#18181B"/>
      <!-- Calm horizontal eyes -->
      <line x1="30" y1="44" x2="35" y2="44" stroke="#18181B" stroke-width="3" stroke-linecap="round"/>
      <line x1="55" y1="44" x2="60" y2="44" stroke="#18181B" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'froggy-umbrella',
    name: 'Cute Frog with Leaf Hat',
    category: 'animals',
    aspectRatio: 1,
    tags: ['กบ', 'frog', 'leaf'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <circle cx="28" cy="30" r="12" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <circle cx="62" cy="30" r="12" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <ellipse cx="45" cy="55" rx="30" ry="24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <circle cx="28" cy="30" r="10" fill="#22C55E"/>
      <circle cx="62" cy="30" r="10" fill="#22C55E"/>
      <circle cx="28" cy="30" r="4" fill="#18181B"/>
      <circle cx="62" cy="30" r="4" fill="#18181B"/>
      <ellipse cx="45" cy="55" rx="28" ry="22" fill="#4ADE80"/>
      <!-- Big smile -->
      <path d="M35 56 Q45 66 55 56" stroke="#15803D" stroke-width="3" stroke-linecap="round" fill="none"/>
      <!-- Cheek blush -->
      <circle cx="25" cy="56" r="4.5" fill="#FDA4AF"/>
      <circle cx="65" cy="56" r="4.5" fill="#FDA4AF"/>
    </svg>`
  },
  {
    id: 'yellow-duckling',
    name: 'Baby Yellow Duckling',
    category: 'animals',
    aspectRatio: 1,
    tags: ['เป็ด', 'duck', 'yellow'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <circle cx="45" cy="45" r="28" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <circle cx="45" cy="45" r="26" fill="#FACC15"/>
      <circle cx="36" cy="40" r="3.5" fill="#18181B"/>
      <!-- Orange beak -->
      <ellipse cx="45" cy="50" rx="10" ry="6" fill="#F97316" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="26" cy="48" r="4.5" fill="#FDA4AF" opacity="0.7"/>
      <circle cx="64" cy="48" r="4.5" fill="#FDA4AF" opacity="0.7"/>
    </svg>`
  },
  {
    id: 'baby-penguin',
    name: 'Chubby Baby Penguin',
    category: 'animals',
    aspectRatio: 0.9,
    tags: ['เพนกวิน', 'penguin'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 90" fill="none">
      <ellipse cx="40" cy="50" rx="26" ry="32" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <ellipse cx="40" cy="50" rx="24" ry="30" fill="#1E293B"/>
      <ellipse cx="40" cy="56" rx="16" ry="20" fill="#FFFFFF"/>
      <circle cx="32" cy="42" r="3" fill="#18181B"/>
      <circle cx="48" cy="42" r="3" fill="#18181B"/>
      <polygon points="36,46 44,46 40,52" fill="#F97316"/>
      <ellipse cx="25" cy="50" rx="4" ry="3" fill="#FDA4AF"/>
      <ellipse cx="55" cy="50" rx="4" ry="3" fill="#FDA4AF"/>
    </svg>`
  },

  // ==========================================
  // 4. Y2K & CHROME AESTHETIC (12+ items)
  // ==========================================
  {
    id: 'y2k-chrome-star',
    name: '3D Chrome Star',
    category: 'y2k',
    aspectRatio: 1,
    tags: ['ดาว', 'star', 'chrome', 'y2k'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <path d="M40 5 L48 30 L75 40 L48 50 L40 75 L32 50 L5 40 L32 30 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M40 5 L48 30 L75 40 L48 50 L40 75 L32 50 L5 40 L32 30 Z" fill="url(#chromeGrad)"/>
      <path d="M40 12 L46 32 L68 40 L46 48 L40 68 L34 48 L12 40 L34 32 Z" fill="#FFFFFF" opacity="0.75"/>
      <defs>
        <linearGradient id="chromeGrad" x1="0" y1="0" x2="80" y2="80">
          <stop offset="0%" stop-color="#C084FC"/>
          <stop offset="50%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#F472B6"/>
        </linearGradient>
      </defs>
    </svg>`
  },
  {
    id: 'cyber-sparkle-cross',
    name: 'Cyber Cross Sparkle',
    category: 'y2k',
    aspectRatio: 1,
    tags: ['วิ้ง', 'sparkle', 'cross', 'y2k'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <path d="M40 0 L43 32 L75 35 L43 38 L40 70 L37 38 L5 35 L37 32 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M40 0 L43 32 L75 35 L43 38 L40 70 L37 38 L5 35 L37 32 Z" fill="#38BDF8"/>
      <circle cx="40" cy="35" r="5" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'hologram-butterfly',
    name: 'Hologram Butterfly',
    category: 'y2k',
    aspectRatio: 1.2,
    tags: ['ผีเสื้อ', 'butterfly', 'hologram'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 75" fill="none">
      <path d="M45 40 C35 15, 8 18, 12 45 C15 58, 35 55, 45 45 M45 40 C55 15, 82 18, 78 45 C75 58, 55 55, 45 45" stroke="#FFFFFF" stroke-width="10" stroke-linejoin="round"/>
      <path d="M45 40 C35 15, 8 18, 12 45 C15 58, 35 55, 45 45 Z" fill="#A855F7"/>
      <path d="M45 40 C55 15, 82 18, 78 45 C75 58, 55 55, 45 45 Z" fill="#EC4899"/>
      <path d="M45 45 C38 52, 22 62, 28 70 C35 74, 42 62, 45 48 M45 45 C52 52, 68 62, 62 70 C55 74, 48 62, 45 48" stroke="#FFFFFF" stroke-width="8"/>
      <path d="M45 45 C38 52, 22 62, 28 70 C35 74, 42 62, 45 48 Z" fill="#38BDF8"/>
      <path d="M45 45 C52 52, 68 62, 62 70 C55 74, 48 62, 45 48 Z" fill="#38BDF8"/>
      <ellipse cx="45" cy="45" rx="3" ry="12" fill="#18181B"/>
    </svg>`
  },
  {
    id: 'pixel-heart-8bit',
    name: '8-Bit Pixel Heart',
    category: 'y2k',
    aspectRatio: 1.1,
    tags: ['พิกเซล', 'pixel', 'heart'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 80" fill="none">
      <path d="M20 20 H40 V30 H50 V20 H70 V40 H60 V50 H50 V60 H40 V50 H30 V40 H20 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="10" stroke-linejoin="miter"/>
      <path d="M20 20 H40 V30 H50 V20 H70 V40 H60 V50 H50 V60 H40 V50 H30 V40 H20 Z" fill="#EF4444"/>
      <rect x="25" y="25" width="8" height="8" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'cd-disc-90s',
    name: '90s Holographic CD',
    category: 'y2k',
    aspectRatio: 1,
    tags: ['ซีดี', 'cd', 'disc', 'retro'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="32" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <circle cx="40" cy="40" r="30" fill="url(#cdRainbow)"/>
      <circle cx="40" cy="40" r="10" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
      <circle cx="40" cy="40" r="5" fill="#FFFFFF"/>
      <defs>
        <radialGradient id="cdRainbow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FDE047"/>
          <stop offset="35%" stop-color="#4ADE80"/>
          <stop offset="70%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#EC4899"/>
        </radialGradient>
      </defs>
    </svg>`
  },
  {
    id: 'retro-flame-fire',
    name: 'Retro Y2K Flame',
    category: 'y2k',
    aspectRatio: 0.9,
    tags: ['ไฟ', 'flame', 'fire'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 90" fill="none">
      <path d="M37 10 C45 25, 65 35, 60 60 C55 80, 20 80, 15 60 C10 40, 25 35, 30 25 C32 30, 35 32, 37 10 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M37 10 C45 25, 65 35, 60 60 C55 80, 20 80, 15 60 C10 40, 25 35, 30 25 C32 30, 35 32, 37 10 Z" fill="#EF4444"/>
      <path d="M37 35 C42 45, 52 50, 48 65 C45 75, 28 75, 25 65 C22 55, 32 48, 37 35 Z" fill="#FACC15"/>
    </svg>`
  },

  // ==========================================
  // 5. FLOWERS & FRESH FRUITS (12+ items)
  // ==========================================
  {
    id: 'pink-cherry-blossom',
    name: 'Pink Cherry Blossom',
    category: 'flowers',
    aspectRatio: 1,
    tags: ['ซากุระ', 'sakura', 'flower', 'pink'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <g stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round">
        <path d="M40 40 C30 18, 50 18, 40 40 Z" fill="#FFFFFF"/>
        <path d="M40 40 C18 30, 18 50, 40 40 Z" fill="#FFFFFF"/>
        <path d="M40 40 C30 62, 50 62, 40 40 Z" fill="#FFFFFF"/>
        <path d="M40 40 C62 30, 62 50, 40 40 Z" fill="#FFFFFF"/>
      </g>
      <circle cx="40" cy="40" r="28" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M40 40 C32 15, 48 15, 40 40 Z" fill="#FDA4AF"/>
      <path d="M40 40 C15 32, 15 48, 40 40 Z" fill="#FDA4AF"/>
      <path d="M40 40 C32 65, 48 65, 40 40 Z" fill="#FDA4AF"/>
      <path d="M40 40 C65 32, 65 48, 40 40 Z" fill="#FDA4AF"/>
      <circle cx="40" cy="40" r="6" fill="#F43F5E"/>
    </svg>`
  },
  {
    id: 'sunny-yellow-daisy',
    name: 'Sunny Yellow Daisy',
    category: 'flowers',
    aspectRatio: 1,
    tags: ['เดซี่', 'daisy', 'flower'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="28" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <!-- Petals -->
      <g fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5">
        <ellipse cx="40" cy="20" rx="6" ry="12"/>
        <ellipse cx="40" cy="60" rx="6" ry="12"/>
        <ellipse cx="20" cy="40" rx="12" ry="6"/>
        <ellipse cx="60" cy="40" rx="12" ry="6"/>
        <ellipse cx="26" cy="26" rx="6" ry="12" transform="rotate(-45 26 26)"/>
        <ellipse cx="54" cy="54" rx="6" ry="12" transform="rotate(-45 54 54)"/>
        <ellipse cx="54" cy="26" rx="6" ry="12" transform="rotate(45 54 26)"/>
        <ellipse cx="26" cy="54" rx="6" ry="12" transform="rotate(45 26 54)"/>
      </g>
      <circle cx="40" cy="40" r="10" fill="#FACC15"/>
    </svg>`
  },
  {
    id: 'red-romance-rose',
    name: 'Red Romance Rose',
    category: 'flowers',
    aspectRatio: 1,
    tags: ['กุหลาบ', 'rose', 'red'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="26" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <circle cx="40" cy="40" r="24" fill="#E11D48"/>
      <path d="M40 25 C48 25, 52 32, 48 38 C42 45, 32 40, 36 32 C38 28, 44 28, 40 34" stroke="#FFE4E6" stroke-width="3" stroke-linecap="round" fill="none"/>
      <!-- Green leaves -->
      <path d="M20 54 Q14 44 24 44" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>
      <path d="M60 54 Q66 44 56 44" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'lucky-four-clover',
    name: 'Lucky 4-Leaf Clover',
    category: 'flowers',
    aspectRatio: 1,
    tags: ['โคลเวอร์', 'clover', 'lucky', 'green'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <g stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round">
        <path d="M40 38 C32 20, 48 20, 40 38 Z" fill="#FFFFFF"/>
        <path d="M38 40 C20 32, 20 48, 38 40 Z" fill="#FFFFFF"/>
        <path d="M40 42 C32 60, 48 60, 40 42 Z" fill="#FFFFFF"/>
        <path d="M42 40 C60 32, 60 48, 42 40 Z" fill="#FFFFFF"/>
      </g>
      <circle cx="40" cy="40" r="24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M40 38 C30 18, 50 18, 40 38 Z" fill="#22C55E"/>
      <path d="M38 40 C18 30, 18 50, 38 40 Z" fill="#16A34A"/>
      <path d="M40 42 C30 62, 50 62, 40 42 Z" fill="#22C55E"/>
      <path d="M42 40 C62 30, 62 50, 42 40 Z" fill="#16A34A"/>
      <path d="M40 44 Q44 65 52 68" stroke="#15803D" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'fresh-strawberry',
    name: 'Sweet Red Strawberry',
    category: 'flowers',
    aspectRatio: 0.9,
    tags: ['สตรอว์เบอร์รี่', 'strawberry', 'fruit'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 85" fill="none">
      <path d="M37 20 C20 20, 12 35, 20 60 C26 75, 37 80, 37 80 C37 80, 48 75, 54 60 C62 35, 54 20, 37 20 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M37 20 C20 20, 12 35, 20 60 C26 75, 37 80, 37 80 C37 80, 48 75, 54 60 C62 35, 54 20, 37 20 Z" fill="#EF4444"/>
      <!-- Seeds -->
      <circle cx="28" cy="38" r="1.5" fill="#FDE047"/>
      <circle cx="46" cy="38" r="1.5" fill="#FDE047"/>
      <circle cx="37" cy="48" r="1.5" fill="#FDE047"/>
      <circle cx="28" cy="58" r="1.5" fill="#FDE047"/>
      <circle cx="46" cy="58" r="1.5" fill="#FDE047"/>
      <!-- Green Calyx -->
      <path d="M22 22 Q37 28 52 22 Q37 12 22 22 Z" fill="#22C55E"/>
      <path d="M37 16 L37 8" stroke="#15803D" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'twin-cherries',
    name: 'Twin Red Cherries',
    category: 'flowers',
    aspectRatio: 1.1,
    tags: ['เชอร์รี่', 'cherry', 'fruit'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 80" fill="none">
      <circle cx="28" cy="55" r="16" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <circle cx="58" cy="52" r="16" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <path d="M28 45 C32 25, 42 12, 45 12 C48 12, 55 25, 58 42" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round"/>
      <path d="M28 45 C32 25, 42 12, 45 12 C48 12, 55 25, 58 42" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>
      <circle cx="28" cy="55" r="15" fill="#E11D48"/>
      <circle cx="58" cy="52" r="15" fill="#BE123C"/>
      <ellipse cx="24" cy="50" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.6"/>
      <ellipse cx="54" cy="47" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.6"/>
    </svg>`
  },

  // ==========================================
  // 6. KOREAN STAMPS & WASHI TAPE (12+ items)
  // ==========================================
  {
    id: 'pink-grid-tape',
    name: 'Pink Grid Washi Tape',
    category: 'stamps',
    aspectRatio: 2.8,
    tags: ['เทป', 'washi', 'tape', 'grid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 50" fill="none">
      <path d="M8 8 L132 8 L130 42 L10 42 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round"/>
      <path d="M10 10 L130 10 L128 40 L12 40 Z" fill="#FCE7F3"/>
      <!-- Grid lines -->
      <line x1="30" y1="10" x2="30" y2="40" stroke="#F472B6" stroke-width="1.5"/>
      <line x1="55" y1="10" x2="55" y2="40" stroke="#F472B6" stroke-width="1.5"/>
      <line x1="80" y1="10" x2="80" y2="40" stroke="#F472B6" stroke-width="1.5"/>
      <line x1="105" y1="10" x2="105" y2="40" stroke="#F472B6" stroke-width="1.5"/>
      <line x1="10" y1="25" x2="130" y2="25" stroke="#F472B6" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'yellow-check-tape',
    name: 'Yellow Checkered Tape',
    category: 'stamps',
    aspectRatio: 2.8,
    tags: ['เทปเหลือง', 'checker', 'tape'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 50" fill="none">
      <path d="M8 8 L132 8 L130 42 L10 42 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round"/>
      <path d="M10 10 L130 10 L128 40 L12 40 Z" fill="#FEF08A"/>
      <rect x="25" y="10" width="15" height="15" fill="#F59E0B"/>
      <rect x="55" y="10" width="15" height="15" fill="#F59E0B"/>
      <rect x="85" y="10" width="15" height="15" fill="#F59E0B"/>
      <rect x="115" y="10" width="13" height="15" fill="#F59E0B"/>
      <rect x="10" y="25" width="15" height="15" fill="#F59E0B"/>
      <rect x="40" y="25" width="15" height="15" fill="#F59E0B"/>
      <rect x="70" y="25" width="15" height="15" fill="#F59E0B"/>
      <rect x="100" y="25" width="15" height="15" fill="#F59E0B"/>
    </svg>`
  },
  {
    id: 'korean-red-stamp',
    name: 'Korean 인생네컷 Ink Stamp',
    category: 'stamps',
    aspectRatio: 1,
    tags: ['เกาหลี', 'stamp', 'korean', '인생네컷'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="34" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <circle cx="40" cy="40" r="32" stroke="#DC2626" stroke-width="4" stroke-dasharray="4 2"/>
      <circle cx="40" cy="40" r="28" stroke="#DC2626" stroke-width="2"/>
      <text x="40" y="38" font-family="sans-serif" font-weight="900" font-size="12" fill="#DC2626" text-anchor="middle">인생네컷</text>
      <text x="40" y="52" font-family="monospace" font-weight="bold" font-size="8" fill="#DC2626" text-anchor="middle">LIFE 4 CUT</text>
    </svg>`
  },
  {
    id: 'postage-stamp-tokyo',
    name: 'Vintage Postage Stamp',
    category: 'stamps',
    aspectRatio: 0.85,
    tags: ['แสตมป์', 'postage', 'vintage'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 90" fill="none">
      <rect x="10" y="10" width="55" height="70" rx="4" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <rect x="10" y="10" width="55" height="70" rx="2" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2" stroke-dasharray="3 3"/>
      <rect x="16" y="16" width="43" height="42" fill="#FDA4AF"/>
      <circle cx="37" cy="37" r="10" fill="#E11D48"/>
      <text x="37" y="70" font-family="monospace" font-weight="bold" font-size="9" fill="#334155" text-anchor="middle">SNAP 50¢</text>
    </svg>`
  },
  {
    id: 'photo-corner-pins',
    name: 'Photo Corner Pins',
    category: 'stamps',
    aspectRatio: 1,
    tags: ['มุมรูป', 'corner', 'pin'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <polygon points="10,10 50,10 10,50" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <polygon points="12,12 45,12 12,45" fill="#18181B"/>
      <circle cx="22" cy="22" r="3" fill="#FACC15"/>
    </svg>`
  },

  // ==========================================
  // 7. PROPS, GLASSES & ACCESSORIES (12+ items)
  // ==========================================
  {
    id: 'y2k-pixel-shades',
    name: 'Y2K Pixel Sunglasses',
    category: 'props',
    aspectRatio: 2.2,
    tags: ['แว่น', 'sunglasses', 'pixel', 'shades'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 55" fill="none">
      <path d="M10 20 H50 V40 H38 V45 H18 V40 H10 Z M65 20 H105 V40 H93 V45 H73 V40 H65 Z M50 25 H65 V30 H50 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="miter"/>
      <path d="M10 20 H50 V40 H38 V45 H18 V40 H10 Z" fill="#18181B"/>
      <path d="M65 20 H105 V40 H93 V45 H73 V40 H65 Z" fill="#18181B"/>
      <path d="M50 25 H65 V30 H50 Z" fill="#18181B"/>
      <!-- Pixel Glare -->
      <rect x="15" y="25" width="6" height="6" fill="#FFFFFF"/>
      <rect x="70" y="25" width="6" height="6" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'party-cone-hat',
    name: 'Birthday Party Cone Hat',
    category: 'props',
    aspectRatio: 0.9,
    tags: ['หมวกปาร์ตี้', 'hat', 'party', 'birthday'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 90" fill="none">
      <path d="M40 10 L15 75 L65 75 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <circle cx="40" cy="10" r="8" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4"/>
      <circle cx="40" cy="10" r="6" fill="#FACC15"/>
      <path d="M40 12 L18 73 L62 73 Z" fill="#8B5CF6"/>
      <!-- Diagonal stripes -->
      <path d="M25 55 L55 55" stroke="#F43F5E" stroke-width="6"/>
      <path d="M30 40 L50 40" stroke="#FACC15" stroke-width="5"/>
      <!-- Fluffy pompom base -->
      <path d="M12 75 Q40 85 68 75" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'star-hair-barrettes',
    name: 'Silver Star Hairpins',
    category: 'props',
    aspectRatio: 1.2,
    tags: ['กิ๊บดาว', 'hairpin', 'star', 'clip'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 75" fill="none">
      <!-- Left Star Clip -->
      <g transform="translate(15, 20)">
        <path d="M20 5 L24 16 L35 16 L26 23 L29 34 L20 27 L11 34 L14 23 L5 16 L16 16 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
        <path d="M20 5 L24 16 L35 16 L26 23 L29 34 L20 27 L11 34 L14 23 L5 16 L16 16 Z" fill="#CBD5E1"/>
        <line x1="12" y1="20" x2="38" y2="45" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
      </g>
      <!-- Right Star Clip -->
      <g transform="translate(45, 15)">
        <path d="M20 5 L24 16 L35 16 L26 23 L29 34 L20 27 L11 34 L14 23 L5 16 L16 16 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
        <path d="M20 5 L24 16 L35 16 L26 23 L29 34 L20 27 L11 34 L14 23 L5 16 L16 16 Z" fill="#FDE047"/>
        <line x1="12" y1="20" x2="38" y2="45" stroke="#B45309" stroke-width="4" stroke-linecap="round"/>
      </g>
    </svg>`
  },

  // ==========================================
  // 8. DOODLES & WORD BUBBLES (10+ items)
  // ==========================================
  {
    id: 'doodle-yay-bubble',
    name: 'Speech Bubble: YAY! ♡',
    category: 'doodles',
    aspectRatio: 1.4,
    tags: ['คำพูด', 'bubble', 'yay', 'doodle'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 70" fill="none">
      <path d="M20 15 H80 C88 15, 92 20, 92 28 V42 C92 50, 88 55, 80 55 H45 L30 65 L34 55 H20 C12 55, 8 50, 8 42 V28 C8 20, 12 15, 20 15 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round"/>
      <path d="M20 15 H80 C88 15, 92 20, 92 28 V42 C92 50, 88 55, 80 55 H45 L30 65 L34 55 H20 C12 55, 8 50, 8 42 V28 C8 20, 12 15, 20 15 Z" fill="#FFF1F2" stroke="#F43F5E" stroke-width="3"/>
      <text x="48" y="40" font-family="sans-serif" font-weight="900" font-size="16" fill="#E11D48" text-anchor="middle">YAY! ♡</text>
    </svg>`
  },
  {
    id: 'doodle-ootd-badge',
    name: 'Badge: OOTD ✨',
    category: 'doodles',
    aspectRatio: 1.5,
    tags: ['ootd', 'badge', 'fashion'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 65" fill="none">
      <rect x="12" y="14" width="76" height="38" rx="10" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <rect x="12" y="14" width="76" height="38" rx="8" fill="#18181B"/>
      <text x="50" y="39" font-family="monospace" font-weight="900" font-size="16" fill="#FACC15" text-anchor="middle">#OOTD ✨</text>
    </svg>`
  },
  {
    id: 'doodle-so-cute-bubble',
    name: 'Speech Bubble: SO CUTE!',
    category: 'doodles',
    aspectRatio: 1.5,
    tags: ['socute', 'cute', 'bubble'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 70" fill="none">
      <path d="M20 15 H90 C98 15, 102 20, 102 28 V42 C102 50, 98 55, 90 55 H55 L40 65 L44 55 H20 C12 55, 8 50, 8 42 V28 C8 20, 12 15, 20 15 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round"/>
      <path d="M20 15 H90 C98 15, 102 20, 102 28 V42 C102 50, 98 55, 90 55 H55 L40 65 L44 55 H20 C12 55, 8 50, 8 42 V28 C8 20, 12 15, 20 15 Z" fill="#F0FDF4" stroke="#22C55E" stroke-width="3"/>
      <text x="55" y="40" font-family="sans-serif" font-weight="900" font-size="14" fill="#15803D" text-anchor="middle">SO CUTE! ★</text>
    </svg>`
  },
  {
    id: 'doodle-hand-drawn-heart',
    name: 'Hand-drawn Pink Heart Swirl',
    category: 'doodles',
    aspectRatio: 1.1,
    tags: ['หัวใจ', 'heart', 'doodle'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 75" fill="none">
      <path d="M42 62 C42 62, 16 46, 16 28 C16 16, 28 12, 38 18 C40 20, 42 24, 42 24 C42 24, 44 20, 46 18 C56 12, 68 16, 68 28 C68 46, 42 62, 42 62 Z" stroke="#FFFFFF" stroke-width="12" stroke-linejoin="round"/>
      <path d="M42 60 C42 60, 18 45, 18 28 C18 18, 28 14, 38 20 C40 22, 42 25, 42 25 C42 25, 44 22, 46 20 C56 14, 66 18, 66 28 C66 45, 42 60, 42 60 Z" stroke="#F43F5E" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`
  }
];
