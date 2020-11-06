<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.commit('auth/setToken')
  },
  components: {
    'Header': () => import('@/components/Header')
  },
  name: "App"
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
