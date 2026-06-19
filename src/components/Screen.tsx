import React, { ReactNode } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

export function Screen({ children, scroll = true, padded = true, style, contentStyle }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const { colors, spacing } = useTheme();
  const padding = padded ? spacing.md : 0;

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.paper,
    paddingTop: insets.top > 0 ? 0 : spacing.sm,
    ...style,
  };

  if (scroll) {
    return (
      <View style={containerStyle}>
        <ScrollView
          contentContainerStyle={[{ padding, paddingBottom: spacing.xl + insets.bottom }, contentStyle]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[containerStyle, { padding }, contentStyle]}>
      {children}
    </View>
  );
}
