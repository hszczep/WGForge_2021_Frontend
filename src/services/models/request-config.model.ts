export interface IRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: string;
  params?: unknown;
}
