<template>
  <nav class="sticky shadow top-0 z-40 lg:z-50 w-full bg-blue-100">
    <div class="flex flex-none w-full max-w-8xl mx-auto">
      <ul
        class="
          h-12
          flex
          items-center
          overflow-x-auto overflow-y-hidden
          px-4
          sm:px-6
          lg:mx-6 lg:px-0
          xl:mx-8
          text-base text-gray-900
          whitespace-nowrap
        "
      >
        <li class="flex">
          <AppLink name="home">
            <img :src="logo" class="w-10 h-10 lg:hidden" />
            <img :src="logoLarge" class="h-10 hidden lg:block" />
          </AppLink>
        </li>
        <li v-for="(item, index) in workTypes" :key="item" class="flex ml-6"
          :class="item === workType? 'font-bold' : 'font-normal'">
          <AppLink
            name="home"
            :params="{workType: item}"
          >
            {{ workTypesInKr[index] }}
          </AppLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { getArticlesMeta } from '../composable/useArticles'
import logo from '../assets/logo.png'
import logoLarge from '../assets/logo-large.png'
import {workTypes, workTypesInKr} from '../composable/useArticles'

const { workType } = getArticlesMeta();
</script>
