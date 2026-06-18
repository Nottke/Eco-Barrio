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
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

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
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <section
          style={{
            padding: '0 0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <h1
            style={{
              marginTop: 0,
              marginBottom: '0.5rem',
            }}
          >
            Panel administrativo
          </h1>

          <IonText color="medium">
            <p
              style={{
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Gestiona los contenidos, reportes e información ambiental
              de la comuna de Santo Domingo.
            </p>
          </IonText>
        </section>

        <IonGrid style={{ padding: 0 }}>
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
                title="Gestionar reportes"
                description="Revisa los problemas ambientales informados por la comunidad y actualiza su estado."
                buttonText="Abrir reportes"
                routerLink="/app/admin/reportes"
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
                subtitle="Información ambiental"
                title="Gestionar noticias"
                description="Publica y mantiene actualizadas las noticias, campañas y comunicaciones ambientales."
                buttonText="Abrir noticias"
                routerLink="/app/admin/noticias"
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
                title="Gestionar eventos"
                description="Administra ferias, talleres, jornadas de limpieza y otras iniciativas ecológicas."
                buttonText="Abrir eventos"
                routerLink="/app/admin/eventos"
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
                subtitle="Infraestructura ambiental"
                title="Gestionar reciclaje"
                description="Mantén actualizados los puntos de reciclaje, ubicaciones, horarios y residuos aceptados."
                buttonText="Abrir puntos de reciclaje"
                routerLink="/app/admin/reciclaje"
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
                subtitle="Seguimiento comunal"
                title="Gestionar indicadores"
                description="Consulta los datos automáticos del sistema y administra indicadores ambientales manuales."
                buttonText="Abrir indicadores"
                routerLink="/app/admin/indicadores"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  </IonPage>
);

export default AdminDashboardPage;
