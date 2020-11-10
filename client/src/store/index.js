import { createStore } from 'vuex'

export default createStore({
  state: {
    user:null
  },
  SET_USERS(state, users){
    state.users = users;
  },
  mutations: {
  },
  actions: {
    setUser({commit}, user){
      commit('SET_USER', user);
    }
  },
  modules: {
  }
})
