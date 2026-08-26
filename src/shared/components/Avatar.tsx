import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, ViewStyle } from 'react-native';
import { useTheme } from '@shared/context/ThemeContext';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  source?: string;
  name?: string;
  size?: AvatarSize;
  isOnline?: boolean;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name = 'Vaidya',
  size = 'md',
  isOnline,
  style,
}) => {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  const getDimensions = (): number => {
    switch (size) {
      case 'sm':
        return 36;
      case 'lg':
        return 64;
      case 'xl':
        return 88;
      case 'md':
      default:
        return 48;
    }
  };

  const dim = getDimensions();

  const getInitials = (n: string): string => {
    const parts = n.replace(/^Dr\.\s+/i, '').trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <View style={[styles.container, { width: dim, height: dim }, style]}>
      {source && !imageError ? (
        <Image
          source={{ uri: source }}
          style={[styles.image, { width: dim, height: dim, borderRadius: dim / 2 }]}
          onError={() => setImageError(true)}
          accessibilityLabel={`${name} avatar image`}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              backgroundColor: theme.colors.primaryMuted,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              {
                color: theme.colors.primary,
                fontSize: dim * 0.38,
              },
            ]}
          >
            {getInitials(name)}
          </Text>
        </View>
      )}

      {isOnline !== undefined && (
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: isOnline ? theme.colors.success : theme.colors.textMuted,
              borderColor: theme.colors.surface,
              width: dim * 0.28,
              height: dim * 0.28,
              borderRadius: (dim * 0.28) / 2,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  initials: {
    fontWeight: '800',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
  },
});
