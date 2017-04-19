<template>
  <div id="app">
    <img src="./assets/zlatan.png" width="100">
    <ul class="menu">
      <li class="menu-item">
        <router-link to="/">Start</router-link>
      </li>
      <li class="menu-item" v-if="user.authenticated">
        <router-link to="/trending">Trending</router-link>
      </li>
      <li class="menu-item" v-if="user.authenticated">
        <router-link to="/fitness">Fitness</router-link>
      </li>
      <li class="menu-item" v-if="!user.authenticated">
        <router-link to="/login">Login</router-link>
      </li>
      <li class="menu-item" v-if="user.authenticated">
        <a href="#" v-if="user.authenticated" @click="onLogout()">Logout</a>
      </li>
    </ul>
    <router-view></router-view>
  </div>
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
      console.log(this)
      auth.logout(this, '/login')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul.menu {
  list-style-type: none;
  padding: 0;
}

li.menu-item {
  display: inline-block;
  margin: 0 10px;
}
.menu-item a {
  color: #42b983;
}
</style>
