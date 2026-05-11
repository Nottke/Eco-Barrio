import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

/** Cabecera para pantallas dentro de pestañas (menú lateral). */
export function CitizenTabHeader({ title }: { title: string }) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton aria-label="Abrir menú" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

/** Cabecera para pantallas apiladas desde el menú (volver + menú). */
export function CitizenStackHeader({
  title,
  defaultBackHref = '/app/inicio',
}: {
  title: string;
  defaultBackHref?: string;
}) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref={defaultBackHref} text="Atrás" />
          <IonMenuButton aria-label="Abrir menú" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
