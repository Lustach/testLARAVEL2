import Vue from 'vue'

const localVue = new Vue()
export default {
	namespaced: true,
	state: {
		isLogin: false,
		userLogin: '',
	},
	actions: {
		async ['REFRESH_TOKEN']() {
			const result = await localVue.$API.post.RefreshToken()
			localStorage.setItem('ACCESS_TOKEN', result)
			console.log(result)
		},
		async ['LOGIN']({ state,commit }, payload) {
			try {
				const result = await localVue.$API.post.LoginCheck(payload)
				state.isLogin = true
				commit.setUser(result.data)
				return result
			} catch (e) {
				console.log(e)
				throw e
			}
		},
		async ['LOGOUT']({ state }) {
			try {
				console.log('logout')
				await localVue.$API.post.Logout()
				state.isLogin = false
				localStorage.remove('ACCESS_TOKEN')
			} catch (e) {
				console.log(e)
			}
		},
		async ['REGISTER']({ state,commit }, payload) {
			const result = await localVue.$API.post.SignUp(payload)
			console.log(payload,'payloadFromREGISTER')
			state.isLogin = true
			console.log(result, commit)
			return result
		},
	},
	mutations: {
		setToken(state) {
			if (localStorage.getItem('ACCESS_TOKEN')) {
				state.isLogin = true
			}
		},
		setUser(state, data){
			console.log(data,'loginSetUser')
			state.userLogin = data
		}
	},
	getters: {
		isLoggedIn(state) {
			console.log(state.isLogin)
			return state.isLogin
		}
	}
}
