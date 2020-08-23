<template>

  <div>
    <div class="c-hero">
      <Summary
        :item="summary"
        :loading="loading"
      >
      </Summary>
    </div>

    <List></List>

  </div>

</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Summary from '~/components/Summary.vue'
  import List from '~/components/List.vue'

  export default Vue.extend({
    components: {
      Summary,
      List
    },
    data(){
      return {
        summary: [],
        loading: false
      }
    },
    created () {
      this.getSummary()
    },
    methods: {
      /**
       * サマリーコンポーネント用データ作成
       */
      getSummary() {
        const action = `${this.apiUrl}totals/totals.json`
        axios.get(action)
          .then(response => {
            this.summary = [
              {
                text: '感染者',
                number: response.data[0].confirmed
              },
              {
                text: '回復者',
                number: response.data[0].recovered
              },
              {
                text: '重症患者',
                number: response.data[0].critical
              },
              {
                text: '死亡者',
                number: response.data[0].deaths
              }
            ]
            this.loading = true
          }).catch(error => {
            console.error(error)
        })
      }
    }
  })
</script>

<style lang="scss" lang="scss" scoped>
  @import '../assets/css/var';
</style>
