import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonNote,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react';

import { useAuth } from '../../auth';
import { CitizenTabHeader } from '../../../components/CitizenHeaders';

const CitizenDashboardPage = () => {
  const { user } = useAuth();

  return (
    <IonPage>
      <CitizenTabHeader title="Inicio — Eco-Barrio" />
      <IonContent fullscreen className="ion-padding">
        <IonText color="medium">
          <p>
            Aplicación en desarrollo para la comuna de Santo Domingo.
          </p>
        </IonText>

        {user?.name ? (
          <h2 className="ion-margin-top">Hola, {user.name}</h2>
        ) : (
          <h2 className="ion-margin-top">Bienvenida o bienvenido</h2>
        )}

        <IonNote color="medium" className="ion-margin-vertical">
          Interfaz priorizada para simplicidad y conectividad variable en sectores
          rurales.
        </IonNote>

        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Participación</IonCardSubtitle>
                  <IonCardTitle>Reportar un problema ambiental</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Basura, alumbrado público, vertederos improvisados… Cuéntanos y
                  validaremos cuando exista backend.
                  <IonButton expand="block" className="ion-margin-top" routerLink="/app/reportar">
                    Ir al formulario
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Información útil</IonCardSubtitle>
                  <IonCardTitle>Puntos de reciclaje y horarios</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Consulta ubicaciones cercanas desde el menú o aquí mismo.
                  <IonButton expand="block" fill="outline" className="ion-margin-top" routerLink="/app/reciclaje">
                    Ver puntos
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Fechas próximas</IonCardSubtitle>
                  <IonCardTitle>Eventos ecológicos</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Ferias del reciclaje, talleres y campañas de la comuna.
                  <IonButton expand="block" fill="outline" className="ion-margin-top" routerLink="/app/eventos">
                    Ver eventos
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonCard color="secondary">
                <IonCardHeader>
                  <IonCardSubtitle>Transparencia</IonCardSubtitle>
                  <IonCardTitle>Indicadores comunales</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Resumen amigable (datos ficticios hasta conectar servidor).
                  <IonButton expand="block" fill="clear" color="primary" routerLink="/app/indicadores">
                    Explorar
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CitizenDashboardPage;
