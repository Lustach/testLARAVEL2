<template>
  <b-navbar type="dark" variant="light" class="mb-4">
    <b-navbar-brand href="#" class="text-black-50">Todoist</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item exact>
          <router-link active-class="active_link" to="/main">Главная</router-link>
        </b-nav-item>
        <b-nav-item exact>
          <router-link active-class="active_link" to="/categoryList">Категории</router-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto ">
        <b-navbar-nav>
          <b-nav-item>
            <router-link active-class="active_link" to="/login" v-if="!isLogin">Войти</router-link>
            <router-link active-class="active_link" to="/" v-if="isLogin" @click="logout()">Выйти</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link active-class="active_link" to="/signUp" v-if="!isLogin">Зарегистрироваться</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/LOGOUT')
        await this.$router.push('/login')
      } catch (e) {
        console.log(e,'error')
      }
    }
  },
  computed: {
    isLogin() {
      return localStorage.getItem('ACCESS_TOKEN')
    }
  },
}
</script>

<style scoped lang="scss">
.active_link {
  color: black;
}
</style>
