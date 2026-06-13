export type ReportStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'RESOLVED';

export type ReportAuthor = {
  id: number;
  name: string;
  email: string;
};

export type EnvironmentalReport = {
  id: number;
  title: string;
  description: string;
  location: string;
  status: ReportStatus;
  imageUrl: string | null;
  createdAt: string;
  userId: number;
  user: ReportAuthor;
};

export type UpdateReportStatusResponse = {
  message: string;
  report: EnvironmentalReport;
};

export type DeleteReportResponse = {
  message: string;
};