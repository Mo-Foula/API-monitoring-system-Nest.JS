import { Agent as httpAgent } from 'http'
import { Agent as httpsAgent } from 'https'

export interface IHttpRequestConfig {
  url: string
  headers: Record<string, string>
  agent: httpAgent | httpsAgent | undefined
  authentication: { username: string; password: string } | undefined
  timeout: number
}
