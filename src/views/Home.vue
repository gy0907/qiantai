<template>
  <div>
    <div class="headerf">
      <Headers :headerFlag="headerFlag" class="header" />
    </div>
    <div class="fadiv clearfix">
      <HomeLeftCard class="mainCard" />
      <HomeRightCard :style="{'left': rightCardOffsetLeft+'px'}" :class="{rightCardSticky: rightCardFlag}" ref="rightCard" class="rightCard" />
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

import BackTop from '../components/HomeCpns/BackTop'
import animate from '../utils/animate'
export default {
  components: {
    Headers,
    HomeLeftCard,
    HomeRightCard,
    BackTop
  },
  data() {
    return {
      scrollTop: 0,
      oldScrollTop: 0, //记录上一次滚动结束后的滚动距离
      scrollRange: 0,
      headerFlag: false,
      backTopFlag: false,
      rightCardFlag: false,
      rightCardOffsetLeft: 0
    }
  },
  mounted() {
    this.handleScroll();
  },
  methods: {
    handleScroll() {
      window.addEventListener("scroll", () => {
        this.scrollTop = window.scrollY;
      });
    },
    clickBackTop() {
      animate(window,0)
      this.headerFlag = false
    }
  },
  watch: {
    scrollTop(newValue, oldValue) {
      newValue > 500 ? this.backTopFlag = true : this.backTopFlag = false
      newValue >= this.$refs.rightCard.$el.offsetTop - 50 ? this.rightCardFlag = true : this.rightCardFlag = false
      // 保存this.$refs.rightCard的offsetLeft
      this.rightCardOffsetLeft = this.$refs.rightCard.$el.offsetLeft
      clearInterval(this.clock)
      if(this.scrolflag) {
        this.scrollRange = newValue
        this.scrolflag = false
      }
      this.clock = setTimeout(()=>{
        this.oldScrollTop = oldValue
        this.scrolflag = true
      },100)
    },
    oldScrollTop(newValue) {
      if(newValue - this.scrollRange > 70){
        this.headerFlag = true
      } else if(this.scrollRange - newValue > 70){
        this.headerFlag = false
      }
    }
  }, 
}
</script>

<style scoped>
.headerf {
  height: 60px;
}
.mainCard {
  float: left;
  width: 70%;
}
.rightCard {
  float: right;
  overflow: hidden;
  width: 25%;
  height: 300px;
}
.rightCardSticky {
  position: fixed;
  top: 50px;
}
.fadiv {
  margin-top: 2vh;
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




@media screen and (max-width: 700px) {
  .rightCard {
    display: none;
  }
  .mainCard {
    width: 100%;
    padding: 0 3vw;
  }
  .backTop {
    display: none;
  }
}
</style>