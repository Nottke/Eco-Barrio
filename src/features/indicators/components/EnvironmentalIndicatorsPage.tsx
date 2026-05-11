import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
} from '@ionic/react';

import { listEnvIndicators } from '../../../services/mockContent.service';
import { CitizenStackHeader } from '../../../components/CitizenHeaders';

const EnvironmentalIndicatorsPage = () => {
  const indicators = listEnvIndicators();

  return (
    <IonPage>
      <CitizenStackHeader title="Indicadores ambientales" />
      <IonContent fullscreen className="ion-padding">
        {indicators.map((i) => (
          <IonCard key={i.id}>
            <IonCardHeader>
              <IonCardSubtitle>Comunal</IonCardSubtitle>
              <IonCardTitle>{i.label}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p style={{ fontSize: '1.65rem', fontWeight: 600 }}>
                {i.value}
                {i.unit ? ` ${i.unit}` : ''}
              </p>
              <p className="ion-margin-top" style={{ opacity: 0.85 }}>
                {i.note}
              </p>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default EnvironmentalIndicatorsPage;
