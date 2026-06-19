import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function SettingsLanguageScreen({ navigation }: StackProps<'SettingsLanguage'>) {
  return (
    <ScreenStub title="Language" routeName="SettingsLanguage" planRef="Settings — Language" showBack onBack={() => navigation.goBack()} />
  );
}
