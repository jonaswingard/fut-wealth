<template>
  <div class="hello">
    <h1>FUT Wealth</h1>
    <h2>Links</h2>
    <ul>
      <li><router-link to="/">Start</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/rising">Rising</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
