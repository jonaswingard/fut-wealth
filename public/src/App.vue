<template>
  <v-app top-toolbar>

    <header>
      <v-toolbar>
        <v-toolbar-logo class="hidden-xs-and-down">
          <v-toolbar-items>
            <v-toolbar-item ripple href="#">
              <img class="mr-3" src="/static/zlatan.png" width="40">
              FUT Wealth
            </v-toolbar-item>
          </v-toolbar-items>
        </v-toolbar-logo>
        <v-toolbar-items>

           <router-link tag="li" to="/" exact>
             <a class="toolbar__item">Home</a>
           </router-link>

           <router-link tag="li" to="/trending" v-if="user.authenticated">
             <a class="toolbar__item">Trending</a>
           </router-link>

           <router-link tag="li" to="/fitness" v-if="user.authenticated">
             <a class="toolbar__item">Fitness</a>
           </router-link>

           <router-link tag="li" to="/config" v-if="user.authenticated">
             <a class="toolbar__item">Config</a>
           </router-link>

           <router-link tag="li" to="/login" v-if="!user.authenticated">
             <a class="toolbar__item">Login</a>
           </router-link>

           <li v-if="user.authenticated">
             <a href="#" @click.prevent="onLogout()" class="toolbar__item">Logout</a>
           </li>

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

export default {
  name: 'app',
  data: () => ({
    user: auth.user
  }),
  beforeMount () {
    auth.checkAuth(this, '/login')
  },
  methods: {
    onLogout: function () {
      auth.logout(this, '/login')
    }
  }
}
</script>

<style>

nav .router-link-active {
  position: relative;
}
nav .router-link-active:before {
  content: "";
  position: absolute;
  height: 5px;
  width: 100%;
  bottom: 0;
  background: #fff;
}

.custom-loader {
  animation: loader 1s infinite;
}

@keyframes loader {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
}

</style>
