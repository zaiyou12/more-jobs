import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import createAsyncProcess from '../utils/create-async-process'
import { getArticles } from './article/getArticles'

function today() {
  return dayjs().format('YYYY-MM-DD')
}
const articles = ref<Article[]>([])

export function useArticles(){
  const page = ref(today())

  async function fetchArticles (): Promise<void> {
    articles.value = []
    let responsePromise: null | Promise<ArticlesResponse> = null

    responsePromise = getArticles(page.value)

    if (responsePromise !== null) {
      const response = await responsePromise
      articles.value = response.articles
    } else {
      throw new Error(`Articles "${page.value}" not supported`)
    }
  }

  const changePage = (value: string): void => {
    page.value = value
  }

  const { active: articlesDownloading, run: runWrappedFetchArticles } = createAsyncProcess(fetchArticles)

  watch(page, runWrappedFetchArticles)

  return {
    fetchArticles: runWrappedFetchArticles,
    articlesDownloading,
    articles,
    page,
    changePage
  }
}
