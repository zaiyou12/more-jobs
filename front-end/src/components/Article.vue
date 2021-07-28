<template>
  <article class="w-full p-2 break-all border-t border-gray-300">
    <strong class="text-lg">외주 1</strong>
    <ul class="flex mt-2">
      <li v-for="tag in props.tags" :key="tag">#{{ tag }}</li>
    </ul>
    <ul class="flex mt-1">
      <li>￦{{ props.price }}만</li>
      <li class="ml-3">{{ props.duration }}일</li>
    </ul>
  </article>
</template>

<script lang="ts" setup>
const props = defineProps<{
  tags: string[]
  price: number
  duration: number
}>()
</script>
