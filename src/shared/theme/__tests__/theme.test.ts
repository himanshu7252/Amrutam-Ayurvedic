import { lightTheme, darkTheme, lightColors, darkColors, spacing, typography } from '../index';

describe('Ayurvedic Design System Theme Tokens', () => {
  it('should have distinct, contrast-accessible color palettes for light and dark modes', () => {
    expect(lightTheme.isDark).toBe(false);
    expect(darkTheme.isDark).toBe(true);

    expect(lightColors.primary).toBe('#2D5A27');
    expect(darkColors.primary).toBe('#5B9A53');

    expect(lightColors.background).toBe('#F7F9F6');
    expect(darkColors.background).toBe('#121712');
  });

  it('should define consistent typography hierarchy with valid font sizes', () => {
    expect(typography.h1.fontSize).toBe(28);
    expect(typography.h2.fontSize).toBe(22);
    expect(typography.h3.fontSize).toBe(18);
    expect(typography.body1.fontSize).toBe(15);
    expect(typography.caption.fontSize).toBe(12);
  });

  it('should define spacing scale with consistent incremental values', () => {
    expect(spacing.xs).toBe(4);
    expect(spacing.sm).toBe(8);
    expect(spacing.md).toBe(12);
    expect(spacing.lg).toBe(16);
    expect(spacing.xl).toBe(24);
  });
});
