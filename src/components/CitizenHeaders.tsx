import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

type CitizenHeaderProps = {
  title: string;
};

/** Cabecera para las secciones principales del área ciudadana. */
export function CitizenTabHeader({
  title,
}: CitizenHeaderProps) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton
            menu="eco-menu"
            aria-label="Abrir menú"
          />
        </IonButtons>

        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

/**
 * Se conserva por compatibilidad con las vistas existentes,
 * pero usa la misma navegación que las secciones principales.
 */
export function CitizenStackHeader({
  title,
}: CitizenHeaderProps) {
  return (
    <CitizenTabHeader title={title} />
  );
}