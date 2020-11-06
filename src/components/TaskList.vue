<template>
  <b-card :title="data.title || 'Заголовок'">
    <draggable :list="data.tasks" class="px-4" group="tasks" @change="onChange">
      <b-card-text v-for="(e,i) in data.tasks" :key="i" class="py-0 mb-2 test">
        <b-row class="d-flex align-center">
          <b-col class="d-flex flex-row align-center" cols="12">
            <b-card style="width:100%">{{ e.title }}</b-card>
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown left class="ml-3">
                <b-dropdown-item @click="openTask(i,data.title)">Подробнее</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-col>
        </b-row>
      </b-card-text>
      <b-button variant="primary" @click="$router.push(`/tasks_by_category=${data.title}/title=NewTask`)">Добавить задачу</b-button>
    </draggable>
  </b-card>

</template>
<script>
import draggable from 'vuedraggable'
import {DELETE_TASK, UPDATE_TASK_PLACE} from '@/store'
import {mapGetters} from 'vuex'

export default {
  name: 'TaskList',
  components: {
    draggable,
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => [],
    }
  },
  data: () => ({
    items: [
      { title: 'edit', action: 'changeState' },
      { title: 'delete', action: 'delete' }
    ],
    DELETE_TASK: DELETE_TASK,
    UPDATE_TASK_PLACE: UPDATE_TASK_PLACE
  }),
  methods: {
    onChange(e) {
      if (e.added || e.removed) {
        this.$store.commit(UPDATE_TASK_PLACE, { data: e, category: this.data.title })
      }
    },
    openTask(index, category) {
      if (this.$route.name === 'TaskAbout')
        this.$router.push(this.$route.path + '/title=' + this.data.tasks[index].title)
      if (this.$route.name === 'Main') {
        this.$router.push(`/tasks_by_category=${category}/title=${this.data.tasks[index].title}`)
      }
    }
  },
  computed: {
    ...mapGetters(["tasksByCategory"])
  }
}
</script>
<style scoped>
</style>
