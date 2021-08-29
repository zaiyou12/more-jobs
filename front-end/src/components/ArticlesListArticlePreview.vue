<template>
  <AppLink
    name="article"
    :params="{
      workType,
      index: index.toString(),
      date: article.created_time,
      title: article.title,
    }"
  >
    <article class="w-full p-2 break-all truncate border-t border-gray-300 flex-col">
      <div class="flex">
        <ArticleType :workType="article.work_type? article.work_type: ''"/>
      </div>
      <div class="flex">
        <strong class="flex text-lg">
          {{ article.title }}
        </strong>
      </div>
      <ul class="flex mt-1">
        <li v-if="article.price">
          ￦{{ (article.price / 10000).toLocaleString() }}만
        </li>
        <li v-else>견적 상호협의</li>
        <li class="ml-3" v-if="article.term">{{ article.term }}일</li>
        <li class="ml-3" v-else>일정 상호협의</li>
        <li class="ml-3">{{ article.created_time }}</li>
      </ul>
    </article>
  </AppLink>
</template>

<script lang="ts" setup>
import { getArticlesMeta } from "../composable/useArticles";
import AppLink from "./AppLink.vue";
import ArticleType from "./ArticleType.vue"
const props = defineProps<{
  article: Article;
  index: number;
}>();
const { workType } = getArticlesMeta();
</script>
