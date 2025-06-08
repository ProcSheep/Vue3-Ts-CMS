<template>
  <div class="app">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
  .app{
    // 视口占满(vh/vw),如果写100%,这个app最终还要放入index.html中的div-app中,html内部又需要调html body app三者的宽高
    width: 100vw;
    height: 100vh;
    // background-color: aquamarine;
  }
</style>
