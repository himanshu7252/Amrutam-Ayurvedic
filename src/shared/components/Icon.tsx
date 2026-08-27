import React from 'react';
import { Text, TextStyle, ViewStyle } from 'react-native';

export type IconName =
  | 'medkit-outline'
  | 'bag-handle-outline'
  | 'document-text-outline'
  | 'document-text'
  | 'cart-outline'
  | 'sunny'
  | 'moon'
  | 'settings-outline'
  | 'star'
  | 'calendar-outline'
  | 'attach-outline'
  | 'remove'
  | 'add'
  | 'shield-checkmark-outline'
  | 'trash-outline'
  | 'download-outline'
  | 'search-outline'
  | 'close'
  | 'close-circle'
  | 'close-circle-outline'
  | 'alert-circle'
  | 'alert-circle-outline'
  | 'checkmark-circle'
  | 'warning'
  | 'warning-outline'
  | 'information-circle'
  | 'refresh'
  | 'sparkles'
  | 'leaf'
  | 'leaf-outline'
  | 'time'
  | 'call-outline'
  | string;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: TextStyle | ViewStyle;
}

// Crisp cross-platform standard glyph mappings
const ICON_GLYPHS: Record<string, string> = {
  'medkit-outline': '🩺',
  'bag-handle-outline': '🛍️',
  'document-text-outline': '📋',
  'document-text': '📄',
  'cart-outline': '🛒',
  'sunny': '☀️',
  'moon': '🌙',
  'settings-outline': '⚙️',
  'star': '★',
  'calendar-outline': '📅',
  'attach-outline': '📎',
  'remove': '−',
  'add': '+',
  'shield-checkmark-outline': '🛡️',
  'trash-outline': '🗑️',
  'download-outline': '📥',
  'search-outline': '🔍',
  'close': '✕',
  'close-circle': '⊗',
  'close-circle-outline': '⊗',
  'alert-circle': '⚠️',
  'alert-circle-outline': '⚠️',
  'checkmark-circle': '✓',
  'warning': '⚠️',
  'warning-outline': '⚠️',
  'information-circle': 'ℹ️',
  'refresh': '🔄',
  'sparkles': '✨',
  'leaf': '🌿',
  'leaf-outline': '🍃',
  'time': '⏰',
  'call-outline': '📞',
};

export const Icon: React.FC<IconProps> = ({ name, size = 18, color = '#2D5A27', style }) => {
  const glyph = ICON_GLYPHS[name] || '•';

  return (
    <Text
      style={[
        {
          fontSize: size,
          color,
          lineHeight: size * 1.15,
          textAlign: 'center',
          includeFontPadding: false,
        },
        style as TextStyle,
      ]}
      accessibilityRole="image"
      accessibilityLabel={`Icon ${name}`}
    >
      {glyph}
    </Text>
  );
};

export const Ionicons = Icon;
export default Icon;
