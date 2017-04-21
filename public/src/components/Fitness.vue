<template>
  <div class="fitness">
    <h1 class="display-1">Fitness</h1>

    <v-tabs id="mobile-tabs-4" grow icons>
      <v-tab-item href="#tab-1" slot="activators">
        History
        <v-icon>history</v-icon>
      </v-tab-item>
      <v-tab-content id="tab-1" slot="content">
        <v-expansion-panel>
          <v-expansion-panel-content v-for="fetch in fetched" :key="fetch._id">
            <div slot="header">
              {{filterDate(fetch.date)}}
              -
              ({{fetch.items[2].price}})
            </div>
            <v-card-text class="white">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in fetch.items">
                    <td>{{item.title}}</td>
                    <td>{{item.price}}</td>
                  </tr>
                </tbody>
              </table>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-tab-content>
    </v-tabs>
  </div>
</template>

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
  beforeMount () {
    this.$http.get('/api/fitness').then((response) => {
      this.fetched = clearSamePrices(response.data)
    })
  },
  data: () => ({
    fetched: []
  }),
  methods: {
    filterDate: function (date) {
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
