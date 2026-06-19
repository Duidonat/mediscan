import React from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppBar } from '../../components/AppBar';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeProvider';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { spacing } = useTheme();

  return (
    <Screen>
      <AppBar
        showLogo
        subtitle="Scan. Identify. Save. Stay Safe."
        rightAction={
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <Pressable accessibilityLabel="Notifications" onPress={() => navigation.navigate('MainTabs', { screen: 'Reminders' })}>
              <Ionicons name="notifications-outline" size={22} color="#156860" />
            </Pressable>
          </View>
        }
      />
      <EmptyState
        title="Home / Dashboard — scaffold"
        message="Implement per FRONTEND_PLAN.md § Home. Wire getVaultItems(), stats, Quick Scan card, Recent Scans, Reminders preview, Family selector."
      />
    </Screen>
  );
}
