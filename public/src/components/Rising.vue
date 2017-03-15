<template>
  <div class="rising">
    <button v-on:click="importRising">Import</button>
    <br>
    <br>
    <div v-for="fetch in fetched">
      <details>
        <summary>{{filterDate(fetch.date)}}</summary>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>+/-</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in fetch.players">
              <td>{{player.name}}</td>
              <td>{{player.price}}</td>
              <td>{{player.trend}}</td>
            </tr>
          </tbody>
        </table>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rising',
  beforeMount () {
    this.$http.get('/api/rising').then((response) => {
      this.fetched = response.data
    })
  },
  data: () => ({
    fetched: []
  }),
  methods: {
    importRising: function (event) {
      this.$http.post('/api/import/rising').then((response) => {
        this.fetched = response.data.items
      })
    },
    filterDate: function (date) {
      // TODO moment this
      // use as custom filter

      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style scoped>
  table {
    margin: 0 auto;
  }
  summary {
    cursor: pointer;
  }
</style>
