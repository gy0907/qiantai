import Vue from 'vue'
import Vuex from 'vuex'

import request from '../network/request'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    detail: {},
    // 是否继续触发触底刷新
    requestFlag: true,
    ArtcleList: [],
    queryForm: {
      pagenum: 1,
      menu: '',
    },
    menunum: 1,
    inputVal: '',
    searchFlag: true,
    saveOffsetFlag: true,
    offleftFlag: true,
    rightOffsetTop: 0
  },
  mutations: {
    // 保存rightcard的offsettop
    saveoffsetTop(state,payload) {
      state.offleftFlag = false
      state.rightOffsetTop = payload
    },
    // 保存文章详情
    saveDetail(state,payload) {
      state.detail = payload
    },
    async loading(state) {
      if(state.searchFlag) { // 解决搜索框清空的后遗症
        state.ArtcleList = []
        state.searchFlag = false
        state.queryForm.pagenum = 1
      }
      let res = await request({url: '/article',params: {pagenum: state.queryForm.pagenum}})
      if(state.queryForm.menu != '') {
        state.ArtcleList = res.data 
      } else {
        // 数组去重
        let arr = [...state.ArtcleList, ...res.data]
        var result = [];
        var obj = {};
        for(var i =0; i<arr.length; i++){
          if(!obj[arr[i]._id]){
              result.push(arr[i]);
              obj[arr[i]._id] = true; // 添加属性之后就没办法再添加一次了
          }
        }
        state.ArtcleList = result
      }
      state.queryForm.pagenum += 1
      if(res.data.length >= 10) {
      state.requestFlag = true // 请求完成之后并且还存在数据，允许再次触发触底刷新
      }
    },
    // 防抖，触底只允许一次请求
    editRequest(state, payload) {
      state.requestFlag = payload
    },
    // 首页搜索input的事件
    async searchInput(state,payload) {
      state.inputVal = payload
      let res = await request({url: '/article', params: {query:state.inputVal, pagesize: 10000}})
      state.searchFlag = true
      state.ArtcleList = res.data
    },
    // 点击了header的分类，重新请求分类数据
    async editMenu(state, payload) {
      // 如果切换了分类，页码重新设置为1
      if(payload !== state.queryForm.menu) {
        state.menunum = 1
        state.requestFlag = true
      }
      state.queryForm.menu = payload
      let res = await request({url: '/articlemenu',params: {menu: state.queryForm.menu, pagenum: state.menunum}})
      if(state.menunum == 1) {
        state.ArtcleList = res.data
      } else {
        // 数组去重
        let arr = [...state.ArtcleList, ...res.data]
        var result = [];
        var obj = {};
        for(var i =0; i<arr.length; i++){
          if(!obj[arr[i]._id]){
              result.push(arr[i]);
              obj[arr[i]._id] = true; // 添加属性之后就没办法再添加一次了
          }
        }
        state.ArtcleList = result
      }
      state.menunum += 1
      if(res.data.length !== 0) {
        state.requestFlag = true // 请求完成之后并且还存在数据，允许再次触发触底刷新
      } else {
        state.requestFlag = false
      }
    }
  }
})

export default store