import { useHistory } from 'react-router-dom';

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  barChartOutline,
  calendarOutline,
  homeOutline,
  leafOutline,
  logOutOutline,
  newspaperOutline,
  notificationsOutline,
  personCircleOutline,
  shieldOutline,
} from 'ionicons/icons';

import { useAuth } from '../features/auth';

type Props = {
  menuId?: string;
  contentId?: string;
};

export function AppMenu({ menuId = 'eco-menu', contentId = 'eco-main' }: Props) {
  const { logout, user } = useAuth();
  const history = useHistory();

  const closeFlow = () => {
    logout();
    history.replace('/login');
  };

  return (
    <IonMenu contentId={contentId} menuId={menuId} type="overlay">
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Eco-Barrio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-top">
        {user?.name ? (
          <IonItem lines="none" className="ion-margin-bottom">
            <IonIcon icon={personCircleOutline} slot="start" aria-hidden />
            <IonLabel>
              <h2>Hola,</h2>
              <p>{user.name}</p>
            </IonLabel>
          </IonItem>
        ) : null}

        <IonNote className="ion-padding-horizontal ion-margin-bottom" color="medium">
          Santo Domingo — participación y ambiente (solo frontend piloto).
        </IonNote>

        <IonList lines="none">
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/app/inicio" routerDirection="root">
              <IonIcon icon={homeOutline} slot="start" aria-hidden />
              <IonLabel>Inicio</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/noticias" routerDirection="root">
              <IonIcon icon={newspaperOutline} slot="start" aria-hidden />
              <IonLabel>Noticias comunales</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/eventos">
              <IonIcon icon={calendarOutline} slot="start" aria-hidden />
              <IonLabel>Eventos</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/reportar">
              <IonIcon icon={leafOutline} slot="start" aria-hidden />
              <IonLabel>Reportar problema</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/reciclaje">
              <IonLabel>Puntos de reciclaje</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/indicadores">
              <IonIcon icon={barChartOutline} slot="start" aria-hidden />
              <IonLabel>Indicadores</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/notificaciones">
              <IonIcon icon={notificationsOutline} slot="start" aria-hidden />
              <IonLabel>Notificaciones</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/admin">
              <IonIcon icon={shieldOutline} slot="start" aria-hidden />
              <IonLabel>Administración</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonItem button detail={false} lines="full" onClick={() => closeFlow()}>
            <IonIcon icon={logOutOutline} slot="start" aria-hidden />
            <IonLabel>Cerrar sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
