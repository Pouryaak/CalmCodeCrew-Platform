import { ReactNode } from 'react';

export interface IMenuItem {
  title: string;
  key: string;
  icon: ReactNode;
  to: string;
  roles: Array<'admin' | 'participant'>;
}
