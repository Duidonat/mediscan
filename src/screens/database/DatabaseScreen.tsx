import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function DatabaseScreen({ navigation }: StackProps<'Database'>) {
  return (
    <ScreenStub title="Local Database" routeName="Database" planRef="Database" showBack onBack={() => navigation.goBack()} />
  );
}
