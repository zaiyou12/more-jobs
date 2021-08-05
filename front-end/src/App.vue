<template>
  <AppNavigation />
  <RouterView />
</template>

<script lang="ts" setup>
import AppNavigation from "./components/AppNavigation.vue";
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  min-height: 100%;
  height: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #ebeef1;
  color: #2c3e50;
}
</style>
