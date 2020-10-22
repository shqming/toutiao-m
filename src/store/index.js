import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { getItem, setItem} from '@/utils/storage.js'
const USER_KEY = 'toutiao_user'

export default new Vuex.Store({
  state: {
		user: getItem(USER_KEY),	//当前登录用户的登录状态(token等数据)  
  },
  mutations: {
		setUser(state, data) {
			 state.user = data;
			 
			 //防止页面刷新数据丢失，我们把数据放到本地
			 setItem(USER_KEY, state.user);
			 
		}
		
  },
  actions: {
  },
  modules: {
  }
})
