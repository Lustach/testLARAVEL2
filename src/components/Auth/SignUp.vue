<template>
  <div style="height: calc(100vh - 80px)" class="d-flex">
    <b-card bg-variant="secondary" text-variant="white" header="Регистрация" header-text-variant="white" class="text-center m-auto" header-bg-variant="primary"
            style="max-width: 500px">
      <b-card-text>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-1" label="Ваше имя:" label-for="input-1">
            <b-form-input
                id="input-1"
                v-model="form.userName"
                required
                placeholder="Введите имя"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Ваш пароль:" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.password"
                required
                placeholder="Введите пароль"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-3"
              label="Ваш email:"
              label-for="input-1"
          >
            <b-form-input
                id="input-3"
                v-model="form.email"
                type="email"
                required
                placeholder="Введите email"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="success">Submit</b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    form: {
      password: '',
      userName: '',
    },
    show: true
  }),
  methods: {
    async onSubmit() {
      try {
        const result = await this.$store.dispatch('REGISTER', this.form)
        console.log(result)
        localStorage.setItem('ACCESS_TOKEN', result.token)
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>

<style scoped>

</style>
