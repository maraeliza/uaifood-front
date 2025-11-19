export type ResponseError = { message: string };

export interface ApiResponseError {
  message: string
  status: number
  type: string
  errors?: {
    [key: string]: string
  }
}
