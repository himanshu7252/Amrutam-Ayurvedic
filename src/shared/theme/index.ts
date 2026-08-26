import { lightColors, darkColors, ColorPalette } from './colors';
import { typography, TypographyTokens } from './typography';
import { spacing, SpacingTokens } from './spacing';
import { shadows, ShadowTokens } from './shadows';

export interface Theme {
  isDark: boolean;
  colors: ColorPalette;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  shadows: ShadowTokens;
}

export const lightTheme: Theme = {
  isDark: false,
  colors: lightColors,
  typography,
  spacing,
  shadows,
};

export const darkTheme: Theme = {
  isDark: true,
  colors: darkColors,
  typography,
  spacing,
  shadows,
};

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
