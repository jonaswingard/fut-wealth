<template>
  <div>
    <h1 class="display-1">Login</h1>
    <v-container fluid>
      <v-row>
        <v-col xs6>
          <form v-on:submit.prevent="onSubmit">
            <v-text-field
              label="Username"
              single-line
              hide-details
              v-model="username"
            ></v-text-field>
            <v-text-field
              label="Password"
              single-line
              hide-details
              type="password"
              v-model="password"
            ></v-text-field>

            <div>
              <v-btn default type="submit">Login</v-btn>
              <router-link to="/">Cancel</router-link>
            </div>
          </form>
        </v-col>
      </v-row>
    </v-container>
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
