import { IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react';

import { Redirect, Route } from 'react-router-dom';

import type { RouteChildrenProps } from 'react-router';

import { AdminDashboardPage } from '../features/admin';
import { EnvironmentalIndicatorsPage } from '../features/indicators';
import { NotificationsSettingsPage } from '../features/notifications';
import { RecyclingPointsPage } from '../features/recycling';

import { AppMenu } from './AppMenu';
import { CitizenTabs } from './CitizenTabs';

const TAB_HOME_PATHS: string[] = [
  '/app/inicio',
  '/app/noticias',
  '/app/reportar',
  '/app/eventos',
];

export function CitizenLayout(_props: RouteChildrenProps) {
  return (
    <IonSplitPane contentId="eco-main" when="lg">
      <AppMenu />
      <IonPage id="eco-main">
        <IonRouterOutlet>
          <Route exact path="/app" render={() => <Redirect to="/app/inicio" />} />

          <Route exact path="/app/reciclaje" component={RecyclingPointsPage} />
          <Route exact path="/app/indicadores" component={EnvironmentalIndicatorsPage} />
          <Route
            exact
            path="/app/notificaciones"
            component={NotificationsSettingsPage}
          />
          <Route exact path="/app/admin" component={AdminDashboardPage} />

          <Route
            path={TAB_HOME_PATHS}
            render={() => <CitizenTabs />}
          />
        </IonRouterOutlet>
      </IonPage>
    </IonSplitPane>
  );
}
