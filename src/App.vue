<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
    <hello msg="TypeScript 学习" @add-food="hearYOu" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import Hello from "./components/Hello.vue";

@Component({
  components: {
    HelloWorld,
    Hello
  }
})
export default class App extends Vue {
  private hearYOu(event: any) {
    console.log(event.target.value);
    event.target.value = "";
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
