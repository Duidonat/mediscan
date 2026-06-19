import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppBar } from '../../components/AppBar';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { FeatureTile } from '../../components/FeatureTile';
import { Screen } from '../../components/Screen';
import { RootStackParamList } from '../../navigation/types';

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Screen>
      <AppBar title="Settings" subtitle="Profile and app preferences" />
      <EmptyState
        title="Settings / Profile — scaffold"
        message="Implement per FRONTEND_PLAN.md § Settings. Sub-screens stubbed below."
      />
      <FeatureTile title="Appearance" description="Theme, text size, accent color" icon="color-palette-outline" onPress={() => navigation.navigate('SettingsAppearance')} />
      <FeatureTile title="Backup & Restore" description="Create and restore vault backups" icon="cloud-outline" onPress={() => navigation.navigate('SettingsBackup')} />
      <FeatureTile title="Language" description="App language preference" icon="language-outline" onPress={() => navigation.navigate('SettingsLanguage')} />
      <FeatureTile title="Notifications" description="Expiry and reminder alerts" icon="notifications-outline" onPress={() => navigation.navigate('SettingsNotifications')} />
      <FeatureTile title="Family Profiles" description="Manage family members" icon="people-outline" onPress={() => navigation.navigate('FamilyProfiles')} />
      <FeatureTile title="QVAC Helpdesk" description="Ask medicine questions" icon="chatbubble-ellipses-outline" onPress={() => navigation.navigate('Helpdesk')} />
      <FeatureTile title="Local Database" description="Browse reference medicines" icon="library-outline" onPress={() => navigation.navigate('Database')} />
      <Button title="Open Choose Scan Type" variant="ghost" onPress={() => navigation.navigate('ChooseScanType')} />
    </Screen>
  );
}
