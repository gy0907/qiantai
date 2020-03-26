<template>
  <div>
    <Card v-if="rightFlag">
      <div class="right">
        <h4 class="message" @click="clickMsg">留言板</h4>
        <p class="hello">有没有什么想说的？</p>
        <p class="hello">在底侧留言吧~</p>
        <div>
          <div v-for="item in setMsg" :key="item.date">
            <span class="name">{{item.name}}：</span>
            <span>{{item.message}}</span>
          </div>
        </div>
      </div>
    </Card>
    <Card v-else>
      <div class="right">
        <h3 class="message">目录</h3>
        <ol>
          <li v-for="(item,index) in regList" :key="index">
            {{item}}
          </li>
        </ol>
        <div class="love" @click="clickLove">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xihuan" />
          </svg>
        </div>
        <div class="count">
          <span>{{this.$store.state.detail.loves}}人喜欢</span>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>

import Card from '../../components/HomeCpns/Card'
export default {
  name: 'rightCard',
  components: {
    Card
  },
  data() {
    return {
    }
  },
  props: {
    msgList: Array,
  },
  computed: {
    setMsg() {
      let arr = this.msgList.slice(0, 6)
      return arr
    },
    regList() {
        let reg = /[\#]{1,6}\s+[^\n]+/g
        let reg1 = /[\#]{1,6}/g
        let arr = this.$store.state.detail.body&&this.$store.state.detail.body.match(reg)
      return arr&&arr.map(item=>item.replace(reg1,''))
    },
    rightFlag() {
      return this.$route.name !== 'detail'
    }
  },
  mounted() {
  },
  methods: {
    // 喜欢文章的方法
    clickLove() {
      
    },
    // 打开留言页
    clickMsg() {
      this.$router.push('/message')
    }
  }
}
</script>

<style lang="less" scoped>
ol {
  margin: 10px 0;
  padding: 0 0 0 16px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  >li {
    margin: 5PX 0;
    font-size: 13PX;
    color: var(--themecolor);
  }
}
.count {
  position: absolute;
  left: 30px;
  bottom: -88px;
}
.love {
  position: absolute;
  left: -15px;
  bottom: -100px;
  background-color: #fff;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, .1);
  .icon {
    font-size: 16px;
  }
}
ol::-webkit-scrollbar {
  border: 0;
} // 滚动条整体部分，其中的属性: width,height,background,border等。
ol::-webkit-scrollbar-button{
  display: none;
} // 滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。
ol::-webkit-scrollbar-track{display: none;} // 外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。
ol::-webkit-scrollbar-track-piece{display: none;} // 内层滚动槽/轨道，需要注意的就是它会覆盖第三个属性的样式。
// ol::-webkit-scrollbar-thumb{} // 滚动的滑块
ol::-webkit-scrollbar-corner{display: none;} // 边角，两个滚动条交汇处
ol::-webkit-resizer{display: none;} // 定义右下角拖动块的样式/两个滚动条交汇处用于拖动调整元素大小的小控件（基本用不上）
.right{
  height: 300PX;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  >div {
    display: flex;
    margin-top: 10PX;
    flex-direction: column;
    font-size: 13PX;
    color: #aaa;
    >div{
    margin: 4PX 0 ;
    height: 30PX;
    line-height: 15PX;
    display: -webkit-box;
    overflow: hidden;
    /* 子元素垂直排列 */
    -webkit-box-orient: vertical;
    /* 第二行开始裁剪 */
    -webkit-line-clamp: 2;
      .name {
        color: #666;
      }
      >span:last-child {
        margin-left: 10PX;
      }
    }
  }
}
.img {
  display: block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.message{
  height: 20PX;
  font-size: 20PX;
  vertical-align: top;
  margin: 0 0 10PX 0;
  transition: all .3s;
}
.message:hover {
  cursor: pointer;
  text-decoration: underline;
}
.hello{
  margin: 2PX 0;
  font-size: 10PX;
  color: #999;
}
</style>