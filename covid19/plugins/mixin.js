import Vue from 'vue'

Vue.mixin({
  data(){
    return {
      apiUrl: 'https://covid19.urawa-reds.com/'
    }
  },
  methods: {
    numberFormat (param) {
      return Number(param).toLocaleString()
    }
  }
})
