import { useState } from 'react';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonToast,
} from '@ionic/react';

import { CitizenTabHeader } from '../../../components/CitizenHeaders';

const ReportProblemPage = () => {
  const [category, setCategory] = useState<string>('basuras');
  const [detail, setDetail] = useState('');
  const [presentToast] = useIonToast();

  function submitDummy() {
    if (detail.trim().length < 8) {
      void presentToast({
        message: 'Describe un poco más el problema antes de enviar.',
        duration: 2200,
        color: 'warning',
      });
      return;
    }
    void presentToast({
      message: 'Datos sin backend.',
      duration: 2500,
      color: 'success',
    });
  }

  return (
    <IonPage>
      <CitizenTabHeader title="Reportar problema" />
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Usuario común</IonCardSubtitle>
            <IonCardTitle>Reportes ambientales y de ornato</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Selecciona un tipo brevemente y describe ubicación cercana visible,
            seguridad pendiente cuando existan geodatos municipales.
          </IonCardContent>
        </IonCard>

        <IonList inset>
          <IonItem>
            <IonSelect
              aria-label="Categoría"
              interface="popover"
              label="Categoría del reporte"
              labelPlacement="stacked"
              value={category}
              onIonChange={(ev) =>
                setCategory(String(ev.detail.value ?? 'basuras'))
              }
            >
              <IonSelectOption value="basuras">Basura abandonada</IonSelectOption>
              <IonSelectOption value="alumbrado">Alumbrado público</IonSelectOption>
              <IonSelectOption value="agua_canalización">Agua o canalización</IonSelectOption>
              <IonSelectOption value="otro">Otro</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="stacked">Descripción para la municipalidad</IonLabel>
            <IonTextarea
              aria-label="Descripción detallada"
              autoGrow
              placeholder="Ej: esquina con calle ..., acumulación de ..."
              value={detail}
              rows={6}
              onIonInput={(ev) => setDetail(ev.detail.value ?? '')}
            />
          </IonItem>
        </IonList>

        <IonNote color="medium" className="ion-padding-horizontal ion-margin-top">
          Protección de datos: sólo ejemplo local; cuando haya servidor se aplicará consentimiento explícito.
        </IonNote>

        <div className="ion-padding-horizontal ion-margin-top ion-margin-bottom">
          <IonButton expand="block" onClick={() => submitDummy()}>
            Enviar reporte simulado
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReportProblemPage;
