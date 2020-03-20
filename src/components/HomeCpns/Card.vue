<template>
    <div class="card">
      <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.card {
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, .1);
  transition: all .5s;
  transform-origin: center center;
  border-radius: 5px;
  padding: 20px;
}
.card:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, .1);
}
</style>