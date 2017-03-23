<template>
  <div>
    <form v-on:submit.prevent="onSubmit">
      <div>
        <input placeholder="username" v-model="username">
      </div>
      <div>
        <input placeholder="password" v-model="password">
      </div>
      <div>
        <button type="submit">Login</button>
        <router-link to="/">Cancel</router-link>
      </div>
    </form>
    <br>
    <button type="button" v-on:click="onLogout">Logout</button>
  </div>
</template>

<script>
import config from '../config'

export default {
  name: 'login',
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    onSubmit: function () {
      this.$http.post('/api/login', {
        username: this.username,
        password: this.password
      }).then((response) => {
        if (response.status === 200) {
          this.$router.push('/')
        }
      })
    },
    onLogout: function () {
      config.loginText = new Date()
      // this.$http.get('/api/logout').then((response) => {
      //   if (response.status === 200) {
      //     this.$router.push('/')
      //   }
      // })
    }
  }
}
</script>
