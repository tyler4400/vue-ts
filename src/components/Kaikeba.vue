<template>
  <div>
    <span>{{ message }}</span>
    <button @click="changeMsg">点击</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Hello extends Vue {
  public message: string = "aaaA";
  created() {
    this.message = "开课吧";
  }
}
</script>
