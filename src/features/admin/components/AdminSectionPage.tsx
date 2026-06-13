import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

type AdminSectionPageProps = {
  title: string;
  description: string;
};

export function AdminSectionPage({
  title,
  description,
}: AdminSectionPageProps) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton menu="eco-admin-menu" />
          </IonButtons>

          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <h1>{title}</h1>
        <p style={{ opacity: 0.8 }}>{description}</p>
      </IonContent>
    </IonPage>
  );
}