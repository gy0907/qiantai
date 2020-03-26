<template>
  <div>
    <h1 class="title">{{Detailobj.title}}</h1>
    <div class="date">
      <span>{{Detailobj.date | getDate}} 发布</span>
      <span>最后修改时间：{{Detailobj.editDate | gettime}}</span>
    </div>
    <mavon-editor
      class="editor"
      :value="Detailobj.body"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :boxShadow="false"
      :transition="false"
    ></mavon-editor>
  </div>
</template>

<script>
import getDate from '../../utils/gettime'
import timeago from '../../utils/timeago'

import request from '../../network/request'
export default {
  name: 'Detail',
  data() {
    return {
      Detailobj: {}
    }
  },
  computed: {
    // Detailobj() {
    //   return this.$store.state.detail
    // }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      let res = await request(`editarticle/${this.$route.params.id}`)
      this.Detailobj = res.data
      this.$store.commit('saveDetail', res.data)
    }
  },
  filters: {
    gettime(time) {
      return timeago(time)
    },
    getDate(time) {
      time = new Date(time)
      return getDate(time)
    }
  },
}
</script>

<style lang="less" scoped>
.editor {
  z-index: 0;
  margin: 0 10px;
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, .1);
  margin-bottom: 30px;
}
.date {
  margin-left: 20px;
  margin-bottom: 20px;
  >span {
    margin-right: 10px;
  }
}
.title {
  margin-left: 20px;
}
</style>