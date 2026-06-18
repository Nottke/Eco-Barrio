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
  createRecyclingPoint,
  deleteRecyclingPoint,
  getRecyclingPoints,
  updateRecyclingPoint,
} from '../../recycling/services';

import type {
  RecyclingPoint,
  RecyclingPointPayload,
} from '../../recycling/types';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible completar la operación.';
}

function parseOptionalCoordinate(
  value: string,
): number | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const parsedValue = Number(trimmedValue);

  return Number.isFinite(parsedValue)
    ? parsedValue
    : Number.NaN;
}

function formatCreatedAt(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return date.toLocaleString('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

const AdminRecyclingPage = () => {
  const [points, setPoints] =
    useState<RecyclingPoint[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [pointToDelete, setPointToDelete] =
    useState<RecyclingPoint | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');

  const loadPoints = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await getRecyclingPoints();
      setPoints(data);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPoints();
  }, [loadPoints]);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setAddress('');
    setLatitude('');
    setLongitude('');
    setDescription('');
  };

  const handleStartEdit = (
    point: RecyclingPoint,
  ) => {
    setEditingId(point.id);
    setName(point.name);
    setAddress(point.address);

    setLatitude(
      point.latitude !== null
        ? String(point.latitude)
        : '',
    );

    setLongitude(
      point.longitude !== null
        ? String(point.longitude)
        : '',
    );

    setDescription(point.description ?? '');

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

  const handleSavePoint = async () => {
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedAddress) {
      setErrorMessage(
        'El nombre y la dirección son obligatorios.',
      );
      setSuccessMessage('');
      return;
    }

    if (
      trimmedName.length < 3 ||
      trimmedName.length > 100
    ) {
      setErrorMessage(
        'El nombre debe tener entre 3 y 100 caracteres.',
      );
      setSuccessMessage('');
      return;
    }

    if (
      trimmedAddress.length < 5 ||
      trimmedAddress.length > 200
    ) {
      setErrorMessage(
        'La dirección debe tener entre 5 y 200 caracteres.',
      );
      setSuccessMessage('');
      return;
    }

    if (trimmedDescription.length > 500) {
      setErrorMessage(
        'La descripción no puede superar los 500 caracteres.',
      );
      setSuccessMessage('');
      return;
    }

    const parsedLatitude =
      parseOptionalCoordinate(latitude);

    const parsedLongitude =
      parseOptionalCoordinate(longitude);

    if (Number.isNaN(parsedLatitude)) {
      setErrorMessage(
        'La latitud debe ser un número válido.',
      );
      setSuccessMessage('');
      return;
    }

    if (Number.isNaN(parsedLongitude)) {
      setErrorMessage(
        'La longitud debe ser un número válido.',
      );
      setSuccessMessage('');
      return;
    }

    const hasLatitude = parsedLatitude !== null;
    const hasLongitude = parsedLongitude !== null;

    if (hasLatitude !== hasLongitude) {
      setErrorMessage(
        'Debes ingresar latitud y longitud juntas.',
      );
      setSuccessMessage('');
      return;
    }

    if (
      parsedLatitude !== null &&
      (
        parsedLatitude < -90 ||
        parsedLatitude > 90
      )
    ) {
      setErrorMessage(
        'La latitud debe estar entre -90 y 90.',
      );
      setSuccessMessage('');
      return;
    }

    if (
      parsedLongitude !== null &&
      (
        parsedLongitude < -180 ||
        parsedLongitude > 180
      )
    ) {
      setErrorMessage(
        'La longitud debe estar entre -180 y 180.',
      );
      setSuccessMessage('');
      return;
    }

    const payload: RecyclingPointPayload = {
      name: trimmedName,
      address: trimmedAddress,
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      description: trimmedDescription || null,
    };

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (editingId !== null) {
        const updatedPoint =
          await updateRecyclingPoint(
            editingId,
            payload,
          );

        setPoints((currentPoints) =>
          currentPoints.map((point) =>
            point.id === editingId
              ? updatedPoint
              : point,
          ),
        );

        setSuccessMessage(
          'Punto de reciclaje actualizado correctamente.',
        );
      } else {
        const createdPoint =
          await createRecyclingPoint(payload);

        setPoints((currentPoints) => [
          createdPoint,
          ...currentPoints,
        ]);

        setSuccessMessage(
          'Punto de reciclaje creado correctamente.',
        );
      }

      resetForm();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePoint = async () => {
    if (!pointToDelete) {
      return;
    }

    const pointId = pointToDelete.id;

    setDeletingId(pointId);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await deleteRecyclingPoint(pointId);

      setPoints((currentPoints) =>
        currentPoints.filter(
          (point) => point.id !== pointId,
        ),
      );

      if (editingId === pointId) {
        resetForm();
      }

      setPointToDelete(null);

      setSuccessMessage(
        'Punto de reciclaje eliminado correctamente.',
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

          <IonTitle>Gestionar reciclaje</IonTitle>
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
              Puntos de reciclaje
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Administra las ubicaciones, direcciones y coordenadas
                de los puntos de reciclaje de Santo Domingo.
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
                Infraestructura ambiental
              </IonCardSubtitle>

              <IonCardTitle>
                {isEditing
                  ? `Editar punto #${editingId}`
                  : 'Crear punto de reciclaje'}
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonList lines="full">
                <IonItem>
                  <IonLabel position="stacked">
                    Nombre *
                  </IonLabel>

                  <IonInput
                    value={name}
                    maxlength={100}
                    placeholder="Ej. Punto limpio municipal"
                    disabled={saving}
                    onIonInput={(event) =>
                      setName(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">
                    Dirección *
                  </IonLabel>

                  <IonInput
                    value={address}
                    maxlength={200}
                    placeholder="Ej. Av. Principal 123"
                    disabled={saving}
                    onIonInput={(event) =>
                      setAddress(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">
                    Latitud (opcional)
                  </IonLabel>

                  <IonInput
                    type="number"
                    value={latitude}
                    min="-90"
                    max="90"
                    step="any"
                    placeholder="-33.635"
                    disabled={saving}
                    onIonInput={(event) =>
                      setLatitude(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">
                    Longitud (opcional)
                  </IonLabel>

                  <IonInput
                    type="number"
                    value={longitude}
                    min="-180"
                    max="180"
                    step="any"
                    placeholder="-71.615"
                    disabled={saving}
                    onIonInput={(event) =>
                      setLongitude(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem lines="none">
                  <IonLabel position="stacked">
                    Descripción (opcional)
                  </IonLabel>

                  <IonTextarea
                    value={description}
                    maxlength={500}
                    rows={4}
                    autoGrow
                    placeholder="Información adicional, horarios o residuos aceptados"
                    disabled={saving}
                    onIonInput={(event) =>
                      setDescription(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>
              </IonList>

              <IonNote
                color="medium"
                style={{
                  display: 'block',
                  marginTop: '1rem',
                  lineHeight: 1.5,
                }}
              >
                * Campos obligatorios. Si agregas coordenadas,
                debes completar latitud y longitud.
              </IonNote>

              <IonButton
                expand="block"
                className="ion-margin-top"
                disabled={saving}
                onClick={() =>
                  void handleSavePoint()
                }
              >
                {saving
                  ? 'Guardando...'
                  : isEditing
                    ? 'Guardar cambios'
                    : 'Crear punto'}
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
                  Puntos registrados
                </h2>

                <IonText color="medium">
                  <p style={{ margin: 0 }}>
                    {points.length}{' '}
                    {points.length === 1
                      ? 'punto registrado'
                      : 'puntos registrados'}
                  </p>
                </IonText>
              </div>

              <IonButton
                fill="outline"
                disabled={loading}
                onClick={() =>
                  void loadPoints()
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

          {!loading && points.length === 0 ? (
            <IonText color="medium">
              <p style={{ padding: '0 0.5rem' }}>
                No existen puntos de reciclaje registrados
                actualmente.
              </p>
            </IonText>
          ) : null}

          {!loading && points.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1rem',
                padding: '0 0.5rem',
              }}
            >
              {points.map((point) => {
                const isDeleting =
                  deletingId === point.id;

                return (
                  <IonCard
                    key={point.id}
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
                        Punto #{point.id}
                      </IonCardSubtitle>

                      <IonCardTitle>
                        {point.name}
                      </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent
                      style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                      }}
                    >
                      <p style={{ marginTop: 0 }}>
                        <strong>Dirección:</strong>{' '}
                        {point.address}
                      </p>

                      {point.description ? (
                        <p
                          style={{
                            lineHeight: 1.5,
                          }}
                        >
                          <strong>Descripción:</strong>{' '}
                          {point.description}
                        </p>
                      ) : null}

                      <p>
                        <strong>Coordenadas:</strong>{' '}
                        {point.latitude !== null &&
                        point.longitude !== null
                          ? `${point.latitude}, ${point.longitude}`
                          : 'No registradas'}
                      </p>

                      <IonText color="medium">
                        <p>
                          <strong>Creado:</strong>{' '}
                          {formatCreatedAt(
                            point.createdAt,
                          )}
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
                            handleStartEdit(point)
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
                            setPointToDelete(point)
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
        isOpen={pointToDelete !== null}
        header="Eliminar punto de reciclaje"
        message={
          pointToDelete
            ? `¿Deseas eliminar definitivamente el punto "${pointToDelete.name}"?`
            : ''
        }
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () =>
              setPointToDelete(null),
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              void handleDeletePoint();
            },
          },
        ]}
        onDidDismiss={() => {
          if (deletingId === null) {
            setPointToDelete(null);
          }
        }}
      />
    </IonPage>
  );
};

export default AdminRecyclingPage;
