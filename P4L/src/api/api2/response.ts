export interface ResponseType<T> {
  data: T;
  success: boolean;
  error: string;
}
