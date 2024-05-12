import { pick } from 'lodash'
import { config } from '../../app.config'

type PostHeadersType = {
  authorization: string,
  'content-type'?: string
}

export const requestLocal = async (query:string, variables:any = {}, headers:any, isSystemRequest: boolean = false) => {
  const federatedBaseUrl = `http://localhost:${config.PORT}`
  const postHeaders:PostHeadersType = pick(headers, ['authorization'])

  postHeaders['content-type'] = 'application/json'

  const response:any = await fetch(`${federatedBaseUrl}/graphql`, {
    method: 'POST',
    headers: postHeaders,
    body: JSON.stringify({ query, variables })
  })

  if (!response) {
    throw new Error('failed to get response')
  }

  return response.json()
}
