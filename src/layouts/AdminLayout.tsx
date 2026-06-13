import {
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/react';

import {
  Redirect,
  Route,
} from 'react-router-dom';

import type { RouteChildrenProps } from 'react-router';

import {
  AdminDashboardPage,
  AdminEventsPage,
  AdminIndicatorsPage,
  AdminNewsPage,
  AdminRecyclingPage,
  AdminReportsPage,
} from '../features/admin';

import { AdminMenu } from './AdminMenu';

export function AdminLayout(
  _props: RouteChildrenProps,
) {
  return (
    <IonSplitPane
      contentId="eco-admin-main"
      when="lg"
    >
      <AdminMenu />

      <IonPage id="eco-admin-main">
        <IonRouterOutlet>
        <Route
            exact
            path="/app"
            render={() => (
            <Redirect to="/app/admin" />
            )}
        />

        <Route
            exact
            path="/app/inicio"
            render={() => (
            <Redirect to="/app/admin" />
            )}
        />

        <Route
            exact
            path="/app/admin"
            component={AdminDashboardPage}
        />

        <Route
            exact
            path="/app/admin/reportes"
            component={AdminReportsPage}
        />

        <Route
            exact
            path="/app/admin/noticias"
            component={AdminNewsPage}
        />

        <Route
            exact
            path="/app/admin/eventos"
            component={AdminEventsPage}
        />

        <Route
            exact
            path="/app/admin/reciclaje"
            component={AdminRecyclingPage}
        />

        <Route
            exact
            path="/app/admin/indicadores"
            component={AdminIndicatorsPage}
        />
        </IonRouterOutlet>
      </IonPage>
    </IonSplitPane>
  );
}