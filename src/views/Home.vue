<template>
  <div>
    <div class="headerf">
      <Headers @showDownMenu="showDownMenu" @freezeHeader="freezeHeader" :headerFlag="headerFlag" class="header" />
      <div @mouseleave="hiddenDownMenu" @mouseenter="stopDownMenuFlag" @click="showDownMenuFlag = false" class="downMenu" v-show="showDownMenuFlag">
        <div @click="clickDownMenuItem(item)" :key="item" v-for="item in downMenu" class="downMenuItem">{{item}}</div>
      </div>
    </div>
    <div class="fadiv clearfix">
      <keep-alive exclude="Detail,rightCard">
        <router-view class="mainCard"></router-view>
      </keep-alive>
      <div class="rightCard" >
        <HomeRightCard :class="{rightCardSticky: rightCardFlag,'margin_top': rightFlag}" :msgList="msgList" ref="rightCard" class="rightCard" />
      </div>
    </div>
    <div class="footer">
      <Footers @showToast="onFooterToast"></Footers>
    </div>
    <transition name="back">
      <BackTop @click.native="clickBackTop" class="backTop" v-if="backTopFlag"></BackTop>
    </transition>
  </div>
</template>

<script>
import Headers from '../components/HomeCpns/Headers'
import HomeLeftCard from './Home/HomeLeftCard'
import HomeRightCard from './Home/HomeRightCard'
import Footers from './Home/Footers'
import Detail from './Home/Detail'

import request from '../network/request'

import BackTop from '../components/HomeCpns/BackTop'
import animate from '../utils/animate'
export default {
  name: 'Home',
  components: {
    Headers,
    HomeLeftCard,
    HomeRightCard,
    BackTop,
    Footers,
    Detail
  },
  data() {
    return {
      scrollTop: 0,
      oldScrollTop: 0, //记录上一次滚动结束后的滚动距离
      scrollRange: 0,
      // 是否切换header显示信息
      headerFlag: false,
      backTopFlag: false,
      // 是否改变固定定位
      rightCardFlag: false,
      // 节流用法，用来只保存一次rightcard的offsetTop
      offleftFlag: true,
      rightOffsetTop: 0,
      // right留言数组
      msgList: [],
      isScroll: true,
      // 下拉菜单的数据数组
      downMenu: [],
      // 显示或隐藏下拉菜单
      showDownMenuFlag: false,
      showDownFlag: true
    }
  },
  mounted() {
    // 监听滚动
    this.handleScroll();
    // 获取留言板数据
    this.getMessage()
    // 获取其他分类信息
    this.getMoreMenu()
  },
  computed: {
    rightFlag() {
      return this.$route.name == 'detail'
    }
  },
  methods: {
    // 获取固定窗口的分类项
    getMoreMenu() {
      request('/category').then(res=>{
        res.data.slice(4,).forEach(item=>{
          this.downMenu.push(item.name)
        })
      })
    },
    //文档的总高度
    getScrollHeight() {
        var documentScrollHeight = 0;
        documentScrollHeight = document.documentElement.scrollHeight;
        return documentScrollHeight;
    },
    //浏览器视口的高度
    getWindowHeight() {
        var windowHeight = 0;
        windowHeight = document.documentElement.clientHeight;
        return windowHeight;
    },
    handleScroll() {
      window.addEventListener("scroll", () => {
        this.scrollTop = window.scrollY;
      });
      
    },
    clickBackTop() {
      animate(window,0)
      this.headerFlag = false
    },
    // 监听footer组件吐司事件
    onFooterToast(msg) {
      this.$toast.show(msg, 700)
      // 重新获取留言板数据
      this.getMessage()
    },
    // 获取rightCard留言信息
    async getMessage() {
      let res = await request('message')
      if(res.meta&&res.meta.status!==200) return
      this.msgList = res.data
    },
    // 点击分类冻结住header的切换形式为不切换 
    freezeHeader() {
      setTimeout(()=>{
        this.headerFlag = false
      },200)
    },
    // 显示或隐藏downmenu的方法
    showDownMenu(boolean) {
      if(this.showDownFlag) {
        this.showDownMenuFlag = boolean
      }
    },
    stopDownMenuFlag() {
      this.showDownMenuFlag = true
      this.showDownFlag = false
      setTimeout(()=>{
      this.showDownFlag = true
      },2000)
    },
    hiddenDownMenu() {
      setTimeout(()=>{
      this.showDownMenuFlag = false
      },500)
    },
    // 点击了某一个下拉分类项
    clickDownMenuItem(item) {
      this.$store.commit('editMenu', item)
    }
  },
  watch: {
    scrollTop(newValue, oldValue) {
      newValue > 500 ? this.backTopFlag = true : this.backTopFlag = false
      // 保存this.$refs.rightCard的offsetTop
      if(this.$store.state.offleftFlag){
        // 判断rightcard固定定位的top距离事件
        this.rightOffsetTop = this.$refs.rightCard.$el.offsetTop - 60
        this.$store.commit('saveoffsetTop', this.rightOffsetTop)
      }
      this.rightCardFlag = newValue >= this.$store.state.rightOffsetTop
      // 实现判断header切换显示的逻辑
      clearInterval(this.clock)
      if(this.scrollflag) {
        this.scrollRange = newValue
        this.scrollflag = false
      }
      this.clock = setTimeout(()=>{
        this.oldScrollTop = oldValue
        this.scrollflag = true
      },100)
      // 是否触底加载更多
      if(this.$store.state.requestFlag){
        let scroll = newValue + this.getWindowHeight() - this.getScrollHeight();
        if (scroll > -200) {    //600：距离底部多少像素开始触发
          this.$store.commit('editRequest', false) // 节流用法
          if(this.$store.state.queryForm.menu == '') {
            this.$store.commit('loading') 
          } else {
            this.$store.commit('editMenu', this.$store.state.queryForm.menu)
          }
        }
      }
    },
    oldScrollTop(newValue) {
      if(newValue - this.scrollRange > 70){
        this.headerFlag = true
      } else if(this.scrollRange - newValue > 70){
        this.headerFlag = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.headerf {
  height: 60px;
  position: relative;
  .downMenu {
    position: fixed;
    top: 45px;
    right: 0;
    margin-right: 4.3vw;
    line-height: 30px;
    font-size: 12px;
    color: #888;
    width: 70px;
    background-color: #fff;
    box-shadow: 0 0 1px rgba(0, 0, 0, .1);
    border-radius: 3px;
    transition: all .3s;
    .downMenuItem {
      padding: 0 3px;
      text-align: center;
    }
    .downMenuItem:hover {
      background-color: #eee;
    }
  }
}
.margin_top {
  margin-top: 75px !important;
  top: 45px !important;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 40px;
  width: 100vw;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .2);
}
.mainCard {
  flex: 1;
  margin-bottom: 60px;
}
.rightCard {
  width: 250PX;
  margin-right: 10px;
}
.rightCardSticky {
  position: fixed;
  top: 47px;
  margin: 0;
  margin-right: 10px;
}
.fadiv {
  margin-top: 2vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
}
.back-enter,
.back-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
.back-enter-active,
.back-leave-active {
  transition: all .3s;
}




@media screen and (max-width: 800px) {
  .rightCard {
    display: none;
  }
  .mainCard {
    width: 100%;
  }
  .backTop {
    display: none;
  }
  .footer {
    display: none;
  }
}
</style>