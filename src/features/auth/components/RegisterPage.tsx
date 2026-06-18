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

import {
  isStrongEnoughPassword,
  isValidEmail,
} from '../utils/validation';

const RegisterPage = () => {
  const history = useHistory();

  const {
    busy,
    register,
    user,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [error, setError] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (busy || !user) {
      return;
    }

    history.replace('/app/inicio');
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

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setError('Introduce tu nombre.');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError(
        'Introduce un correo electrónico válido.',
      );
      return;
    }

    if (!isStrongEnoughPassword(password)) {
      setError(
        'La contraseña debe tener al menos 6 caracteres.',
      );
      return;
    }

    if (password !== confirm) {
      setError(
        'Las contraseñas no coinciden.',
      );
      return;
    }

    setSubmitting(true);

    try {
      const result = await register(
        trimmedName,
        trimmedEmail,
        password,
      );

      if (result.ok) {
        history.replace('/app/inicio');
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
              maxWidth: '520px',
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
                Únete a Eco-Barrio
              </h1>

              <IonText color="medium">
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Crea tu cuenta para reportar problemas
                  ambientales y participar en las iniciativas
                  de tu comunidad.
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
                        label="Nombre"
                        labelPlacement="stacked"
                        autocomplete="name"
                        enterkeyhint="next"
                        value={name}
                        disabled={submitting}
                        onIonInput={(event) =>
                          setName(
                            event.detail.value ?? '',
                          )
                        }
                      />
                    </IonItem>

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

                    <IonItem>
                      <IonInput
                        type="password"
                        label="Contraseña"
                        labelPlacement="stacked"
                        autocomplete="new-password"
                        enterkeyhint="next"
                        value={password}
                        disabled={submitting}
                        onIonInput={(event) =>
                          setPassword(
                            event.detail.value ?? '',
                          )
                        }
                      />
                    </IonItem>

                    <IonItem lines="none">
                      <IonInput
                        type="password"
                        label="Confirmar contraseña"
                        labelPlacement="stacked"
                        autocomplete="new-password"
                        enterkeyhint="done"
                        value={confirm}
                        disabled={submitting}
                        onIonInput={(event) =>
                          setConfirm(
                            event.detail.value ?? '',
                          )
                        }
                      />
                    </IonItem>
                  </IonList>

                  <IonText color="medium">
                    <p
                      style={{
                        marginTop: '1rem',
                        marginBottom: 0,
                        fontSize: '0.9rem',
                        lineHeight: 1.4,
                      }}
                    >
                      La contraseña debe tener al menos
                      6 caracteres.
                    </p>
                  </IonText>

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

                        Creando cuenta...
                      </>
                    ) : (
                      'Crear cuenta'
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
                ¿Ya tienes cuenta?{' '}

                <IonRouterLink
                  routerLink="/login"
                  routerDirection="back"
                >
                  Inicia sesión
                </IonRouterLink>
              </p>
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
