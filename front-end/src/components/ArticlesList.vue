<template>
  <section class="w-full max-w-8xl mx-auto">
    <div class="bg-white shadow text-base text-gray-600 text-left">
      <ArticlesListArticlePreview v-for="article in articles" :key="article.slug" :article="article"/>
    </div>
  </section>
</template>

<script lang="ts" setup>
import ArticlesListArticlePreview from '../components/ArticlesListArticlePreview.vue'

const articles:Article[] = [
  {
    title: 'Flutter 기반 입점형 커머스 플랫폼 APP 개발',
    slug: '2',
    body: '<프로젝트 개요> 프로젝트 소개 : - 입점형 커머스 플랫폼 서비스 프로젝트 진행 상황 : - 기획 및 디자인이 완료되었고 개발이 진행 중입니다. 전체 시스템 구성 : - Flutter(Dart) 스택을 통해 프런트 앱 제품을 만듭니다. 전체 프로젝트 일정 : - 계약 기간 : 2개월 ',
    createdAt: '1일전',
    tagList: ['개발'],
    price: 1100,
    duration: 60
  },
  {
    title: 'React 기반 협업툴 웹 사이트 기능 추가 프런트엔드 개발',
    slug: '3',
    body: '프로젝트 개요 : - React 기반 협업 툴 웹 사이트 기능 추가 현재 준비 상황 : - 건설분야 협업 툴을 개발하고 있습니다. - 현재 사용 중인 웹사이트 추가 기능 구현입니다. - 일부 비슷한 작업을 내부에서 작업하였습니다. 참고하시어 작업하면 됩니다. - 백엔드 api제공(내부 진행) 필요 요소 : - React 기반 협업 툴 웹 사이트 기능 추가 프런트엔드 개발 개발환경/언어/방식 : - React JS, Redux, JavaScript, HTML, CSS 등을 사용하여 프런트 구현',
    createdAt: '1일전',
    tagList: ['개발'],
    price: 200,
    duration: 10
  },
  {
    title: 'React Native를 이용한 API 연동 예제 소스를 개발',
    slug: '4',
    body: '프로젝트 간략 설명 : - 당사는 스크래핑 API 모듈을 제공하는 업체입니다. - 이용하는 고객들의 편의를 위해 React Native를 이용한 API 연동 예제 소스를 개발하려 합니다. 프로젝트 일정 : 1. 예상 시작일 : - 2021년 07월 30일 2. 예상 완료일',
    createdAt: '1일전',
    tagList: ['개발'],
    price: 200,
    duration: 11
  },
  {
    title: '반려동물 모바일 앱과 연동되는 웹 쇼핑몰 구축',
    slug: '5',
    body: '프로젝트 개요 : - 자사의 Mobile App 을 통해 가입한 고객이 복합 결제 (포인트 소진 및 추가 금액 결제)를 통해 제품을 구매하는 쇼핑몰 구축 프로젝트의 현재 상황 : - 요구 사항을 정리하여 전달드립니다. 기획 작업은 파트너님에게 의뢰합니다. 필요 요소 : - 쇼핑몰 기획 - 웹 디자인 및 퍼블리싱 - 반응형 웹 쇼핑몰 개발 ( 솔루션 활용 ) -',
    createdAt: '1일전',
    tagList: ['개발', '디자인', '기획'],
    price: 1000,
    duration: 45
  },
  {
    title: '자사몰 서버, DB 이관 및 솔루션 기반 신규 구축',
    slug: '6',
    body: '프로젝트 개요 : - 자사몰 서버, DB 이관 및 솔루션 기반 신규 구축 현재 준비 상황 : - 기 개발된 홈페이지가 있습니다. - 기존 사이트의 기획, 디자인 자료가 있습니다. 필요 요소 : - 자사몰 서버, DB 이관 - 솔루션 기반 신규 기획, 디자인 - 솔루션 기반 신규 개발 - 서버 및 관리자 페이지 추가 개발 개발환경/언어/방식 : - 기존 사이트 : ASP. OracleDB - 이전 서버 및 사용 솔루션 등 정해지지 않아 제안 부탁드립니다. ',
    createdAt: '1일전',
    tagList: ['개발'],
    price: 1500,
    duration: 50
  },
  {
    title: 'Flutter 기반 입점형 커머스 플랫폼 APP 개발',
    slug: '2',
    body: '<프로젝트 개요> 프로젝트 소개 : - 입점형 커머스 플랫폼 서비스 프로젝트 진행 상황 : - 기획 및 디자인이 완료되었고 개발이 진행 중입니다. 전체 시스템 구성 : - Flutter(Dart) 스택을 통해 프런트 앱 제품을 만듭니다. 전체 프로젝트 일정 : - 계약 기간 : 2개월 ',
    createdAt: '1일전',
    tagList: ['개발'],
    price: 1100,
    duration: 60
  },
  {
    title: 'React 기반 협업툴 웹 사이트 기능 추가 프런트엔드 개발',
    slug: '3',
    body: '프로젝트 개요 : - React 기반 협업 툴 웹 사이트 기능 추가 현재 준비 상황 : - 건설분야 협업 툴을 개발하고 있습니다. - 현재 사용 중인 웹사이트 추가 기능 구현입니다. - 일부 비슷한 작업을 내부에서 작업하였습니다. 참고하시어 작업하면 됩니다. - 백엔드 api제공(내부 진행) 필요 요소 : - React 기반 협업 툴 웹 사이트 기능 추가 프런트엔드 개발 개발환경/언어/방식 : - React JS, Redux, JavaScript, HTML, CSS 등을 사용하여 프런트 구현',
    createdAt: '1일전',
    tagList: ['개발'],
    price: 200,
    duration: 10
  },
  {
    title: 'React Native를 이용한 API 연동 예제 소스를 개발',
    slug: '4',
    body: '프로젝트 간략 설명 : - 당사는 스크래핑 API 모듈을 제공하는 업체입니다. - 이용하는 고객들의 편의를 위해 React Native를 이용한 API 연동 예제 소스를 개발하려 합니다. 프로젝트 일정 : 1. 예상 시작일 : - 2021년 07월 30일 2. 예상 완료일',
    createdAt: '1일전',
    tagList: ['개발'],
    price: 200,
    duration: 11
  },
  {
    title: '반려동물 모바일 앱과 연동되는 웹 쇼핑몰 구축',
    slug: '5',
    body: '프로젝트 개요 : - 자사의 Mobile App 을 통해 가입한 고객이 복합 결제 (포인트 소진 및 추가 금액 결제)를 통해 제품을 구매하는 쇼핑몰 구축 프로젝트의 현재 상황 : - 요구 사항을 정리하여 전달드립니다. 기획 작업은 파트너님에게 의뢰합니다. 필요 요소 : - 쇼핑몰 기획 - 웹 디자인 및 퍼블리싱 - 반응형 웹 쇼핑몰 개발 ( 솔루션 활용 ) -',
    createdAt: '1일전',
    tagList: ['개발', '디자인', '기획'],
    price: 1000,
    duration: 45
  },
  {
    title: '자사몰 서버, DB 이관 및 솔루션 기반 신규 구축',
    slug: '6',
    body: '프로젝트 개요 : - 자사몰 서버, DB 이관 및 솔루션 기반 신규 구축 현재 준비 상황 : - 기 개발된 홈페이지가 있습니다. - 기존 사이트의 기획, 디자인 자료가 있습니다. 필요 요소 : - 자사몰 서버, DB 이관 - 솔루션 기반 신규 기획, 디자인 - 솔루션 기반 신규 개발 - 서버 및 관리자 페이지 추가 개발 개발환경/언어/방식 : - 기존 사이트 : ASP. OracleDB - 이전 서버 및 사용 솔루션 등 정해지지 않아 제안 부탁드립니다. ',
    createdAt: '1일전',
    tagList: ['개발'],
    price: 1500,
    duration: 50
  },
]
</script>
