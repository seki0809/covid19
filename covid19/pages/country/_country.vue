<template>
  <div>
    <div class="c-hero header">
      <div class="l-wrapper">
        <h1 class="header__title">{{ lastDay.country }}</h1>
      </div>
    </div>

    <div class="c-summary">
      <div class="l-wrapper">
        <div class="c-box c-summary__box">
          <div class="row">
            <div class="col-3 c-summary__column">
              <h2 class="c-summary__text">累計感染者</h2>
              <p class="c-summary__number">{{ numberFormat(lastDay.total.confirmed) }}<span class="c-summary__people">人</span></p>
            </div>
            <div class="col-3 c-summary__column">
              <h2 class="c-summary__text">現在感染者</h2>
              <p class="c-summary__number">{{ numberFormat(lastDay.total.active) }}<span class="c-summary__people">人</span></p>
            </div>
            <div class="col-3 c-summary__column">
              <h2 class="c-summary__text">回復者</h2>
              <p class="c-summary__number">{{ numberFormat(lastDay.total.recovered) }}<span class="c-summary__people">人</span></p>
            </div>
            <div class="col-3 c-summary__column">
              <h2 class="c-summary__text">死亡者</h2>
              <p class="c-summary__number">{{ numberFormat(lastDay.total.deaths) }}<span class="c-summary__people">人</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="c-chart">
      <canvas id="chart" width="820" height="400"></canvas>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Chart from 'chart.js'

  export default Vue.extend({
    components: {},
    data() {
      return {
        params: this.$route.params.country,
        lastDay: {
          total: {
            active: 0,
            confirmed: 0,
            deaths: 0,
            recovered: 0
          }
        },
        history: {},
        chartDate: [],
        chartConfirmed: [],
        chartRecovered: [],
        chartDeaths: [],
        chartActive: [],
      }
    },
    created () {
      this.getLastDay()
      this.getHistory()
    },
    methods: {
      getLastDay() {
        const action = `${this.apiUrl}api/get_country_last_day/${this.params}`
        axios.get(action)
          .then(response => {
            this.lastDay = response.data
          }).catch(error => {
          console.error(error)
        })
      },
      getHistory() {
        const action = `${this.apiUrl}api/get_country_history/${this.params}`
        axios.get(action)
          .then(response => {
            this.history = response.data
            this.createChart();
          }).catch(error => {
          console.error(error)
        })
      },
      createChart () {
        this.history.forEach((row, index) => {
          this.chartDate[index] = row.date
          this.chartConfirmed[index] = row.total.confirmed
          this.chartRecovered[index] = row.total.recovered
          this.chartDeaths[index] = row.total.deaths
          this.chartActive[index] = row.total.active
        }, this)
        this.outputChart()
      },
      outputChart () {
        const ctx = document.getElementById('chart').getContext('2d')
        new Chart(ctx, {
          type: 'bar',
          data: {
            datasets: [
              {
                label: '死亡者',
                data: this.chartDeaths,
                type: 'line',
                order: 1,
                borderColor: '#0d70ff',
                backgroundColor: '#9ec6ff'
              },
              {
                label: '回復者',
                data: this.chartRecovered,
                type: 'line',
                order: 2,
                borderColor: '#23d5ae',
                backgroundColor: '#a7eedf'
              },
              {
                label: '現在感染者',
                data: this.chartActive,
                type: 'line',
                order: 3,
                borderColor: '#fc0368',
                backgroundColor: '#fe9ac3'
              },
              {
                label: '累計感染者',
                data: this.chartConfirmed,
                order: 4,
                borderColor: '#fedaa0',
                backgroundColor: '#fedaa0'
              }
            ],
            labels: this.chartDate
          },
          options: {
            responsive: false
          }
        })
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
      color: #fff;
      font-size: 2.6rem;
      text-align: center;
      @include pc {
        font-size: 3.2rem;
      }
    }
  }
  .c-summary {
    padding: 40px 0;
  }
  .c-chart {
    width: 100%;
    padding: 8px 0 16px 0;
    background: $white;
    box-shadow: 0 8px 10px rgba(49,70,89,.05);
    overflow-x: scroll;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    @include pc {
      width: 860px;
      margin: 0 auto 0 auto;
      padding: 20px;
      border-radius: 8px;
      overflow-x: hidden;
    }
  }
</style>
