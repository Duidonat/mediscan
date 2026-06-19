import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function SettingsBackupScreen({ navigation }: StackProps<'SettingsBackup'>) {
  return (
    <ScreenStub title="Backup & Restore" routeName="SettingsBackup" planRef="Settings — Backup & Restore" showBack onBack={() => navigation.goBack()} />
  );
}
