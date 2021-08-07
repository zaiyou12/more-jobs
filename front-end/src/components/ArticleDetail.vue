<template>
  <div class="flex flex-none w-full max-w-8xl mx-auto text-left bg-white">
    <article
      v-if="article"
      class="
        w-full
        px-4
        sm:px-6
        lg:mx-6 lg:px-0
        xl:mx-8
        text-base
        py-5
        break-words
      "
    >
      <h1 class="text-xl font-semibold text-gray-900">
        {{ article.title }}
      </h1>
      <span class="mt-1 text-gray-500 text-sm" v-if="article.site">
        ({{ article.site }})
      </span>
      <ul class="mt-1">
        <li v-if="article.price">
          예상 견적: {{ (article.price / 10000).toLocaleString() }} 만원
        </li>
        <li v-if="article.term">예상 기간: {{ article.term }} 일</li>
        <li v-if="article.work_type">{{ article.work_type }}</li>
        <li v-if="article.project_category">{{ article.project_category }}</li>
        <li v-if="article.project_field">{{ article.project_field }}</li>
        <li v-if="article.url">{{ article.url }}</li>
      </ul>
      <p class="mt-4">
        {{ article.details }}
      </p>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useArticles } from "../composable/useArticles";

const article = ref<Article | null>();
const route = useRoute();
const index = parseInt(route.params.index as string);

const { fetchArticles, articlesDownloading, articles, page, loadMoreArticles } =
  useArticles();
if (articles.value.length > 0) {
  article.value = articles.value[index];
}
// import { reactive } from 'vue';
// import { getArticle } from '../composable/article/getArticle';
// const route = useRoute()
// const date = route.params.date as string
// const title = route.params.title as string
// const article = reactive<Article>(await getArticle(date, title))
</script>
