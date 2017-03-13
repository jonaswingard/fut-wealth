<template>
  <div class="rising">
    <br>
    <div v-for="fetch in fetched">
      <details>
        <summary>{{fetch.date}}</summary>
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
      console.log(response.data)
      this.fetched = response.data
    })
  },
  data: () => ({
    fetched: []
  })
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
