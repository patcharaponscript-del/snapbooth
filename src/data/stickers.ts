export interface StickerDefinition {
  id: string;
  symbol: string;
  label: string;
  category: 'cute' | 'vibes' | 'stamps' | 'props';
  type: 'emoji' | 'badge' | 'doodle';
}

export const AVAILABLE_STICKERS: StickerDefinition[] = [
  // Cute
  { id: 'heart-sparkle', symbol: '💖', label: 'Sparkle Heart', category: 'cute', type: 'emoji' },
  { id: 'bunny', symbol: '🐰', label: 'Bunny', category: 'cute', type: 'emoji' },
  { id: 'bow', symbol: '🎀', label: 'Ribbon Bow', category: 'cute', type: 'emoji' },
  { id: 'cherry', symbol: '🍒', label: 'Cherries', category: 'cute', type: 'emoji' },
  { id: 'sparkles', symbol: '✨', label: 'Gleam', category: 'cute', type: 'emoji' },
  { id: 'butterfly', symbol: '🦋', label: 'Butterfly', category: 'cute', type: 'emoji' },
  { id: 'cat', symbol: '🐱', label: 'Kitten', category: 'cute', type: 'emoji' },
  { id: 'bear', symbol: '🧸', label: 'Teddy Bear', category: 'cute', type: 'emoji' },
  { id: 'flower', symbol: '🌸', label: 'Cherry Blossom', category: 'cute', type: 'emoji' },
  { id: 'strawberry', symbol: '🍓', label: 'Strawberry', category: 'cute', type: 'emoji' },

  // Props
  { id: 'sunglasses', symbol: '🕶️', label: 'Sunglasses', category: 'props', type: 'emoji' },
  { id: 'crown', symbol: '👑', label: 'Tiara Crown', category: 'props', type: 'emoji' },
  { id: 'camera', symbol: '📸', label: 'Camera', category: 'props', type: 'emoji' },
  { id: 'headphones', symbol: '🎧', label: 'Headphones', category: 'props', type: 'emoji' },
  { id: 'disco', symbol: '🪩', label: 'Mirror Ball', category: 'props', type: 'emoji' },
  { id: 'star-struck', symbol: '🤩', label: 'Star Eyes', category: 'props', type: 'emoji' },
  { id: 'angel', symbol: '👼', label: 'Angel', category: 'props', type: 'emoji' },
  { id: 'peace', symbol: '✌️', label: 'Peace Sign', category: 'props', type: 'emoji' },

  // Vibes
  { id: 'shooting-star', symbol: '💫', label: 'Dizzy Star', category: 'vibes', type: 'emoji' },
  { id: 'rainbow', symbol: '🌈', label: 'Rainbow', category: 'vibes', type: 'emoji' },
  { id: 'fire', symbol: '🔥', label: 'Fire', category: 'vibes', type: 'emoji' },
  { id: 'kiss', symbol: '💋', label: 'Kiss Mark', category: 'vibes', type: 'emoji' },
  { id: 'clover', symbol: '🍀', label: 'Lucky Clover', category: 'vibes', type: 'emoji' },
  { id: 'film-roll', symbol: '🎞️', label: 'Film Frame', category: 'vibes', type: 'emoji' },

  // Badges & Stamps
  { id: 'badge-snap', symbol: 'SNAP!', label: 'Snap!', category: 'stamps', type: 'badge' },
  { id: 'badge-bffs', symbol: 'BFFS ♡', label: 'BFFs', category: 'stamps', type: 'badge' },
  { id: 'badge-smile', symbol: 'SMILE :)', label: 'Smile', category: 'stamps', type: 'badge' },
  { id: 'badge-sweet', symbol: 'SWEET', label: 'Sweet', category: 'stamps', type: 'badge' },
  { id: 'badge-vibes', symbol: 'VIBES', label: 'Vibes', category: 'stamps', type: 'badge' },
  { id: 'badge-cutie', symbol: 'CUTIE ★', label: 'Cutie', category: 'stamps', type: 'badge' },
  { id: 'badge-forever', symbol: 'FOREVER', label: 'Forever', category: 'stamps', type: 'badge' },
  { id: 'badge-retro', symbol: 'RETRO 90S', label: 'Retro', category: 'stamps', type: 'badge' }
];
