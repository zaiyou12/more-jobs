import dayjs from "dayjs";
import { computed, ComputedRef, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getArticles } from "./article/getArticles";
import createAsyncProcess from "../utils/create-async-process";

const articles = ref<Article[]>([]);
/**
 * Date format 'YYYY-MM-DD'. Fetch all the articles of that date.
 * If there are fewer than 15 articles on that date, server will
 * continously check previous day's article until there are more
 * than 15. For example, if today's articles is three, yesterday's
 * two, and the day before yesterday's ten, it brings all of them
 * to the day before yesterday.
 */
const page = ref(today());
function today() {
  return dayjs().format("YYYY-MM-DD");
}
function yesterday(date: string) {
  return dayjs(date).subtract(1, 'day').format('YYYY-MM-DD')
}

export function useArticles() {
  const { workType } = getArticlesMeta();

  async function fetchArticles(): Promise<void> {
    articles.value = [];
    let responsePromise: null | Promise<ArticlesResponse> = null;

    if (workType.value === "freelance") {
      // TODO:
    } else if (workType.value === "all") {
      responsePromise = getArticles(page.value);
    }

    if (responsePromise !== null) {
      const response = await responsePromise;
      articles.value = response.articles;
    } else {
      throw new Error(`Articles "${page.value}" not supported`);
    }
  }

  const loadMoreArticles = (): void => {
    let last = articles.value[articles.value.length - 1]
    page.value = yesterday(last.created_time)
  };

  const { active: articlesDownloading, run: runWrappedFetchArticles } =
    createAsyncProcess(fetchArticles);

  watch(page, runWrappedFetchArticles);

  return {
    fetchArticles: runWrappedFetchArticles,
    articlesDownloading,
    articles,
    page,
    loadMoreArticles,
  };
}

export type WorkType = "all" | "contract" | "freelance" | "remote";
export const workTypes: WorkType[] = ["all", "contract", "freelance", "remote"];
export const isWorkType = (type: any): type is WorkType =>
  workTypes.includes(type);
interface GetArticlesMetaReturn {
  workType: ComputedRef<string>;
}
function getArticlesMeta(): GetArticlesMetaReturn {
  const route = useRoute();

  const workType = ref<WorkType>("all");

  watch(
    () => route.params.workType,
    (workTypeParam) => {
      if (workTypeParam != workType.value) {
        workType.value = isWorkType(workTypeParam) ? workTypeParam : "all";
      }
    },
    { immediate: true }
  );

  return {
    workType: computed(() => workType.value),
  };
}
