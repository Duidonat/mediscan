import React from 'react';
import { AppBar } from '../../components/AppBar';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';

export function RemindersScreen() {
  return (
    <Screen>
      <AppBar title="Reminders" subtitle="Expiry alerts and medication schedules" />
      <EmptyState
        title="Reminder Center — scaffold"
        message="Implement per FRONTEND_PLAN.md § Reminder Center. [mock] AsyncStorage reminders store."
      />
    </Screen>
  );
}
