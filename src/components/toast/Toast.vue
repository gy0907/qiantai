<template>
  <div class="toast" v-show="isShow">
    <transition name="msg">
      <div>{{message}}</div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration=2000) {
      this.isShow = true;
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0,0,0,.3);
    color: #b17749;
    padding: 8px 18px;
    border-radius: 5px;
    font-size: 13px;
    z-index: 9999;
    transition: all .3s;
  }
</style>