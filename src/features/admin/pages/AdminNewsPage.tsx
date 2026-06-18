import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  createNews,
  deleteNews,
  getNews,
  updateNews,
} from '../../news/services';

import type { NewsItem } from '../../news/types';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible completar la operación.';
}

function formatNewsDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return date.toLocaleString('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

const AdminNewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [newsToDelete, setNewsToDelete] =
    useState<NewsItem | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const loadNews = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNews();
  }, [loadNews]);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImageUrl('');
  };

  const handleStartEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.imageUrl ?? '');

    setErrorMessage('');
    setSuccessMessage('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCancelEdit = () => {
    resetForm();
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSaveNews = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedImageUrl = imageUrl.trim();

    if (!trimmedTitle || !trimmedContent) {
      setErrorMessage(
        'El título y el contenido son obligatorios.',
      );
      setSuccessMessage('');
      return;
    }

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload = {
        title: trimmedTitle,
        content: trimmedContent,
        imageUrl: trimmedImageUrl || null,
      };

      if (editingId !== null) {
        const updatedNews = await updateNews(
          editingId,
          payload,
        );

        setNews((currentNews) =>
          currentNews.map((item) =>
            item.id === editingId
              ? updatedNews
              : item,
          ),
        );

        setSuccessMessage(
          'Noticia actualizada correctamente.',
        );
      } else {
        const createdNews = await createNews(payload);

        setNews((currentNews) => [
          createdNews,
          ...currentNews,
        ]);

        setSuccessMessage(
          'Noticia creada correctamente.',
        );
      }

      resetForm();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNews = async () => {
    if (!newsToDelete) {
      return;
    }

    const newsId = newsToDelete.id;

    setDeletingId(newsId);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await deleteNews(newsId);

      setNews((currentNews) =>
        currentNews.filter(
          (item) => item.id !== newsId,
        ),
      );

      if (editingId === newsId) {
        resetForm();
      }

      setNewsToDelete(null);
      setSuccessMessage(
        'Noticia eliminada correctamente.',
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  const isEditing = editingId !== null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton menu="eco-admin-menu" />
          </IonButtons>

          <IonTitle>Gestionar noticias</IonTitle>
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
              Noticias ambientales
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Publica, edita y elimina noticias y comunicaciones
                ambientales dirigidas a la comunidad.
              </p>
            </IonText>
          </section>

          <IonCard
            style={{
              margin: '0 0.5rem 1.5rem',
            }}
          >
            <IonCardHeader>
              <IonCardSubtitle>
                Publicación ambiental
              </IonCardSubtitle>

              <IonCardTitle>
                {isEditing
                  ? `Editar noticia #${editingId}`
                  : 'Crear noticia'}
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonList lines="full">
                <IonItem>
                  <IonLabel position="stacked">
                    Título *
                  </IonLabel>

                  <IonInput
                    value={title}
                    maxlength={150}
                    placeholder="Ej. Nueva jornada de reciclaje"
                    disabled={saving}
                    onIonInput={(event) =>
                      setTitle(event.detail.value ?? '')
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">
                    Contenido *
                  </IonLabel>

                  <IonTextarea
                    value={content}
                    maxlength={5000}
                    rows={6}
                    autoGrow
                    placeholder="Escribe el contenido de la noticia"
                    disabled={saving}
                    onIonInput={(event) =>
                      setContent(event.detail.value ?? '')
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
                    disabled={saving}
                    onIonInput={(event) =>
                      setImageUrl(event.detail.value ?? '')
                    }
                  />
                </IonItem>
              </IonList>

              <IonNote
                color="medium"
                style={{
                  display: 'block',
                  marginTop: '1rem',
                }}
              >
                * Campos obligatorios.
              </IonNote>

              <IonButton
                expand="block"
                className="ion-margin-top"
                disabled={saving}
                onClick={() =>
                  void handleSaveNews()
                }
              >
                {saving
                  ? 'Guardando...'
                  : isEditing
                    ? 'Guardar cambios'
                    : 'Publicar noticia'}
              </IonButton>

              {isEditing ? (
                <IonButton
                  expand="block"
                  fill="outline"
                  color="medium"
                  disabled={saving}
                  onClick={handleCancelEdit}
                >
                  Cancelar edición
                </IonButton>
              ) : null}

              {saving ? (
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

          {successMessage ? (
            <IonText color="success">
              <p style={{ padding: '0 0.5rem' }}>
                {successMessage}
              </p>
            </IonText>
          ) : null}

          {errorMessage ? (
            <IonText color="danger">
              <p style={{ padding: '0 0.5rem' }}>
                {errorMessage}
              </p>
            </IonText>
          ) : null}

          <section
            style={{
              padding: '0 0.5rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: '0.35rem',
                  }}
                >
                  Noticias publicadas
                </h2>

                <IonText color="medium">
                  <p style={{ margin: 0 }}>
                    {news.length}{' '}
                    {news.length === 1
                      ? 'noticia registrada'
                      : 'noticias registradas'}
                  </p>
                </IonText>
              </div>

              <IonButton
                fill="outline"
                disabled={loading}
                onClick={() =>
                  void loadNews()
                }
              >
                {loading
                  ? 'Actualizando...'
                  : 'Actualizar lista'}
              </IonButton>
            </div>
          </section>

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

          {!loading && news.length === 0 ? (
            <IonText color="medium">
              <p style={{ padding: '0 0.5rem' }}>
                No existen noticias registradas actualmente.
              </p>
            </IonText>
          ) : null}

          {!loading && news.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1rem',
                padding: '0 0.5rem',
              }}
            >
              {news.map((item) => {
                const isDeleting =
                  deletingId === item.id;

                return (
                  <IonCard
                    key={item.id}
                    style={{
                      width: '100%',
                      height: '100%',
                      margin: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={`Imagen de la noticia: ${item.title}`}
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '210px',
                          objectFit: 'cover',
                        }}
                      />
                    ) : null}

                    <IonCardHeader>
                      <IonCardSubtitle>
                        Noticia #{item.id}
                      </IonCardSubtitle>

                      <IonCardTitle>
                        {item.title}
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
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {item.content}
                      </p>

                      <IonText color="medium">
                        <p>
                          Publicada el{' '}
                          {formatNewsDate(
                            item.createdAt,
                          )}
                        </p>
                      </IonText>

                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          marginTop: 'auto',
                        }}
                      >
                        <IonButton
                          size="small"
                          fill="outline"
                          disabled={
                            saving || isDeleting
                          }
                          onClick={() =>
                            handleStartEdit(item)
                          }
                        >
                          Editar
                        </IonButton>

                        <IonButton
                          size="small"
                          color="danger"
                          fill="clear"
                          disabled={
                            saving || isDeleting
                          }
                          onClick={() =>
                            setNewsToDelete(item)
                          }
                        >
                          Eliminar
                        </IonButton>

                        {isDeleting ? (
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
        isOpen={newsToDelete !== null}
        header="Eliminar noticia"
        message={
          newsToDelete
            ? `¿Deseas eliminar definitivamente la noticia "${newsToDelete.title}"?`
            : ''
        }
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () =>
              setNewsToDelete(null),
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              void handleDeleteNews();
            },
          },
        ]}
        onDidDismiss={() => {
          if (deletingId === null) {
            setNewsToDelete(null);
          }
        }}
      />
    </IonPage>
  );
};

export default AdminNewsPage;
