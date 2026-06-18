import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonToggle,
  useIonToast,
} from '@ionic/react';

import {
  useEffect,
  useState,
} from 'react';

import { CitizenStackHeader } from '../../../components/CitizenHeaders';

type NotificationPreferences = {
  campaigns: boolean;
  events: boolean;
  pickup: boolean;
};

const STORAGE_KEY =
  'eco-barrio-notification-preferences';

const DEFAULT_PREFERENCES: NotificationPreferences = {
  campaigns: false,
  events: true,
  pickup: true,
};

function loadStoredPreferences(): NotificationPreferences {
  try {
    const storedValue =
      localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return DEFAULT_PREFERENCES;
    }

    const parsedValue =
      JSON.parse(storedValue) as Partial<NotificationPreferences>;

    return {
      campaigns:
        typeof parsedValue.campaigns === 'boolean'
          ? parsedValue.campaigns
          : DEFAULT_PREFERENCES.campaigns,

      events:
        typeof parsedValue.events === 'boolean'
          ? parsedValue.events
          : DEFAULT_PREFERENCES.events,

      pickup:
        typeof parsedValue.pickup === 'boolean'
          ? parsedValue.pickup
          : DEFAULT_PREFERENCES.pickup,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

const NotificationsSettingsPage = () => {
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(
      DEFAULT_PREFERENCES,
    );

  const [loaded, setLoaded] = useState(false);

  const [presentToast] = useIonToast();

  useEffect(() => {
    setPreferences(loadStoredPreferences());
    setLoaded(true);
  }, []);

  const updatePreference = (
    key: keyof NotificationPreferences,
    checked: boolean,
  ) => {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [key]: checked,
    }));
  };

  const handleSavePreferences = async () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(preferences),
      );

      await presentToast({
        message:
          'Preferencias guardadas correctamente.',
        duration: 2200,
        color: 'success',
      });
    } catch {
      await presentToast({
        message:
          'No fue posible guardar las preferencias.',
        duration: 2500,
        color: 'danger',
      });
    }
  };

  return (
    <IonPage>
      <CitizenStackHeader title="Notificaciones ambientales" />

      <IonContent fullscreen className="ion-padding">
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          <section
            style={{
              padding: '0 0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <h1
              style={{
                marginTop: 0,
                marginBottom: '0.5rem',
              }}
            >
              Notificaciones ambientales
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Selecciona la información ambiental que deseas
                recibir y guarda tus preferencias en este
                dispositivo.
              </p>
            </IonText>
          </section>

          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>
                Preferencias personales
              </IonCardSubtitle>

              <IonCardTitle>
                Tipos de notificación
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonList lines="full">
                <IonItem>
                  <IonLabel>
                    <h2>Campañas y ferias cercanas</h2>
                    <p>
                      Actividades comunitarias y campañas
                      ambientales realizadas en la comuna.
                    </p>
                  </IonLabel>

                  <IonToggle
                    slot="end"
                    aria-label="Notificaciones de campañas y ferias cercanas"
                    checked={preferences.campaigns}
                    disabled={!loaded}
                    onIonChange={(event) =>
                      updatePreference(
                        'campaigns',
                        event.detail.checked,
                      )
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel>
                    <h2>Nuevos eventos ecológicos</h2>
                    <p>
                      Información sobre talleres, jornadas y
                      eventos ambientales publicados.
                    </p>
                  </IonLabel>

                  <IonToggle
                    slot="end"
                    aria-label="Notificaciones de nuevos eventos ecológicos"
                    checked={preferences.events}
                    disabled={!loaded}
                    onIonChange={(event) =>
                      updatePreference(
                        'events',
                        event.detail.checked,
                      )
                    }
                  />
                </IonItem>

                <IonItem lines="none">
                  <IonLabel>
                    <h2>Rutas de reciclaje móvil</h2>
                    <p>
                      Avisos relacionados con operativos y rutas
                      de recolección de residuos reciclables.
                    </p>
                  </IonLabel>

                  <IonToggle
                    slot="end"
                    aria-label="Notificaciones de rutas de reciclaje móvil"
                    checked={preferences.pickup}
                    disabled={!loaded}
                    onIonChange={(event) =>
                      updatePreference(
                        'pickup',
                        event.detail.checked,
                      )
                    }
                  />
                </IonItem>
              </IonList>

              <IonText color="medium">
                <p
                  style={{
                    marginTop: '1.25rem',
                    marginBottom: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Estas preferencias se almacenan localmente en
                  el navegador y permanecerán disponibles en este
                  dispositivo.
                </p>
              </IonText>

              <IonButton
                expand="block"
                className="ion-margin-top"
                disabled={!loaded}
                onClick={() =>
                  void handleSavePreferences()
                }
              >
                Guardar preferencias
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificationsSettingsPage;
