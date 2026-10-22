// Illustrated photobooth vector stickers with die-cut white outline & drop shadow

export interface GraphicSticker {
  id: string;
  name: string;
  category: 'kawaii' | 'ribbons' | 'y2k' | 'tapes' | 'stamps' | 'food';
  svg: string; // Valid clean SVG string
  aspectRatio: number; // width / height
}

export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const ILLUSTRATED_STICKERS: GraphicSticker[] = [
  // 1. RIBBONS & BOWS
  {
    id: 'kawaii-pink-bow',
    name: 'Pink Satin Bow',
    category: 'ribbons',
    aspectRatio: 1.3,
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
    id: 'kawaii-lilac-bow',
    name: 'Lilac Silk Ribbon',
    category: 'ribbons',
    aspectRatio: 1.3,
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

  // 2. KAWAII ANIMALS & FACES
  {
    id: 'kawaii-bunny-face',
    name: 'Fluffy White Bunny',
    category: 'kawaii',
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <!-- White die cut -->
      <path d="M28 35 C15 15, 25 2, 35 15 C40 22, 42 32, 45 42 C48 32, 50 22, 55 15 C65 2, 75 15, 62 35" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>
      <circle cx="45" cy="55" r="28" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <!-- Ears -->
      <path d="M30 38 C20 18, 26 8, 34 18 C38 24, 40 32, 42 42 Z" fill="#FFFFFF" stroke="#F43F5E" stroke-width="2"/>
      <path d="M30 34 C24 22, 28 16, 33 22 C35 25, 37 30, 38 36 Z" fill="#FDA4AF"/>
      <path d="M60 38 C70 18, 64 8, 56 18 C52 24, 50 32, 48 42 Z" fill="#FFFFFF" stroke="#F43F5E" stroke-width="2"/>
      <path d="M60 34 C66 22, 62 16, 57 22 C55 25, 53 30, 52 36 Z" fill="#FDA4AF"/>
      <!-- Face -->
      <circle cx="45" cy="55" r="26" fill="#FFFFFF" stroke="#E4E4E7" stroke-width="1.5"/>
      <circle cx="36" cy="52" r="3.5" fill="#18181B"/>
      <circle cx="54" cy="52" r="3.5" fill="#18181B"/>
      <circle cx="37" cy="51" r="1.2" fill="#FFFFFF"/>
      <circle cx="55" cy="51" r="1.2" fill="#FFFFFF"/>
      <!-- Cheeks & Nose -->
      <circle cx="30" cy="58" r="5" fill="#FDA4AF" opacity="0.7"/>
      <circle cx="60" cy="58" r="5" fill="#FDA4AF" opacity="0.7"/>
      <ellipse cx="45" cy="57" rx="2.5" ry="1.8" fill="#F43F5E"/>
      <path d="M42 61 Q45 64 48 61" stroke="#F43F5E" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'kawaii-shiba-dog',
    name: 'Happy Shiba Inu',
    category: 'kawaii',
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <!-- White die cut -->
      <circle cx="45" cy="50" r="32" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8"/>
      <!-- Ears -->
      <path d="M25 36 L18 16 Q32 20 38 32 Z" fill="#D97706" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M65 36 L72 16 Q58 20 52 32 Z" fill="#D97706" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M26 32 L22 20 Q30 22 34 30 Z" fill="#FED7AA"/>
      <path d="M64 32 L68 20 Q60 22 56 30 Z" fill="#FED7AA"/>
      <!-- Head -->
      <circle cx="45" cy="50" r="28" fill="#F59E0B"/>
      <!-- White Muzzle -->
      <ellipse cx="45" cy="58" rx="16" ry="14" fill="#FFFFFF"/>
      <circle cx="35" cy="46" r="3" fill="#18181B"/>
      <circle cx="55" cy="46" r="3" fill="#18181B"/>
      <!-- Nose & Mouth -->
      <polygon points="41,53 49,53 45,58" fill="#18181B"/>
      <path d="M40 60 Q45 64 50 60" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="30" cy="54" rx="4" ry="2.5" fill="#FDA4AF"/>
      <ellipse cx="60" cy="54" rx="4" ry="2.5" fill="#FDA4AF"/>
    </svg>`
  },
  {
    id: 'kawaii-cat-whiskers',
    name: 'Cat Nose & Whiskers',
    category: 'kawaii',
    aspectRatio: 1.6,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70" fill="none">
      <g stroke="#FFFFFF" stroke-width="9" stroke-linecap="round">
        <path d="M20 28 L48 34"/>
        <path d="M18 42 L48 40"/>
        <path d="M72 34 L100 28"/>
        <path d="M72 40 L102 42"/>
        <circle cx="60" cy="35" r="8"/>
      </g>
      <g stroke="#F43F5E" stroke-width="3.5" stroke-linecap="round">
        <path d="M20 28 L48 34"/>
        <path d="M18 42 L48 40"/>
        <path d="M72 34 L100 28"/>
        <path d="M72 40 L102 42"/>
      </g>
      <path d="M54 32 Q60 30 66 32 Q60 40 54 32 Z" fill="#FB7185"/>
      <circle cx="48" cy="45" r="6" fill="#FDA4AF" opacity="0.6"/>
      <circle cx="72" cy="45" r="6" fill="#FDA4AF" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'kawaii-glossy-heart',
    name: 'Glossy 3D Heart',
    category: 'kawaii',
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="heartGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FDA4AF"/>
          <stop offset="40%" stop-color="#F43F5E"/>
          <stop offset="100%" stop-color="#BE123C"/>
        </radialGradient>
      </defs>
      <path d="M50 85 C25 65, 8 45, 12 25 C16 8, 38 8, 50 25 C62 8, 84 8, 88 25 C92 45, 75 65, 50 85 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M50 85 C25 65, 8 45, 12 25 C16 8, 38 8, 50 25 C62 8, 84 8, 88 25 C92 45, 75 65, 50 85 Z" fill="url(#heartGrad)"/>
      <ellipse cx="32" cy="24" rx="10" ry="6" transform="rotate(-30 32 24)" fill="#FFFFFF" opacity="0.6"/>
      <circle cx="23" cy="33" r="3" fill="#FFFFFF" opacity="0.5"/>
    </svg>`
  },

  // 3. KAWAII FOODS & DRINKS
  {
    id: 'food-strawberry-cake',
    name: 'Strawberry Shortcake',
    category: 'food',
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <path d="M15 70 L75 70 L70 42 L20 42 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <!-- Cake base -->
      <path d="M18 68 L72 68 L68 45 L22 45 Z" fill="#FED7AA"/>
      <!-- Cream filling -->
      <rect x="20" y="54" width="50" height="5" fill="#FFFFFF"/>
      <circle cx="30" cy="56" r="3" fill="#F43F5E"/>
      <circle cx="60" cy="56" r="3" fill="#F43F5E"/>
      <!-- Top Cream Swirls -->
      <circle cx="28" cy="42" r="7" fill="#FFFFFF"/>
      <circle cx="45" cy="40" r="8" fill="#FFFFFF"/>
      <circle cx="62" cy="42" r="7" fill="#FFFFFF"/>
      <!-- Big Strawberry on top -->
      <path d="M45 18 C38 18, 34 26, 38 34 C42 40, 45 42, 45 42 C45 42, 48 40, 52 34 C56 26, 52 18, 45 18 Z" fill="#E11D48" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="41" cy="28" r="1" fill="#FEF08A"/>
      <circle cx="48" cy="30" r="1" fill="#FEF08A"/>
      <circle cx="44" cy="35" r="1" fill="#FEF08A"/>
      <!-- Green Leaf -->
      <path d="M40 18 Q45 12 50 18 Q45 22 40 18 Z" fill="#16A34A"/>
    </svg>`
  },
  {
    id: 'food-boba-cup',
    name: 'Iced Boba Milk Tea',
    category: 'food',
    aspectRatio: 0.8,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 100" fill="none">
      <!-- White die cut -->
      <path d="M22 28 L58 28 L52 85 L28 85 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <!-- Straw -->
      <rect x="42" y="5" width="8" height="35" rx="3" fill="#F43F5E" stroke="#FFFFFF" stroke-width="3"/>
      <!-- Cup Body -->
      <path d="M22 28 L58 28 L52 85 L28 85 Z" fill="#D97706" fill-opacity="0.25" stroke="#FFFFFF" stroke-width="2"/>
      <!-- Milk Tea Liquid -->
      <path d="M24 40 L56 40 L51 83 L29 83 Z" fill="#D97706" opacity="0.6"/>
      <!-- Tapioca Pearls -->
      <g fill="#18181B">
        <circle cx="34" cy="76" r="4"/><circle cx="42" cy="78" r="4.2"/>
        <circle cx="48" cy="74" r="3.8"/><circle cx="37" cy="70" r="3.5"/>
        <circle cx="44" cy="69" r="4"/>
      </g>
      <!-- Cup Lid -->
      <ellipse cx="40" cy="28" rx="19" ry="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'food-soft-icecream',
    name: 'Soft Serve Swirl',
    category: 'food',
    aspectRatio: 0.8,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 100" fill="none">
      <!-- White die cut -->
      <path d="M25 55 L55 55 L40 92 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <!-- Waffle Cone -->
      <polygon points="25,55 55,55 40,92" fill="#D97706"/>
      <path d="M27 62 L51 68 M30 72 L47 78 M34 82 L43 86" stroke="#B45309" stroke-width="1.5"/>
      <!-- Ice Cream Swirls -->
      <circle cx="40" cy="50" r="18" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M22 52 C20 40, 60 40, 58 52 Z" fill="#FDA4AF"/>
      <path d="M26 42 C24 30, 56 30, 54 42 Z" fill="#FFF1F2"/>
      <path d="M30 32 C30 20, 50 20, 48 32 Z" fill="#FB7185"/>
      <path d="M36 22 C36 12, 44 12, 42 22 Z" fill="#FDA4AF"/>
      <!-- Cherry on top -->
      <circle cx="40" cy="12" r="5" fill="#E11D48"/>
    </svg>`
  },

  // 4. Y2K & CYBER VIBES
  {
    id: 'y2k-chrome-star',
    name: 'Y2K Cyber Star',
    category: 'y2k',
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E0E7FF"/>
          <stop offset="35%" stop-color="#A5B4FC"/>
          <stop offset="65%" stop-color="#818CF8"/>
          <stop offset="100%" stop-color="#C084FC"/>
        </linearGradient>
      </defs>
      <path d="M50 5 Q52 40 95 50 Q52 60 50 95 Q48 60 5 50 Q48 40 50 5 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <path d="M50 5 Q52 40 95 50 Q52 60 50 95 Q48 60 5 50 Q48 40 50 5 Z" fill="url(#chromeGrad)"/>
      <path d="M50 20 L50 80 M20 50 L80 50" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      <circle cx="50" cy="50" r="4" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'y2k-pixel-shades',
    name: 'Pixel Thug Shades',
    category: 'y2k',
    aspectRatio: 2.2,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 50" fill="none">
      <rect x="10" y="15" width="90" height="20" fill="#FFFFFF" rx="4"/>
      <rect x="14" y="18" width="38" height="15" fill="#18181B"/>
      <rect x="58" y="18" width="38" height="15" fill="#18181B"/>
      <rect x="50" y="21" width="10" height="4" fill="#18181B"/>
      <rect x="18" y="20" width="5" height="4" fill="#FFFFFF"/>
      <rect x="23" y="24" width="5" height="4" fill="#FFFFFF"/>
      <rect x="62" y="20" width="5" height="4" fill="#FFFFFF"/>
      <rect x="67" y="24" width="5" height="4" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'y2k-holo-butterfly',
    name: 'Hologram Butterfly',
    category: 'y2k',
    aspectRatio: 1.2,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" fill="none">
      <!-- White die cut -->
      <path d="M50 40 C35 15, 8 18, 12 45 C15 62, 38 65, 50 48 C62 65, 85 62, 88 45 C92 18, 65 15, 50 40 Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>
      <!-- Left Upper Wing -->
      <path d="M50 40 C35 12, 10 18, 14 42 C18 58, 42 50, 50 45 Z" fill="#A855F7"/>
      <path d="M48 40 C36 20, 20 22, 22 40 Z" fill="#38BDF8"/>
      <!-- Right Upper Wing -->
      <path d="M50 40 C65 12, 90 18, 86 42 C82 58, 58 50, 50 45 Z" fill="#EC4899"/>
      <path d="M52 40 C64 20, 80 22, 78 40 Z" fill="#FDE047"/>
      <!-- Body & Antenna -->
      <ellipse cx="50" cy="42" rx="3.5" ry="14" fill="#18181B"/>
      <path d="M48 30 C45 22, 38 20, 36 22 M52 30 C55 22, 62 20, 64 22" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'y2k-vinyl-cd',
    name: 'Retro CD Album',
    category: 'y2k',
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
      <!-- White die cut -->
      <circle cx="45" cy="45" r="40" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <!-- CD Disc -->
      <circle cx="45" cy="45" r="37" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <!-- Iridescent rainbow slice -->
      <path d="M45 45 L78 26 A37 37 0 0 1 82 45 Z" fill="#FDA4AF" opacity="0.6"/>
      <path d="M45 45 L82 45 A37 37 0 0 1 76 64 Z" fill="#FDE047" opacity="0.6"/>
      <path d="M45 45 L12 45 A37 37 0 0 1 18 26 Z" fill="#38BDF8" opacity="0.6"/>
      <path d="M45 45 L18 26 A37 37 0 0 1 35 10 Z" fill="#A855F7" opacity="0.6"/>
      <!-- Center Hole -->
      <circle cx="45" cy="45" r="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
      <circle cx="45" cy="45" r="6" fill="#18181B"/>
    </svg>`
  },

  // 5. TAPES, CLIPS & ACCESSORIES
  {
    id: 'tape-pink-grid',
    name: 'Washi Tape Pastel',
    category: 'tapes',
    aspectRatio: 3,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" fill="none">
      <defs>
        <pattern id="washiGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(244,63,94,0.3)" stroke-width="1"/>
        </pattern>
      </defs>
      <path d="M5 5 L115 5 L112 10 L116 15 L113 20 L117 25 L114 30 L115 35 L5 35 L7 30 L4 25 L8 20 L5 15 L8 10 Z" fill="#FFE4E6" stroke="#FFFFFF" stroke-width="3" opacity="0.95"/>
      <path d="M5 5 L115 5 L112 10 L116 15 L113 20 L117 25 L114 30 L115 35 L5 35 L7 30 L4 25 L8 20 L5 15 L8 10 Z" fill="url(#washiGrid)"/>
      <text x="60" y="24" text-anchor="middle" font-family="monospace" font-size="9" font-weight="bold" fill="#E11D48" letter-spacing="1">♡ SNAPBOOTH ♡</text>
    </svg>`
  },
  {
    id: 'tape-silver-clip',
    name: 'Silver Paperclip',
    category: 'tapes',
    aspectRatio: 0.5,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 80" fill="none">
      <path d="M12 25 L12 60 C12 70, 28 70, 28 60 L28 15 C28 5, 8 5, 8 15 L8 50 C8 56, 20 56, 20 50 L20 22" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/>
      <path d="M12 25 L12 60 C12 70, 28 70, 28 60 L28 15 C28 5, 8 5, 8 15 L8 50 C8 56, 20 56, 20 50 L20 22" stroke="#94A3B8" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M12 25 L12 60 C12 70, 28 70, 28 60 L28 15 C28 5, 8 5, 8 15 L8 50 C8 56, 20 56, 20 50 L20 22" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'tape-heart-pin',
    name: 'Heart Safety Pin',
    category: 'tapes',
    aspectRatio: 1.5,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 50" fill="none">
      <ellipse cx="60" cy="25" rx="14" ry="14" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M15 25 L55 15 M15 25 L55 35" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
      <path d="M15 25 L55 15 M15 25 L55 35" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/>
      <path d="M60 15 C55 10, 48 12, 50 18 L60 28 L70 18 C72 12, 65 10, 60 15 Z" fill="#F43F5E"/>
    </svg>`
  },

  // 6. PHOTOBOOTH STAMPS & BADGES
  {
    id: 'stamp-korean-life4cut',
    name: '인생네컷 Life4Cut',
    category: 'stamps',
    aspectRatio: 1.8,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 65" fill="none">
      <rect x="5" y="5" width="110" height="55" rx="10" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <rect x="8" y="8" width="104" height="49" rx="8" fill="#FFF1F2" stroke="#E11D48" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="60" y="32" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#E11D48">인생네컷</text>
      <text x="60" y="47" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="8" fill="#BE123C" letter-spacing="1.5">SEOUL STUDIO</text>
      <circle cx="16" cy="16" r="3" fill="#E11D48"/>
      <circle cx="104" cy="16" r="3" fill="#E11D48"/>
    </svg>`
  },
  {
    id: 'stamp-cutest-ever',
    name: 'CUTEST EVER ★',
    category: 'stamps',
    aspectRatio: 2.2,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 55" fill="none">
      <rect x="5" y="5" width="120" height="45" rx="22" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <rect x="8" y="8" width="114" height="39" rx="19" fill="#F43F5E"/>
      <text x="65" y="32" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="12" fill="#FFFFFF" letter-spacing="1">♡ CUTEST EVER ♡</text>
    </svg>`
  },
  {
    id: 'stamp-bff-goals',
    name: 'BFF GOALS',
    category: 'stamps',
    aspectRatio: 2,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" fill="none">
      <rect x="5" y="5" width="110" height="50" rx="12" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <rect x="8" y="8" width="104" height="44" rx="10" fill="#7C3AED"/>
      <text x="60" y="34" text-anchor="middle" font-family="monospace" font-weight="900" font-size="13" fill="#F5D0FE" letter-spacing="1">BFF GOALS ★</text>
    </svg>`
  },
  {
    id: 'stamp-pure-love',
    name: '100% PURE LOVE',
    category: 'stamps',
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="36" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6"/>
      <circle cx="40" cy="40" r="33" fill="#FFF1F2" stroke="#E11D48" stroke-width="2"/>
      <circle cx="40" cy="40" r="28" fill="none" stroke="#FB7185" stroke-width="1.5" stroke-dasharray="3 2"/>
      <text x="40" y="35" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="9" fill="#BE123C">100%</text>
      <text x="40" y="48" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="11" fill="#E11D48">PURE LOVE</text>
    </svg>`
  }
];
