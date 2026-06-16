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
  IonMenuButton,
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
        <h1>Noticias ambientales</h1>

        <p style={{ opacity: 0.8 }}>
          Revisa y administra las noticias y comunicaciones ambientales
          publicadas para la comunidad.
        </p>

        <IonCard>
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
            <IonItem>
              <IonLabel position="stacked">
                Título
              </IonLabel>

              <IonInput
                value={title}
                placeholder="Ej. Nueva jornada de reciclaje"
                disabled={saving}
                onIonInput={(event) =>
                  setTitle(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Contenido
              </IonLabel>

              <IonTextarea
                value={content}
                placeholder="Escribe el contenido de la noticia"
                autoGrow
                disabled={saving}
                onIonInput={(event) =>
                  setContent(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                URL de imagen (opcional)
              </IonLabel>

              <IonInput
                type="url"
                value={imageUrl}
                placeholder="https://..."
                disabled={saving}
                onIonInput={(event) =>
                  setImageUrl(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonButton
              expand="block"
              className="ion-margin-top"
              disabled={saving}
              onClick={() => void handleSaveNews()}
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
                fill="clear"
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
            <p>{successMessage}</p>
          </IonText>
        ) : null}

        {errorMessage ? (
          <IonText color="danger">
            <p>{errorMessage}</p>
          </IonText>
        ) : null}

        <IonButton
          fill="outline"
          disabled={loading}
          onClick={() => void loadNews()}
        >
          Actualizar lista
        </IonButton>

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
            <p>No existen noticias registradas actualmente.</p>
          </IonText>
        ) : null}

        {!loading &&
          news.map((item) => {
            const isDeleting = deletingId === item.id;

            return (
              <IonCard key={item.id}>
                <IonCardHeader>
                  <IonCardSubtitle>
                    Noticia #{item.id}
                  </IonCardSubtitle>

                  <IonCardTitle>{item.title}</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <p>{item.content}</p>

                  <p>
                    <strong>Fecha:</strong>{' '}
                    {new Date(item.createdAt).toLocaleString('es-CL')}
                  </p>

                  {item.imageUrl ? (
                    <p>
                      <strong>Imagen:</strong>{' '}
                      {item.imageUrl}
                    </p>
                  ) : null}

                  <IonButton
                    size="small"
                    fill="outline"
                    disabled={saving || isDeleting}
                    onClick={() => handleStartEdit(item)}
                  >
                    Editar
                  </IonButton>

                  <IonButton
                    size="small"
                    color="danger"
                    fill="clear"
                    disabled={saving || isDeleting}
                    onClick={() => setNewsToDelete(item)}
                  >
                    Eliminar
                  </IonButton>

                  {isDeleting ? (
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
            handler: () => setNewsToDelete(null),
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
