<template src="./Fitness.html"></template>

<script>
import date from '../../services/date'

function clearSamePrices (items) {
  const filteredItems = []
  let lastPrice

  for (const item of items) {
    const [,, gold] = item.items
    if (lastPrice === gold.price) {
      continue
    }

    lastPrice = gold.price
    filteredItems.push(item)
  }

  return filteredItems
}

export default {
  data: () => ({
    fetched: [],
    loading: true
  }),
  beforeMount () {
    this.$http.get('/api/fitness').then((response) => {
      this.fetched = clearSamePrices(response.data)
      this.loading = false
    })
  },
  methods: {
    filterDate: function (dateStr) {
      return date.fromNow(this, dateStr)
    }
  }
}
</script>
