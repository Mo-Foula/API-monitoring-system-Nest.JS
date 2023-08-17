import { InspectionResult } from './response.interface'
import { IHttpRequestConfig } from './http.request.interface'

export interface IHttpClientService {
  request(requestConfig: IHttpRequestConfig): Promise<InspectionResult>
}
