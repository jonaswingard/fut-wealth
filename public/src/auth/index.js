const LOGIN_URL = '/api/login'
const LOGOUT_URL = '/api/logout'
const CHECKAUTH_URL = '/api/isauthenticated'

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

  checkAuth (context, redirect) {
    context.$http.get(CHECKAUTH_URL).then((response) => {
      this.user.authenticated = response.data

      if (!response.data && redirect) {
        context.$router.push(redirect)
      }
    })
  }

}
