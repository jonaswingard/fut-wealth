<template>
  <v-app top-toolbar>

    <header>
      <v-toolbar>
        <v-toolbar-logo>
          <img class="mr-3" src="/static/zlatan.png" width="40">
          FUT Wealth
        </v-toolbar-logo>
        <v-toolbar-items>
           <v-toolbar-item href="#">Home</v-toolbar-item>
           <v-toolbar-item href="#config" v-if="user.authenticated">Config</v-toolbar-item>
           <v-toolbar-item href="#trending" v-if="user.authenticated">Trending</v-toolbar-item>
           <v-toolbar-item href="#fitness" v-if="user.authenticated">Fitness</v-toolbar-item>
           <v-toolbar-item href="#login" v-if="!user.authenticated">Login</v-toolbar-item>
           <v-toolbar-item v-if="user.authenticated" @click.native="onLogout()">Logout</v-toolbar-item>
        </v-toolbar-items>
      </v-toolbar>
    </header>

    <main>
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>

  </v-app>
</template>

<script>
import auth from './auth'

auth.checkAuth()

export default {
  name: 'app',
  data: () => ({
    user: auth.user
  }),
  methods: {
    onLogout: function () {
      auth.logout(this, '/login')
    }
  }
}
</script>
