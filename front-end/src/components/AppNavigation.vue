<template>
  <nav class="sticky shadow top-0 z-40 lg:z-50 w-full bg-blue-100">
    <div class="flex flex-none w-full max-w-8xl mx-auto">
      <ul class="h-12 flex items-center overflow-x-auto overflow-y-hidden px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8 text-base text-blue-100  whitespace-nowrap">
        <li class="flex font-bold">
          <AppLink
            name="home"
          >
            <img :src="logo" class="w-10 h-10 lg:hidden"/>
            <img :src="logoLarge" class="h-10 hidden lg:block" />
          </AppLink>
        </li>
        <!-- <li class="flex ml-6">도급</li>
        <li class="flex ml-6">파견</li>
        <li class="flex ml-6">원격근무</li>
        <li class="flex ml-6">과제</li> -->
      </ul>
    </div>
  </nav>
</template>

<script setup>
import logo from '../assets/logo.png'
import logoLarge from '../assets/logo-large.png'
</script>