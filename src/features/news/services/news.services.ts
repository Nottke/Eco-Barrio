import api from '../../../services/api';

import type {
  DeleteNewsResponse,
  NewsItem,
  NewsMutationResponse,
  NewsPayload,
} from '../types';

export async function getNews(): Promise<NewsItem[]> {
  const response = await api.get<NewsItem[]>('/news');

  return response.data;
}

export async function getNewsById(
  id: number,
): Promise<NewsItem> {
  const response = await api.get<NewsItem>(
    `/news/${id}`,
  );

  return response.data;
}

export async function createNews(
  payload: NewsPayload,
): Promise<NewsItem> {
  const response =
    await api.post<NewsMutationResponse>(
      '/news',
      payload,
    );

  return response.data.news;
}

export async function updateNews(
  id: number,
  payload: NewsPayload,
): Promise<NewsItem> {
  const response =
    await api.put<NewsMutationResponse>(
      `/news/${id}`,
      payload,
    );

  return response.data.news;
}

export async function deleteNews(
  id: number,
): Promise<DeleteNewsResponse> {
  const response =
    await api.delete<DeleteNewsResponse>(
      `/news/${id}`,
    );

  return response.data;
}