<template>
  <AppLink
    name="article"
    :params="{slug: article.slug}"
  >
    <article class="w-full p-2 break-all truncate border-t border-gray-300">
      <strong class="text-lg">{{ article.title }}</strong>
      <ul class="flex mt-2">
        <li v-for="tag in article.tagList" :key="tag">#{{ tag }}</li>
      </ul>
      <ul class="flex mt-1">
        <li>￦{{ article.price }}만</li>
        <li class="ml-3">{{ article.duration }}일</li>
      </ul>
    </article>
  </AppLink>
</template>

<script lang="ts" setup>
import AppLink from "./AppLink.vue";
const props = defineProps<{
  article: Article
}>()
</script>
