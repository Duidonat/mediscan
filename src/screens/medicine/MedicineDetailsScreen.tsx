import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function MedicineDetailsScreen({ navigation }: StackProps<'MedicineDetails'>) {
  return (
    <ScreenStub
      title="Medicine Details"
      routeName="MedicineDetails"
      planRef="Medicine Details"
      showBack
      onBack={() => navigation.goBack()}
    />
  );
}
