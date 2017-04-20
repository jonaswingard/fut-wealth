<template>
  <div>
    <p>Import job running: {{job.active}}</p>
    <button v-if="!job.active" v-on:click="startJob">Start</button>
    <button v-if="job.active" v-on:click="stopJob">Stop</button>
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
    }
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
    }
  }
}
</script>
