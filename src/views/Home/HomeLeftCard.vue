<template>
  <div class="left">
    <Card>
       <mavon-editor
        class="main"
        :value="md"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :boxShadow="false"
        :transition="false"
    ></mavon-editor>
    </Card>
  </div>
</template>

<script>
import Card from '../../components/HomeCpns/Card'
import demo from '../../assets/面试题笔记.md'

export default {
  components: {
    Card
  },
  data() {
    return {
      md: demo
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  z-index:0;
}
</style>