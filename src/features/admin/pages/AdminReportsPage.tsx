import {
  IonAlert,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  deleteReport,
  getReports,
  updateReportStatus,
} from '../../reports/services';

import type {
  EnvironmentalReport,
  ReportStatus,
} from '../../reports/types';

const STATUS_LABELS: Record<ReportStatus, string> = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobado',
  REJECTED: 'Rechazado',
  RESOLVED: 'Resuelto',
};

const STATUS_COLORS: Record<
  ReportStatus,
  'warning' | 'success' | 'danger' | 'primary'
> = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
  RESOLVED: 'primary',
};

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible completar la operación.';
}

const AdminReportsPage = () => {
  const [reports, setReports] = useState<EnvironmentalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [reportToDelete, setReportToDelete] =
    useState<EnvironmentalReport | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const loadReports = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReports();
  }, [loadReports]);

  const handleStatusChange = async (
    reportId: number,
    status: ReportStatus,
  ) => {
    setUpdatingId(reportId);
    setErrorMessage('');

    try {
      const updatedReport = await updateReportStatus(
        reportId,
        status,
      );

      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === reportId
            ? {
                ...report,
                ...updatedReport,
              }
            : report,
        ),
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteReport = async () => {
    if (!reportToDelete) {
      return;
    }

    const reportId = reportToDelete.id;

    setDeletingId(reportId);
    setErrorMessage('');

    try {
      await deleteReport(reportId);

      setReports((currentReports) =>
        currentReports.filter(
          (report) => report.id !== reportId,
        ),
      );

      setReportToDelete(null);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton menu="eco-admin-menu" />
          </IonButtons>

          <IonTitle>Gestionar reportes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <h1>Reportes ciudadanos</h1>

        <p style={{ opacity: 0.8 }}>
          Revisa las incidencias ambientales informadas por la comunidad y
          actualiza su estado.
        </p>

        <IonButton
          fill="outline"
          onClick={() => void loadReports()}
          disabled={loading}
        >
          Actualizar lista
        </IonButton>

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

        {!loading && reports.length === 0 ? (
          <IonText color="medium">
            <p>No existen reportes registrados actualmente.</p>
          </IonText>
        ) : null}

        {!loading &&
          reports.map((report) => {
            const isUpdating = updatingId === report.id;
            const isDeleting = deletingId === report.id;

            return (
              <IonCard key={report.id}>
                <IonCardHeader>
                  <IonCardSubtitle>
                    Reporte #{report.id}
                  </IonCardSubtitle>

                  <IonCardTitle>{report.title}</IonCardTitle>

                  <IonBadge color={STATUS_COLORS[report.status]}>
                    {STATUS_LABELS[report.status]}
                  </IonBadge>
                </IonCardHeader>

                <IonCardContent>
                  <p>{report.description}</p>

                  <p>
                    <strong>Ubicación:</strong> {report.location}
                  </p>

                  <p>
                    <strong>Enviado por:</strong>{' '}
                    {report.user?.name ?? 'Usuario no disponible'}
                  </p>

                  <p>
                    <strong>Correo:</strong>{' '}
                    {report.user?.email ?? 'No disponible'}
                  </p>

                  <p>
                    <strong>Fecha:</strong>{' '}
                    {new Date(report.createdAt).toLocaleString('es-CL')}
                  </p>

                  <IonButton
                    size="small"
                    color="success"
                    disabled={
                      isUpdating ||
                      isDeleting ||
                      report.status === 'APPROVED'
                    }
                    onClick={() =>
                      void handleStatusChange(
                        report.id,
                        'APPROVED',
                      )
                    }
                  >
                    Aprobar
                  </IonButton>

                  <IonButton
                    size="small"
                    color="danger"
                    fill="outline"
                    disabled={
                      isUpdating ||
                      isDeleting ||
                      report.status === 'REJECTED'
                    }
                    onClick={() =>
                      void handleStatusChange(
                        report.id,
                        'REJECTED',
                      )
                    }
                  >
                    Rechazar
                  </IonButton>

                  <IonButton
                    size="small"
                    color="primary"
                    fill="outline"
                    disabled={
                      isUpdating ||
                      isDeleting ||
                      report.status === 'RESOLVED'
                    }
                    onClick={() =>
                      void handleStatusChange(
                        report.id,
                        'RESOLVED',
                      )
                    }
                  >
                    Marcar resuelto
                  </IonButton>

                  <IonButton
                    size="small"
                    color="danger"
                    fill="clear"
                    disabled={isUpdating || isDeleting}
                    onClick={() => setReportToDelete(report)}
                  >
                    Eliminar
                  </IonButton>

                  {isUpdating || isDeleting ? (
                    <IonSpinner
                        name="dots"
                        className="ion-margin-start"
                      />
                  ) : null}
                </IonCardContent>
              </IonCard>
            );
          })}
      </IonContent>
      <IonAlert
        isOpen={reportToDelete !== null}
        header="Eliminar reporte"
        message={
          reportToDelete
            ? `¿Deseas eliminar definitivamente el reporte "${reportToDelete.title}"?`
            : ''
        }
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => setReportToDelete(null),
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              void handleDeleteReport();
            },
          },
        ]}
        onDidDismiss={() => {
          if (deletingId === null) {
            setReportToDelete(null);
          }
        }}
      />
    </IonPage>
  );
};

export default AdminReportsPage;