import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/main',
		name: 'Main',
		component: () => import('../components/HelloWorld.vue')
	},
	{
		path: '/categoryList',
		name: 'CategoryList',
		component: () => import('../views/CategoryList.vue')
	},
	{
		path: '/tasks_by_category=:id/title=:name',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/tasks_by_category=:id',
		name: 'TaskAbout',
		component: () => import(/* webpackChunkName: "about" */ '../views/TaskAbout.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../components/Auth/Login.vue')
	},
	{
		path: '/signUp',
		name: 'SignUp',
		component: () => import('../components/Auth/SignUp.vue')
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	console.log(to,store.getters['auth/isLoggedIn'])
	if (to.name !== 'Login' && to.name !=='SignUp' && !store.getters["auth/isLoggedIn"]) next({ name: 'Login' })
	else next()
})
export default router
