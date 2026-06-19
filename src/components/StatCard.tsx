import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

type StatCardProps = {
  label: string;
  value: number | string;
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'info';
  icon?: keyof typeof Ionicons.glyphMap;
};

export function StatCard({ label, value, tone = 'brand', icon }: StatCardProps) {
  const { colors, fonts, fontSizes, radius, spacing, elevation } = useTheme();

  const toneColors = {
    brand: colors.brand,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    info: colors.info,
  };

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: colors.card,
          borderRadius: radius.lg,
          padding: spacing.md,
          borderWidth: 1,
          borderColor: colors.border,
          minWidth: 72,
        },
        elevation.sm,
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={toneColors[tone]} style={{ marginBottom: spacing.xs }} /> : null}
      <Text style={{ fontFamily: fonts.display, fontSize: fontSizes.xl, color: toneColors[tone] }}>{value}</Text>
      <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.xs, color: colors.textMuted, marginTop: 2 }}>{label}</Text>
    </View>
  );
}
