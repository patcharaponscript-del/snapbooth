import { FrameTheme } from '../types/photobooth';

export const FRAME_THEMES: FrameTheme[] = [
  {
    id: 'classic-white',
    name: 'Paper White',
    bgHex: '#FFFFFF',
    textHex: '#18181B',
    subtextHex: '#71717A',
    borderHex: '#E4E4E7',
    isSpecialPattern: 'none'
  },
  {
    id: 'studio-black',
    name: 'Studio Noir',
    bgHex: '#111215',
    textHex: '#FAFAFA',
    subtextHex: '#A1A1AA',
    borderHex: '#27272A',
    isSpecialPattern: 'none'
  },
  {
    id: 'vintage-cream',
    name: '1970s Warm Cream',
    bgHex: '#FDFBF7',
    textHex: '#3E2723',
    subtextHex: '#795548',
    borderHex: '#EFEBE9',
    isSpecialPattern: 'none'
  },
  {
    id: 'pastel-blush',
    name: 'Blush Blossom',
    bgHex: '#FFF1F2',
    textHex: '#881337',
    subtextHex: '#BE123C',
    borderHex: '#FFE4E6',
    isSpecialPattern: 'none'
  },
  {
    id: 'seoul-lavender',
    name: 'Seoul Lilac',
    bgHex: '#F5F3FF',
    textHex: '#4C1D95',
    subtextHex: '#6D28D9',
    borderHex: '#EDE9FE',
    isSpecialPattern: 'none'
  },
  {
    id: 'retro-mint',
    name: 'Matcha Breeze',
    bgHex: '#F0FDF4',
    textHex: '#14532D',
    subtextHex: '#15803D',
    borderHex: '#DCFCE7',
    isSpecialPattern: 'none'
  },
  {
    id: 'powder-blue',
    name: 'Sky Mist',
    bgHex: '#F0F9FF',
    textHex: '#0C4A6E',
    subtextHex: '#0369A1',
    borderHex: '#E0F2FE',
    isSpecialPattern: 'none'
  },
  {
    id: 'film-negative',
    name: '35mm Film Roll',
    bgHex: '#0B0C10',
    textHex: '#FB923C',
    subtextHex: '#EA580C',
    borderHex: '#222',
    isSpecialPattern: 'sprockets'
  },
  {
    id: 'checker-retro',
    name: 'Y2K Checker',
    bgHex: '#1E1B4B',
    textHex: '#F5D0FE',
    subtextHex: '#D8B4FE',
    borderHex: '#312E81',
    isSpecialPattern: 'checker'
  },
  {
    id: 'sunset-aura',
    name: 'Sunset Aura',
    bgHex: '#FFFBEB',
    textHex: '#4A044E',
    subtextHex: '#86198F',
    borderHex: '#FDE68A',
    isSpecialPattern: 'gradient-sunset'
  }
];
