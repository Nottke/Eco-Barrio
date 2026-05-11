import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
} from '@ionic/react';

import { listRecyclingPoints } from '../../../services/mockContent.service';
import { CitizenStackHeader } from '../../../components/CitizenHeaders';

const RecyclingPointsPage = () => {
  const points = listRecyclingPoints();

  return (
    <IonPage>
      <CitizenStackHeader title="Puntos de reciclaje" />
      <IonContent fullscreen className="ion-padding">
        <p style={{ opacity: 0.8 }}>
          Lista ilustrativa; pronto se pueden enlazar mapas cuando haya datos oficiales.
        </p>
        {points.map((p) => (
          <IonCard key={p.id}>
            <IonCardHeader>
              <IonCardSubtitle>{p.schedule}</IonCardSubtitle>
              <IonCardTitle>{p.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{p.address}</p>
              <IonBadge color="secondary" className="ion-margin-top">
                {p.accepts}
              </IonBadge>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default RecyclingPointsPage;
