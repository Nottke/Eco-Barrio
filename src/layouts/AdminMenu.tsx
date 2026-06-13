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
  analyticsOutline,
  calendarOutline,
  documentTextOutline,
  logOutOutline,
  mapOutline,
  newspaperOutline,
  personCircleOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

import { useAuth } from '../features/auth';

type Props = {
  menuId?: string;
  contentId?: string;
};

export function AdminMenu({
  menuId = 'eco-admin-menu',
  contentId = 'eco-admin-main',
}: Props) {
  const { logout, user } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.replace('/login');
  };

  return (
    <IonMenu
      contentId={contentId}
      menuId={menuId}
      type="overlay"
    >
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Eco-Barrio Admin</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-top">
        {user?.name ? (
          <IonItem
            lines="none"
            className="ion-margin-bottom"
          >
            <IonIcon
              icon={personCircleOutline}
              slot="start"
              aria-hidden
            />

            <IonLabel>
              <h2>Administrador</h2>
              <p>{user.name}</p>
            </IonLabel>
          </IonItem>
        ) : null}

        <IonNote
          className="ion-padding-horizontal ion-margin-bottom"
          color="medium"
        >
          Gestión ambiental comunal de Santo Domingo.
        </IonNote>

        <IonList lines="none">
          <IonMenuToggle autoHide={false}>
            <IonItem
              routerLink="/app/admin"
              routerDirection="root"
            >
              <IonIcon
                icon={shieldCheckmarkOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>Panel administrativo</IonLabel>
            </IonItem>

            <IonItem routerLink="/app/admin/reportes">
              <IonIcon
                icon={documentTextOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>Gestionar reportes</IonLabel>
            </IonItem>

            <IonItem routerLink="/app/admin/noticias">
              <IonIcon
                icon={newspaperOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>Gestionar noticias</IonLabel>
            </IonItem>

            <IonItem routerLink="/app/admin/eventos">
              <IonIcon
                icon={calendarOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>Gestionar eventos</IonLabel>
            </IonItem>

            <IonItem routerLink="/app/admin/reciclaje">
              <IonIcon
                icon={mapOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>Gestionar reciclaje</IonLabel>
            </IonItem>

            <IonItem routerLink="/app/admin/indicadores">
              <IonIcon
                icon={analyticsOutline}
                slot="start"
                aria-hidden
              />
              <IonLabel>Gestionar indicadores</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonItem
            button
            detail={false}
            lines="full"
            onClick={handleLogout}
          >
            <IonIcon
              icon={logOutOutline}
              slot="start"
              aria-hidden
            />
            <IonLabel>Cerrar sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}