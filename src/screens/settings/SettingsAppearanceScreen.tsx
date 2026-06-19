import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function SettingsAppearanceScreen({ navigation }: StackProps<'SettingsAppearance'>) {
  return (
    <ScreenStub title="Appearance" routeName="SettingsAppearance" planRef="Settings — Appearance" showBack onBack={() => navigation.goBack()} />
  );
}
