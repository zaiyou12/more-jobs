import { request } from '../index'

export function getArticles(start:string, workType: string): Promise<ArticlesResponse> {
  let params:any = { start }
  if (workType != 'all') {
    params = {...params, work_type: workType}
  }
  return request.get<ArticlesResponse>('/articles', { params })
}
