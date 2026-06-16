export type EnvironmentalIndicator = {
  id: number;
  name: string;
  value: number;
  unit: string;
  createdAt: string;
};

export type AutomaticIndicators = {
  totalReports: number;
  pendingReports: number;
  approvedReports: number;
  rejectedReports: number;
  resolvedReports: number;
  totalNews: number;
  upcomingEvents: number;
  totalRecyclingPoints: number;
};

export type AutomaticIndicatorsResponse = {
  generatedAt: string;
  indicators: AutomaticIndicators;
};

export type IndicatorPayload = {
  name: string;
  value: number;
  unit: string;
};

export type IndicatorMutationResponse = {
  message: string;
  indicator: EnvironmentalIndicator;
};

export type DeleteIndicatorResponse = {
  message: string;
};