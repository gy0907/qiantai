<template>
  <div class="back-top">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-icon-arrow-top4" />
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .back-top {
    width: 40px;
    height: 40px;
    background-color: #fff;
    position: fixed;
    bottom: 60px;
    right: 100px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    box-shadow: 0 0 4px rgba(0,0,0, .2);
    cursor: pointer;
  }
  .back-top svg {
    font-size: 12px;
    color: rgb(49, 49, 49);
  }
</style>