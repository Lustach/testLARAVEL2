import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import Api from './plugins/api'
import axios from "axios"

Vue.use(Api)
axios.interceptors.response.use(
	response => {
		return response
	},
	(error) => {
		// Return any error which is not due to authentication back to the calling service
		console.log(error)
		if (error.response.status !== 401) {
			return new Promise((resolve, reject) => {
				reject(error)
			})
		}
		this.router.push('/login')
	}
)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
