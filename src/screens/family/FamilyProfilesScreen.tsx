import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function FamilyProfilesScreen({ navigation }: StackProps<'FamilyProfiles'>) {
  return (
    <ScreenStub
      title="Family Profiles"
      routeName="FamilyProfiles"
      planRef="Family Profiles"
      showBack
      onBack={() => navigation.goBack()}
    />
  );
}
