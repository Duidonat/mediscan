import React from 'react';
import { StackProps, ScreenStub } from '../_shared/ScreenStub';

export function HelpdeskScreen({ navigation }: StackProps<'Helpdesk'>) {
  return (
    <ScreenStub title="QVAC Helpdesk" routeName="Helpdesk" planRef="Helpdesk" showBack onBack={() => navigation.goBack()} />
  );
}
