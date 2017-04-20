<template>
  <div class="trending">

    <input placeholder="Search player..." v-model="search">

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems">
          <td><strong>{{item.title}}</strong></td>
          <td>{{item.price}}</td>
          <td><time>{{filterDate(item.date)}}</time></td>
        </tr>
      </tbody>
    </table>

    <hr>
    <h3>History</h3>

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
            <tr v-for="item in fetch.items">
              <td>{{item.title}}</td>
              <td>{{item.price}}</td>
              <td>{{item.trend}}</td>
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
    this.$http.get('/api/trending').then((response) => {
      this.fetched = response.data
    })
  },
  data: () => ({
    fetched: [],
    search: ''
  }),
  methods: {
    filterDate: function (date) {
      // TODO moment this
      // use as custom filter

      return new Date(date).toLocaleString()
    }
  },
  computed: {
    filteredItems: function () {
      let allItems = []

      if (this.search && this.search.length >= 3 && this.fetched.length) {
        for (const fetch of this.fetched) {
          var item = fetch.items.find(item => item.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
          if (item) {
            item.date = fetch.date
            allItems.push(item)
          }
        }
      }

      return allItems
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
