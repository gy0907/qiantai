<template>
  <div>
    <div class="container">
      <transition name="slide">
        <div v-show="!headerFlag" class="toggle1">
          <div class="left">
            <div class="my">MY</div>
            <div class="blog">BLOG</div>
          </div>
          <div class="input">
            <input placeholder="Search what..." class="search" v-model="search" type="text" />
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
          </div>
        </div>
      </transition>
      <HeaderToggle :class='{toggleactive: headerFlag}' class="toggle"></HeaderToggle>
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
      activeIndex: 0,
      search: "",
      clock: null
    };
  },
  methods: {
    clickNavbar(index) {
      this.activeIndex = index;
    }
  }
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
  background-color: #fff;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
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
}

.left {
  margin-left: 10vw;
}
.icon-js {
  font-size: 24px;
}
.icon-css {
  font-size: 24px;
}
.icon-Vue {
  font-size: 24px;
}
.icon-node {
  font-size: 24px;
}
.my {
  font-size: 26px;
}
.blog {
  background-color: var(--themecolor);
  font-size: 26px;
  border-radius: 5px;
  margin-left: 5px;
  padding: 3px;
  color: #000;
  transition: 0.5s;
}
.left:hover .blog {
  transform: rotateZ(180deg);
}
.right {
  font-size: 20px;
  font-weight: 400;
  margin-right: 10vw;
  text-align: center;
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
}
.search:focus {
  width: 200px;
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
