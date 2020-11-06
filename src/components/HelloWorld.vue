<template>
  <b-container fluid>
    <b-row class="text-center">
      <b-col id="allTasks" class="todo-list" cols="12" sm="4">
        <TaskList :data="tasks.todo"></TaskList>
      </b-col>
      <b-col id="inProgress" class="todo-list" cols="12" sm="4">
        <TaskList :data="tasks.progress"></TaskList>
      </b-col>
      <b-col id="completed" class="todo-list" cols="12" sm="4">
        <TaskList :data="tasks.completed"></TaskList>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from 'vuex'
import {GET_TASKS} from "@/store"

export default {
  components: {
    'TaskList': () => import('@/components/TaskList.vue')
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  async mounted() {
    try {
      await this.$store.dispatch(GET_TASKS)
    } catch (e) {
      console.error(e)
    }
  },
  data: () => ({
    GET_TASKS: GET_TASKS
  }),
  computed: {
    ...mapGetters([
      'tasks'
    ]),
  }
}
</script>

<style scoped lang="scss">
</style>
