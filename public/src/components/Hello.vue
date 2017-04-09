<template>
  <div class="hello">
    <h1>FUT Wealth</h1>

    <h2>Latest</h2>
    <div class="container">
      <div>
        <strong>Fitness</strong>
        <div v-for="item in fitness">
          {{item.title}} ({{item.price}})
        </div>
      </div>
      <div>
        <strong>Trending</strong>
        <div v-for="item in trending">
          {{item.title}} {{item.price}}
        </div>
      </div>
    </div>
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
        this.trending = response.data[0].items
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.container {
  display: flex;
  justify-content: center;
}
.container > div {
  width: 40%;
}
</style>
