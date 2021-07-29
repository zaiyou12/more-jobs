<template>
  <AppNavigation />
  <RouterView />
</template>

<script lang="ts" setup>
import AppNavigation from "./components/AppNavigation.vue";
</script>

<style>
#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #ebeef1;
  color: #2c3e50;
}
</style>
