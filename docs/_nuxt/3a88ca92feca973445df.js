(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{240:function(t,e,r){var content=r(244);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(50).default)("25746c80",content,!0,{sourceMap:!1})},243:function(t,e,r){"use strict";var c=r(240);r.n(c).a},244:function(t,e,r){(e=r(49)(!1)).push([t.i,".header[data-v-128ef3ce]{padding:40px 0}@media (min-width:768px){.header[data-v-128ef3ce]{padding:60px 0}}.header__title[data-v-128ef3ce]{color:#fff;font-size:2.6rem;text-align:center}@media (min-width:768px){.header__title[data-v-128ef3ce]{font-size:3.2rem}}.c-summary[data-v-128ef3ce]{padding:40px 0}.c-chart[data-v-128ef3ce]{width:100%;padding:8px 0 16px;background:#fff;box-shadow:0 8px 10px rgba(49,70,89,.05);overflow-x:scroll;overflow-scrolling:touch;-webkit-overflow-scrolling:touch}@media (min-width:768px){.c-chart[data-v-128ef3ce]{width:860px;margin:0 auto;padding:20px;border-radius:8px;overflow-x:hidden}}",""]),t.exports=e},248:function(t,e,r){"use strict";r.r(e);var c=r(10),o=r(60),n=r.n(o),l=r(242),d=r.n(l),h=c.a.extend({components:{},data:function(){return{params:this.$route.params.country,lastDay:{total:{active:0,confirmed:0,deaths:0,recovered:0}},history:{},chartDate:[],chartConfirmed:[],chartRecovered:[],chartDeaths:[],chartActive:[]}},created:function(){this.getLastDay(),this.getHistory()},methods:{getLastDay:function(){var t=this,e="".concat(this.apiUrl,"api/get_country_last_day/").concat(this.params);n.a.get(e).then((function(e){t.lastDay=e.data})).catch((function(t){console.error(t)}))},getHistory:function(){var t=this,e="".concat(this.apiUrl,"api/get_country_history/").concat(this.params);n.a.get(e).then((function(e){t.history=e.data,t.createChart()})).catch((function(t){console.error(t)}))},createChart:function(){var t=this;this.history.forEach((function(e,r){t.chartDate[r]=e.date,t.chartConfirmed[r]=e.total.confirmed,t.chartRecovered[r]=e.total.recovered,t.chartDeaths[r]=e.total.deaths,t.chartActive[r]=e.total.active}),this),this.outputChart()},outputChart:function(){var t=document.getElementById("chart").getContext("2d");new d.a(t,{type:"bar",data:{datasets:[{label:"死亡者",data:this.chartDeaths,type:"line",order:1,borderColor:"#0d70ff",backgroundColor:"#9ec6ff"},{label:"回復者",data:this.chartRecovered,type:"line",order:2,borderColor:"#23d5ae",backgroundColor:"#a7eedf"},{label:"現在感染者",data:this.chartActive,type:"line",order:3,borderColor:"#fc0368",backgroundColor:"#fe9ac3"},{label:"累計感染者",data:this.chartConfirmed,order:4,borderColor:"#fedaa0",backgroundColor:"#fedaa0"}],labels:this.chartDate},options:{responsive:!1}})}}}),m=(r(243),r(43)),component=Object(m.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"c-hero header"},[r("div",{staticClass:"l-wrapper"},[r("h1",{staticClass:"header__title"},[t._v(t._s(t.lastDay.country))])])]),t._v(" "),r("div",{staticClass:"c-summary"},[r("div",{staticClass:"l-wrapper"},[r("div",{staticClass:"c-box c-summary__box"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-3 c-summary__column"},[r("h2",{staticClass:"c-summary__text"},[t._v("累計感染者")]),t._v(" "),r("p",{staticClass:"c-summary__number"},[t._v(t._s(t.numberFormat(t.lastDay.total.confirmed))),r("span",{staticClass:"c-summary__people"},[t._v("人")])])]),t._v(" "),r("div",{staticClass:"col-3 c-summary__column"},[r("h2",{staticClass:"c-summary__text"},[t._v("現在感染者")]),t._v(" "),r("p",{staticClass:"c-summary__number"},[t._v(t._s(t.numberFormat(t.lastDay.total.active))),r("span",{staticClass:"c-summary__people"},[t._v("人")])])]),t._v(" "),r("div",{staticClass:"col-3 c-summary__column"},[r("h2",{staticClass:"c-summary__text"},[t._v("回復者")]),t._v(" "),r("p",{staticClass:"c-summary__number"},[t._v(t._s(t.numberFormat(t.lastDay.total.recovered))),r("span",{staticClass:"c-summary__people"},[t._v("人")])])]),t._v(" "),r("div",{staticClass:"col-3 c-summary__column"},[r("h2",{staticClass:"c-summary__text"},[t._v("死亡者")]),t._v(" "),r("p",{staticClass:"c-summary__number"},[t._v(t._s(t.numberFormat(t.lastDay.total.deaths))),r("span",{staticClass:"c-summary__people"},[t._v("人")])])])])])])]),t._v(" "),t._m(0)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"c-chart"},[e("canvas",{attrs:{id:"chart",width:"820",height:"400"}})])}],!1,null,"128ef3ce",null);e.default=component.exports}}]);