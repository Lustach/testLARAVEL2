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
		async ['LOGIN']({ state }, payload) {
			try {
				const result = await localVue.$API.post.LoginCheck(payload)
				state.isLogin = true
				return result
			} catch (e) {
				console.log(e)
				throw e
			}
		},
		async ['LOGOUT']({ state }) {
			try {
				await localVue.$API.post.Logout()
				state.isLogin = false
				localStorage.remove('ACCESS_TOKEN')
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
			if (localStorage.getItem('ACCESS_TOKEN')) {
				state.isLogin = true
			}
		}
	},
	getters: {
		isLoggedIn(state) {
			return state.isLogin
		}
	}
}
