import { request } from '../index'

export function getArticle(date:string, title:string):Promise<Article> {
  return request.get<ArticleResponse>(`/article/${date}/${title}`).then(res=> res.article)
}
