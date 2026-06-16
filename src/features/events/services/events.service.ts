import api from '../../../services/api';

import type {
  DeleteEventResponse,
  EnvironmentalEvent,
  EventMutationResponse,
  EventPayload,
} from '../types';

export async function getEvents(): Promise<EnvironmentalEvent[]> {
  const response = await api.get<EnvironmentalEvent[]>('/events');

  return response.data;
}

export async function getEventById(
  id: number,
): Promise<EnvironmentalEvent> {
  const response = await api.get<EnvironmentalEvent>(
    `/events/${id}`,
  );

  return response.data;
}

export async function createEvent(
  payload: EventPayload,
): Promise<EnvironmentalEvent> {
  const response =
    await api.post<EventMutationResponse>(
      '/events',
      payload,
    );

  return response.data.event;
}

export async function updateEvent(
  id: number,
  payload: EventPayload,
): Promise<EnvironmentalEvent> {
  const response =
    await api.put<EventMutationResponse>(
      `/events/${id}`,
      payload,
    );

  return response.data.event;
}

export async function deleteEvent(
  id: number,
): Promise<DeleteEventResponse> {
  const response =
    await api.delete<DeleteEventResponse>(
      `/events/${id}`,
    );

  return response.data;
}