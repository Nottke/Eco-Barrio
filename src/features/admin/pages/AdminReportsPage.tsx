import type { CSSProperties } from 'react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

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

function getStatusBadgeStyle(
  status: ReportStatus,
): CSSProperties {
  switch (status) {
    case 'APPROVED':
      return {
        backgroundColor: '#2dd36f',
        color: '#ffffff',
      };

    case 'RESOLVED':
      return {
        backgroundColor: '#198754',
        color: '#ffffff',
      };

    case 'REJECTED':
      return {
        backgroundColor: '#eb445a',
        color: '#ffffff',
      };

    case 'PENDING':
    default:
      return {
        backgroundColor: '#ffc409',
        color: '#1f1f1f',
      };
  }
}

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible completar la operación.';
}

function formatReportDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return date.toLocaleString('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

const AdminReportsPage = () => {
  const [reports, setReports] =
    useState<EnvironmentalReport[]>([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

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
      const updatedReport =
        await updateReportStatus(
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
              Reportes ciudadanos
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Revisa las incidencias ambientales informadas por la
                comunidad y actualiza su estado.
              </p>
            </IonText>

            <IonButton
              fill="outline"
              className="ion-margin-top"
              disabled={loading}
              onClick={() =>
                void loadReports()
              }
            >
              {loading
                ? 'Actualizando...'
                : 'Actualizar lista'}
            </IonButton>
          </section>

          {errorMessage ? (
            <IonText color="danger">
              <p style={{ padding: '0 0.5rem' }}>
                {errorMessage}
              </p>
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
              <p style={{ padding: '0 0.5rem' }}>
                No existen reportes registrados actualmente.
              </p>
            </IonText>
          ) : null}

          {!loading && reports.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1rem',
                padding: '0 0.5rem',
              }}
            >
              {reports.map((report) => {
                const isUpdating =
                  updatingId === report.id;

                const isDeleting =
                  deletingId === report.id;

                const isProcessing =
                  isUpdating || isDeleting;

                return (
                  <IonCard
                    key={report.id}
                    style={{
                      width: '100%',
                      height: '100%',
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <IonCardHeader>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent:
                            'space-between',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <IonCardSubtitle>
                          Reporte #{report.id}
                        </IonCardSubtitle>

                        <IonBadge
                          style={{
                            ...getStatusBadgeStyle(report.status),
                            padding: '0.35rem 0.55rem',
                            fontWeight: 600,
                          }}
                        >
                          {STATUS_LABELS[report.status]}
                        </IonBadge>
                      </div>

                      <IonCardTitle>
                        {report.title}
                      </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent
                      style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                      }}
                    >
                      <p
                        style={{
                          marginTop: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {report.description}
                      </p>

                      <div
                        style={{
                          marginBottom: '1.25rem',
                        }}
                      >
                        <p>
                          <strong>Ubicación:</strong>{' '}
                          {report.location}
                        </p>

                        <p>
                          <strong>Enviado por:</strong>{' '}
                          {report.user?.name ??
                            'Usuario no disponible'}
                        </p>

                        <p>
                          <strong>Correo:</strong>{' '}
                          {report.user?.email ??
                            'No disponible'}
                        </p>

                        <p style={{ marginBottom: 0 }}>
                          <strong>Fecha:</strong>{' '}
                          {formatReportDate(
                            report.createdAt,
                          )}
                        </p>
                      </div>

                      <div
                        style={{
                          marginTop: 'auto',
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                        }}
                      >
                        <IonButton
                          size="small"
                          color="success"
                          fill="outline"
                          disabled={
                            isProcessing ||
                            report.status ===
                              'APPROVED'
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
                            isProcessing ||
                            report.status ===
                              'REJECTED'
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
                            isProcessing ||
                            report.status ===
                              'RESOLVED'
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
                          disabled={isProcessing}
                          onClick={() =>
                            setReportToDelete(
                              report,
                            )
                          }
                        >
                          Eliminar
                        </IonButton>

                        {isProcessing ? (
                          <IonSpinner name="dots" />
                        ) : null}
                      </div>
                    </IonCardContent>
                  </IonCard>
                );
              })}
            </div>
          ) : null}
        </div>
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
            handler: () =>
              setReportToDelete(null),
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
