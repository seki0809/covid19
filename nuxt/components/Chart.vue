<template>
  <div class="c-chart">
    <canvas id="chart" width="820" height="400"></canvas>
  </div>
</template>

<script>
  import ChartJs from 'chart.js'

  export default {
    props: {
      item: {
        required: true,
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        chart: {
          date: [],
          confirmed: [],
          recovered: [],
          deaths: [],
          active: []
        }
      }
    },
    watch: {
      item () {
        this.createChartData()
      }
    },
    methods: {
      /**
       * グラフ用データ作成
       */
      createChartData () {
        this.item.forEach((row, index) => {
          this.chart.date[index] = row.date
          this.chart.confirmed[index] = row.total.confirmed
          this.chart.recovered[index] = row.total.recovered
          this.chart.deaths[index] = row.total.deaths
          this.chart.active[index] = row.total.active
        }, this)
        this.outputChart()
      },
      /**
       * グラフ描画
       */
      outputChart () {
        const ctx = document.getElementById('chart').getContext('2d')
        new ChartJs(ctx, {
          type: 'bar',
          data: {
            datasets: [
              {
                label: '死亡者',
                data: this.chart.deaths,
                type: 'line',
                order: 1,
                borderColor: '#0d70ff',
                backgroundColor: '#9ec6ff'
              },
              {
                label: '回復者',
                data: this.chart.recovered,
                type: 'line',
                order: 2,
                borderColor: '#23d5ae',
                backgroundColor: '#a7eedf'
              },
              {
                label: '現在感染者',
                data: this.chart.active,
                type: 'line',
                order: 3,
                borderColor: '#fc0368',
                backgroundColor: '#fe9ac3'
              },
              {
                label: '累計感染者',
                data: this.chart.confirmed,
                order: 4,
                borderColor: '#fedaa0',
                backgroundColor: '#fedaa0'
              }
            ],
            labels: this.chart.date
          },
          options: {
            responsive: false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/var';

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
