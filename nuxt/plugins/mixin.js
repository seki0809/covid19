import Vue from 'vue'

Vue.mixin({
  data(){
    return {
      apiUrl: 'http://seki.sub.jp/file/covid19/'
    }
  },
  methods: {
    numberFormat (param) {
      return Number(param).toLocaleString()
    }
  }
})
