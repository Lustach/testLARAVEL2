<template>
  <div class="d-flex flex-column">
    <h1 v-if="taskInfo">Информация о задаче</h1>
    <h1 v-else>Добавление задачи</h1>
    {{ taskInfo }}fdas
    {{ tempState }}
    <b-card style="max-width: 500px;" v-if="tempState" class="d-flex align-self-center">
      <b-card-text>
        <b-row class="my-1">
          <b-col sm="3">
            <label>Название:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="tempState.title" :disabled="tempState.state" placeholder="Введите название задачи" size="sm"></b-form-input>
          </b-col>
        </b-row>
        <p class="mb-3 text-left">Категория: {{ $route.params.id }}</p>
        <b-row class="my-1">
          <b-col sm="3">
            <label>Описание:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="tempState.description" placeholder="Введите описание" size="sm"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label>Выполнено?</label>
          </b-col>
          <b-col sm="9">
            <b-form-checkbox
                id="checkbox-1"
                v-model="tempState.state"
                name="checkbox-1"
            >
              {{ isReady }}
            </b-form-checkbox>
          </b-col>
        </b-row>
        <!--        <h3 class="mb-3 text-left">Описание:{{taskInfo.description}}</h3>-->
        <!--        <h3 class="mb-3 text-left"> Выполнено : <span v-show="taskInfo.state">Да</span> <span v-show="!taskInfo.state">Нет</span></h3>-->
      </b-card-text>
      <b-button v-if='taskInfo' variant="danger" class="mr-3" text rounded @click="deleteOneTask">Удалить</b-button>
      <b-button v-if="taskInfo" variant="success" :disabled="tempState===taskInfo.title" text rounded @click="saveUpdates()">Сохранить</b-button>
      <b-button v-if="!taskInfo" variant="success"  text rounded @click="addNewTask()">Добавить</b-button>
    </b-card>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import {DELETE_TASK, UPDATE_TASK_STATE, ADD_NEW_TASK} from '../store/index'

export default {
  name: 'App',
  created() {
    if (this.taskInfo)
      this.tempState = JSON.parse(JSON.stringify(this.taskInfo))
    else
      this.tempState = {
        title: '',
        description: '',
        state: false,
        category: this.$route.params.id
      }
    // console.log(this.taskInfo, this.tempState, this.$route.params.id)

  },
  data: () => ({
    DELETE_TASK: DELETE_TASK,
    UPDATE_TASK_STATE: UPDATE_TASK_STATE,
    ADD_NEW_TASK: ADD_NEW_TASK,
    tempState: {},
  }),
  methods: {
    async deleteOneTask() {
      await this.$store.dispatch(this.DELETE_TASK, { id: this.tempState.id })
      this.$router.go(-1)
    },
    async saveUpdates() {
      try {
        await this.$store.dispatch(this.UPDATE_TASK_STATE, { task: this.tempState, id: this.tempState.id })
        this.$set(this.taskInfo, 'title', this.tempState)
        this.$router.go(-1)
      } catch (e) {
        console.error(e)
      }
    },
    async addNewTask(){
      try{
        await this.$store.dispatch(this.ADD_NEW_TASK,this.tempState)
        this.$router.go(-1)
      }catch (e) {
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
    },
    isReady() {
      return this.tempState.state ? "Да" : "Нет"
    }
  },
}
</script>
