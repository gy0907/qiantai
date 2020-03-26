<template>
  <div class="footers">
    <div class="input">
      <input
        @keyup.enter="emitMessage"
        placeholder=" 留点什么吧~"
        class="search"
        v-model="addMsg.message"
        type="text"
        maxlength="50"
      />
      <span>回车键即可发送哦~</span>
      <div class="msg1" :class="{show:showMsgBox}">
        <div class="messageBox" v-clickoutside="handleClose">
          <div>起个名字吧~</div>
          <input maxlength="10" ref="boxipt" @keyup.enter="commitMsg" class="search1" v-model="addMsg.name" />
          <button @click="commitMsg">Enter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 点击空白隐藏
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};

import request from '../../network/request'

export default {
  data() {
    return {
      addMsg: {
        message: "",
        name: "匿名网友",
      },
      showMsgBox: false
    };
  },
  // 自定义指令
  directives: { clickoutside },
  methods: {
    // 弹框事件
    emitMessage() {
      if (this.addMsg.message.trim() !== "") {
        this.showMsgBox = true;
        this.addMsg.name = "匿名网友";
        this.$nextTick(function() {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            // 100毫秒延迟解决第二次打开支付框，输入框不自动获取焦点的bug
            this.$refs.boxipt.focus(); // 等价  document.getElementById("inputValId").focus();
          }, 100);
        });
      }
    },
    // commitMsg提交事件
    commitMsg() {
      if (this.addMsg.name.trim() !== "") {

        // 初始化时间
        this.addMsg.date = Date.now()
        request({method: 'post',url: 'addmessage',data: this.addMsg}).then(res=>{
        if(res.meta.status&&res.meta.status!==200) return this.$emit('showToast','好像出了点什么问题~~~')
        this.$emit('showToast','留言成功!')
        this.showMsgBox = false;
        this.addMsg.message = "";
        })
      }
    },
    handleClose(e) {
      this.showMsgBox = false;
    }
  }
};
</script>

<style lang="less" scoped>
.footers {
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.msg1 {
  display: none;
}
.show {
  display: block !important;
}
.messageBox {
  position: absolute;
  bottom: 50px;
  left: 60px;
  width: 250px;
  height: 120px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  > div {
    color: #999;
  }
  .search1 {
    outline: none;
    border: 0;
    background-color: #eee;
    height: 30px;
    width: 180px;
    border-radius: 15px;
    padding: 0 10px;
    transition: all 0.3s;
    font-size: 12px;
  }
  > button {
    outline: none;
    border: 0;
    font-size: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 15px;
    color: #666;
  }
  > button:hover {
    background: linear-gradient(90deg, #f6f6f6, #f6f6f6);
  }
}
.input {
  margin-left: -200px;
  position: relative;
  > span {
    margin-left: 20px;
    color: #999;
    font-size: 11px;
  }
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
  font-size: 12px;
}
.search:focus {
  width: 200px;
}
</style>