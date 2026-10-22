export type FilterType = 
  | 'normal'
  | 'softglow'
  | 'vintage'
  | 'noir'
  | 'sepia'
  | 'warm90s'
  | 'fujifilm'
  | 'sunset'
  | 'cyberpunk'
  | 'pastel'
  | 'filmgrain'
  | 'cinematic';

export type LayoutType = 
  | '4-cut-strip'  // Classic 4 vertical shots
  | '3-cut-strip'  // 3 vertical shots
  | '2x2-quad'     // 4 shots arranged 2x2
  | 'polaroid'     // Single polaroid style shot
  | 'duo-wide';    // 2 wide landscape or stacked shots

export interface CapturedPhoto {
  id: string;
  dataUrl: string;
  timestamp: number;
  rotation?: number; // 0, 90, 180, 270
  flipped?: boolean;
}

export interface PlacedSticker {
  id: string;
  stickerId: string;
  symbol: string;
  type: 'emoji' | 'badge' | 'doodle' | 'graphic';
  svgContent?: string;
  x: number; // percentage 0-100 of strip container
  y: number; // percentage 0-100 of strip container
  scale: number; // 0.5 to 2.5
  rotation: number; // -180 to 180 degrees
}

export interface DoodleStroke {
  id: string;
  points: { x: number; y: number }[]; // percentage coordinates 0-100
  color: string;
  size: number;
}

export interface FrameTheme {
  id: string;
  name: string;
  bgHex: string;
  textHex: string;
  subtextHex: string;
  borderHex?: string;
  badgeStyle?: string;
  isSpecialPattern?: 'sprockets' | 'checker' | 'gradient-sunset' | 'hearts' | 'newspaper' | 'hologram' | 'grid' | 'none';
}

export interface StripSettings {
  layout: LayoutType;
  filter: FilterType;
  frameThemeId: string;
  title: string;
  subtitle: string;
  showDate: boolean;
  dateFormat: 'korean' | 'standard' | 'minimal' | 'vintage';
  fontFamily: 'sans' | 'serif' | 'mono';
  stickers: PlacedSticker[];
  doodles: DoodleStroke[];
  grainIntensity: number; // 0 to 100
  brightness: number; // 80 to 120
  contrast: number; // 80 to 130
}

export interface SavedStrip {
  id: string;
  dataUrl: string;
  createdAt: number;
  layout: LayoutType;
  filter: FilterType;
  frameName: string;
  photoCount: number;
  title: string;
}

export interface CocoaDonation {
  id: string;
  name: string;
  amount: number; // in THB
  cups: number;   // calculated as Math.round(amount / 50)
  message: string;
  timestamp: number;
}
