<template>
  <section class="w-full max-w-8xl mx-auto">
    <div v-if="articlesDownloading">
      Loading...
    </div>
    <div v-else-if="articles.length === 0">
      No articles are here
    </div>
    <template v-else>
      <div class="bg-white shadow text-base text-gray-600 text-left">
        <ArticlesListArticlePreview
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
          :index="index"
        />
      </div>
    </template>
  </section>
</template>

<script lang="ts" setup>
import ArticlesListArticlePreview from '../components/ArticlesListArticlePreview.vue'
import { useArticles } from '../composable/useArticles';

const {
  fetchArticles,
  articlesDownloading,
  articles,
  page,
  changePage
} = useArticles()

fetchArticles()
</script>
