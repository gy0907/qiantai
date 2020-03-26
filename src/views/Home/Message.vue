<template>
  <div class="container">
    <div @click="clickBack" class="backHome">
      <div>返回</div>
      <div>首页</div>
    </div>
    <div class="msgItem" v-for="item in msgList" :key="item._id">
      <span>{{item.name}}：</span>
      <span>{{item.message}}</span>
      <span class="lastSpan">{{item.date | getTime}}</span>
    </div>
  </div>
</template>

<script>
import request from '../../network/request'

import getDate from '../../utils/timeago'
export default {
  data() {
    return {
      msgList: []
    }
  },
  filters: {
    getTime(time) {
      time = new Date(time - 0)
      return getDate(time)
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      request('/messageall').then(res=>{
        this.msgList = res.data
      })
    },
    clickBack() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .1);
  margin: 0 10px;
  padding: 10px 20px;
  margin-bottom: 50px;
  position: relative;
  .backHome {
    position: absolute;
    top: 0px;
    left: -50px;
    height: 33px;
    width: 33px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, .1);
    text-align: center;
    padding-top: 7px;
    color: #999;
    cursor: pointer;
  }
}
.msgItem {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 0 15px;
  height: 50PX;
  line-height: 50PX;
  margin: 10PX 0;
  font-size: 14PX;
  position: relative;
  .lastSpan {
    position:absolute;
    right: 10px;
    color: #999;
  }
}
</style>