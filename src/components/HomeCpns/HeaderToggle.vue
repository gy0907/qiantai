<template>
  <div class="container1" v-if="!isDetail">
    <div class="date">{{nowDate | getDate}}</div>
    <div class="rightMenu">
      <div>登录</div>
      <div>注册</div>
      <div>个人随笔</div>
    </div>
  </div>
  <div class="container2" v-else>
    <div class="title">
      <h1>{{getTitle}}</h1>
    </div>
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
  computed: {
    isDetail() {
      return this.$route.name == 'detail'
    },
    getTitle() {
      return this.$store.state.detail&&this.$store.state.detail.title
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: all .5s;
  font-size: 16px;
}
.container2 {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all .5s;
  font-size: 16px;
  >.title {
    width: 1200PX;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    >h1 {
    padding: 0 10px;
    font-size: 24PX;
    }
  }
}
.rightMenu {
  display: flex;
  justify-content: space-evenly;
  width: 200PX;
  margin-right: 80px;
  cursor: pointer;
  transition: all .3s;
  font-size: 16PX;
  color: #888;
  >div:hover {
    transition: all .3s;
    color: var(--themecolor);
  }
}
.date {
  flex :1;
}
@media screen and (max-width: 1200px) {
  .title {
    margin-left: 20px !important;
  }
}
</style>