<template>
  <div class="loader">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Loader extends Vue {
  @Prop({ type: String, default: "Загрузка..." }) text!: string;
}
</script>

<style lang="scss" scoped>
.loader {
  font-size: 18px;
  font-weight: bold;
  color: #555;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
