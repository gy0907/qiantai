<template>
  <div class="container1">
    <div class="date">{{nowDate | getDate}}</div>
  </div>
</template>

<script>
import gettime from '../../utils/gettime'
export default {
  filters: {
    getDate(time) {
      return gettime(time)
    }
  },
  mounted() {
    setInterval(()=>{
      this.nowDate = new Date
    },1000)
  },
  data() {
    return {
      nowDate: new Date()
    }
  },
}
</script>

<style lang="less" scoped>
.container1 {
  height: 50px;
  width: 100%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: all .5s;
  font-size: 16px;
}

</style>