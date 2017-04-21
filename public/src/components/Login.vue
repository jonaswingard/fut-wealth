<template>
  <div>
    <h1 class="display-1">Login</h1>

    <form v-on:submit.prevent="onSubmit">
      <div>
        <input placeholder="username" v-model="username">
      </div>
      <div>
        <input placeholder="password" type="password" v-model="password">
      </div>
      <div>
        <button type="submit">Login</button>
        <router-link to="/">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  name: 'login',
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    onSubmit: function () {
      auth.login(this, {
        username: this.username,
        password: this.password
      }, '/')
    }
  }
}
</script>
