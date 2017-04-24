<template src="./Fitness.html"></template>

<script>
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
    filterDate: function (date) {
      return new Date(date).toLocaleString()
    }
  }
}
</script>
