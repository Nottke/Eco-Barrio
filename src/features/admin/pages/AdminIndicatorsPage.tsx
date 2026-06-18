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

function formatDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return date.toLocaleString('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

type AutomaticSummaryCardProps = {
  subtitle: string;
  title: string;
  value: number;
};

const AutomaticSummaryCard = ({
  subtitle,
  title,
  value,
}: AutomaticSummaryCardProps) => (
  <IonCard
    style={{
      width: '100%',
      height: '100%',
      margin: 0,
    }}
  >
    <IonCardHeader>
      <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      <IonCardTitle>{title}</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      <p
        style={{
          margin: 0,
          fontSize: '1.8rem',
          fontWeight: 600,
        }}
      >
        {value}
      </p>
    </IonCardContent>
  </IonCard>
);

const AdminIndicatorsPage = () => {
  const [indicators, setIndicators] =
    useState<EnvironmentalIndicator[]>([]);

  const [automaticData, setAutomaticData] =
    useState<AutomaticIndicatorsResponse | null>(null);

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

    if (!trimmedName || !trimmedValue || !trimmedUnit) {
      setErrorMessage(
        'El nombre, el valor y la unidad son obligatorios.',
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

    if (trimmedUnit.length > 30) {
      setErrorMessage(
        'La unidad no puede superar los 30 caracteres.',
      );
      setSuccessMessage('');
      return;
    }

    const numericValue = Number(trimmedValue);

    if (!Number.isFinite(numericValue)) {
      setErrorMessage(
        'El valor debe ser numérico.',
      );
      setSuccessMessage('');
      return;
    }

    if (numericValue < 0) {
      setErrorMessage(
        'El valor no puede ser negativo.',
      );
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
              Indicadores ambientales
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Consulta el resumen automático del sistema y administra
                indicadores ambientales publicados manualmente.
              </p>
            </IonText>
          </section>

          {automaticData ? (
            <section
              style={{
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  padding: '0 0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: '0.35rem',
                  }}
                >
                  Resumen automático del sistema
                </h2>

                <IonText color="medium">
                  <p style={{ margin: 0 }}>
                    Calculado desde los datos reales registrados en
                    Eco-Barrio.
                  </p>
                </IonText>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem',
                  padding: '0 0.5rem',
                }}
              >
                <AutomaticSummaryCard
                  subtitle="Participación ciudadana"
                  title="Reportes registrados"
                  value={
                    automaticData.indicators.totalReports
                  }
                />

                <AutomaticSummaryCard
                  subtitle="Gestión ambiental"
                  title="Reportes pendientes"
                  value={
                    automaticData.indicators.pendingReports
                  }
                />

                <AutomaticSummaryCard
                  subtitle="Gestión ambiental"
                  title="Reportes resueltos"
                  value={
                    automaticData.indicators.resolvedReports
                  }
                />

                <AutomaticSummaryCard
                  subtitle="Información comunal"
                  title="Noticias publicadas"
                  value={
                    automaticData.indicators.totalNews
                  }
                />

                <AutomaticSummaryCard
                  subtitle="Actividades comunales"
                  title="Eventos próximos"
                  value={
                    automaticData.indicators.upcomingEvents
                  }
                />

                <AutomaticSummaryCard
                  subtitle="Infraestructura ambiental"
                  title="Puntos de reciclaje"
                  value={
                    automaticData.indicators
                      .totalRecyclingPoints
                  }
                />
              </div>

              <IonText color="medium">
                <p
                  style={{
                    padding: '0 0.5rem',
                    marginTop: '1rem',
                    marginBottom: 0,
                    fontSize: '0.9rem',
                  }}
                >
                  Última actualización:{' '}
                  {formatDate(
                    automaticData.generatedAt,
                  )}
                </p>
              </IonText>
            </section>
          ) : null}

          <IonCard
            style={{
              margin: '0 0.5rem 1.5rem',
            }}
          >
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
              <IonList lines="full">
                <IonItem>
                  <IonLabel position="stacked">
                    Nombre *
                  </IonLabel>

                  <IonInput
                    value={name}
                    maxlength={100}
                    placeholder="Ej. Participación ciudadana"
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
                    Valor *
                  </IonLabel>

                  <IonInput
                    type="number"
                    value={value}
                    min="0"
                    max="1000000000"
                    step="any"
                    placeholder="Ej. 150"
                    disabled={saving}
                    onIonInput={(event) =>
                      setValue(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem lines="none">
                  <IonLabel position="stacked">
                    Unidad *
                  </IonLabel>

                  <IonInput
                    value={unit}
                    maxlength={30}
                    placeholder="Ej. personas, %, puntos"
                    disabled={saving}
                    onIonInput={(event) =>
                      setUnit(
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
                }}
              >
                * Campos obligatorios.
              </IonNote>

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
                  Indicadores publicados
                </h2>

                <IonText color="medium">
                  <p style={{ margin: 0 }}>
                    {indicators.length}{' '}
                    {indicators.length === 1
                      ? 'indicador registrado'
                      : 'indicadores registrados'}
                  </p>
                </IonText>
              </div>

              <IonButton
                fill="outline"
                disabled={loading}
                onClick={() =>
                  void loadIndicators()
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

          {!loading && indicators.length === 0 ? (
            <IonText color="medium">
              <p style={{ padding: '0 0.5rem' }}>
                No existen indicadores registrados actualmente.
              </p>
            </IonText>
          ) : null}

          {!loading && indicators.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
                padding: '0 0.5rem',
              }}
            >
              {indicators.map((indicator) => {
                const isDeleting =
                  deletingId === indicator.id;

                return (
                  <IonCard
                    key={indicator.id}
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
                        Indicador #{indicator.id}
                      </IonCardSubtitle>

                      <IonCardTitle>
                        {indicator.name}
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
                          fontSize: '1.65rem',
                          fontWeight: 600,
                        }}
                      >
                        {indicator.value}{' '}
                        {indicator.unit}
                      </p>

                      <IonText color="medium">
                        <p>
                          Creado el{' '}
                          {formatDate(
                            indicator.createdAt,
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
                            handleStartEdit(
                              indicator,
                            )
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
                            setIndicatorToDelete(
                              indicator,
                            )
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
