import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
} from '@ionic/react';

import { CitizenStackHeader } from '../../../components/CitizenHeaders';

const AdminDashboardPage = () => (
  <IonPage>
    <CitizenStackHeader title="Administración Eco-Barrio" />
    <IonContent fullscreen className="ion-padding">
      <p style={{ opacity: 0.85 }}>
        Espacio provisional para funcionarios: validaciones y difusión conectadas al backend cuando existan.
      </p>

      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Reportes ciudadanos</IonCardSubtitle>
          <IonCardTitle>Bandeja de validación</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Aprobar, rechazar o solicitar información adicional cuando el servidor esté listo.
          <IonButton expand="block" disabled className="ion-margin-top">
            Abrir revisión simulada
          </IonButton>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Comunicación</IonCardSubtitle>
          <IonCardTitle>Campañas y eventos</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Publicar calendario de ferias ambientales y noticias oficiales.
          <IonButton expand="block" disabled fill="outline" className="ion-margin-top">
            Crear publicación (demo)
          </IonButton>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Datos comunales</IonCardSubtitle>
          <IonCardTitle>Información institucional</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Actualización de contenidos públicos revisados antes de llegar al usuario final.
          <IonButton expand="block" disabled fill="clear" className="ion-margin-top">
            Editar ficha institucional
          </IonButton>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
);

export default AdminDashboardPage;
