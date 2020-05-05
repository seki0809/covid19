<template>

  <div>
    <div class="c-hero">
      <div class="c-summary">
        <div class="l-wrapper">
          <h1 class="c-summary__title">サマリー</h1>
          <div class="c-box c-summary__box">
            <div class="row">
              <div class="col-3 c-summary__column">
                <h2 class="c-summary__text">感染者</h2>
                <p class="c-summary__number">{{ numberFormat(summary.confirmed) }}<span class="c-summary__people">人</span></p>
              </div>
              <div class="col-3 c-summary__column">
                <h2 class="c-summary__text">回復者</h2>
                <p class="c-summary__number">{{ numberFormat(summary.recovered) }}<span class="c-summary__people">人</span></p>
              </div>
              <div class="col-3 c-summary__column">
                <h2 class="c-summary__text">重症患者</h2>
                <p class="c-summary__number">{{ numberFormat(summary.critical) }}<span class="c-summary__people">人</span></p>
              </div>
              <div class="col-3 c-summary__column">
                <h2 class="c-summary__text">死亡者</h2>
                <p class="c-summary__number">{{ numberFormat(summary.deaths) }}<span class="c-summary__people">人</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="country">
      <div class="l-wrapper">
        <div class="c-box">
          <h2 class="country__title">国別</h2>
          <table>
            <tr>
              <th>国名</th>
              <th class="country__data_head" @click.prevent="changeSort('confirmed')">
                累計<span class="country__data_hidden">感染者</span>
                <span v-show="sort === 'confirmed'" class="country__sort"></span>
              </th>
              <th class="country__data_head" @click.prevent="changeSort('active')">
                現在<span class="country__data_hidden">感染者</span>
                <span v-show="sort === 'active'" class="country__sort"></span>
              </th>
              <th class="country__data_head" @click.prevent="changeSort('recovered')">
                回復<span class="country__data_hidden">者</span>
                <span v-show="sort === 'recovered'" class="country__sort"></span>
              </th>
              <th class="country__data_head" @click.prevent="changeSort('deaths')">
                死亡<span class="country__data_hidden">者</span>
                <span v-show="sort === 'deaths'" class="country__sort"></span>
              </th>
              <th class="country__data_head"></th>
            </tr>
            <tr v-for="(row, key) in countries"
                :key="key">
              <td><nuxt-link :to="`country/${row.param}`" class="country__country">{{ row.country }}</nuxt-link></td>
              <td><nuxt-link :to="`country/${row.param}`" class="country__data">{{ numberFormat(row.total.confirmed)  }}</nuxt-link></td>
              <td><nuxt-link :to="`country/${row.param}`" class="country__data">{{ numberFormat(row.total.active) }}</nuxt-link></td>
              <td><nuxt-link :to="`country/${row.param}`" class="country__data">{{ numberFormat(row.total.recovered) }}</nuxt-link></td>
              <td><nuxt-link :to="`country/${row.param}`" class="country__data">{{ numberFormat(row.total.deaths) }}</nuxt-link></td>
              <td><nuxt-link :to="`country/${row.param}`" class="country__arrow"></nuxt-link></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default Vue.extend({
    data(){
      return {
        summary: {},
        countries: {},
        sort: 'confirmed'
      }
    },
    created () {
      this.getSummary()
      this.getCountries()
    },
    methods: {
      getSummary() {
        const action = `${this.apiUrl}json/summary/summary.json`
        axios.get(action)
          .then(response => {
            this.summary = response.data[0]
          }).catch(error => {
          console.error(error)
        })
      },
      getCountries() {
        const action = `${this.apiUrl}api/get_country_list`
        axios.get(action)
          .then(response => {
            this.countries = response.data
            this.sortCountries()
          }).catch(error => {
          console.error(error)
        })
      },
      changeSort (target) {
        this.sort = target
        this.sortCountries()
      },
      sortCountries() {
        const compare = (a, b) => {
          if(a.target > b.target) return -1;
          if(a.target < b.target) return 1;
          return b - a
        }
        let temp = []
        this.countries.forEach((row, index) => {
          temp.push(
            {
              key: index,
              target: row.total[this.sort]
            }
          )
        }, this)
        temp.sort(compare)
        let array = []
        temp.forEach((row2, index2) => {
          this.countries.forEach((row3, index3) => {
            if (row2.key === index3) {
              array.push(row3)
            }
          }, this)
        })
        this.countries = array
      }
    }
  })
</script>

<style lang="scss" lang="scss" scoped>
  @import '../assets/css/var';

  .country {
    padding-top: 20px;
    @include pc {
      padding-top: 40px;
    }
    &__title {
      padding: 6px 16px;
      background: $main;
      border-radius: 15px 15px 0 0;
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
    }
    font-size: 1.2rem;
    @include pc {
      font-size: 1.6rem;
    }
    table {
    }
    tr {
      width: 100%;
      border-bottom: 1px solid $main;
      font-size: 1.6rem;
      &:last-child {
        border: none;
      }
      &:hover {
        background: lighten($main, 55%);
      }
    }
    th {
      padding: 8px 8px;
      background: lighten($main, 50%);
    }
    td {
    }
    &__country,
    &__data,
    &__arrow {
      padding: 16px 2px;
      @include pc {
        padding: 16px;
      }
      display: block;
    }
    &__country {
    }
    &__data {
      text-align: right;
      white-space: nowrap;
      &_head {
        cursor: pointer;
      }
      &_hidden {
        display: none;
        @include pc {
          display: inline;
        }
      }
    }
    &__sort {
      position: relative;
      &::before {
        width: 0;
        height: 0;
        position: absolute;
        top: 35%;
        left: 4px;
        border-style: solid;
        border-width: 6px 6px 0 6px;
        border-color: $main transparent transparent transparent;
        content: '';
      }
    }
    &__arrow {
      width: 8%;
      position: relative;
      &::before,
      &::after{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        content: '';
      }
      &::before{
        right: 10px;
        width: 12px;
        height: 12px;
        border-top: 1px solid $main;
        border-right: 1px solid $main;
        transform: rotate(45deg);
      }
    }
  }
</style>
