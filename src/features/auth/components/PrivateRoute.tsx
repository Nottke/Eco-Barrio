import type { ComponentType } from 'react';

import { Redirect, Route } from 'react-router-dom';

import type { RouteChildrenProps } from 'react-router';

import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

type PrivateRouteProps = {
  component: ComponentType<RouteChildrenProps>;
  path: string;
  exact?: boolean;
  requiredRole?: UserRole;
};

export function PrivateRoute({
  component: Component,
  path,
  exact,
  requiredRole,
}: PrivateRouteProps) {
  const { user, busy } = useAuth();

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if (busy) {
          return (
            <div className="ion-padding" style={{ textAlign: 'center' }}>
              Cargando…
            </div>
          );
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }

        if (requiredRole && user.role !== requiredRole) {
          return <Redirect to="/app/inicio" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}