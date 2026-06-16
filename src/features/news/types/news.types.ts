export type NewsItem = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
};

export type NewsPayload = {
  title: string;
  content: string;
  imageUrl?: string | null;
};

export type NewsMutationResponse = {
  message: string;
  news: NewsItem;
};

export type DeleteNewsResponse = {
  message: string;
};