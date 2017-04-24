<style scoped src="./trending.css"></style>
<template src="./trending.html"></template>

<script>
export default {
  beforeMount () {
    this.$http.get('/api/trending').then((response) => {
      this.fetched = response.data
      this.loading = false
    })
  },
  data: () => ({
    fetched: [],
    search: '',
    loading: true
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
