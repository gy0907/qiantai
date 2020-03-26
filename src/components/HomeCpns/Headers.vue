<template>
  <div>
    <div class="container">
      <transition name="slide">
        <div v-show="!headerFlag" class="toggle1">
          <div class="left" @click="clickLogo">
            <div class="my">MY</div>
            <div class="blog">BLOG</div>
          </div>
          <div class="input" :class="{inputwei: inputClass}">
            <input @keyup.enter="enterInput" @focus="inputFocus" @blur="blurInput" maxlength="20" placeholder="Search what..." class="search" v-model="search" type="text" />
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-sousuo" />
            </svg>
          </div>
          <div class="right">
            <div
              v-for="(item,index) in navData"
              :key="item.class"
              @click="clickNavbar(index)"
              :class="{'active': index == activeIndex}"
            >
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#'+iconClass[index]" />
              </svg>
              <div>{{item}}</div>
            </div>
            <svg @mouseleave="downLeave" @mouseenter="downEnter" class="icon icon-xiangxia1" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" />
            </svg>
          </div>
        </div>
      </transition>
      <HeaderToggle @click.native="$emit('freezeHeader')" :class='{toggleactive: headerFlag}' class="toggle"></HeaderToggle>
    </div>

  </div>
</template>

<script>
import HeaderToggle from './HeaderToggle'
export default {
  components: {
    HeaderToggle
  },
  props: {
    headerFlag: Boolean
  },
  data() {
    return {
      navData: ["JS", "CSS", "VUE", "NODE"],
      iconClass: ["icon-js", "icon-css", "icon-Vue", "icon-node"],
      activeIndex: -1,
      search: "",
      clock: null,
      clickFlag: true,
      timer: null,
      inputClass: false,
    };
  },
  methods: {
    clickNavbar(index) {
      // 多次点击视作一次
      clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.clickFlag = true
      },1000)
      if(this.clickFlag){
        this.activeIndex = index;  // 防抖
        this.$emit('freezeHeader') // 冻结头header切换显示
        this.clickFlag = false
        switch(index) {
          case 0 : this.$store.commit('editMenu', 'js')
          break
          case 1 : this.$store.commit('editMenu', 'css')
          break
          case 2 : this.$store.commit('editMenu', 'vue')
          break
          case 3 : this.$store.commit('editMenu', 'node')
          break
        }
      }
    },
    // 输入框enter了发送事件
    enterInput(){
      clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.clickFlag = true
      },1000)
      if(this.clickFlag) {
        this.clickFlag = false
        if(this.search.trim() != '') {
          this.$store.commit('searchInput', this.search)
        }
      }
    },
    // 点击logo刷新主页
    clickLogo() {
      this.$router.go(0) 
    },
    // 输入框获取焦点
    inputFocus() {
      this.inputClass = true 
    },
    // 输入框失去焦点
    blurInput() {
      this.inputClass = false
    },
    // 下拉箭头焦点
    downEnter() {
      this.$emit('showDownMenu',true)
    },
    // 下拉箭头失去焦点
    downLeave() {
      setTimeout(()=>{
      this.$emit('showDownMenu',false)
      },2000)
    }
  },
  watch: {
    search(newval) {
      if(newval == '') {
        this.$store.commit('loading')
      }
    }
  },
}

</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  text-align: center;
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.25s;
  z-index: 5;
  padding: 3px 0;
  background-color: #404040;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.toggle {
  z-index: 15;
  color: #ddd;
}
.toggle1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left,.input,.right {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgb(187, 124, 7);
}

.left {
  margin-left: 10vw;
}
.my {
  font-size: 20px;
}
.blog {
  background-color: var(--themecolor);
  font-size: 20px;
  border-radius: 5px;
  margin-left: 5px;
  padding: 3px;
  color: #404040;
  transition: 0.5s;
}
.left:hover .blog {
  transform: rotateZ(180deg);
}
.right {
  font-size: 20px;
  font-weight: 400;
  margin-right: 7vw;
  text-align: center;
  position: relative;
  > div {
    margin-left: 2vw;  
    display: flex;
    align-items: center;
    position: relative;
    height: 33px;
    display: flex;
    transition: 0.3s all;
  }
  > div:hover {
    color: var(--themecolor) !important;
  }
  > div::before {
    content: "";
    width: 0;
    position: absolute;
    border-bottom: 2px solid;
    bottom: 0;
    left: 50%;
    color: var(--themecolor);
    transition: 0.3s all;
  }
  > div:hover:before {
    left: 0;
    width: 100%;
    transition: 0.3s all;
  }
  .active {
    color: var(--themecolor);
  }
  .active::before {
    content: "";
    width: 100%;
    position: absolute;
    border-bottom: 2px solid;
    bottom: 0;
    left: 0%;
    transition: 0.3s all;
  }
  .icon-xiangxia1 {
    margin-left: 2vw;
    font-size: 16px;
  }
  .icon-xiangxia1:hover {
    color: var(--themecolor);
    transition: 0.3s all;
  }
}
.input {
  position: relative;
}
.input svg {
  position: absolute;
  font-size: 14px;
  color: #555;
  right: 6px;
}
.search {
  outline: none;
  border: 0;
  background-color: #eee;
  height: 27px;
  width: 160px;
  border-radius: 15px;
  padding: 0 10px;
  transition: all 0.3s;
  transform-origin: left;
  font-size: 12px;
  position: relative;
}
.search:focus {
  width: 200px;
}
.inputwei::before{
  content: '按下回车即可搜索哦~';
  width: 100px;
  z-index: 1000;
  color: #888;
  position: absolute;
  right: -105px;
  font-size: 13PX;
}
.toggle {
  position: absolute;
  top: 40px;
  z-index: 10;
}
.toggleactive {
  top: -5px;
}
.slide-enter-active {
  transform: translateY(0px);
  transition: all .3s;
}
.slide-enter {
  transform: translateY(-40px);
  transition: all .3s;
}
.slide-leave-active {
  transform: translateY(-40px);
  transition: all .3s;
}
@media screen and (max-width: 700px) {
  .right > div > div {
    display: none;
  }
  .right > div > svg {
    margin: 0 2vw;
  }
  .search {
    display: none;
  }
  .input svg {
    display: none;
  }
}
</style>
