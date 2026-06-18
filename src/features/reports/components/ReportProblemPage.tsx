import { useState } from 'react';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTextarea,
  useIonToast,
} from '@ionic/react';

import { CitizenTabHeader } from '../../../components/CitizenHeaders';

import { createReport } from '../services';

const CATEGORY_TITLES: Record<string, string> = {
  basuras: 'Basura abandonada',
  alumbrado: 'Problema de alumbrado público',
  agua_canalizacion: 'Problema de agua o canalización',
  otro: 'Otro problema ambiental',
};

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible enviar el reporte.';
}

const ReportProblemPage = () => {
  const [category, setCategory] = useState('basuras');
  const [detail, setDetail] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [presentToast] = useIonToast();

  const handleSubmit = async () => {
    const trimmedDetail = detail.trim();
    const trimmedLocation = location.trim();
    const trimmedImageUrl = imageUrl.trim();

    setErrorMessage('');

    if (trimmedDetail.length < 8) {
      setErrorMessage(
        'La descripción debe tener al menos 8 caracteres.',
      );
      return;
    }

    if (!trimmedLocation) {
      setErrorMessage(
        'Debes indicar una ubicación o referencia cercana.',
      );
      return;
    }

    setSubmitting(true);

    try {
      await createReport({
        title:
          CATEGORY_TITLES[category] ??
          'Reporte ambiental',
        description: trimmedDetail,
        location: trimmedLocation,
        imageUrl: trimmedImageUrl || null,
      });

      setDetail('');
      setLocation('');
      setImageUrl('');
      setCategory('basuras');

      await presentToast({
        message: 'Reporte enviado correctamente.',
        duration: 2500,
        color: 'success',
      });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <IonPage>
      <CitizenTabHeader title="Reportar problema" />

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
              Reportar un problema ambiental
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Informa una situación ambiental o de ornato e incluye
                una referencia clara de su ubicación.
              </p>
            </IonText>
          </section>

          <IonCard
            style={{
              margin: '0 0.5rem',
            }}
          >
            <IonCardHeader>
              <IonCardSubtitle>
                Participación ciudadana
              </IonCardSubtitle>

              <IonCardTitle>
                Información del reporte
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonList lines="full">
                <IonItem>
                  <IonSelect
                    aria-label="Categoría del reporte"
                    interface="popover"
                    label="Categoría del reporte *"
                    labelPlacement="stacked"
                    value={category}
                    disabled={submitting}
                    onIonChange={(event) =>
                      setCategory(
                        String(
                          event.detail.value ??
                            'basuras',
                        ),
                      )
                    }
                  >
                    <IonSelectOption value="basuras">
                      Basura abandonada
                    </IonSelectOption>

                    <IonSelectOption value="alumbrado">
                      Alumbrado público
                    </IonSelectOption>

                    <IonSelectOption value="agua_canalizacion">
                      Agua o canalización
                    </IonSelectOption>

                    <IonSelectOption value="otro">
                      Otro
                    </IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">
                    Ubicación o referencia *
                  </IonLabel>

                  <IonInput
                    value={location}
                    maxlength={200}
                    placeholder="Ej. Avenida principal, frente al paradero"
                    disabled={submitting}
                    onIonInput={(event) =>
                      setLocation(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">
                    Descripción para la municipalidad *
                  </IonLabel>

                  <IonTextarea
                    aria-label="Descripción detallada"
                    autoGrow
                    maxlength={1000}
                    placeholder="Describe el problema con el mayor detalle posible"
                    value={detail}
                    rows={6}
                    disabled={submitting}
                    onIonInput={(event) =>
                      setDetail(
                        event.detail.value ?? '',
                      )
                    }
                  />
                </IonItem>

                <IonItem lines="none">
                  <IonLabel position="stacked">
                    URL de imagen (opcional)
                  </IonLabel>

                  <IonInput
                    type="url"
                    value={imageUrl}
                    maxlength={500}
                    placeholder="https://..."
                    disabled={submitting}
                    onIonInput={(event) =>
                      setImageUrl(
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
                * Campos obligatorios. No incluyas información personal
                innecesaria en la descripción.
              </IonNote>

              {errorMessage ? (
                <IonText color="danger">
                  <p
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    {errorMessage}
                  </p>
                </IonText>
              ) : null}

              <IonButton
                expand="block"
                className="ion-margin-top"
                disabled={submitting}
                onClick={() =>
                  void handleSubmit()
                }
              >
                {submitting
                  ? 'Enviando reporte...'
                  : 'Enviar reporte'}
              </IonButton>

              {submitting ? (
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReportProblemPage;