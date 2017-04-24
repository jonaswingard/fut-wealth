<template>
  <div>
    <h1 class="display-1">Config</h1>
    <v-container fluid>
      <v-row>
        <v-col xs12>
          <v-card class="grey lighten-4 elevation-0">
            <v-card-text>
              <v-switch label="Auto-import" primary v-model="job.active" />
              <v-btn
                success
                v-bind:loading="isLoading"
                v-on:click.native="importAll"
                v-bind:disabled="isLoading"
              >Import all</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>

export default {
  beforeMount () {
    this.$http.get('/api/job/active').then((response) => {
      this.job.active = response.data
    })
  },
  data: () => ({
    job: {
      active: false,
      foobar: false
    },
    isLoading: false
  }),
  watch: {
    '$data': {
      handler: function () {
        if (this.job.active) {
          this.startJob()
        } else {
          // this.methods.stopJob()
          this.stopJob()
        }
      },
      deep: true
    }
  },
  methods: {
    startJob: function () {
      this.$http.get('/api/job/start').then((response) => {
        this.$http.get('/api/job/active').then((response) => {
          this.job.active = response.data
        })
      })
    },
    stopJob: function () {
      this.$http.get('/api/job/stop').then((response) => {
        this.$http.get('/api/job/active').then((response) => {
          this.job.active = response.data
        })
      })
    },
    importAll: function () {
      this.isLoading = true
      Promise.all([
        this.$http.post('/api/import/fitness'),
        this.$http.post('/api/import/trending')
      ]).then(values => {
        console.dir(values)
        this.isLoading = false
      })
    }
  }
}
</script>
