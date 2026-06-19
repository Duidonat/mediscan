import React from 'react';
import { AppBar } from '../../components/AppBar';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';

export function VaultScreen() {
  return (
    <Screen>
      <AppBar title="My Medicine Vault" subtitle="Search, filter, and manage saved medicines" />
      <EmptyState
        title="Medicine Vault — scaffold"
        message="Implement per FRONTEND_PLAN.md § Medicine Vault. Wire getVaultItems(), search, filter chips, sort."
      />
    </Screen>
  );
}
