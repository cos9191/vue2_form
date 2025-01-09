<template>
  <div class="hello">
    <img alt="Vue logo" src="./contract.avif" />
    <h1>{{ msg }}</h1>
    <p>Перейти в раздел <router-link to="/contracts">Договора</router-link>.</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
