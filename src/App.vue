<template>
  <div id="app">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<style lang="less">
@import './assets/css/global.css';
@import './assets/css/normalize.css';
#app {
  margin: 0 auto;
}
</style>
