<template>
  <div>
    <section>
      <h2>Job</h2>
      <p>Import job running: {{job.active}}</p>
      <button v-if="!job.active" v-on:click="startJob">Start</button>
      <button v-if="job.active" v-on:click="stopJob">Stop</button>
    </section>

    <section>
      <h2>Import</h2>
      <button v-on:click="importAll" v-bind:disabled="isLoading">Import all</button>
    </section>

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
      active: false
    },
    isLoading: false
  }),
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
