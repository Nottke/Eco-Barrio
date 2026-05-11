import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  IonButton,
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
  const history = useHistory<{ from?: { pathname?: string } }>();
  const { busy, login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (busy || !user) return;
    const target = history.location.state?.from?.pathname ?? '/app/inicio';
    history.replace(target);
  }, [busy, history, user]);

  if (busy) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center ion-justify-content-center">
          <IonSpinner />
        </IonContent>
      </IonPage>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const em = email.trim();
    const pw = password;

    if (!isValidEmail(em)) {
      setError('Introduce un correo electrónico válido.');
      return;
    }
    if (!pw) {
      setError('Introduce tu contraseña.');
      return;
    }

    setSubmitting(true);
    const result = await login(em, pw);
    setSubmitting(false);
    if (result.ok) {
      const redirectTo = history.location.state?.from?.pathname ?? '/app/inicio';
      history.replace(redirectTo);
    } else {
      setError(result.message);
    }
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Eco-Barrio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form onSubmit={(e) => void handleSubmit(e)}>
          <h1 className="ion-margin-bottom">Iniciar sesión</h1>
          <p className="ion-margin-bottom" style={{ opacity: 0.75 }}>
            Accede para ver incidencias y reportar mejoras en tu barrio.
          </p>

          <IonList className="ion-no-padding" inset>
            <IonItem>
              <IonInput
                type="email"
                label="Correo"
                labelPlacement="stacked"
                autocomplete="email"
                enterkeyhint="next"
                value={email}
                onIonInput={(ev) => setEmail(ev.detail.value ?? '')}
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
                label="Contraseña"
                labelPlacement="stacked"
                autocomplete="current-password"
                enterkeyhint="done"
                value={password}
                onIonInput={(ev) => setPassword(ev.detail.value ?? '')}
              />
            </IonItem>
          </IonList>

          {error && (
            <IonNote color="danger" className="ion-padding ion-margin-top">
              {error}
            </IonNote>
          )}

          <IonButton
            expand="block"
            type="submit"
            className="ion-margin-top"
            disabled={submitting}
          >
            {submitting ? <IonSpinner name="crescent" /> : 'Entrar'}
          </IonButton>
        </form>

        <IonText color="medium" className="ion-text-center ion-margin-top">
          <p>
            ¿No tienes cuenta?{' '}
            <IonRouterLink routerLink="/register" routerDirection="forward">
              Regístrate
            </IonRouterLink>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
