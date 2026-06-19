import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function ReminderDetailsScreen({ navigation }: StackProps<'ReminderDetails'>) {
  return (
    <ScreenStub
      title="Reminder Details"
      routeName="ReminderDetails"
      planRef="Reminder Details"
      showBack
      onBack={() => navigation.goBack()}
    />
  );
}
