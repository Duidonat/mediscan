import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function AddReminderScreen({ navigation }: StackProps<'AddReminder'>) {
  return (
    <ScreenStub
      title="Add Reminder"
      routeName="AddReminder"
      planRef="Add Reminder"
      showBack
      onBack={() => navigation.goBack()}
    />
  );
}
