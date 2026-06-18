import {
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
  IonSpinner,
  IonText,
} from '@ionic/react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { CitizenStackHeader } from '../../../components/CitizenHeaders';

import {
  getAutomaticIndicators,
  getIndicators,
} from '../services';

import type {
  AutomaticIndicatorsResponse,
  EnvironmentalIndicator,
} from '../types';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible obtener los indicadores ambientales.';
}

type SummaryCardProps = {
  subtitle: string;
  title: string;
  value: number;
  unit?: string;
};

const SummaryCard = ({
  subtitle,
  title,
  value,
  unit,
}: SummaryCardProps) => (
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
          fontSize: '1.75rem',
          fontWeight: 600,
        }}
      >
        {value}
        {unit ? ` ${unit}` : ''}
      </p>
    </IonCardContent>
  </IonCard>
);

const EnvironmentalIndicatorsPage = () => {
  const [manualIndicators, setManualIndicators] =
    useState<EnvironmentalIndicator[]>([]);

  const [automaticData, setAutomaticData] =
    useState<AutomaticIndicatorsResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadIndicators = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const [
        manualData,
        automaticResponse,
      ] = await Promise.all([
        getIndicators(),
        getAutomaticIndicators(),
      ]);

      setManualIndicators(manualData);
      setAutomaticData(automaticResponse);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadIndicators();
  }, [loadIndicators]);

  return (
    <IonPage>
      <CitizenStackHeader title="Indicadores ambientales" />

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
                Consulta información generada a partir de los datos
                registrados en Eco-Barrio.
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

          {!loading && automaticData ? (
            <>
              <section
                style={{
                  padding: '0 0.5rem',
                  marginBottom: '0.75rem',
                }}
              >
                <h2
                  style={{
                    marginBottom: '0.35rem',
                  }}
                >
                  Resumen comunal
                </h2>

                <IonText color="medium">
                  <p style={{ margin: 0 }}>
                    Información calculada automáticamente desde los
                    registros actuales del sistema.
                  </p>
                </IonText>
              </section>

              <IonGrid style={{ padding: 0 }}>
                <IonRow>
                  <IonCol
                    size="12"
                    sizeSm="6"
                    sizeLg="3"
                    style={{
                      display: 'flex',
                      padding: '0.5rem',
                    }}
                  >
                    <SummaryCard
                      subtitle="Participación ciudadana"
                      title="Reportes registrados"
                      value={
                        automaticData.indicators.totalReports
                      }
                    />
                  </IonCol>

                  <IonCol
                    size="12"
                    sizeSm="6"
                    sizeLg="3"
                    style={{
                      display: 'flex',
                      padding: '0.5rem',
                    }}
                  >
                    <SummaryCard
                      subtitle="Gestión ambiental"
                      title="Reportes resueltos"
                      value={
                        automaticData.indicators.resolvedReports
                      }
                    />
                  </IonCol>

                  <IonCol
                    size="12"
                    sizeSm="6"
                    sizeLg="3"
                    style={{
                      display: 'flex',
                      padding: '0.5rem',
                    }}
                  >
                    <SummaryCard
                      subtitle="Actividades comunales"
                      title="Eventos próximos"
                      value={
                        automaticData.indicators.upcomingEvents
                      }
                    />
                  </IonCol>

                  <IonCol
                    size="12"
                    sizeSm="6"
                    sizeLg="3"
                    style={{
                      display: 'flex',
                      padding: '0.5rem',
                    }}
                  >
                    <SummaryCard
                      subtitle="Infraestructura ambiental"
                      title="Puntos de reciclaje"
                      value={
                        automaticData.indicators
                          .totalRecyclingPoints
                      }
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>

              <IonText color="medium">
                <p
                  style={{
                    padding: '0 0.5rem',
                    marginTop: '0.5rem',
                    fontSize: '0.9rem',
                  }}
                >
                  Última actualización:{' '}
                  {new Date(
                    automaticData.generatedAt,
                  ).toLocaleString('es-CL')}
                </p>
              </IonText>
            </>
          ) : null}

          {!loading && manualIndicators.length > 0 ? (
            <>
              <section
                style={{
                  padding: '0 0.5rem',
                  marginTop: '2rem',
                  marginBottom: '0.75rem',
                }}
              >
                <h2
                  style={{
                    marginBottom: '0.35rem',
                  }}
                >
                  Indicadores publicados
                </h2>

                <IonText color="medium">
                  <p style={{ margin: 0 }}>
                    Información ambiental incorporada por la
                    administración comunal.
                  </p>
                </IonText>
              </section>

              <IonGrid style={{ padding: 0 }}>
                <IonRow>
                  {manualIndicators.map((indicator) => (
                    <IonCol
                      key={indicator.id}
                      size="12"
                      sizeMd="6"
                      style={{
                        display: 'flex',
                        padding: '0.5rem',
                      }}
                    >
                      <IonCard
                        style={{
                          width: '100%',
                          height: '100%',
                          margin: 0,
                        }}
                      >
                        <IonCardHeader>
                          <IonCardSubtitle>
                            Indicador ambiental
                          </IonCardSubtitle>

                          <IonCardTitle>
                            {indicator.name}
                          </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                          <p
                            style={{
                              marginTop: 0,
                              marginBottom: '0.5rem',
                              fontSize: '1.75rem',
                              fontWeight: 600,
                            }}
                          >
                            {indicator.value}{' '}
                            {indicator.unit}
                          </p>

                          <IonText color="medium">
                            <p style={{ margin: 0 }}>
                              Publicado el{' '}
                              {new Date(
                                indicator.createdAt,
                              ).toLocaleDateString(
                                'es-CL',
                              )}
                            </p>
                          </IonText>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </>
          ) : null}

          {!loading &&
          !automaticData &&
          manualIndicators.length === 0 ? (
            <IonText color="medium">
              <p style={{ padding: '0 0.5rem' }}>
                No existen indicadores disponibles actualmente.
              </p>
            </IonText>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EnvironmentalIndicatorsPage;
