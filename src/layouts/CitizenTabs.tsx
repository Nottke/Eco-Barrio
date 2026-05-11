import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';

import { Route } from 'react-router-dom';

import {
  calendarOutline,
  homeOutline,
  leafOutline,
  newspaperOutline,
} from 'ionicons/icons';

import { CitizenDashboardPage } from '../features/dashboard';
import { EcoEventsPage } from '../features/events';
import { CommunityNewsPage } from '../features/news';
import { ReportProblemPage } from '../features/reports';

export function CitizenTabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/inicio" component={CitizenDashboardPage} />
        <Route exact path="/app/noticias" component={CommunityNewsPage} />
        <Route exact path="/app/reportar" component={ReportProblemPage} />
        <Route exact path="/app/eventos" component={EcoEventsPage} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="inicio" href="/app/inicio">
          <IonIcon aria-hidden icon={homeOutline} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="noticias" href="/app/noticias">
          <IonIcon aria-hidden icon={newspaperOutline} />
          <IonLabel>Noticias</IonLabel>
        </IonTabButton>
        <IonTabButton tab="reportar" href="/app/reportar">
          <IonIcon aria-hidden icon={leafOutline} />
          <IonLabel>Reportar</IonLabel>
        </IonTabButton>
        <IonTabButton tab="eventos" href="/app/eventos">
          <IonIcon aria-hidden icon={calendarOutline} />
          <IonLabel>Eventos</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
