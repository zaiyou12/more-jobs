<template>
  <div class="ml-2">
    <img :src="logoSrc[site]" />
  </div>
</template>

<script lang="ts" setup>
import logoWhishket from "../../assets/logo-wishket.png";
import logoFreemoa from "../../assets/logo-freemoa.png";
import logoCastingn from "../../assets/logo-castingn.png";

const props = defineProps<{
  site: String;
}>();
const logoSrc = {
  wishket: logoWhishket,
  freemoa: logoFreemoa,
  castingn: logoCastingn,
};
</script>
