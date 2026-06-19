import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function FamilyMemberScreen({ navigation, route }: StackProps<'FamilyMember'>) {
  return (
    <ScreenStub
      title={`Member — ${route.params.memberId}`}
      routeName="FamilyMember"
      planRef="Family Member Overview"
      showBack
      onBack={() => navigation.goBack()}
    />
  );
}
