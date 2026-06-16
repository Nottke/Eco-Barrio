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
  IonMenuButton,
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

const AdminRecyclingPage = () => {
  const [points, setPoints] = useState<RecyclingPoint[]>([]);
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

    if (
      parsedLatitude !== null &&
      (parsedLatitude < -90 ||
        parsedLatitude > 90)
    ) {
      setErrorMessage(
        'La latitud debe estar entre -90 y 90.',
      );
      setSuccessMessage('');
      return;
    }

    if (
      parsedLongitude !== null &&
      (parsedLongitude < -180 ||
        parsedLongitude > 180)
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
        <h1>Puntos de reciclaje</h1>

        <p style={{ opacity: 0.8 }}>
          Administra ubicaciones, direcciones y coordenadas de los puntos de reciclaje de Santo Domingo.
        </p>

        <IonCard>
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
            <IonItem>
              <IonLabel position="stacked">
                Nombre
              </IonLabel>

              <IonInput
                value={name}
                placeholder="Ej. Punto limpio municipal"
                disabled={saving}
                onIonInput={(event) =>
                  setName(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Dirección
              </IonLabel>

              <IonInput
                value={address}
                placeholder="Ej. Av. Principal 123"
                disabled={saving}
                onIonInput={(event) =>
                  setAddress(event.detail.value ?? '')
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
                placeholder="-33.635"
                disabled={saving}
                onIonInput={(event) =>
                  setLatitude(event.detail.value ?? '')
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
                placeholder="-71.615"
                disabled={saving}
                onIonInput={(event) =>
                  setLongitude(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Descripción (opcional)
              </IonLabel>

              <IonTextarea
                value={description}
                placeholder="Información adicional, horarios o residuos aceptados"
                autoGrow
                disabled={saving}
                onIonInput={(event) =>
                  setDescription(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonButton
              expand="block"
              className="ion-margin-top"
              disabled={saving}
              onClick={() => void handleSavePoint()}
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
                fill="clear"
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
            <p>{successMessage}</p>
          </IonText>
        ) : null}

        {errorMessage ? (
          <IonText color="danger">
            <p>{errorMessage}</p>
          </IonText>
        ) : null}

        <IonButton
          fill="outline"
          disabled={loading}
          onClick={() => void loadPoints()}
        >
          Actualizar lista
        </IonButton>

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
            <p>
              No existen puntos de reciclaje registrados actualmente.
            </p>
          </IonText>
        ) : null}

        {!loading &&
          points.map((point) => {
            const isDeleting =
              deletingId === point.id;

            return (
              <IonCard key={point.id}>
                <IonCardHeader>
                  <IonCardSubtitle>
                    Punto #{point.id}
                  </IonCardSubtitle>

                  <IonCardTitle>
                    {point.name}
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <p>
                    <strong>Dirección:</strong>{' '}
                    {point.address}
                  </p>

                  {point.description ? (
                    <p>{point.description}</p>
                  ) : null}

                  {point.latitude !== null &&
                  point.longitude !== null ? (
                    <p>
                      <strong>Coordenadas:</strong>{' '}
                      {point.latitude},{' '}
                      {point.longitude}
                    </p>
                  ) : (
                    <p>
                      <strong>Coordenadas:</strong>{' '}
                      No registradas
                    </p>
                  )}

                  <p>
                    <strong>Creado:</strong>{' '}
                    {new Date(
                      point.createdAt,
                    ).toLocaleString('es-CL')}
                  </p>

                  <IonButton
                    size="small"
                    fill="outline"
                    disabled={saving || isDeleting}
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
                    disabled={saving || isDeleting}
                    onClick={() =>
                      setPointToDelete(point)
                    }
                  >
                    Eliminar
                  </IonButton>

                  {isDeleting ? (
                    <IonSpinner
                      name="dots"
                      className="ion-margin-start"
                    />
                  ) : null}
                </IonCardContent>
              </IonCard>
            );
          })}
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