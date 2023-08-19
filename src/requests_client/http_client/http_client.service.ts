import { Injectable } from '@nestjs/common'
import { IHttpClientService } from 'src/general_interfaces/httpService.interface'
import Axios from 'axios'
import { InspectionResult } from 'src/general_interfaces/response.interface'
import { IHttpRequestConfig } from 'src/general_interfaces/http.request.interface'
import { Timer } from 'src/timer/timer.service'

@Injectable()
export class HttpClientService implements IHttpClientService {
  async request(requestConfig: IHttpRequestConfig): Promise<InspectionResult> {
    const { agent, authentication, headers, timeout, url } = requestConfig

    const timer = new Timer()

    const axiosRequest = Axios.create()

    let response
    timer.start()
    try {
      response = await axiosRequest({
        baseURL: url,
        timeout,
        headers,
        // httpAgent:
        // httpsAgent: agent,
        auth: authentication && {
          username: authentication.username,
          password: authentication.password,
        },
      })
    } catch (error: any) {
      response = error.response
    }
    timer.stop()

    const responseTime = timer.getDuration() || -1
    const castedResponose: InspectionResult = {
      statusCode: response.status,
      statusText: response.statusText,
      responseTime: responseTime,
    }
    return castedResponose
  }
}
