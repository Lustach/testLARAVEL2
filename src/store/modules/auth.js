import Vue from 'vue'

const localVue = new Vue()
export default {
	namespaced: true,
	state: {
		isLogin: false,
	},
	actions: {
		async ['REFRESH_TOKEN']() {
			const result = await localVue.$API.post.RefreshToken()
			localStorage.setItem('ACCESS_TOKEN', result)
		},
		async ['LOGIN']({ commit },payload) {
			try {
				const result = await localVue.$API.post.LoginCheck(payload)
				localStorage.setItem('ACCESS_TOKEN', result.data.token)
				commit('setToken')
			} catch (e) {
				console.log(e)
				throw e
			}
		},
		async ['LOGOUT']({ state }) {
			try {
				await localVue.$API.post.Logout()
				localStorage.removeItem('ACCESS_TOKEN')
				state.isLogin = false
			} catch (e) {
				console.log(e)
			}
		},
		async ['REGISTER']({ state }, payload) {
			const result = await localVue.$API.post.SignUp(payload)
			state.isLogin = true
			return result
		},
	},
	mutations: {
		setToken(state) {
			state.isLogin = !!localStorage.getItem('ACCESS_TOKEN');
		}
	},
	getters: {
		isLoggedIn(state) {
			return state.isLogin
		}
	}
}
