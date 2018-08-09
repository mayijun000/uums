import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from "@/api/getData"
import { getQueryString ,setStore,getStore} from "@/config/mUtils"
import {clientId} from '@/config/env'

Vue.use(Vuex)

const state = {
	userInfo:{}
}

const mutations = {
	saveUserInfo(state, userInfo){
		setStore("userInfo",JSON.stringify(userInfo));
		state.userInfo = userInfo;
	}
}

const actions = {
	//查询登陆后用户信息，公共方法
	async getUserData({commit}){
		let info = getStore("userInfo");
		if(info == null){
			const res = await getUserInfo()
			if (res.errorCode == "0") {
				//更新state中userInfo数据的状态
				commit('saveUserInfo', res.dataBody.userMap);
			}else{
				throw new Error(res)
			}
		}else{
			info = JSON.parse(info);
			commit('saveUserInfo', info);
		}
		
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})