<template>
  <div class="ml-2">
    <img :src="site && isSiteType(site)? logoSrc[site]: ''" />
  </div>
</template>

<script lang="ts" setup>
import logoWhishket from "../../assets/logo-wishket.png";
import logoFreemoa from "../../assets/logo-freemoa.png";
import logoCastingn from "../../assets/logo-castingn.png";
import { isSiteType } from '../../composable/useArticles'

const props = defineProps<{
  site: string | undefined;
}>();
const logoSrc = {
  wishket: logoWhishket,
  freemoa: logoFreemoa,
  castingn: logoCastingn,
};
</script>
