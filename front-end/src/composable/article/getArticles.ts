import { request } from '../index'

export function getArticles(start:string): Promise<ArticlesResponse> {
  const params = { start }
  return request.get<ArticlesResponse>('/articles', { params })
}
