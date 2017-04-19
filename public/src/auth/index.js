const LOGIN_URL = '/api/login'
const LOGOUT_URL = '/api/logout'

export default {
  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then((data) => {
      // TODO replace with JWT
      localStorage.setItem('id_token', 'foobar')

      this.user.authenticated = true

      if (redirect) {
        context.$router.push(redirect)
      }
    })
  },

  logout (context, redirect) {
    context.$http.get(LOGOUT_URL).then(() => {
      localStorage.removeItem('id_token')

      this.user.authenticated = false

      if (redirect) {
        context.$router.push(redirect)
      }
    })
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')

    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  }

}
