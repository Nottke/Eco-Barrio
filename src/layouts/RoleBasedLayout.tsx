import type { RouteChildrenProps } from 'react-router';

import { useAuth } from '../features/auth/context/AuthContext';

import { AdminLayout } from './AdminLayout';
import { CitizenLayout } from './CitizenLayout';

export function RoleBasedLayout(
  props: RouteChildrenProps,
) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user.role === 'ADMIN') {
    return <AdminLayout {...props} />;
  }

  return <CitizenLayout {...props} />;
}