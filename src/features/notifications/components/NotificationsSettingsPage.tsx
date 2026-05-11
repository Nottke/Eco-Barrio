import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonToggle,
  useIonToast,
} from '@ionic/react';

import { useState } from 'react';

import { CitizenStackHeader } from '../../../components/CitizenHeaders';

const NotificationsSettingsPage = () => {
  const [events, setEvents] = useState(true);
  const [campaigns, setCampaigns] = useState(false);
  const [pickup, setPickup] = useState(true);
  const [presentToast] = useIonToast();

  return (
    <IonPage>
      <CitizenStackHeader title="Notificaciones ambientales" />
      <IonContent fullscreen className="ion-padding-bottom">
        <IonNote color="medium" className="ion-margin-bottom ion-padding-horizontal">
          Sin backend: estos interruptores sólo validan UX con IonToggle sobre IonList.
        </IonNote>

        <IonList inset>
          <IonItem lines="full">
            <IonLabel>Campañas y ferias cercanas</IonLabel>
            <IonToggle
              checked={campaigns}
              onIonChange={(ev) => setCampaigns(ev.detail.checked)}
              slot="end"
            />
          </IonItem>
          <IonItem lines="full">
            <IonLabel>Nuevos eventos ecológicos</IonLabel>
            <IonToggle
              checked={events}
              onIonChange={(ev) => setEvents(ev.detail.checked)}
              slot="end"
            />
          </IonItem>
          <IonItem lines="full">
            <IonLabel>Rutas de reciclaje móvil</IonLabel>
            <IonToggle
              checked={pickup}
              onIonChange={(ev) => setPickup(ev.detail.checked)}
              slot="end"
            />
          </IonItem>
        </IonList>

        <p className="ion-padding-horizontal ion-margin-top" style={{ opacity: 0.85 }}>
          Con servidor real estas preferencias se guardarían en tu cuenta o en canales push
          (Capacitor / FCM).
        </p>

        <div className="ion-padding-horizontal ion-margin-top">
          <IonButton
            expand="block"
            fill="outline"
            onClick={() =>
              presentToast({
                message: 'Preferencias simuladas (solo frontend)',
                duration: 2000,
                color: 'success',
              })
            }
          >
            Simular guardar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificationsSettingsPage;
