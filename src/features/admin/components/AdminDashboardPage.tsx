import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

const AdminDashboardPage = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton menu="eco-admin-menu" />
        </IonButtons>

        <IonTitle>Administración Eco-Barrio</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen className="ion-padding">
      <h1>Panel administrativo</h1>

      <p style={{ opacity: 0.8 }}>
        Gestiona los contenidos y la participación ambiental de la comuna de
        Santo Domingo.
      </p>

      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Participación ciudadana</IonCardSubtitle>
                <IonCardTitle>Gestionar reportes</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Revisa los problemas ambientales informados por la comunidad y
                actualiza su estado.

                <IonButton
                  expand="block"
                  routerLink="/app/admin/reportes"
                  className="ion-margin-top"
                >
                  Abrir reportes
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Información ambiental</IonCardSubtitle>
                <IonCardTitle>Gestionar noticias</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Publica y mantiene actualizadas las noticias, campañas y
                comunicaciones ambientales.

                <IonButton
                  expand="block"
                  fill="outline"
                  routerLink="/app/admin/noticias"
                  className="ion-margin-top"
                >
                  Abrir noticias
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Actividades comunales</IonCardSubtitle>
                <IonCardTitle>Gestionar eventos</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Administra ferias, talleres, jornadas de limpieza y otras
                iniciativas ecológicas.

                <IonButton
                  expand="block"
                  fill="outline"
                  routerLink="/app/admin/eventos"
                  className="ion-margin-top"
                >
                  Abrir eventos
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Infraestructura ambiental</IonCardSubtitle>
                <IonCardTitle>Gestionar reciclaje</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Mantén actualizados los puntos de reciclaje, ubicaciones,
                horarios y residuos aceptados.

                <IonButton
                  expand="block"
                  fill="outline"
                  routerLink="/app/admin/reciclaje"
                  className="ion-margin-top"
                >
                  Abrir puntos de reciclaje
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Seguimiento comunal</IonCardSubtitle>
                <IonCardTitle>Gestionar indicadores</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Consulta y administra información relacionada con reportes,
                eventos, reciclaje y participación ciudadana.

                <IonButton
                  expand="block"
                  fill="outline"
                  routerLink="/app/admin/indicadores"
                  className="ion-margin-top"
                >
                  Abrir indicadores
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

export default AdminDashboardPage;