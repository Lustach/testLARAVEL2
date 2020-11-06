<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>
<script>
import {GET_TASKS} from '@/store'
export default {
  created() {
    this.$store.commit('auth/setToken')
  },
  async mounted(){
    try {
      await this.$store.dispatch(GET_TASKS)
    }catch (e) {
      console.error(e)
    }
  },
  components:{
    'Header': ()=> import('@/components/Header')
  },
  name: "App",
  data:()=>({
    GET_TASKS:GET_TASKS
  })
}

</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
