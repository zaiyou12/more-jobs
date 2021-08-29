<template>
  <section class="w-full max-w-8xl mx-auto pb-5">
    <div v-if="articlesDownloading">Loading...</div>
    <div v-else-if="articles.length === 0">No articles are here</div>
    <template v-else>
      <div class="bg-white shadow text-base text-gray-600 text-left">
        <ArticlesListArticlePreview
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
          :index="index"
        />
      </div>
      <div class="flex justify-start">
        <button class="p-3 underline" v-on:click="loadMoreArticles">
          더 불러오기
        </button>
      </div>
    </template>
  </section>
</template>

<script lang="ts" setup>
import ArticlesListArticlePreview from "./ArticlesListArticlePreview.vue";
import { useArticles } from "../../composable/useArticles";

const { fetchArticles, articlesDownloading, articles, page, loadMoreArticles } =
  useArticles();

if (articles.value.length == 0) {
  fetchArticles();
}
</script>
