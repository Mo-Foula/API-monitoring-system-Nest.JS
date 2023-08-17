import { Injectable } from '@nestjs/common'
import { InspectionAbstract } from 'src/inspection/interfaces/inspection.entity.abstract'
import { mapToObject } from 'src/utils/map.to.object.utils'
import { Agent as httpAgent } from 'http'
import { Agent as httpsAgent } from 'https'
import { HttpClientService } from './http_client/http_client.service'
import { InspectionResult } from 'src/general_interfaces/response.interface'

@Injectable()
export class RequestsClientService {
  constructor(private httpService: HttpClientService) {}

  private prepareUrl(inspection: InspectionAbstract) {
    const port = inspection.port ? `:${inspection.port}` : ''

    const url = `${inspection.protocol.toLowerCase()}://${
      inspection.url
    }${port}${inspection.path || ''}`

    return url
  }

  // Might not need it
  private prepareAgent(inspection: InspectionAbstract): httpAgent | httpsAgent {
    return inspection.ignoreSSL
      ? new httpsAgent({
          rejectUnauthorized: false,
        })
      : new httpAgent()
  }

  private prepareHttpRequestConfig(inspection: InspectionAbstract) {
    const headers = mapToObject(inspection.httpHeaders)
    const url = this.prepareUrl(inspection)
    const agent = this.prepareAgent(inspection)
    const authentication = inspection.authentication
    const timeout = inspection.timeout

    return {
      headers,
      url,
      agent,
      authentication,
      timeout,
    }
  }

  private async createHttpRequest(
    inspection: InspectionAbstract,
  ): Promise<InspectionResult> {
    const requestConfig = this.prepareHttpRequestConfig(inspection)
    return this.httpService.request(requestConfig)
  }

  async createRequest(
    inspection: InspectionAbstract,
  ): Promise<InspectionResult> {
    let inspectionResult
    if (inspection.protocol === 'HTTP' || inspection.protocol === 'HTTPS') {
      inspectionResult = await this.createHttpRequest(inspection)
    } else {
      // request = this.createTCPRequest(inspection) TODO
    }

    inspectionResult = {
      ...inspectionResult,
      inspection,
    }
    return inspectionResult
  }
}
