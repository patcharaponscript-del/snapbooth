export interface StickerDefinition {
  id: string;
  symbol: string;
  label: string;
  category: 'cute' | 'props' | 'vibes' | 'stamps' | 'doodles';
  type: 'emoji' | 'badge' | 'doodle';
}

export const AVAILABLE_STICKERS: StickerDefinition[] = [
  // Cute & Kawaii
  { id: 'heart-sparkle', symbol: '💖', label: 'Sparkle Heart', category: 'cute', type: 'emoji' },
  { id: 'bunny', symbol: '🐰', label: 'Bunny Face', category: 'cute', type: 'emoji' },
  { id: 'bow', symbol: '🎀', label: 'Ribbon Bow', category: 'cute', type: 'emoji' },
  { id: 'cherry', symbol: '🍒', label: 'Cherries', category: 'cute', type: 'emoji' },
  { id: 'sparkles', symbol: '✨', label: 'Gleam', category: 'cute', type: 'emoji' },
  { id: 'butterfly', symbol: '🦋', label: 'Butterfly', category: 'cute', type: 'emoji' },
  { id: 'cat', symbol: '🐱', label: 'Kitten', category: 'cute', type: 'emoji' },
  { id: 'bear', symbol: '🧸', label: 'Teddy Bear', category: 'cute', type: 'emoji' },
  { id: 'flower', symbol: '🌸', label: 'Cherry Blossom', category: 'cute', type: 'emoji' },
  { id: 'strawberry', symbol: '🍓', label: 'Strawberry', category: 'cute', type: 'emoji' },
  { id: 'cupcake', symbol: '🧁', label: 'Cupcake', category: 'cute', type: 'emoji' },
  { id: 'chick', symbol: '🐥', label: 'Baby Chick', category: 'cute', type: 'emoji' },

  // Props & Costumes
  { id: 'sunglasses', symbol: '🕶️', label: 'Sunglasses', category: 'props', type: 'emoji' },
  { id: 'heart-eyes', symbol: '😍', label: 'Heart Eyes', category: 'props', type: 'emoji' },
  { id: 'crown', symbol: '👑', label: 'Tiara Crown', category: 'props', type: 'emoji' },
  { id: 'party-hat', symbol: '🥳', label: 'Party Hat', category: 'props', type: 'emoji' },
  { id: 'devil-horns', symbol: '😈', label: 'Devil Horns', category: 'props', type: 'emoji' },
  { id: 'angel', symbol: '👼', label: 'Angel Halo', category: 'props', type: 'emoji' },
  { id: 'camera', symbol: '📸', label: 'Vintage Camera', category: 'props', type: 'emoji' },
  { id: 'headphones', symbol: '🎧', label: 'Headphones', category: 'props', type: 'emoji' },
  { id: 'disco', symbol: '🪩', label: 'Mirror Ball', category: 'props', type: 'emoji' },
  { id: 'clover', symbol: '🍀', label: 'Lucky Clover', category: 'props', type: 'emoji' },
  { id: 'lipstick', symbol: '💄', label: 'Lipstick Kiss', category: 'props', type: 'emoji' },
  { id: 'peace', symbol: '✌️', label: 'Peace Sign', category: 'props', type: 'emoji' },

  // Vibes & Mood
  { id: 'shooting-star', symbol: '💫', label: 'Dizzy Star', category: 'vibes', type: 'emoji' },
  { id: 'rainbow', symbol: '🌈', label: 'Rainbow', category: 'vibes', type: 'emoji' },
  { id: 'fire', symbol: '🔥', label: 'Hot Fire', category: 'vibes', type: 'emoji' },
  { id: 'kiss', symbol: '💋', label: 'Kiss Mark', category: 'vibes', type: 'emoji' },
  { id: 'film-roll', symbol: '🎞️', label: 'Film Frame', category: 'vibes', type: 'emoji' },
  { id: 'lightning', symbol: '⚡', label: 'Lightning', category: 'vibes', type: 'emoji' },
  { id: 'bubble-tea', symbol: '🧋', label: 'Boba Milk Tea', category: 'vibes', type: 'emoji' },
  { id: 'hot-cocoa', symbol: '☕', label: 'Iced Cocoa', category: 'vibes', type: 'emoji' },
  { id: 'moon', symbol: '🌙', label: 'Crescent Moon', category: 'vibes', type: 'emoji' },
  { id: 'cheese', symbol: '🧀', label: 'Say Cheese', category: 'vibes', type: 'emoji' },

  // Badges & Korean Photobooth Stamps
  { id: 'badge-snap', symbol: 'SNAP!', label: 'Snap!', category: 'stamps', type: 'badge' },
  { id: 'badge-bffs', symbol: 'BFFS ♡', label: 'BFFs', category: 'stamps', type: 'badge' },
  { id: 'badge-smile', symbol: 'SMILE :)', label: 'Smile', category: 'stamps', type: 'badge' },
  { id: 'badge-sweet', symbol: 'SWEET', label: 'Sweet', category: 'stamps', type: 'badge' },
  { id: 'badge-vibes', symbol: 'VIBES', label: 'Vibes', category: 'stamps', type: 'badge' },
  { id: 'badge-cutie', symbol: 'SO CUTE ★', label: 'So Cute', category: 'stamps', type: 'badge' },
  { id: 'badge-forever', symbol: 'FOREVER', label: 'Forever', category: 'stamps', type: 'badge' },
  { id: 'badge-retro', symbol: 'RETRO 90S', label: 'Retro 90s', category: 'stamps', type: 'badge' },
  { id: 'badge-iconic', symbol: 'ICONIC', label: 'Iconic', category: 'stamps', type: 'badge' },
  { id: 'badge-life4cut', symbol: '인생네컷', label: 'Life 4-Cut', category: 'stamps', type: 'badge' },
  { id: 'badge-photodump', symbol: 'PHOTO DUMP', label: 'Photo Dump', category: 'stamps', type: 'badge' }
];
