<template>
  <div class="country">
    <div class="l-wrapper">
      <div v-show="loading" class="c-box">
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
            <td><nuxt-link :to="`country/${row.code}`" class="country__country">{{ row.country }}</nuxt-link></td>
            <td><nuxt-link :to="`country/${row.code}`" class="country__data">{{ numberFormat(row.total.confirmed)  }}</nuxt-link></td>
            <td><nuxt-link :to="`country/${row.code}`" class="country__data">{{ numberFormat(row.total.active) }}</nuxt-link></td>
            <td><nuxt-link :to="`country/${row.code}`" class="country__data">{{ numberFormat(row.total.recovered) }}</nuxt-link></td>
            <td><nuxt-link :to="`country/${row.code}`" class="country__data">{{ numberFormat(row.total.deaths) }}</nuxt-link></td>
            <td><nuxt-link :to="`country/${row.code}`" class="country__arrow"></nuxt-link></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
    },
    data(){
      return {
        countries: {},
        sort: 'confirmed',
        loading: false
      }
    },
    created () {
      this.getCountries()
    },
    methods: {
      /**
       * jsonデータ取得
       */
      getCountries() {
        const action = `${this.apiUrl}create_index/json.json`
        axios.get(action)
          .then(response => {
            this.countries = response.data
            this.sortCountries()
            this.loading = true
          }).catch(error => {
          console.error(error)
        })
      },
      /**
       * ソート
       * @param target {String} ソート対象
       */
      changeSort (target) {
        this.sort = target
        this.sortCountries()
      },
      /**
       * ソート
       */
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
        temp.forEach((row2) => {
          this.countries.forEach((row3, index3) => {
            if (row2.key === index3) {
              array.push(row3)
            }
          }, this)
        })
        this.countries = array
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/var';

  .country {
    min-height: 800px;
    padding-top: 20px;
    .c-box {
      background-color: $bg;
    }
    @include pc {
      padding-top: 40px;
    }
    &__title {
      padding: 6px 16px;
      background: $main;
      border-radius: 15px 15px 0 0;
      color: $white;
      font-size: 2rem;
      font-weight: bold;
    }
    font-size: 1.2rem;
    @include pc {
      font-size: 1.6rem;
    }
    table {
      background-color: $bg;
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
      background-color: $white;
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
