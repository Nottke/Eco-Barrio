import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonText,
} from '@ionic/react';

import { listEcoEvents } from '../../../services/mockContent.service';
import { CitizenTabHeader } from '../../../components/CitizenHeaders';

const EcoEventsPage = () => {
  const rows = listEcoEvents();

  return (
    <IonPage>
      <CitizenTabHeader title="Eventos ecológicos" />
      <IonContent fullscreen className="ion-padding">
        <IonText color="medium">
          <p>Inscríbete en actividades gratuitas priorizadas para familias y adultos de 35–50 años.</p>
        </IonText>

        {rows.map((e) => (
          <IonCard key={e.id}>
            <IonCardHeader>
              <IonCardSubtitle>
                {e.date} · {e.place}
              </IonCardSubtitle>
              <IonCardTitle>{e.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{e.spotsHint}</p>
              <IonButton expand="block" disabled className="ion-margin-top">
                Inscribirse (demo)
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default EcoEventsPage;
