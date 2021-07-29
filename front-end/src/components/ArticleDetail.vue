<template>
  <div class="flex flex-none w-full max-w-8xl mx-auto text-left bg-white">
    <article class="px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8 text-base py-5">
      <a href="">
        <h1 class="text-xl font-semibold text-gray-900">
          {{ props.article.title }}
        </h1>
      </a>
      <span class="mt-1 text-gray-500 text-sm">
        (wishket.com)
      </span>
      <ul class="flex mt-4">
        <li v-for="tag in article.tagList" :key="tag">#{{ tag }}</li>
      </ul>
      <ul class="mt-1">
        <li>예상 견적: {{ props.article.price }} 만원</li>
        <li>예상 기간: {{ props.article.duration }} 일</li>
      </ul>
      <p class="mt-4">
        {{ props.article.body }}
      </p>
    </article>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  article: Article
}>()
</script>
