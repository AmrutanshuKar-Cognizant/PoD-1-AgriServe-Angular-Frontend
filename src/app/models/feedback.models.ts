export interface FeedbackRequestDTO {
  sessionId?: number;
  farmerId: number;
  programId?: number;
  rating: number;
  comment: string;
  date?: string;
}

export interface FeedbackResponseDTO {
  id: number;
  sessionId?: number;
  farmerId: number;
  programId?: number;
  rating: number;
  comment: string;
  date: string;
  feedbackType: string;
}

export interface SatisfactionMetricRequestDTO {
  programId: number;
  managerId: number;
  status: string;
  date: string;
}
 
export interface SatisfactionMetricResponseDTO {
  id: number;
  programId: number;
  managerId: number;
  status: string;
  date: string;
  overallSatisfaction: number;
  feedbackCount: number;
  averageRating: number;
}