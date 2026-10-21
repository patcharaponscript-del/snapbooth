// Fallback photobooth poses generated dynamically via canvas / SVG data-URIs
// Guarantees zero broken external image URLs and immediate out-of-the-box booth testing

function createSamplePoseSvg(
  bgGradient: [string, string],
  pose: 'smile' | 'peace' | 'wink' | 'cool',
  title: string
): string {
  const poseElements = {
    smile: `
      <!-- Head -->
      <circle cx="200" cy="180" r="75" fill="#FED7AA" />
      <!-- Hair -->
      <path d="M120 180 C110 100, 160 80, 200 80 C240 80, 290 100, 280 180 C270 120, 230 110, 200 110 C170 110, 130 120, 120 180 Z" fill="#3B2616"/>
      <!-- Eyes -->
      <circle cx="175" cy="175" r="7" fill="#1C1917" />
      <circle cx="225" cy="175" r="7" fill="#1C1917" />
      <circle cx="177" cy="173" r="2.5" fill="#FFFFFF" />
      <circle cx="227" cy="173" r="2.5" fill="#FFFFFF" />
      <!-- Cheeks -->
      <circle cx="160" cy="195" r="14" fill="#FDA4AF" opacity="0.6"/>
      <circle cx="240" cy="195" r="14" fill="#FDA4AF" opacity="0.6"/>
      <!-- Smile -->
      <path d="M180 205 Q200 225 220 205" fill="none" stroke="#E11D48" stroke-width="4" stroke-linecap="round"/>
      <!-- Shoulders & Outfit -->
      <path d="M100 320 C100 250, 140 240, 200 240 C260 240, 300 250, 300 320 Z" fill="#F43F5E"/>
    `,
    peace: `
      <!-- Head -->
      <circle cx="200" cy="180" r="75" fill="#FDE047" opacity="0.3" />
      <circle cx="195" cy="175" r="72" fill="#FED7AA" />
      <!-- Hair Bob -->
      <path d="M115 190 C110 90, 280 90, 275 190 C290 230, 270 240, 260 200 C250 110, 140 110, 130 200 C120 240, 100 230, 115 190 Z" fill="#18181B"/>
      <!-- Eyes winking one side -->
      <circle cx="170" cy="170" r="7" fill="#1C1917" />
      <path d="M215 170 Q225 160 235 170" fill="none" stroke="#1C1917" stroke-width="4" stroke-linecap="round"/>
      <!-- Cheeks -->
      <circle cx="155" cy="190" r="14" fill="#F43F5E" opacity="0.5"/>
      <circle cx="235" cy="190" r="14" fill="#F43F5E" opacity="0.5"/>
      <!-- Grin -->
      <path d="M180 198 Q195 215 210 198" fill="none" stroke="#991B1B" stroke-width="4" stroke-linecap="round"/>
      <!-- Outfit -->
      <path d="M90 320 C90 245, 135 235, 195 235 C255 235, 300 245, 300 320 Z" fill="#6366F1"/>
      <!-- Peace hand gesture -->
      <path d="M260 270 L260 210 L272 210 L272 270 M276 270 L276 220 L288 220 L288 270" stroke="#FED7AA" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="274" cy="275" r="16" fill="#FED7AA"/>
    `,
    wink: `
      <!-- Head tilted -->
      <circle cx="205" cy="175" r="74" fill="#FED7AA" />
      <!-- Long Wavy Hair -->
      <path d="M120 180 C110 70, 280 70, 280 180 C295 260, 270 290, 260 240 C250 100, 140 100, 135 240 C125 290, 105 260, 120 180 Z" fill="#92400E"/>
      <!-- Eyes -->
      <path d="M165 172 Q175 162 185 172" fill="none" stroke="#1C1917" stroke-width="4" stroke-linecap="round"/>
      <circle cx="225" cy="170" r="7" fill="#1C1917" />
      <circle cx="227" cy="168" r="2.5" fill="#FFFFFF" />
      <!-- Cheeks -->
      <circle cx="160" cy="192" r="15" fill="#FB7185" opacity="0.6"/>
      <circle cx="235" cy="192" r="15" fill="#FB7185" opacity="0.6"/>
      <!-- Open laugh mouth -->
      <path d="M185 198 Q200 224 215 198 Z" fill="#991B1B"/>
      <!-- Outfit -->
      <path d="M100 320 C100 250, 140 240, 205 240 C270 240, 310 250, 310 320 Z" fill="#10B981"/>
      <!-- Sparkle above head -->
      <path d="M280 100 L285 115 L300 120 L285 125 L280 140 L275 125 L260 120 L275 115 Z" fill="#FDE047"/>
    `,
    cool: `
      <!-- Head -->
      <circle cx="200" cy="180" r="75" fill="#FED7AA" />
      <!-- Sleek Dark Hair -->
      <path d="M125 170 C120 90, 275 90, 275 170 C280 130, 260 100, 200 100 C140 100, 120 130, 125 170 Z" fill="#0F172A"/>
      <!-- Cool Shades Sunglasses -->
      <rect x="145" y="160" width="48" height="26" rx="6" fill="#0F172A"/>
      <rect x="207" y="160" width="48" height="26" rx="6" fill="#0F172A"/>
      <path d="M193 170 L207 170" stroke="#0F172A" stroke-width="4"/>
      <!-- Sunglasses gloss reflection -->
      <path d="M150 165 L165 165 L155 180 L148 180 Z" fill="#38BDF8" opacity="0.7"/>
      <path d="M212 165 L227 165 L217 180 L210 180 Z" fill="#38BDF8" opacity="0.7"/>
      <!-- Smirk -->
      <path d="M185 210 Q205 215 220 205" fill="none" stroke="#78350F" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Outfit Leather Jacket -->
      <path d="M95 320 C95 250, 140 240, 200 240 C260 240, 305 250, 305 320 Z" fill="#1E293B"/>
      <!-- White t-shirt collar -->
      <path d="M185 240 L200 270 L215 240 Z" fill="#FFFFFF"/>
    `
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="400" height="320">
      <defs>
        <linearGradient id="bg-${pose}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgGradient[0]}"/>
          <stop offset="100%" stop-color="${bgGradient[1]}"/>
        </linearGradient>
      </defs>
      <!-- Background Studio Color -->
      <rect width="400" height="320" fill="url(#bg-${pose})"/>
      
      <!-- Studio Backdrop Subtle Spotlight -->
      <circle cx="200" cy="170" r="130" fill="#FFFFFF" opacity="0.1"/>
      
      <!-- Pose Artwork -->
      ${poseElements[pose]}
      
      <!-- Mini Frame Stamp -->
      <text x="380" y="305" text-anchor="end" font-family="monospace" font-size="10" fill="#FFFFFF" opacity="0.45">${title}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_PHOTO_POSES = [
  createSamplePoseSvg(['#FB7185', '#E11D48'], 'smile', 'SNAP #1'),
  createSamplePoseSvg(['#818CF8', '#4F46E5'], 'peace', 'SNAP #2'),
  createSamplePoseSvg(['#34D399', '#059669'], 'wink', 'SNAP #3'),
  createSamplePoseSvg(['#FBBF24', '#D97706'], 'cool', 'SNAP #4')
];
