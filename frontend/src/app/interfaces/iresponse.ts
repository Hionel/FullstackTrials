export interface IResponse {
  status: string;
  msg?: string;
  success: boolean;
  data?: { _id: string; email: string; firstname: string; lastname: string };
}
