import Vue from 'vue'

Vue.mixin({
  data(){
    return {
      apiUrl: 'https://sub-seki.ssl-lolipop.jp/file/covid19/'
    }
  },
  methods: {
    numberFormat (param) {
      return Number(param).toLocaleString()
    }
  }
})
