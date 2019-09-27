import Vue from 'vue'
import Vuex from 'vuex'
const INSERT_MUSIC = 'INSERT_MUSIC'
const DELETE_MUSIC = 'DELETE_MUSIC'
const PLAYER_MUSIC = 'PLAYER_MUSIC'
Vue.use(Vuex)
import utils from './utils'

export default new Vuex.Store({
  state: {
    playerList: [],
    music: {}
  },
  mutations: {
    [INSERT_MUSIC] (state,params){
      if(!utils.checkObj(params)){
        state.playerList.push(params)
        if(utils.checkObj(state.music)){
          state.music = params
        }
      }
      
    },
    [DELETE_MUSIC] (state,params){
      if(!utils.checkObj(params)){
        state.playerList.pop(params)
      }
    },
    [PLAYER_MUSIC] (state,params){
      if(!utils.checkObj(params)){
        state.music = params
      }
    }
  },
  actions: {
    async insertMusic ({ commit }, params) {
      commit(INSERT_MUSIC, params)
    },
    async deleteMusic ({ commit }, params) {
      commit(DELETE_MUSIC, params)
    },
    async playerMusic ({ commit }, params) {
      commit(PLAYER_MUSIC, params)
    }
  }
})
