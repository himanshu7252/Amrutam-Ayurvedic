import { TextStyle } from 'react-native';

export interface TypographyTokens {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  subtitle1: TextStyle;
  subtitle2: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  button: TextStyle;
  caption: TextStyle;
  overline: TextStyle;
  badge: TextStyle;
}

export const typography: TypographyTokens = {
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  subtitle1: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
  },
  subtitle2: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  body1: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  body2: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400',
  },
  button: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  overline: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  badge: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
};
