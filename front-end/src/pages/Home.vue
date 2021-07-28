<template>
  <nav class="sticky shadow top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-blue-500 flex-none flex">
    <ul class="h-12 flex items-center overflow-x-auto overflow-y-hidden px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8 text-base text-blue-100  whitespace-nowrap">
      <li class="flex font-bold">전체</li>
      <li class="flex ml-6">도급</li>
      <li class="flex ml-6">파견</li>
      <li class="flex ml-6">원격근무</li>
      <li class="flex ml-6">과제</li>
    </ul>
  </nav>
  <div>
    <section class="bg-white shadow text-base text-gray-600 text-left">
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
      <Article :tags="article.tags" :price="article.price" :duration="article.duration"/>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Article from '../components/Article.vue'

const article = {
  tags: ['개발', '디자인'],
  price: 1000,
  duration: 60
}
</script>
