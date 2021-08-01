<template>
  <section>
    <Suspense>
      <template #default>
        <ArticleDetail />
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </section>
</template>

<script lang="ts" setup>
import ArticleDetail from '../components/ArticleDetail.vue'
</script>
