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
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react';

import { useAuth } from '../../auth';
import { CitizenTabHeader } from '../../../components/CitizenHeaders';

type DashboardCardProps = {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  routerLink: string;
};

const DashboardCard = ({
  subtitle,
  title,
  description,
  buttonText,
  routerLink,
}: DashboardCardProps) => (
  <IonCard
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
    }}
  >
    <IonCardHeader>
      <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      <IonCardTitle>{title}</IonCardTitle>
    </IonCardHeader>

    <IonCardContent
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <p
        style={{
          marginTop: 0,
          marginBottom: '1.25rem',
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      <IonButton
        expand="block"
        fill="outline"
        routerLink={routerLink}
        style={{
          marginTop: 'auto',
        }}
      >
        {buttonText}
      </IonButton>
    </IonCardContent>
  </IonCard>
);

const CitizenDashboardPage = () => {
  const { user } = useAuth();

  const displayName = user?.name?.trim() || 'usuario';

  return (
    <IonPage>
      <CitizenTabHeader title="Inicio" />

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
              marginBottom: '1.5rem',
              padding: '0 0.5rem',
            }}
          >
            <h1
              style={{
                marginTop: 0,
                marginBottom: '0.5rem',
              }}
            >
              Bienvenido, {displayName}
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Consulta información ambiental, participa en actividades
                comunales y reporta situaciones que requieran atención.
              </p>
            </IonText>
          </section>

          <IonGrid
            style={{
              padding: 0,
            }}
          >
            <IonRow>
              <IonCol
                size="12"
                sizeMd="6"
                style={{
                  display: 'flex',
                  padding: '0.5rem',
                }}
              >
                <DashboardCard
                  subtitle="Participación ciudadana"
                  title="Reportar un problema ambiental"
                  description="Informa problemas relacionados con basura, alumbrado, agua, canalización u otras situaciones ambientales."
                  buttonText="Ver formulario"
                  routerLink="/app/reportar"
                />
              </IonCol>

              <IonCol
                size="12"
                sizeMd="6"
                style={{
                  display: 'flex',
                  padding: '0.5rem',
                }}
              >
                <DashboardCard
                  subtitle="Información útil"
                  title="Puntos de reciclaje"
                  description="Consulta los puntos registrados en la comuna y revisa sus ubicaciones en el mapa interactivo."
                  buttonText="Ver puntos"
                  routerLink="/app/reciclaje"
                />
              </IonCol>

              <IonCol
                size="12"
                sizeMd="6"
                style={{
                  display: 'flex',
                  padding: '0.5rem',
                }}
              >
                <DashboardCard
                  subtitle="Actividades comunales"
                  title="Eventos ecológicos"
                  description="Revisa ferias, talleres, jornadas de limpieza y otras iniciativas ambientales de la comuna."
                  buttonText="Ver eventos"
                  routerLink="/app/eventos"
                />
              </IonCol>

              <IonCol
                size="12"
                sizeMd="6"
                style={{
                  display: 'flex',
                  padding: '0.5rem',
                }}
              >
                <DashboardCard
                  subtitle="Transparencia ambiental"
                  title="Indicadores comunales"
                  description="Consulta información resumida a partir de los reportes, eventos y puntos registrados en Eco-Barrio."
                  buttonText="Ver indicadores"
                  routerLink="/app/indicadores"
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CitizenDashboardPage;
