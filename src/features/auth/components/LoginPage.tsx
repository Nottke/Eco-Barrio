import type { FormEvent } from 'react';

import {
  useEffect,
  useState,
} from 'react';

import { useHistory } from 'react-router-dom';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonNote,
  IonPage,
  IonRouterLink,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useAuth } from '../context/AuthContext';
import { isValidEmail } from '../utils/validation';

const LoginPage = () => {
  const history =
    useHistory<{
      from?: {
        pathname?: string;
      };
    }>();

  const { busy, login, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (busy || !user) {
      return;
    }

    const target =
      history.location.state?.from?.pathname ??
      '/app/inicio';

    history.replace(target);
  }, [busy, history, user]);

  if (busy) {
    return (
      <IonPage>
        <IonContent>
          <div
            style={{
              minHeight: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background:
                'linear-gradient(135deg, rgba(20, 130, 117, 0.16), rgba(255, 255, 255, 0.96) 55%, rgba(45, 211, 111, 0.1))',
            }}
          >
            <IonSpinner name="crescent" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  async function handleSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      setError(
        'Introduce un correo electrónico válido.',
      );
      return;
    }

    if (!password) {
      setError('Introduce tu contraseña.');
      return;
    }

    setSubmitting(true);

    try {
      const result = await login(
        trimmedEmail,
        password,
      );

      if (result.ok) {
        const redirectTo =
          history.location.state?.from?.pathname ??
          '/app/inicio';

        history.replace(redirectTo);
      } else {
        setError(result.message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="secondary">
          <IonTitle>Eco-Barrio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div
          style={{
            minHeight: '100%',
            padding: '2rem 1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background:
              'linear-gradient(135deg, rgba(20, 130, 117, 0.16), rgba(255, 255, 255, 0.96) 55%, rgba(45, 211, 111, 0.1))',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
            }}
          >
            <section
              style={{
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 1rem',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'var(--ion-color-secondary)',
                  color: '#ffffff',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  boxShadow:
                    '0 10px 24px rgba(20, 130, 117, 0.22)',
                }}
              >
                EB
              </div>

              <h1
                style={{
                  marginTop: 0,
                  marginBottom: '0.5rem',
                }}
              >
                Iniciar sesión
              </h1>

              <IonText color="medium">
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Accede a Eco-Barrio para consultar
                  información ambiental y participar en
                  la comunidad.
                </p>
              </IonText>
            </section>

            <IonCard
              style={{
                margin: 0,
                borderRadius: '16px',
                boxShadow:
                  '0 12px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <IonCardContent
                style={{
                  padding: '1.5rem',
                }}
              >
                <form
                  onSubmit={(event) =>
                    void handleSubmit(event)
                  }
                >
                  <IonList
                    className="ion-no-padding"
                    lines="full"
                  >
                    <IonItem>
                      <IonInput
                        type="email"
                        label="Correo electrónico"
                        labelPlacement="stacked"
                        autocomplete="email"
                        enterkeyhint="next"
                        value={email}
                        disabled={submitting}
                        onIonInput={(event) =>
                          setEmail(
                            event.detail.value ?? '',
                          )
                        }
                      />
                    </IonItem>

                    <IonItem lines="none">
                      <IonInput
                        type="password"
                        label="Contraseña"
                        labelPlacement="stacked"
                        autocomplete="current-password"
                        enterkeyhint="done"
                        value={password}
                        disabled={submitting}
                        onIonInput={(event) =>
                          setPassword(
                            event.detail.value ?? '',
                          )
                        }
                      />
                    </IonItem>
                  </IonList>

                  {error ? (
                    <IonNote
                      color="danger"
                      style={{
                        display: 'block',
                        marginTop: '1rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {error}
                    </IonNote>
                  ) : null}

                  <IonButton
                    expand="block"
                    type="submit"
                    className="ion-margin-top"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <IonSpinner
                          name="crescent"
                          className="ion-margin-end"
                        />

                        Ingresando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </IonButton>
                </form>
              </IonCardContent>
            </IonCard>

            <IonText
              color="medium"
              className="ion-text-center"
            >
              <p
                style={{
                  marginTop: '1.25rem',
                }}
              >
                ¿No tienes cuenta?{' '}

                <IonRouterLink
                  routerLink="/register"
                  routerDirection="forward"
                >
                  Regístrate
                </IonRouterLink>
              </p>
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
