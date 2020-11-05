<template>
  <div class="d-flex flex-column">
    <h1>This is an about page</h1>
    <b-card style="max-width: 500px;" v-if="taskInfo" class="d-flex align-self-center" :title="taskInfo.title">
      <b-card-text>
        <b-form-input v-model="tempState" :disabled="taskInfo.state" placeholder="Введите название задачи"></b-form-input>
        <h2 class="mb-3 text-left">Категория: {{$route.params.id}}</h2>
        <h3 class="mb-3 text-left">Описание:{{taskInfo.description}}</h3>
        <h3 class="mb-3 text-left"> Выполнено : <span v-show="taskInfo.state">Да</span> <span v-show="!taskInfo.state">Нет</span></h3>
      </b-card-text>
        <b-button variant="danger" text rounded @click="deleteOneTask">Удалить</b-button>
        <b-button variant="success" :disabled="tempState===taskInfo.title" text rounded @click="saveUpdates()">Сохранить</b-button>
    </b-card>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import {DELETE_TASK,UPDATE_TASK_STATE} from '../store/index'
export default {
  name: 'App',
  beforeMount() {
    this.tempState = this.taskInfo.title
  },
  data: () => ({
    DELETE_TASK: DELETE_TASK,
    tempState: '',
    UPDATE_TASK_STATE:UPDATE_TASK_STATE
  }),
  methods:{
    async deleteOneTask(){
      await this.$store.dispatch(this.DELETE_TASK, {id: this.taskInfo.id })
      this.$router.go(-1)
    },
    async saveUpdates(){
      try {
        await this.$store.dispatch(this.UPDATE_TASK_STATE, { task: this.taskInfo, id: this.taskInfo.id })
        this.$set(this.taskInfo, 'title', this.tempState)
        this.$router.go(-1)
      }
      catch (e) {
        console.error(e)
      }
    }
  },
  computed: {
    ...mapGetters([
      'tasksByCategory',
    ]),
    taskInfo() {
      return this.tasksByCategory(this.$route.params.id).tasks.filter(e => e.title === this.$route.params.name)[0]
    }
  },
}
</script>
