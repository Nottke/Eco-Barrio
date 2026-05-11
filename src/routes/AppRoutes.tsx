import { IonRouterOutlet } from '@ionic/react';

import { Redirect, Route } from 'react-router-dom';

import {
  AuthProvider,
  LoginPage,
  PrivateRoute,
  RegisterPage,
} from '../features';

import { CitizenLayout } from '../layouts/CitizenLayout';

export function AppRoutes() {
  return (
    <AuthProvider>
      <IonRouterOutlet>
        <Route exact path="/admin">
          <Redirect to="/app/admin" />
        </Route>

        <Route exact path="/home">
          <Redirect to="/app/inicio" />
        </Route>

        <Route exact path="/report-problem">
          <Redirect to="/app/reportar" />
        </Route>

        <Route exact path="/login" component={LoginPage} />

        <Route exact path="/register" component={RegisterPage} />

        <PrivateRoute path="/app" exact={false} component={CitizenLayout} />

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </AuthProvider>
  );
}
