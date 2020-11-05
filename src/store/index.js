import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

export const DELETE_TASK = 'delete/task'
export const UPDATE_TASK_PLACE = 'update/task_place'
export const UPDATE_TASK_STATE = 'update/task_state'
const localVue = new Vue()
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tasks: {
			todo: {
				title: 'Все задачи',
				tasks: [
					{ title: 'Переделать как в трелло', mark: 'Ну ', state: false, description: 'ОПИСАНИЕ ЗАДАЧИ' }, {
						title: 'хопа',
						mark: '1Ну ',
						state: false,
						description: 'ОПИСАНИЕ ЗАДАЧИ'
					},
					{ title: 'прихлопа', mark: 'Ну', state: false, description: 'ОПИСАНИЕ ЗАДАЧИ' }, { title: 'алеоп', mark: '1Ну ', state: false, description: 'ОПИСАНИЕ ЗАДАЧИ' },
				],
			},
			progress: {
				title: 'В процессе выполнения',
				tasks: [
					{ title: 'В процессе выполнения', mark: 'Ну ', description: 'ОПИСАНИЕ ЗАДАЧИ' }, { title: 'В процессе выполнения1', mark: '1Ну ', description: 'ОПИСАНИЕ ЗАДАЧИ' },
				]
			},
			completed: {
				title: 'Завершённые',
				tasks: [
					{ title: 'Завершённые', mark: 'Ну ', description: 'ОПИСАНИЕ ЗАДАЧИ' }, { title: 'Завершённые1', mark: '1Ну ', description: 'ОПИСАНИЕ ЗАДАЧИ' },
				]
			},
		},
		categories: ['Все задачи', 'В процессе выполнения', 'Завершённые'],
		taskChange: {
			element: '0',
			newIndex: '1',
			oldIndex: '2',
			addedTo: 'nameOfCategory',
			removedFrom: 'nameOfCategory'
		}
	},
	actions: {
		async [DELETE_TASK]({ commit, getters }, data) {
			try {
				await localVue.$API.patch.deleteTask(data)
				commit(DELETE_TASK, { data, getters })
			} catch (e) {
				console.error(e)
			}
		},
		async [UPDATE_TASK_PLACE]({ state }) {
			console.log(state, 'TEST DISPATCH')
			try {
				await localVue.$API.patch.updateTaskPlace(state.taskChange)
			} catch (e) {
				console.error(e)
			}
		},
		async [UPDATE_TASK_STATE]({ commit, getters }, data) {
			try {
				await localVue.$API.patch.updateTask(data)
				console.log(commit, getters, data, 'helloWorld')
			} catch (e) {
				console.error(e)
				throw e
			}
		}
	},
	mutations: {
		[DELETE_TASK](state, { data, getters }) {
			if (typeof data.index === "number")
				getters.tasksByCategory(data.categoryId).tasks.splice(data.index, 1)
			if (typeof data.index === "string") {
				let index = (getters.tasksByCategory(data.categoryId).tasks.find((e, i) => {
					e.index = i
					return e.title === data.index
				}))
				getters.tasksByCategory(data.categoryId).tasks.splice(index.index, 1)
			}
		},
		[UPDATE_TASK_PLACE](state, { data, category }) {
			// console.log(state,data,category,'Sldfjaslf')
			if (data.added) {
				console.log(data)
				state.taskChange.element = data.added.element
				state.taskChange.newIndex = data.added.newIndex
				state.taskChange.addedTo = category
			} else {
				state.taskChange.oldIndex = data.removed.oldIndex
				state.taskChange.removedFrom = category
				this.dispatch(UPDATE_TASK_PLACE)
			}
			console.log(state.taskChange, 'stateTaskChange')
		}
	},
	modules: {
		auth: auth,
	},
	getters: {
		tasks: state => state.tasks,
		categories: state => state.categories,
		tasksByCategory: state => id => {
			for (const key in state.tasks) {
				if (state.tasks[key].title === id) {
					return state.tasks[key]
				}
			}
		},
	}
})