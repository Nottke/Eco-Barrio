import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonSpinner,
  IonText,
} from '@ionic/react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { CitizenTabHeader } from '../../../components/CitizenHeaders';

import { getEvents } from '../services';

type EventItem =
  Awaited<ReturnType<typeof getEvents>>[number];

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible obtener los eventos.';
}

function formatEventDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return date.toLocaleString('es-CL', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
}

function isPastEvent(dateValue: string): boolean {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return date.getTime() < Date.now();
}

const EcoEventsPage = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await getEvents();

      const orderedEvents = [...data].sort(
        (firstEvent, secondEvent) =>
          new Date(firstEvent.date).getTime() -
          new Date(secondEvent.date).getTime(),
      );

      setEvents(orderedEvents);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  const upcomingEvents = events.filter(
    (event) => !isPastEvent(event.date),
  );

  const pastEvents = events.filter(
    (event) => isPastEvent(event.date),
  );

  const renderEventCard = (
    event: EventItem,
    past: boolean,
  ) => (
    <IonCard
      key={event.id}
      style={{
        width: '100%',
        margin: 0,
        height: '100%',
      }}
    >
      <IonCardHeader>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <IonCardSubtitle>
            {formatEventDate(event.date)}
          </IonCardSubtitle>

          <IonBadge color={past ? 'medium' : 'success'}>
            {past ? 'Finalizado' : 'Próximo'}
          </IonBadge>
        </div>

        <IonCardTitle>{event.title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p
          style={{
            marginTop: 0,
            lineHeight: 1.5,
          }}
        >
          {event.description}
        </p>

        <p
          style={{
            marginBottom: 0,
          }}
        >
          <strong>Ubicación:</strong>{' '}
          {event.location}
        </p>
      </IonCardContent>
    </IonCard>
  );

  return (
    <IonPage>
      <CitizenTabHeader title="Eventos ecológicos" />

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
              Eventos ecológicos
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Revisa las próximas actividades ambientales
                organizadas para la comunidad.
              </p>
            </IonText>
          </section>

          {errorMessage ? (
            <IonText color="danger">
              <p style={{ padding: '0 0.5rem' }}>
                {errorMessage}
              </p>
            </IonText>
          ) : null}

          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '2rem',
              }}
            >
              <IonSpinner name="crescent" />
            </div>
          ) : null}

          {!loading && events.length === 0 ? (
            <IonText color="medium">
              <p style={{ padding: '0 0.5rem' }}>
                No existen eventos registrados actualmente.
              </p>
            </IonText>
          ) : null}

          {!loading && upcomingEvents.length > 0 ? (
            <section>
              <h2
                style={{
                  padding: '0 0.5rem',
                  marginBottom: '1rem',
                }}
              >
                Próximos eventos
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1rem',
                  padding: '0 0.5rem',
                }}
              >
                {upcomingEvents.map((event) =>
                  renderEventCard(event, false),
                )}
              </div>
            </section>
          ) : null}

          {!loading && pastEvents.length > 0 ? (
            <section
              style={{
                marginTop: '2rem',
              }}
            >
              <h2
                style={{
                  padding: '0 0.5rem',
                  marginBottom: '1rem',
                }}
              >
                Eventos finalizados
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1rem',
                  padding: '0 0.5rem',
                  opacity: 0.8,
                }}
              >
                {pastEvents.map((event) =>
                  renderEventCard(event, true),
                )}
              </div>
            </section>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EcoEventsPage;