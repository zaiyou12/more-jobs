<template>
  <section>
    <Suspense>
      <template #default>
        <ArticleDetail :article="article" />
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </section>
</template>

<script lang="ts" setup>
import ArticleDetail from '../components/ArticleDetail.vue'

const article:Article = {
  title: 'Flutter 기반 입점형 커머스 플랫폼 APP 개발',
  slug: '2',
  body: '<프로젝트 개요> 프로젝트 소개 : - 입점형 커머스 플랫폼 서비스 프로젝트 진행 상황 : - 기획 및 디자인이 완료되었고 개발이 진행 중입니다. 전체 시스템 구성 : - Flutter(Dart) 스택을 통해 프런트 앱 제품을 만듭니다. 전체 프로젝트 일정 : - 계약 기간 : 2개월 ',
  createdAt: '1일전',
  tagList: ['개발'],
  price: 1100,
  duration: 60
}
</script>
