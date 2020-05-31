<template>
  <header class="header">
    <div class="l-wrapper">
      <p><nuxt-link to="/">新型コロナウイルス 世界統計</nuxt-link></p>
      <p>最終更新:{{ last_day }}</p>
    </div>
  </header>
</template>

<script>
  import axios from 'axios'

  export default {
    data(){
      return {
        last_day: ''
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData() {
        const action = `${this.apiUrl}json/totals/totals.json`
        axios.get(action)
          .then(response => {
            const date = new Date(response.data[0].lastUpdate)
            this.last_day = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
          }).catch(error => {
          console.error(error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/var';

  .header {
    padding: 20px 0;
    background: $white;
    .l-wrapper {
      @include pc {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
