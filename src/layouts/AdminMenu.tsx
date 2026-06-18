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

import './AdminMenu.css';

type Props = {
  menuId?: string;
  contentId?: string;
};

type AdminMenuOption = {
  label: string;
  path: string;
  icon: string;
};

const ADMIN_MENU_OPTIONS: AdminMenuOption[] = [
  {
    label: 'Panel administrativo',
    path: '/app/admin',
    icon: shieldCheckmarkOutline,
  },
  {
    label: 'Gestionar reportes',
    path: '/app/admin/reportes',
    icon: documentTextOutline,
  },
  {
    label: 'Gestionar noticias',
    path: '/app/admin/noticias',
    icon: newspaperOutline,
  },
  {
    label: 'Gestionar eventos',
    path: '/app/admin/eventos',
    icon: calendarOutline,
  },
  {
    label: 'Gestionar reciclaje',
    path: '/app/admin/reciclaje',
    icon: mapOutline,
  },
  {
    label: 'Gestionar indicadores',
    path: '/app/admin/indicadores',
    icon: analyticsOutline,
  },
];

export function AdminMenu({
  menuId = 'eco-admin-menu',
  contentId = 'eco-admin-main',
}: Props) {
  const { logout, user } = useAuth();

  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    history.replace('/login');
  };

  const isActiveRoute = (path: string): boolean => {
    if (path === '/app/admin') {
      return location.pathname === '/app/admin';
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
          <IonTitle>Eco-Barrio Admin</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="eco-admin-menu-content">
        {user?.name ? (
          <IonItem
            lines="none"
            className="eco-admin-menu-user"
          >
            <IonIcon
              icon={personCircleOutline}
              slot="start"
              aria-hidden
            />

            <IonLabel>
              <h2>Bienvenido, administrador</h2>
              <p>{user.name}</p>
            </IonLabel>
          </IonItem>
        ) : null}

        <IonNote
          className="eco-admin-menu-description"
          color="medium"
        >
          Gestión ambiental comunal de Santo Domingo
        </IonNote>

        <IonList
          lines="none"
          className="eco-admin-menu-list"
        >
          <IonMenuToggle autoHide={false}>
            {ADMIN_MENU_OPTIONS.map((option) => {
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
                      ? 'eco-admin-menu-option eco-admin-menu-option-active'
                      : 'eco-admin-menu-option'
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
          </IonMenuToggle>

          <IonItem
            button
            detail={false}
            lines="full"
            className="eco-admin-menu-logout"
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