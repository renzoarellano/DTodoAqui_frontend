
import Vuex from "vuex";
new Vuex.Store({
  state: {
  accessToken: localStorage.getItem('access_token') || null,
  currentUser: {}
  },
  modules: {
    mutations:{
      loggedIn(state){
        return state.accessToken != null
      },
      returnAcces(state){
        return state.accessToken
      }
    }
  },
  actions: {},
});
