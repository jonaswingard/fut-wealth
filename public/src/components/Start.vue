<template>
  <div>
    <h1 class="display-1">Home</h1>

    <h2 class="headline">Latest</h2>

    <v-card class="pa-5">
      <v-container fluid>
        <v-row>
          <v-col sm6>
            <strong>Fitness</strong>
            <div v-for="item in fitness">
              {{item.title}} ({{item.price}})
            </div>
          </v-col>
          <v-col sm6>
            <strong>Trending</strong>
            <div v-for="item in trending">
              {{item.title}} {{item.price}}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

  </div>
</template>

<script>
export default {
  data: () => ({
    trending: [],
    fitness: []
  }),
  beforeMount () {
    this.$http.get('/api/fitness/latest').then((response) => {
      if (response.status === 200 && response.data && response.data.length) {
        this.fitness = response.data[0].items
      }
    })

    this.$http.get('/api/trending/latest').then((response) => {
      if (response.status === 200 && response.data && response.data.length) {
        this.trending = response.data[0].items.slice(0, 5)
      }
    })
  }
}
</script>
