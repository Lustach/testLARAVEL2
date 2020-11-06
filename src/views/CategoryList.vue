<template>
  <div class="" style="height:calc(100vh - 65px)">
    <div v-for="e in categories" :key="e">
        <router-link class="mx-5"  :to="'/tasks_by_category='+e">{{ e }}</router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "CategoryList",
  data: () => ({
    show: true,
  }),
  computed: {
    ...mapGetters([
      'categories',
    ]),
  },
}
</script>

<style scoped>

</style>
