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
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  createIndicator,
  deleteIndicator,
  getAutomaticIndicators,
  getIndicators,
  updateIndicator,
} from '../../indicators/services';

import type {
  AutomaticIndicatorsResponse,
  EnvironmentalIndicator,
  IndicatorPayload,
} from '../../indicators/types';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible completar la operación.';
}

const AdminIndicatorsPage = () => {
  const [indicators, setIndicators] =
    useState<EnvironmentalIndicator[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [indicatorToDelete, setIndicatorToDelete] =
    useState<EnvironmentalIndicator | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [automaticData, setAutomaticData] =
    useState<AutomaticIndicatorsResponse | null>(null);    

  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('');

  const loadIndicators = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const [
        manualIndicators,
        automaticIndicators,
      ] = await Promise.all([
        getIndicators(),
        getAutomaticIndicators(),
      ]);

      setIndicators(manualIndicators);
      setAutomaticData(automaticIndicators);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadIndicators();
  }, [loadIndicators]);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setValue('');
    setUnit('');
  };

  const handleStartEdit = (
    indicator: EnvironmentalIndicator,
  ) => {
    setEditingId(indicator.id);
    setName(indicator.name);
    setValue(String(indicator.value));
    setUnit(indicator.unit);

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

  const handleSaveIndicator = async () => {
    const trimmedName = name.trim();
    const trimmedValue = value.trim();
    const trimmedUnit = unit.trim();

    if (trimmedName.length < 3 || trimmedName.length > 100) {
      setErrorMessage(
        'El nombre debe tener entre 3 y 100 caracteres.',
      );
      setSuccessMessage('');
      return;
    }

    if (trimmedUnit.length > 30) {
      setErrorMessage(
        'La unidad no puede superar los 30 caracteres.',
      );
      setSuccessMessage('');
      return;
    }

    if (!trimmedName || !trimmedValue || !trimmedUnit) {
      setErrorMessage(
        'El nombre, el valor y la unidad son obligatorios.',
      );
      setSuccessMessage('');
      return;
    }

    const numericValue = Number(trimmedValue);

    if (numericValue < 0) {
      setErrorMessage('El valor no puede ser negativo.');
      setSuccessMessage('');
      return;
    }

    if (numericValue > 1_000_000_000) {
      setErrorMessage(
        'El valor supera el máximo permitido.',
      );
      setSuccessMessage('');
      return;
    }

    if (!Number.isFinite(numericValue)) {
      setErrorMessage(
        'El valor debe ser numérico.',
      );
      setSuccessMessage('');
      return;
    }

    const payload: IndicatorPayload = {
      name: trimmedName,
      value: numericValue,
      unit: trimmedUnit,
    };

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (editingId !== null) {
        const updatedIndicator =
          await updateIndicator(
            editingId,
            payload,
          );

        setIndicators((currentIndicators) =>
          currentIndicators.map((indicator) =>
            indicator.id === editingId
              ? updatedIndicator
              : indicator,
          ),
        );

        setSuccessMessage(
          'Indicador actualizado correctamente.',
        );
      } else {
        const createdIndicator =
          await createIndicator(payload);

        setIndicators((currentIndicators) => [
          createdIndicator,
          ...currentIndicators,
        ]);

        setSuccessMessage(
          'Indicador creado correctamente.',
        );
      }

      resetForm();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteIndicator = async () => {
    if (!indicatorToDelete) {
      return;
    }

    const indicatorId = indicatorToDelete.id;

    setDeletingId(indicatorId);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await deleteIndicator(indicatorId);

      setIndicators((currentIndicators) =>
        currentIndicators.filter(
          (indicator) =>
            indicator.id !== indicatorId,
        ),
      );

      if (editingId === indicatorId) {
        resetForm();
      }

      setIndicatorToDelete(null);
      setSuccessMessage(
        'Indicador eliminado correctamente.',
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

          <IonTitle>Gestionar indicadores</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <h1>Indicadores ambientales</h1>

        <p style={{ opacity: 0.8 }}>
          Administra indicadores manuales relacionados con el
          desempeño ambiental y la participación comunal.
        </p>

        {automaticData ? (
          <>
            <h2>Resumen automático del sistema</h2>

            <p style={{ opacity: 0.75 }}>
              Calculado desde los datos reales registrados en Eco-Barrio.
            </p>

            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Reportes ciudadanos</IonCardSubtitle>
                <IonCardTitle>
                  {automaticData.indicators.totalReports} reportes
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <p>
                  Pendientes: {automaticData.indicators.pendingReports}
                </p>
                <p>
                  Aprobados: {automaticData.indicators.approvedReports}
                </p>
                <p>
                  Rechazados: {automaticData.indicators.rejectedReports}
                </p>
                <p>
                  Resueltos: {automaticData.indicators.resolvedReports}
                </p>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Contenido y participación</IonCardSubtitle>
                <IonCardTitle>Actividad comunal</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <p>
                  Noticias publicadas: {automaticData.indicators.totalNews}
                </p>
                <p>
                  Eventos próximos: {automaticData.indicators.upcomingEvents}
                </p>
                <p>
                  Puntos de reciclaje: {automaticData.indicators.totalRecyclingPoints}
                </p>
              </IonCardContent>
            </IonCard>

            <IonText color="medium">
              <p style={{ fontSize: '0.9rem' }}>
                Última actualización:{' '}
                {new Date(
                  automaticData.generatedAt,
                ).toLocaleString('es-CL')}
              </p>
            </IonText>
          </>
        ) : null}

        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              Información ambiental
            </IonCardSubtitle>

            <IonCardTitle>
              {isEditing
                ? `Editar indicador #${editingId}`
                : 'Crear indicador'}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">
                Nombre *
              </IonLabel>

              <IonInput
                value={name}
                placeholder="Ej. Participación ciudadana"
                disabled={saving}
                onIonInput={(event) =>
                  setName(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Valor *
              </IonLabel>

              <IonInput
                type="number"
                value={value}
                placeholder="Ej. 150"
                disabled={saving}
                onIonInput={(event) =>
                  setValue(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Unidad *
              </IonLabel>

              <IonInput
                value={unit}
                placeholder="Ej. personas, %, puntos"
                disabled={saving}
                onIonInput={(event) =>
                  setUnit(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonText color="medium">
              <p style={{ fontSize: '0.9rem' }}>
                * Campos obligatorios
              </p>
            </IonText>

            <IonButton
              expand="block"
              className="ion-margin-top"
              disabled={saving}
              onClick={() =>
                void handleSaveIndicator()
              }
            >
              {saving
                ? 'Guardando...'
                : isEditing
                  ? 'Guardar cambios'
                  : 'Crear indicador'}
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
          onClick={() =>
            void loadIndicators()
          }
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

        {!loading &&
        indicators.length === 0 ? (
          <IonText color="medium">
            <p>
              No existen indicadores registrados actualmente.
            </p>
          </IonText>
        ) : null}

        {!loading &&
          indicators.map((indicator) => {
            const isDeleting =
              deletingId === indicator.id;

            return (
              <IonCard key={indicator.id}>
                <IonCardHeader>
                  <IonCardSubtitle>
                    Indicador #{indicator.id}
                  </IonCardSubtitle>

                  <IonCardTitle>
                    {indicator.name}
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <p>
                    <strong>Valor:</strong>{' '}
                    {indicator.value}{' '}
                    {indicator.unit}
                  </p>

                  <p>
                    <strong>Creado:</strong>{' '}
                    {indicator.createdAt &&
                    !Number.isNaN(
                      new Date(
                        indicator.createdAt,
                      ).getTime(),
                    )
                      ? new Date(
                          indicator.createdAt,
                        ).toLocaleString('es-CL')
                      : 'Fecha no disponible'}
                  </p>

                  <IonButton
                    size="small"
                    fill="outline"
                    disabled={saving || isDeleting}
                    onClick={() =>
                      handleStartEdit(indicator)
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
                      setIndicatorToDelete(
                        indicator,
                      )
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
        isOpen={indicatorToDelete !== null}
        header="Eliminar indicador"
        message={
          indicatorToDelete
            ? `¿Deseas eliminar definitivamente el indicador "${indicatorToDelete.name}"?`
            : ''
        }
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () =>
              setIndicatorToDelete(null),
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              void handleDeleteIndicator();
            },
          },
        ]}
        onDidDismiss={() => {
          if (deletingId === null) {
            setIndicatorToDelete(null);
          }
        }}
      />
    </IonPage>
  );
};

export default AdminIndicatorsPage;
