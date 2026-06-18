import {
  useHistory,
  useLocation,
} from 'react-router-dom';

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
  mapOutline,
  shieldOutline,
} from 'ionicons/icons';

import { useAuth } from '../features/auth';

import './AppMenu.css';

type Props = {
  menuId?: string;
  contentId?: string;
};

type MenuOption = {
  label: string;
  path: string;
  icon: string;
};

const CITIZEN_MENU_OPTIONS: MenuOption[] = [
  {
    label: 'Inicio',
    path: '/app/inicio',
    icon: homeOutline,
  },
  {
    label: 'Noticias comunales',
    path: '/app/noticias',
    icon: newspaperOutline,
  },
  {
    label: 'Eventos',
    path: '/app/eventos',
    icon: calendarOutline,
  },
  {
    label: 'Reportar problema',
    path: '/app/reportar',
    icon: leafOutline,
  },
  {
    label: 'Puntos de reciclaje',
    path: '/app/reciclaje',
    icon: mapOutline,
  },
  {
    label: 'Indicadores',
    path: '/app/indicadores',
    icon: barChartOutline,
  },
  {
    label: 'Notificaciones',
    path: '/app/notificaciones',
    icon: notificationsOutline,
  },
];

export function AppMenu({
  menuId = 'eco-menu',
  contentId = 'eco-main',
}: Props) {
  const { logout, user } = useAuth();

  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    history.replace('/login');
  };

  const isActiveRoute = (path: string): boolean => {
    if (path === '/app/inicio') {
      return (
        location.pathname === '/app' ||
        location.pathname === '/app/inicio'
      );
    }

    return location.pathname.startsWith(path);
  };

  return (
    <IonMenu
      contentId={contentId}
      menuId={menuId}
      type="overlay"
    >
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Eco-Barrio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="eco-menu-content">
        {user?.name ? (
          <IonItem
            lines="none"
            className="eco-menu-user"
          >
            <IonIcon
              icon={personCircleOutline}
              slot="start"
              aria-hidden
            />

            <IonLabel>
              <h2>Bienvenido</h2>
              <p>{user.name}</p>
            </IonLabel>
          </IonItem>
        ) : null}

        <IonNote
          className="eco-menu-description"
          color="medium"
        >
          Santo Domingo — participación y ambiente
        </IonNote>

        <IonList lines="none" className="eco-menu-list">
          <IonMenuToggle autoHide={false}>
            {CITIZEN_MENU_OPTIONS.map((option) => {
              const isActive =
                isActiveRoute(option.path);

              return (
                <IonItem
                  key={option.path}
                  routerLink={option.path}
                  routerDirection="root"
                  detail={false}
                  aria-current={
                    isActive ? 'page' : undefined
                  }
                  className={
                    isActive
                      ? 'eco-menu-option eco-menu-option-active'
                      : 'eco-menu-option'
                  }
                >
                  <IonIcon
                    icon={option.icon}
                    slot="start"
                    aria-hidden
                  />

                  <IonLabel>{option.label}</IonLabel>
                </IonItem>
              );
            })}

            {user?.role === 'ADMIN' ? (
              <IonItem
                routerLink="/app/admin"
                routerDirection="root"
                detail={false}
                aria-current={
                  location.pathname.startsWith(
                    '/app/admin',
                  )
                    ? 'page'
                    : undefined
                }
                className={
                  location.pathname.startsWith(
                    '/app/admin',
                  )
                    ? 'eco-menu-option eco-menu-option-active'
                    : 'eco-menu-option'
                }
              >
                <IonIcon
                  icon={shieldOutline}
                  slot="start"
                  aria-hidden
                />

                <IonLabel>Administración</IonLabel>
              </IonItem>
            ) : null}
          </IonMenuToggle>

          <IonItem
            button
            detail={false}
            lines="full"
            className="eco-menu-logout"
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
