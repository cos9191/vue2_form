<template>
  <Welcome msg="Добро пожаловать в сервис по работе с договорами!" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Welcome from "@/components/Welcome/Welcome.vue";

@Component({
  components: {
    Welcome,
  },
})
export default class HomeView extends Vue {}
</script>
