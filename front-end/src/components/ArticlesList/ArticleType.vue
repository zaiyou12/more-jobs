<template>
  <span
    class="rounded-full px-2 py-0.5 text-white text-sm"
    :class="bgColor[workType]"
  >
    {{ workType }}
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  workType: String;
}>();
const bgColor = {
  도급: 'bg-blue-400',
  상주: 'bg-indigo-400',
  '기간제 상주': 'bg-indigo-400'
}
</script>
