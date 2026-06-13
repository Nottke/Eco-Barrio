import api from '../../../services/api';

import type {
  DeleteReportResponse,
  EnvironmentalReport,
  ReportStatus,
  UpdateReportStatusResponse,
} from '../types';

export async function getReports(): Promise<EnvironmentalReport[]> {
  const response = await api.get<EnvironmentalReport[]>('/reports');

  return response.data;
}

export async function getReportById(
  id: number,
): Promise<EnvironmentalReport> {
  const response = await api.get<EnvironmentalReport>(
    `/reports/${id}`,
  );

  return response.data;
}

export async function updateReportStatus(
  id: number,
  status: ReportStatus,
): Promise<EnvironmentalReport> {
  const response =
    await api.put<UpdateReportStatusResponse>(
      `/reports/${id}/status`,
      { status },
    );

  return response.data.report;
}

export async function deleteReport(
  id: number,
): Promise<DeleteReportResponse> {
  const response =
    await api.delete<DeleteReportResponse>(
      `/reports/${id}`,
    );

  return response.data;
}