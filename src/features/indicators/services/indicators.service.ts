import api from '../../../services/api';

import type {
  AutomaticIndicatorsResponse,
  DeleteIndicatorResponse,
  EnvironmentalIndicator,
  IndicatorMutationResponse,
  IndicatorPayload,
} from '../types';

export async function getAutomaticIndicators():
Promise<AutomaticIndicatorsResponse> {
  const response =
    await api.get<AutomaticIndicatorsResponse>(
      '/indicators/automatic',
    );

  return response.data;
}

export async function getIndicators(): Promise<EnvironmentalIndicator[]> {
  const response =
    await api.get<EnvironmentalIndicator[]>(
      '/indicators',
    );

  return response.data;
}

export async function getIndicatorById(
  id: number,
): Promise<EnvironmentalIndicator> {
  const response =
    await api.get<EnvironmentalIndicator>(
      `/indicators/${id}`,
    );

  return response.data;
}

export async function createIndicator(
  payload: IndicatorPayload,
): Promise<EnvironmentalIndicator> {
  const response =
    await api.post<IndicatorMutationResponse>(
      '/indicators',
      payload,
    );

  return response.data.indicator;
}

export async function updateIndicator(
  id: number,
  payload: IndicatorPayload,
): Promise<EnvironmentalIndicator> {
  const response =
    await api.put<IndicatorMutationResponse>(
      `/indicators/${id}`,
      payload,
    );

  return response.data.indicator;
}

export async function deleteIndicator(
  id: number,
): Promise<DeleteIndicatorResponse> {
  const response =
    await api.delete<DeleteIndicatorResponse>(
      `/indicators/${id}`,
    );

  return response.data;
}