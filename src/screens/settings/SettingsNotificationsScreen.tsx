import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function SettingsNotificationsScreen({ navigation }: StackProps<'SettingsNotifications'>) {
  return (
    <ScreenStub title="Notifications" routeName="SettingsNotifications" planRef="Settings — Notifications" showBack onBack={() => navigation.goBack()} />
  );
}
