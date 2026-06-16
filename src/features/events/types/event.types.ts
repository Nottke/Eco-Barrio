export type EnvironmentalEvent = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  createdAt: string;
};

export type EventPayload = {
  title: string;
  description: string;
  location: string;
  date: string;
};

export type EventMutationResponse = {
  message: string;
  event: EnvironmentalEvent;
};

export type DeleteEventResponse = {
  message: string;
};