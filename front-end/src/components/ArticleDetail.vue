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
          <span class="font-semibold">예상 견적: </span> 
          {{ (article.price / 10000).toLocaleString() }} 만원
        </li>
        <li v-if="article.term">
          <span class="font-semibold">예상 기간: </span> 
          {{ article.term }} 일
          </li>
        <li v-if="article.work_type">
          <span class="font-semibold">프로젝트 진행 방식: </span> 
          {{ article.work_type }}
          </li>
        <li v-if="article.project_category">
          <span class="font-semibold">프로젝트 카테고리: </span> 
          {{ article.project_category }}
          </li>
        <li v-if="article.project_field">
          <span class="font-semibold">프로젝트 분야: </span> 
          {{ article.project_field }}
          </li>
        <li v-if="article.url">
          <span class="font-semibold">링크: </span> 
          <a :href="article.url" target="_blank" class="underline">{{ article.url }}</a>
        </li>
      </ul>
      <p class="mt-4 font-semibold">세부 내용:</p>
      <p v-for="(detail, index) in details" :key="index">
        {{ detail }}
      </p>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useArticles } from "../composable/useArticles";

const article = ref<Article | null>();
const details = ref<string[] | undefined>([])
const route = useRoute();
const index = parseInt(route.params.index as string);

const { fetchArticles, articlesDownloading, articles, page, loadMoreArticles } =
  useArticles();
if (articles.value.length > 0) {
  article.value = articles.value[index];
  details.value = articles.value[index].details?.split('.')
}

// import { reactive } from 'vue';
// import { getArticle } from '../composable/article/getArticle';
// const route = useRoute()
// const date = route.params.date as string
// const title = route.params.title as string
// const article = reactive<Article>(await getArticle(date, title))
</script>
