<template>
  <AppLink
    name="article"
    :params="{ index:index.toString(), date: article.created_time, title: article.title }"
  >
    <article class="w-full p-2 break-all truncate border-t border-gray-300">
      <strong class="text-lg">{{ article.title }}</strong>
      <ul class="flex mt-1">
        <li>{{ article.work_type }}</li>
        <li class="ml-3" v-if="article.price">￦{{ (article.price/10000).toLocaleString() }}만</li>
        <li class="ml-3">{{ article.term }}일</li>
      </ul>
    </article>
  </AppLink>
</template>

<script lang="ts" setup>
import AppLink from "./AppLink.vue";
const props = defineProps<{
  article: Article
  index: number
}>()
</script>
