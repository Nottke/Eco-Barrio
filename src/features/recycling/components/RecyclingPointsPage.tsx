import {
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

import { CitizenStackHeader } from '../../../components/CitizenHeaders';

import { RecyclingMap } from './RecyclingMap';

import { getRecyclingPoints } from '../services';

import type { RecyclingPoint } from '../types';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible obtener los puntos de reciclaje.';
}

function hasValidCoordinates(
  point: RecyclingPoint,
): boolean {
  return (
    point.latitude !== null &&
    point.longitude !== null &&
    Number.isFinite(point.latitude) &&
    Number.isFinite(point.longitude) &&
    point.latitude >= -90 &&
    point.latitude <= 90 &&
    point.longitude >= -180 &&
    point.longitude <= 180
  );
}

const RecyclingPointsPage = () => {
  const [points, setPoints] =
    useState<RecyclingPoint[]>([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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

  const pointsWithCoordinates =
    points.filter(hasValidCoordinates);

  return (
    <IonPage>
      <CitizenStackHeader title="Puntos de reciclaje" />

      <IonContent fullscreen className="ion-padding">
        <h1>Puntos de reciclaje</h1>

        <p style={{ opacity: 0.8 }}>
          Consulta los puntos de reciclaje registrados en la comuna y
          revisa su ubicación en el mapa.
        </p>

        {errorMessage ? (
          <IonText color="danger">
            <p>{errorMessage}</p>
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

        {!loading && points.length === 0 ? (
          <IonText color="medium">
            <p>
              No existen puntos de reciclaje registrados actualmente.
            </p>
          </IonText>
        ) : null}

        {!loading && points.length > 0 ? (
          <>
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>
                  Mapa comunal interactivo
                </IonCardSubtitle>

                <IonCardTitle>
                  Ubicaciones de reciclaje
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonText color="medium">
                  <p
                    style={{
                      marginTop: 0,
                      marginBottom: '1rem',
                    }}
                  >
                    {pointsWithCoordinates.length}{' '}
                    {pointsWithCoordinates.length === 1
                      ? 'punto disponible en el mapa'
                      : 'puntos disponibles en el mapa'}
                  </p>
                </IonText>

                {pointsWithCoordinates.length > 0 ? (
                  <RecyclingMap points={points} />
                ) : (
                  <IonText color="medium">
                    <p>
                      Los puntos registrados todavía no poseen
                      coordenadas válidas para mostrarse en el mapa.
                    </p>
                  </IonText>
                )}
              </IonCardContent>
            </IonCard>

            <h2>Listado de puntos</h2>

            <p style={{ opacity: 0.75 }}>
              {points.length}{' '}
              {points.length === 1
                ? 'punto registrado'
                : 'puntos registrados'}
            </p>

            {points.map((point) => (
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
                    <p>
                      <strong>Descripción:</strong>{' '}
                      {point.description}
                    </p>
                  ) : null}

                  {hasValidCoordinates(point) ? (
                    <p>
                      <strong>Coordenadas:</strong>{' '}
                      {point.latitude}, {point.longitude}
                    </p>
                  ) : (
                    <IonText color="medium">
                      <p>
                        Ubicación geográfica no disponible.
                      </p>
                    </IonText>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default RecyclingPointsPage;
