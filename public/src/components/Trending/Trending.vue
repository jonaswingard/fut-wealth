<template src="./Trending.html"></template>

<script>
import date from '../../services/date'

export default {
  data: () => ({
    fetched: [],
    search: '',
    loading: true
  }),
  beforeMount () {
    this.$http.get('/api/trending').then((response) => {
      this.fetched = response.data
      this.loading = false
    })
  },
  methods: {
    filterDate: function (dateStr) {
      return date.fromNow(this, dateStr)
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
      } else if (this.fetched.length) {
        var firstFetch = this.fetched[0]
        allItems = firstFetch.items.map(item => {
          item.date = firstFetch.date
          return item
        })
      }

      return allItems
    }
  }
}
</script>
