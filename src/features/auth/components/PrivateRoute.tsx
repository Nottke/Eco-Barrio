import type { ComponentType } from 'react';

import { Redirect, Route } from 'react-router-dom';

import type { RouteChildrenProps } from 'react-router';

import { useAuth } from '../context/AuthContext';

type PrivateRouteProps = {
  component: ComponentType<RouteChildrenProps>;
  path: string;
  exact?: boolean;
};

export function PrivateRoute({ component: Component, path, exact }: PrivateRouteProps) {
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
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        );
      }}
    />
  );
}
