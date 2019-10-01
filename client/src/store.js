import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isAu:false,
    user:{}
  },
  mutations:{
    updataAu(state,isAU){
      if(isAU) state.isAu = isAU
      else state.isAu = false
    },
    updataUser(state,user){
      if(user) state.user = user
      else state.user = {}
    }
  },
  getters:{
    isAU:state => state.isAu,
    user:state => state.user
  },
  actions:{
    setAu({commit},context){
      commit("updataAu",context)
    },
    setUser({commit},context){
      commit("updataUser",context)
    },
    clearState({commit}){
      commit("updataAu",false)
      commit("updataUser",null)
    }
  }
})
