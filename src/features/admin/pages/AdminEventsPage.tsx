import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '../../events/services';

import type {
  EnvironmentalEvent,
  EventPayload,
} from '../../events/types';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible completar la operación.';
}

function getDefaultEventDate(): string {
  const date = new Date();

  date.setHours(date.getHours() + 1);
  date.setMinutes(0, 0, 0);

  return date.toISOString();
}

function formatEventDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return date.toLocaleString('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

const AdminEventsPage = () => {
  const [events, setEvents] =
    useState<EnvironmentalEvent[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [eventToDelete, setEventToDelete] =
    useState<EnvironmentalEvent | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(
    getDefaultEventDate(),
  );

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await getEvents();

      setEvents(
        [...data].sort(
          (first, second) =>
            new Date(first.date).getTime() -
            new Date(second.date).getTime(),
        ),
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setLocation('');
    setDate(getDefaultEventDate());
  };

  const handleStartEdit = (
    event: EnvironmentalEvent,
  ) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setLocation(event.location);
    setDate(event.date);

    setErrorMessage('');
    setSuccessMessage('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCancelEdit = () => {
    resetForm();
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSaveEvent = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedLocation = location.trim();

    if (
      !trimmedTitle ||
      !trimmedDescription ||
      !trimmedLocation ||
      !date
    ) {
      setErrorMessage(
        'El título, la descripción, la ubicación y la fecha son obligatorios.',
      );
      setSuccessMessage('');
      return;
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      setErrorMessage(
        'La fecha seleccionada no es válida.',
      );
      setSuccessMessage('');
      return;
    }

    const payload: EventPayload = {
      title: trimmedTitle,
      description: trimmedDescription,
      location: trimmedLocation,
      date: parsedDate.toISOString(),
    };

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (editingId !== null) {
        const updatedEvent = await updateEvent(
          editingId,
          payload,
        );

        setEvents((currentEvents) =>
          currentEvents
            .map((event) =>
              event.id === editingId
                ? updatedEvent
                : event,
            )
            .sort(
              (first, second) =>
                new Date(first.date).getTime() -
                new Date(second.date).getTime(),
            ),
        );

        setSuccessMessage(
          'Evento actualizado correctamente.',
        );
      } else {
        const createdEvent =
          await createEvent(payload);

        setEvents((currentEvents) =>
          [createdEvent, ...currentEvents].sort(
            (first, second) =>
              new Date(first.date).getTime() -
              new Date(second.date).getTime(),
          ),
        );

        setSuccessMessage(
          'Evento creado correctamente.',
        );
      }

      resetForm();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete) {
      return;
    }

    const eventId = eventToDelete.id;

    setDeletingId(eventId);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await deleteEvent(eventId);

      setEvents((currentEvents) =>
        currentEvents.filter(
          (event) => event.id !== eventId,
        ),
      );

      if (editingId === eventId) {
        resetForm();
      }

      setEventToDelete(null);
      setSuccessMessage(
        'Evento eliminado correctamente.',
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  const isEditing = editingId !== null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton menu="eco-admin-menu" />
          </IonButtons>

          <IonTitle>Gestionar eventos</IonTitle>
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
              Eventos ecológicos
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Administra actividades ambientales, jornadas
                comunitarias, talleres y campañas ecológicas.
              </p>
            </IonText>
          </section>

          <IonCard
            style={{
              margin: '0 0.5rem 1.5rem',
            }}
          >
            <IonCardHeader>
              <IonCardSubtitle>
                Actividad comunal
              </IonCardSubtitle>

              <IonCardTitle>
                {isEditing
                  ? `Editar evento #${editingId}`
                  : 'Crear evento'}
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonList lines="full">
                <IonItem>
                  <IonLabel position="stacked">
                    Título *
                  </IonLabel>

                  <IonInput
                    value={title}
                    maxlength={150}
                    placeholder="Ej. Jornada de limpieza comunitaria"
                    disabled={saving}
                    onIonInput={(event) =>
                      setTitle(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">
                    Descripción *
                  </IonLabel>

                  <IonTextarea
                    value={description}
                    maxlength={2000}
                    rows={5}
                    autoGrow
                    placeholder="Describe la actividad"
                    disabled={saving}
                    onIonInput={(event) =>
                      setDescription(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">
                    Ubicación *
                  </IonLabel>

                  <IonInput
                    value={location}
                    maxlength={200}
                    placeholder="Ej. Plaza principal de Santo Domingo"
                    disabled={saving}
                    onIonInput={(event) =>
                      setLocation(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem lines="none">
                  <IonLabel position="stacked">
                    Fecha y hora *
                  </IonLabel>

                  <IonDatetime
                    value={date}
                    presentation="date-time"
                    disabled={saving}
                    onIonChange={(event) => {
                      const selectedValue =
                        event.detail.value;

                      if (
                        typeof selectedValue === 'string'
                      ) {
                        setDate(selectedValue);
                      }
                    }}
                  />
                </IonItem>
              </IonList>

              <IonNote
                color="medium"
                style={{
                  display: 'block',
                  marginTop: '1rem',
                }}
              >
                * Campos obligatorios.
              </IonNote>

              <IonButton
                expand="block"
                className="ion-margin-top"
                disabled={saving}
                onClick={() =>
                  void handleSaveEvent()
                }
              >
                {saving
                  ? 'Guardando...'
                  : isEditing
                    ? 'Guardar cambios'
                    : 'Crear evento'}
              </IonButton>

              {isEditing ? (
                <IonButton
                  expand="block"
                  fill="outline"
                  color="medium"
                  disabled={saving}
                  onClick={handleCancelEdit}
                >
                  Cancelar edición
                </IonButton>
              ) : null}

              {saving ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '1rem',
                  }}
                >
                  <IonSpinner name="dots" />
                </div>
              ) : null}
            </IonCardContent>
          </IonCard>

          {successMessage ? (
            <IonText color="success">
              <p style={{ padding: '0 0.5rem' }}>
                {successMessage}
              </p>
            </IonText>
          ) : null}

          {errorMessage ? (
            <IonText color="danger">
              <p style={{ padding: '0 0.5rem' }}>
                {errorMessage}
              </p>
            </IonText>
          ) : null}

          <section
            style={{
              padding: '0 0.5rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: '0.35rem',
                  }}
                >
                  Eventos registrados
                </h2>

                <IonText color="medium">
                  <p style={{ margin: 0 }}>
                    {events.length}{' '}
                    {events.length === 1
                      ? 'evento registrado'
                      : 'eventos registrados'}
                  </p>
                </IonText>
              </div>

              <IonButton
                fill="outline"
                disabled={loading}
                onClick={() =>
                  void loadEvents()
                }
              >
                {loading
                  ? 'Actualizando...'
                  : 'Actualizar lista'}
              </IonButton>
            </div>
          </section>

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

          {!loading && events.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1rem',
                padding: '0 0.5rem',
              }}
            >
              {events.map((event) => {
                const isDeleting =
                  deletingId === event.id;

                return (
                  <IonCard
                    key={event.id}
                    style={{
                      width: '100%',
                      height: '100%',
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <IonCardHeader>
                      <IonCardSubtitle>
                        Evento #{event.id}
                      </IonCardSubtitle>

                      <IonCardTitle>
                        {event.title}
                      </IonCardTitle>
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
                          lineHeight: 1.5,
                        }}
                      >
                        {event.description}
                      </p>

                      <p>
                        <strong>Ubicación:</strong>{' '}
                        {event.location}
                      </p>

                      <IonText color="medium">
                        <p>
                          <strong>Fecha:</strong>{' '}
                          {formatEventDate(event.date)}
                        </p>
                      </IonText>

                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          marginTop: 'auto',
                        }}
                      >
                        <IonButton
                          size="small"
                          fill="outline"
                          disabled={
                            saving || isDeleting
                          }
                          onClick={() =>
                            handleStartEdit(event)
                          }
                        >
                          Editar
                        </IonButton>

                        <IonButton
                          size="small"
                          color="danger"
                          fill="clear"
                          disabled={
                            saving || isDeleting
                          }
                          onClick={() =>
                            setEventToDelete(event)
                          }
                        >
                          Eliminar
                        </IonButton>

                        {isDeleting ? (
                          <IonSpinner name="dots" />
                        ) : null}
                      </div>
                    </IonCardContent>
                  </IonCard>
                );
              })}
            </div>
          ) : null}
        </div>
      </IonContent>

      <IonAlert
        isOpen={eventToDelete !== null}
        header="Eliminar evento"
        message={
          eventToDelete
            ? `¿Deseas eliminar definitivamente el evento "${eventToDelete.title}"?`
            : ''
        }
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () =>
              setEventToDelete(null),
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              void handleDeleteEvent();
            },
          },
        ]}
        onDidDismiss={() => {
          if (deletingId === null) {
            setEventToDelete(null);
          }
        }}
      />
    </IonPage>
  );
};

export default AdminEventsPage;