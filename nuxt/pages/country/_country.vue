<template>
  <div>
    <div class="c-hero header">
      <div class="l-wrapper">
        <h1 class="header__title">{{ country }}</h1>
      </div>
    </div>

    <Summary
      :item="summary"
      :loading="loading"
    >
    </Summary>

    <Chart
      :item="history"
    >
    </Chart>

    <div class="c-back">
      <div class="l-wrapper">
        <div class="c-box">
          <nuxt-link to="/" class="c-back__text">戻る</nuxt-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Summary from '~/components/Summary.vue'
  import Chart from '~/components/Chart.vue'

  export default Vue.extend({
    components: {
      Summary,
      Chart
    },
    data() {
      return {
        params: this.$route.params.country,
        country: '　',
        total: {
          active: 0,
          confirmed: 0,
          deaths: 0,
          recovered: 0
        },
        history: [],
        loading: false,
        summary: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      /**
       * jsonデータ取得
       */
      getData () {
        const action = `${this.apiUrl}create_detail/${this.params}.json`
        axios.get(action)
          .then(response => {
            this.country = response.data.slice(-1)[0].country
            this.total = response.data.slice(-1)[0].total
            this.history = response.data
            this.createSummaryData()
            this.loading = true
          }).catch(error => {
          console.error(error)
        })
      },
      /**
       * サマリーコンポーネント用データ作成
       */
      createSummaryData () {
        this.summary = [
          {
            text: '累計感染者',
            number: this.total.confirmed
          },
          {
            text: '現在感染者',
            number: this.total.active
          },
          {
            text: '回復者',
            number: this.total.recovered
          },
          {
            text: '死亡者',
            number: this.total.deaths
          }
        ]
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../../assets/css/var';

  .header {
    padding: 40px 0;
    @include pc {
      padding: 60px 0;
    }
    &__title {
      color: $white;
      font-size: 2.6rem;
      text-align: center;
      @include pc {
        font-size: 3.2rem;
      }
    }
  }

  .c-back {
    padding-top: 40px;
    &__text {
      padding: 10px;
      display: block;
      text-align: center;
      text-decoration: underline;
    }
  }
</style>
