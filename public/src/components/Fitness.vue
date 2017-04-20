<template>
  <div class="fitness">
    <div v-for="fetch in fetched">
      <details>
        <summary>
          {{filterDate(fetch.date)}}
          ({{fetch.items[2].price}})
        </summary>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>+/-</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in fetch.items">
              <td>{{item.title}}</td>
              <td>{{item.price}}</td>
            </tr>
          </tbody>
        </table>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount () {
    this.$http.get('/api/fitness').then((response) => {
      this.fetched = response.data
    })
  },
  data: () => ({
    fetched: []
  }),
  methods: {
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
