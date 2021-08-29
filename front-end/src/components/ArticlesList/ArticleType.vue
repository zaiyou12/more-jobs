<template>
  <span
    class="rounded-full px-2 py-0.5 text-white text-sm"
    :class="workType && isWorkType(workType)? bgColor[workType] : ''"
  >
    {{ workType }}
  </span>
</template>

<script lang="ts" setup>
import { isSiteType } from '../../composable/useArticles'

const props = defineProps<{
  workType: string;
}>();

type WorkType = "도급" | "상주" | "기간제 상주";
const workTypesInKr = ['도급', '상주', '기간제 상주']
const isWorkType = (type: any): type is WorkType =>
  workTypesInKr.includes(type);

const bgColor = {
  도급: 'bg-blue-400',
  상주: 'bg-indigo-400',
  '기간제 상주': 'bg-indigo-400'
}
</script>
