export interface PagingResponseModel<T = any> {
  list: T[];
  total: number;
}
