<template>
  <span v-if="workType==='도급'" class="rounded-full bg-blue-400 px-2 py-0.5 text-white text-sm">
    {{ workType }}
  </span>
  <span v-else-if="workType==='상주'" class="rounded-full bg-indigo-400 px-2 py-0.5 text-white text-sm">
    {{ workType }}
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  workType: String;
}>();
</script>