<template>
  <div id="app">
    <img src="./assets/zlatan.png" width="100">
    <ul class="menu">
      <li class="menu-item">
        <router-link to="/">Start</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/login">Login</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/trending">Trending</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/fitness">Fitness</router-link>
      </li>
    </ul>

    Logintext:
    {{loginText}}

    <router-view></router-view>
  </div>
</template>

<script>
import config from './config'

export default {
  name: 'app',
  data: () => ({
    loginText: config.loginText
  }),
  beforeMount () {
    this.$http.get('/api/isauthenticated').then((response) => {
      if (response.status === 200) {
        console.log(response)
        // this.loginText = response.data
        config.loginText = new Date()
      }
    })
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
