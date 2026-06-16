import api from '../../../services/api';

import type {
  DeleteRecyclingPointResponse,
  RecyclingPoint,
  RecyclingPointMutationResponse,
  RecyclingPointPayload,
} from '../types';

export async function getRecyclingPoints(): Promise<RecyclingPoint[]> {
  const response =
    await api.get<RecyclingPoint[]>(
      '/recycling-points',
    );

  return response.data;
}

export async function getRecyclingPointById(
  id: number,
): Promise<RecyclingPoint> {
  const response =
    await api.get<RecyclingPoint>(
      `/recycling-points/${id}`,
    );

  return response.data;
}

export async function createRecyclingPoint(
  payload: RecyclingPointPayload,
): Promise<RecyclingPoint> {
  const response =
    await api.post<RecyclingPointMutationResponse>(
      '/recycling-points',
      payload,
    );

  return response.data.recyclingPoint;
}

export async function updateRecyclingPoint(
  id: number,
  payload: RecyclingPointPayload,
): Promise<RecyclingPoint> {
  const response =
    await api.put<RecyclingPointMutationResponse>(
      `/recycling-points/${id}`,
      payload,
    );

  return response.data.recyclingPoint;
}

export async function deleteRecyclingPoint(
  id: number,
): Promise<DeleteRecyclingPointResponse> {
  const response =
    await api.delete<DeleteRecyclingPointResponse>(
      `/recycling-points/${id}`,
    );

  return response.data;
}