<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="6">
        <taskList :data="tasksByCategory(this.$route.params.id)"></taskList>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "TaskAbout",
  components: {
    taskList: () => import('@/components/TaskList')
  },
  beforeMount() {
  },
  methods:{
  },
  computed: {
    ...mapGetters([
      "tasksByCategory",
    ])
  },
}
</script>

<style scoped>

</style>
