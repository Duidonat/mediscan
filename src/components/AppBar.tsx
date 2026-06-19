import React, { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

type AppBarProps = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: ReactNode;
  showMenu?: boolean;
  onMenuPress?: () => void;
  showLogo?: boolean;
};

export function AppBar({
  title,
  subtitle,
  showBack,
  onBack,
  rightAction,
  showMenu,
  onMenuPress,
  showLogo,
}: AppBarProps) {
  const { colors, fonts, fontSizes, spacing, layout } = useTheme();

  return (
    <View
      style={{
        minHeight: layout.headerHeight,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: spacing.sm }}>
        {showBack && onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={onBack}
            hitSlop={8}
            style={{ minWidth: layout.hitTargetMin, minHeight: layout.hitTargetMin, justifyContent: 'center' }}
          >
            <Ionicons name="chevron-back" size={24} color={colors.brandDeep} />
          </Pressable>
        ) : showMenu && onMenuPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            onPress={onMenuPress}
            hitSlop={8}
            style={{ minWidth: layout.hitTargetMin, minHeight: layout.hitTargetMin, justifyContent: 'center' }}
          >
            <Ionicons name="menu" size={24} color={colors.brandDeep} />
          </Pressable>
        ) : null}

        {showLogo ? (
          <View>
            <Text style={{ fontFamily: fonts.display, fontSize: fontSizes.lg, color: colors.brandDeep }}>
              MediScan Vault
            </Text>
            {subtitle ? (
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.xs, color: colors.textMuted }}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        ) : title ? (
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.displayMedium, fontSize: fontSizes.lg, color: colors.text }}>
              {title}
            </Text>
            {subtitle ? (
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.textMuted }}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      {rightAction ?? null}
    </View>
  );
}
