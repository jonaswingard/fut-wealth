<template>
  <div>
    <h1 class="display-1">Config</h1>
    <v-container fluid>
      <v-row>
        <v-col xs12>
          <v-card class="grey lighten-4 elevation-0">
            <v-card-text>
              <v-switch label="Auto-import" primary v-model="job.active" />
              <div class="pb-3" v-if="job.latestImport">
                Last successful import:
                <strong>{{job.latestImport | moment("YYYY-MM-DD HH:mm")}}</strong>
              </div>
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
    this.jobIsActive()
    this.getLatestJob()
  },
  data: () => ({
    job: {
      active: false,
      latestImport: ''
    },
    isLoading: false
  }),
  watch: {
    '$data': {
      handler: function () {
        if (this.job.active) {
          this.startJob()
        } else {
          this.stopJob()
        }
      },
      deep: true
    }
  },
  methods: {
    jobIsActive () {
      this.$http.get('/api/job/active').then((response) => {
        this.job.active = response.data
      })
    },
    getLatestJob () {
      this.$http.get('/api/fitness/latest').then((response) => {
        this.job.latestImport = response.data[0].date
      })
    },
    startJob () {
      this.$http.get('/api/job/start').then((response) => {
        this.$http.get('/api/job/active').then((response) => {
          this.job.active = response.data
        })
      })
    },
    stopJob () {
      this.$http.get('/api/job/stop').then((response) => {
        this.$http.get('/api/job/active').then((response) => {
          this.job.active = response.data
        })
      })
    },
    importAll () {
      this.isLoading = true
      Promise.all([
        this.$http.post('/api/import/fitness'),
        this.$http.post('/api/import/trending')
      ]).then(values => {
        this.getLatestJob()
        this.isLoading = false
      })
    }
  }
}
</script>
