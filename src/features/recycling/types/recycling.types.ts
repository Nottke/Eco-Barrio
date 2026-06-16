export type RecyclingPoint = {
  id: number;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  createdAt: string;
};

export type RecyclingPointPayload = {
  name: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  description?: string | null;
};

export type RecyclingPointMutationResponse = {
  message: string;
  recyclingPoint: RecyclingPoint;
};

export type DeleteRecyclingPointResponse = {
  message: string;
};