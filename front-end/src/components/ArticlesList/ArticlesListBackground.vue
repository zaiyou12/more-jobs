<template>
  <article
    class="w-full p-2 break-all truncate border-t border-gray-300 flex-col"
    :class="site && isSiteType(site)? bgColor[site]:''"
  >
    <slot />
  </article>
</template>

<script lang="ts" setup>
import { isSiteType } from '../../composable/useArticles'

const props = defineProps<{
  site: string | undefined;
}>();
const bgColor = {
  wishket: "bg-green-50",
  freemoa: "bg-yellow-50",
  castingn: "bg-blue-50",
};
</script>
