// Face Filters like Instagram & TikTok (Cheek blush, cute animal ears, angel halo, heart shades, sparkles)

export interface FaceFilterItem {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  category: 'beauty' | 'cute' | 'trendy' | 'retro';
  // SVG overlay rendered over 4:3 camera view (scaled responsive to viewport)
  svgOverlay: string;
}

export const FACE_FILTERS: FaceFilterItem[] = [
  {
    id: 'none',
    name: 'None',
    tagline: 'No face filter',
    icon: '🚫',
    category: 'beauty',
    svgOverlay: ''
  },
  {
    id: 'peach-blush',
    name: 'Peach Blush & Freckles',
    tagline: 'บลัชแก้มส้มชมพูเกาหลี + กระจมูกน่ารักๆ',
    icon: '🌸',
    category: 'beauty',
    svgOverlay: `<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="leftCheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FB7185" stop-opacity="0.45"/>
          <stop offset="60%" stop-color="#FDA4AF" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#FDA4AF" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="rightCheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FB7185" stop-opacity="0.45"/>
          <stop offset="60%" stop-color="#FDA4AF" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#FDA4AF" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Left & Right Cheek Blush -->
      <ellipse cx="145" cy="180" rx="35" ry="24" fill="url(#leftCheek)"/>
      <ellipse cx="255" cy="180" rx="35" ry="24" fill="url(#rightCheek)"/>
      <!-- Soft Nose Tip Blush -->
      <circle cx="200" cy="172" r="14" fill="#FB7185" opacity="0.25"/>
      <!-- Cute Freckles across nose & cheeks -->
      <g fill="#9A3412" opacity="0.4">
        <circle cx="150" cy="174" r="1.5"/><circle cx="160" cy="178" r="1.2"/>
        <circle cx="172" cy="172" r="1.6"/><circle cx="185" cy="175" r="1.4"/>
        <circle cx="195" cy="170" r="1.8"/><circle cx="205" cy="171" r="1.5"/>
        <circle cx="215" cy="175" r="1.4"/><circle cx="228" cy="172" r="1.6"/>
        <circle cx="240" cy="178" r="1.2"/><circle cx="250" cy="174" r="1.5"/>
      </g>
      <!-- Tiny Cheek Sparkles -->
      <path d="M135 165 L137 170 L142 172 L137 174 L135 179 L133 174 L128 172 L133 170 Z" fill="#FFFFFF" opacity="0.75"/>
      <path d="M265 165 L267 170 L272 172 L267 174 L265 179 L263 174 L258 172 L263 170 Z" fill="#FFFFFF" opacity="0.75"/>
    </svg>`
  },
  {
    id: 'cute-kitty',
    name: 'Kawaii Kitty Cat',
    tagline: 'หูแมวชมพู + หนวดแมวและจมูกคาวาอี้',
    icon: '🐱',
    category: 'cute',
    svgOverlay: `<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left Cat Ear -->
      <path d="M125 110 L100 45 Q125 40 155 80 Z" fill="#FFFFFF" stroke="#F43F5E" stroke-width="4" stroke-linejoin="round"/>
      <path d="M125 100 L110 58 Q125 55 145 82 Z" fill="#FDA4AF"/>
      <!-- Right Cat Ear -->
      <path d="M275 110 L300 45 Q275 40 245 80 Z" fill="#FFFFFF" stroke="#F43F5E" stroke-width="4" stroke-linejoin="round"/>
      <path d="M275 100 L290 58 Q275 55 255 82 Z" fill="#FDA4AF"/>
      <!-- Cat Nose -->
      <path d="M194 172 Q200 170 206 172 Q200 180 194 172 Z" fill="#FB7185"/>
      <!-- Whisker Strokes -->
      <g stroke="#F43F5E" stroke-width="2.5" stroke-linecap="round">
        <path d="M165 174 L125 168"/>
        <path d="M164 182 L122 184"/>
        <path d="M235 174 L275 168"/>
        <path d="M236 182 L278 184"/>
      </g>
      <!-- Cheek Blush -->
      <circle cx="150" cy="188" r="16" fill="#FDA4AF" opacity="0.4"/>
      <circle cx="250" cy="188" r="16" fill="#FDA4AF" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'angel-halo',
    name: 'Angel Halo & Glow',
    tagline: 'วงแหวนนางฟ้าลอยบนหัว + แสงประกายวิ้งวับ',
    icon: '👼',
    category: 'cute',
    svgOverlay: `<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Floating Golden Halo -->
      <ellipse cx="200" cy="50" rx="65" ry="16" fill="none" stroke="#FACC15" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="200" cy="50" rx="65" ry="16" fill="none" stroke="#FEF08A" stroke-width="3" stroke-linecap="round"/>
      <!-- Halo Light Glow -->
      <ellipse cx="200" cy="50" rx="70" ry="20" fill="none" stroke="#FDE047" stroke-width="2" opacity="0.5"/>
      <!-- Twinkling Sparkles drifting -->
      <path d="M140 70 L143 78 L151 81 L143 84 L140 92 L137 84 L129 81 L137 78 Z" fill="#FACC15"/>
      <path d="M260 65 L263 73 L271 76 L263 79 L260 87 L257 79 L249 76 L257 73 Z" fill="#FACC15"/>
      <circle cx="120" cy="120" r="3" fill="#FFFFFF"/>
      <circle cx="280" cy="130" r="3" fill="#FFFFFF"/>
      <!-- Cheek Hearts -->
      <path d="M145 180 C140 172, 130 175, 133 183 L145 195 L157 183 C160 175, 150 172, 145 180 Z" fill="#F43F5E" opacity="0.7" transform="scale(0.8) translate(40,40)"/>
      <path d="M255 180 C250 172, 240 175, 243 183 L255 195 L267 183 C270 175, 260 172, 255 180 Z" fill="#F43F5E" opacity="0.7" transform="scale(0.8) translate(70,40)"/>
    </svg>`
  },
  {
    id: 'heart-shades',
    name: 'Y2K Heart Shades',
    tagline: 'แว่นตากันแดดรูปหัวใจสีชมพูโปร่งแสง',
    icon: '🕶️',
    category: 'trendy',
    svgOverlay: `<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Glasses Bridge -->
      <path d="M185 145 Q200 138 215 145" stroke="#E11D48" stroke-width="4" stroke-linecap="round"/>
      <!-- Left Heart Lens -->
      <g transform="translate(115, 115) scale(0.65)">
        <path d="M50 85 C25 65, 8 45, 12 25 C16 8, 38 8, 50 25 C62 8, 84 8, 88 25 C92 45, 75 65, 50 85 Z" fill="#F43F5E" fill-opacity="0.65" stroke="#E11D48" stroke-width="6"/>
        <ellipse cx="32" cy="24" rx="10" ry="5" transform="rotate(-30 32 24)" fill="#FFFFFF" opacity="0.7"/>
      </g>
      <!-- Right Heart Lens -->
      <g transform="translate(220, 115) scale(0.65)">
        <path d="M50 85 C25 65, 8 45, 12 25 C16 8, 38 8, 50 25 C62 8, 84 8, 88 25 C92 45, 75 65, 50 85 Z" fill="#F43F5E" fill-opacity="0.65" stroke="#E11D48" stroke-width="6"/>
        <ellipse cx="32" cy="24" rx="10" ry="5" transform="rotate(-30 32 24)" fill="#FFFFFF" opacity="0.7"/>
      </g>
      <!-- Cute Cheek blush below glasses -->
      <ellipse cx="140" cy="195" rx="22" ry="14" fill="#FDA4AF" opacity="0.45"/>
      <ellipse cx="260" cy="195" rx="22" ry="14" fill="#FDA4AF" opacity="0.45"/>
    </svg>`
  },
  {
    id: 'devil-cute',
    name: 'Little Devil Horns',
    tagline: 'เขาเดวิลสีแดงมินิมอล + หัวใจป๊อปบนแก้ม',
    icon: '😈',
    category: 'trendy',
    svgOverlay: `<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left Devil Horn -->
      <path d="M130 85 C125 55, 105 35, 95 30 C108 50, 115 75, 145 80 Z" fill="#E11D48" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/>
      <!-- Right Devil Horn -->
      <path d="M270 85 C275 55, 295 35, 305 30 C292 50, 285 75, 255 80 Z" fill="#E11D48" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/>
      <!-- Cheek Devil Heart Stamps -->
      <path d="M145 180 C140 172, 130 175, 133 183 L145 195 L157 183 C160 175, 150 172, 145 180 Z" fill="#E11D48"/>
      <path d="M255 180 C250 172, 240 175, 243 183 L255 195 L267 183 C270 175, 260 172, 255 180 Z" fill="#E11D48"/>
      <!-- Under-eye blush -->
      <ellipse cx="145" cy="185" rx="26" ry="16" fill="#FDA4AF" opacity="0.35"/>
      <ellipse cx="255" cy="185" rx="26" ry="16" fill="#FDA4AF" opacity="0.35"/>
    </svg>`
  },
  {
    id: 'glitter-kirakira',
    name: 'TikTok KiraKira Glitter',
    tagline: 'กลิตเตอร์ดาวประกายวิ้งวับบนโหนกแก้ม & สันจมูก',
    icon: '✨',
    category: 'beauty',
    svgOverlay: `<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cheek Sparkling Stars -->
      <g fill="#FFFFFF">
        <!-- Left Cheek Stars -->
        <path d="M130 160 L133 168 L141 171 L133 174 L130 182 L127 174 L119 171 L127 168 Z" opacity="0.9"/>
        <path d="M155 180 L157 185 L162 187 L157 189 L155 194 L153 189 L148 187 L153 185 Z" opacity="0.75"/>
        <circle cx="145" cy="165" r="2.5" opacity="0.8"/>
        <circle cx="120" cy="185" r="1.8" opacity="0.7"/>

        <!-- Nose Bridge Star -->
        <path d="M200 162 L202 167 L207 169 L202 171 L200 176 L198 171 L193 169 L198 167 Z" opacity="0.95"/>

        <!-- Right Cheek Stars -->
        <path d="M270 160 L273 168 L281 171 L273 174 L270 182 L267 174 L259 171 L267 168 Z" opacity="0.9"/>
        <path d="M245 180 L247 185 L252 187 L247 189 L245 194 L243 189 L238 187 L243 185 Z" opacity="0.75"/>
        <circle cx="255" cy="165" r="2.5" opacity="0.8"/>
        <circle cx="280" cy="185" r="1.8" opacity="0.7"/>
      </g>
      <!-- Soft Rosy Glow under glitters -->
      <ellipse cx="140" cy="175" rx="30" ry="18" fill="#FDA4AF" opacity="0.3"/>
      <ellipse cx="260" cy="175" rx="30" ry="18" fill="#FDA4AF" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'princess-tiara',
    name: 'Princess Tiara Crown',
    tagline: 'มงกุฎเจ้าหญิงสีทองเพชรวิ้งวับบนหน้าผาก',
    icon: '👑',
    category: 'cute',
    svgOverlay: `<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Tiara Crown Base -->
      <path d="M150 95 Q200 88 250 95 L245 75 L225 82 L200 62 L175 82 L155 75 Z" fill="#FDE047" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/>
      <!-- Jewels -->
      <circle cx="200" cy="72" r="5" fill="#E11D48"/>
      <circle cx="178" cy="85" r="3.5" fill="#38BDF8"/>
      <circle cx="222" cy="85" r="3.5" fill="#38BDF8"/>
      <!-- Tiara Sparkles -->
      <path d="M200 45 L202 52 L209 55 L202 58 L200 65 L198 58 L191 55 L198 52 Z" fill="#FFFFFF"/>
      <!-- Soft Princess Blush -->
      <ellipse cx="145" cy="180" rx="32" ry="20" fill="#FDA4AF" opacity="0.35"/>
      <ellipse cx="255" cy="180" rx="32" ry="20" fill="#FDA4AF" opacity="0.35"/>
    </svg>`
  },
  {
    id: 'puppy-dog',
    name: 'Playful Puppy Dog',
    tagline: 'หูหมาพับสุดน่ารัก + จมูกหมาดุ๊กดิ๊ก',
    icon: '🐶',
    category: 'cute',
    svgOverlay: `<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left Floppy Dog Ear -->
      <path d="M130 90 C100 85, 75 120, 85 160 C95 195, 125 180, 135 130 Z" fill="#92400E" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round"/>
      <path d="M125 105 C105 100, 88 128, 95 158 C102 182, 120 172, 128 135 Z" fill="#B45309"/>
      <!-- Right Floppy Dog Ear -->
      <path d="M270 90 C300 85, 325 120, 315 160 C305 195, 275 180, 265 130 Z" fill="#92400E" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round"/>
      <path d="M275 105 C295 100, 312 128, 305 158 C298 182, 280 172, 272 135 Z" fill="#B45309"/>
      <!-- Puppy Dog Button Nose -->
      <ellipse cx="200" cy="172" rx="16" ry="12" fill="#18181B" stroke="#FFFFFF" stroke-width="2"/>
      <ellipse cx="196" cy="168" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.6"/>
      <!-- Tongue sticking out -->
      <path d="M192 184 Q200 205 208 184 Z" fill="#FB7185"/>
      <path d="M200 184 L200 197" stroke="#E11D48" stroke-width="1.5"/>
    </svg>`
  }
];
