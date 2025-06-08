<template>
  <div class="login">
    <LoginPanel/>
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './cpns/login-panel.vue';


</script>

<style lang="less" scoped>
  .login{
    // 父元素是App.vue中的div-app, 那个dom元素已经通过视口占满屏幕了
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: url('../../assets/img/login-bg.svg');
  }
</style>