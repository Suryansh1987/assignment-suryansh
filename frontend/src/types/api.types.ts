export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
