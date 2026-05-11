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
import { isStrongEnoughPassword, isValidEmail } from '../utils/validation';

const RegisterPage = () => {
  const history = useHistory();
  const { busy, register, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (busy || !user) return;
    history.replace('/app/inicio');
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

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setError('Introduce tu nombre .');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setError('Introduce un correo electrónico válido.');
      return;
    }
    if (!isStrongEnoughPassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setSubmitting(true);
    const result = await register(trimmedName, trimmedEmail, password);
    setSubmitting(false);
    if (result.ok) {
      history.replace('/app/inicio');
    } else {
      setError(result.message);
    }
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form onSubmit={(e) => void handleSubmit(e)}>
          <h1 className="ion-margin-bottom">Únete a Eco-Barrio</h1>
          <p className="ion-margin-bottom" style={{ opacity: 0.75 }}>
            Regístrate para reportar problemas y seguir mejoras locales.
          </p>

          <IonList className="ion-no-padding" inset>
            <IonItem>
              <IonInput
                label="Nombre"
                labelPlacement="stacked"
                autocomplete="name"
                enterkeyhint="next"
                value={name}
                onIonInput={(ev) => setName(ev.detail.value ?? '')}
              />
            </IonItem>
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
                autocomplete="new-password"
                enterkeyhint="next"
                value={password}
                onIonInput={(ev) => setPassword(ev.detail.value ?? '')}
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
                label="Confirmar contraseña"
                labelPlacement="stacked"
                autocomplete="new-password"
                enterkeyhint="done"
                value={confirm}
                onIonInput={(ev) => setConfirm(ev.detail.value ?? '')}
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
            {submitting ? <IonSpinner name="crescent" /> : 'Crear cuenta'}
          </IonButton>
        </form>

        <IonText color="medium" className="ion-text-center ion-margin-top">
          <p>
            ¿Ya tienes cuenta?{' '}
            <IonRouterLink routerLink="/login" routerDirection="back">
              Inicia sesión
            </IonRouterLink>
          </p>
        </IonText>

        <IonNote color="medium" className="ion-padding ion-margin-top">
          Capa sólo frontend: los datos permanecen en este navegador. El backend puede
          conectarse sustituyendo el cliente de auth en{' '}
          <code style={{ whiteSpace: 'nowrap' }}>AuthProvider</code>.
        </IonNote>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
