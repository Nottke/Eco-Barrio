import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonSpinner,
  IonText,
} from '@ionic/react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { CitizenTabHeader } from '../../../components/CitizenHeaders';

import { getNews } from '../services';

import type { NewsItem } from '../types';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No fue posible obtener las noticias comunales.';
}

function formatNewsDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

const CommunityNewsPage = () => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadNews = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await getNews();

      const orderedArticles = [...data].sort(
        (firstArticle, secondArticle) =>
          new Date(secondArticle.createdAt).getTime() -
          new Date(firstArticle.createdAt).getTime(),
      );

      setArticles(orderedArticles);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNews();
  }, [loadNews]);

  return (
    <IonPage>
      <CitizenTabHeader title="Noticias comunales" />

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
              Noticias comunales
            </h1>

            <IonText color="medium">
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Revisa noticias, campañas y comunicaciones ambientales
                publicadas para la comunidad de Santo Domingo.
              </p>
            </IonText>
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

          {!loading && articles.length === 0 ? (
            <IonText color="medium">
              <p style={{ padding: '0 0.5rem' }}>
                No existen noticias publicadas actualmente.
              </p>
            </IonText>
          ) : null}

          {!loading && articles.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1rem',
                padding: '0 0.5rem',
              }}
            >
              {articles.map((article) => (
                <IonCard
                  key={article.id}
                  style={{
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    overflow: 'hidden',
                  }}
                >
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={`Imagen de la noticia: ${article.title}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '220px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : null}

                  <IonCardHeader>
                    <IonCardSubtitle>
                      {formatNewsDate(article.createdAt)}
                    </IonCardSubtitle>

                    <IonCardTitle>
                      {article.title}
                    </IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <p
                      style={{
                        margin: 0,
                        lineHeight: 1.55,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {article.content}
                    </p>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CommunityNewsPage;