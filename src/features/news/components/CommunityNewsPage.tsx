import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonText,
} from '@ionic/react';

import { listEcoNews } from '../../../services/mockContent.service';
import { CitizenTabHeader } from '../../../components/CitizenHeaders';

const CommunityNewsPage = () => {
  const articles = listEcoNews();

  return (
    <IonPage>
      <CitizenTabHeader title="Noticias comunales" />
      <IonContent fullscreen className="ion-padding">
        <IonText color="medium">
          <p>Actualización ambiental y campañas de la comuna (contenido de ejemplo).</p>
        </IonText>

        {articles.map((a) => (
          <IonCard key={a.id}>
            <IonCardHeader>
              <IonCardSubtitle>{a.date}</IonCardSubtitle>
              <IonCardTitle>{a.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{a.summary}</p>
              <IonBadge color="medium" className="ion-margin-top">
                Educación ambiental
              </IonBadge>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default CommunityNewsPage;
