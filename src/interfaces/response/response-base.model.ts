export interface ResponseBaseModel<T = any> {
  data: T;
  message: string;
  isError: boolean;
  statusCode: number;
}
