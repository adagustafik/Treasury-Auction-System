export interface IRequest {
  auth?: boolean;
  endpoint: string;
  config?: RequestInit;
}

export interface IResponse {
  success: string;
}
