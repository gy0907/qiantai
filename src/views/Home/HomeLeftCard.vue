<template>
  <div class="left">
    <Card>
      <ArtcleItem v-for="item in ArtcleList" :key="item._id" :options="item"></ArtcleItem>
    </Card>
  </div>
</template>

<script>
import request from '../../network/request'
import Card from '../../components/HomeCpns/Card'

import ArtcleItem from './ArticleItem'


export default {
  components: {
    Card,
    ArtcleItem
  },
  mounted() {
    this.$store.commit('loading')
  },
  computed: {
    ArtcleList() {
      return this.$store.state.ArtcleList
    }
  },
  methods: {
    async getArtcle() {
      let res = await request('/article')
      this.ArtcleList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  z-index:0;
}
.card{
  margin: 0 10px;
}
</style>