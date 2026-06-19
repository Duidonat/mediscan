import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function FamilyMemberMedicinesScreen({ navigation, route }: StackProps<'FamilyMemberMedicines'>) {
  return (
    <ScreenStub
      title={`Medicines — ${route.params.memberId}`}
      routeName="FamilyMemberMedicines"
      planRef="Family Member Medicines"
      showBack
      onBack={() => navigation.goBack()}
    />
  );
}
