export interface ColorPalette {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryMuted: string;

  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  accent: string;
  accentGold: string;
  accentSand: string;

  background: string;
  surface: string;
  surfaceSubtle: string;
  card: string;

  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  border: string;
  borderSubtle: string;
  divider: string;

  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;

  badgeBackground: string;
  badgeText: string;
  
  shadow: string;
  overlay: string;
}

export const lightColors: ColorPalette = {
  primary: '#2D5A27', // Deep Ayurvedic Green
  primaryLight: '#4A7C43',
  primaryDark: '#1B3D17',
  primaryMuted: '#EBF3E8',

  secondary: '#8C6D46', // Warm Sandalwood / Terracotta
  secondaryLight: '#B08E65',
  secondaryDark: '#674D2C',

  accent: '#D4AF37', // Ayurvedic Gold
  accentGold: '#F4D03F',
  accentSand: '#F9F6F0',

  background: '#F7F9F6', // Off-white herbal tint
  surface: '#FFFFFF',
  surfaceSubtle: '#F0F4EE',
  card: '#FFFFFF',

  text: '#1C281B', // Dark charcoal green
  textSecondary: '#4A5B48',
  textMuted: '#7D8E7B',
  textInverse: '#FFFFFF',

  border: '#D8E2D5',
  borderSubtle: '#EAEFE8',
  divider: '#E4ECE2',

  success: '#2E7D32',
  successLight: '#E8F5E9',
  warning: '#ED6C02',
  warningLight: '#FFF4E5',
  error: '#D32F2F',
  errorLight: '#FFEBEE',
  info: '#0288D1',
  infoLight: '#E1F5FE',

  badgeBackground: '#E8F3E5',
  badgeText: '#265C20',

  shadow: 'rgba(28, 40, 27, 0.08)',
  overlay: 'rgba(15, 25, 14, 0.55)',
};

export const darkColors: ColorPalette = {
  primary: '#5B9A53', // Bright herbal green for dark mode contrast
  primaryLight: '#78B870',
  primaryDark: '#3A6B34',
  primaryMuted: '#1E331A',

  secondary: '#C2A37B',
  secondaryLight: '#DAC09E',
  secondaryDark: '#8C6D46',

  accent: '#F1C40F',
  accentGold: '#F7DC6F',
  accentSand: '#2A3328',

  background: '#121712', // Deep Ayurvedic Forest Dark
  surface: '#1A2119',
  surfaceSubtle: '#222B21',
  card: '#1F291E',

  text: '#EDF2EC',
  textSecondary: '#A9BBA6',
  textMuted: '#6E806B',
  textInverse: '#121712',

  border: '#2C3A2B',
  borderSubtle: '#233022',
  divider: '#263425',

  success: '#66BB6A',
  successLight: '#1B381D',
  warning: '#FFA726',
  warningLight: '#3D2A10',
  error: '#EF5350',
  errorLight: '#3E1919',
  info: '#29B6F6',
  infoLight: '#102A38',

  badgeBackground: '#243D21',
  badgeText: '#85D47C',

  shadow: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(0, 0, 0, 0.75)',
};
