<template>
  <div class="container">
    <div @click="openDetail" class="title">{{options.title}}</div>
    <div class="detail"><p>{{options.body}}</p></div>
    <div class="info">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-riqi" />
      </svg>
      <span class="time">{{options.date | getDate}}</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yanjing" />
      </svg>
      <span class="looks">{{options.looks}}</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xihuan" />
      </svg>
      <span class="loves">{{options.loves}}</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenlei" />
      </svg>
      <span class="category">{{options.category.name}}</span>
    </div>
  </div>
</template>

<script>
import gettime from '../../utils/timeago'
export default {
  props: {
    options: Object
  },
  filters: {
    getDate(time) {
      time = new Date(time)
      return gettime(time)
    }
  },
  methods: {
    openDetail() {
      this.$router.push(`/detail/${this.options._id}`)
    }
  }
}
</script>

<style scoped lang="less">
.container {
  height: 150PX;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  position: relative;
}
.title {
  height: 15%;
  line-height: 20px;
  font-size: 18PX;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
}
.title:hover {
  text-decoration: underline;
}
.detail {
  height: 40%;
  font-size: 13PX;
  color: #888;
  line-height: 20PX;
  padding: 0 20px 0 0;
  max-height: 100px;
  overflow: hidden;
  >p{
    margin: 5px 0 13px 0;
    display: -webkit-box;
    overflow: hidden;
    /* 子元素垂直排列 */
    -webkit-box-orient: vertical;
    /* 第二行开始裁剪 */
    -webkit-line-clamp: 2;
  }
}
.info {
  height: 10%;
  font-size: 12PX;
  color: #aaa;
  position: absolute;
  bottom: 8px;
  >span {
    margin: 0 10px 0 5px;
  }
}
@media screen and (max-width: 800px) {
  .container {
  height: 120PX;
  }
  .detail {
    margin-top: 5PX;
  }
}
</style>