<template>
  <div style="height: calc(100vh - 80px)" class="d-flex">
    <b-card bg-variant="secondary" text-variant="white" header="Войти" header-text-variant="white"
            header-bg-variant="primary"
            class="text-center m-auto" style="max-width: 500px">
      <b-card-text>
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-2" label="Ваше имя:" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Введите имя"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Ваш пароль:" label-for="input-3">
            <b-form-input
                id="input-3"
                v-model="form.password"
                required
                placeholder="Введите пароль"
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
      name: '',
    },

    show: true
  }),
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()
      try {
        const result = await this.$store.dispatch("auth/LOGIN", this.form)
        console.log(result, 'result')
        await this.$router.push('/')
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>
