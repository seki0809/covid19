(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{240:function(t,e,r){var content=r(242);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(50).default)("333cbb28",content,!0,{sourceMap:!1})},241:function(t,e,r){"use strict";var c=r(240);r.n(c).a},242:function(t,e,r){(e=r(49)(!1)).push([t.i,".c-summary[data-v-0bb3297b]{padding:20px 0}@media (min-width:768px){.c-summary[data-v-0bb3297b]{height:190px;padding:40px}}.c-summary__title[data-v-0bb3297b]{margin-bottom:5px;font-size:2rem;color:#fff}@media (min-width:768px){.c-summary__title[data-v-0bb3297b]{font-size:2.6rem}}.c-summary__box[data-v-0bb3297b]{padding:16px}@media (min-width:768px){.c-summary__box[data-v-0bb3297b]{padding:20px}}.c-summary__column[data-v-0bb3297b]{height:40px;padding-bottom:10px;display:flex;align-items:flex-end;justify-content:space-between;line-height:1}.c-summary__column[data-v-0bb3297b]:last-child{padding-bottom:0;border:none}@media (min-width:768px){.c-summary__column[data-v-0bb3297b]{height:60px;padding-bottom:0;display:block}}.c-summary__text[data-v-0bb3297b]{font-size:1.8rem}@media (min-width:768px){.c-summary__text[data-v-0bb3297b]{margin-bottom:15px;text-align:center}}.c-summary__number[data-v-0bb3297b]{font-size:3rem}@media (min-width:768px){.c-summary__number[data-v-0bb3297b]{text-align:center}}.c-summary__people[data-v-0bb3297b]{font-size:1.2rem}",""]),t.exports=e},243:function(t,e,r){var content=r(250);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(50).default)("68084676",content,!0,{sourceMap:!1})},244:function(t,e,r){var content=r(252);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(50).default)("aa2d0c2c",content,!0,{sourceMap:!1})},247:function(t,e,r){"use strict";var c={props:{item:{required:!0,type:Array,default:function(){return[]}},loading:{type:Boolean,default:!1}}},o=(r(241),r(42)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"c-summary"},[r("div",{staticClass:"l-wrapper"},[r("div",{staticClass:"c-box c-summary__box"},[r("div",{staticClass:"row"},t._l(t.item,(function(e){return r("div",{staticClass:"col-3 c-summary__column"},[r("h2",{staticClass:"c-summary__text"},[t._v(t._s(e.text))]),t._v(" "),r("p",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"c-summary__number"},[t._v(t._s(t.numberFormat(e.number))),r("span",{staticClass:"c-summary__people"},[t._v("人")])])])})),0)])])])}),[],!1,null,"0bb3297b",null);e.a=component.exports},249:function(t,e,r){"use strict";var c=r(243);r.n(c).a},250:function(t,e,r){(e=r(49)(!1)).push([t.i,".c-chart[data-v-4d25c01c]{width:100%;padding:8px 0 16px;background:#fff;box-shadow:0 8px 10px rgba(49,70,89,.05);overflow-x:scroll;overflow-scrolling:touch;-webkit-overflow-scrolling:touch}@media (min-width:768px){.c-chart[data-v-4d25c01c]{width:860px;margin:0 auto;padding:20px;border-radius:8px;overflow-x:hidden}}",""]),t.exports=e},251:function(t,e,r){"use strict";var c=r(244);r.n(c).a},252:function(t,e,r){(e=r(49)(!1)).push([t.i,".header[data-v-0baea1cd]{padding:40px 0}@media (min-width:768px){.header[data-v-0baea1cd]{padding:60px 0}}.header__title[data-v-0baea1cd]{color:#fff;font-size:2.6rem;text-align:center}@media (min-width:768px){.header__title[data-v-0baea1cd]{font-size:3.2rem}}.c-back[data-v-0baea1cd]{padding-top:40px}.c-back__text[data-v-0baea1cd]{padding:10px;display:block;text-align:center;text-decoration:underline}",""]),t.exports=e},258:function(t,e,r){"use strict";r.r(e);var c=r(10),o=r(60),n=r.n(o),d=r(247),l=r(248),m=r.n(l),h={props:{item:{required:!0,type:Array,default:function(){return[]}}},data:function(){return{chart:{date:[],confirmed:[],recovered:[],deaths:[],active:[]}}},watch:{item:function(){this.createChartData()}},methods:{createChartData:function(){var t=this;this.item.forEach((function(e,r){t.chart.date[r]=e.date,t.chart.confirmed[r]=e.total.confirmed,t.chart.recovered[r]=e.total.recovered,t.chart.deaths[r]=e.total.deaths,t.chart.active[r]=e.total.active}),this),this.outputChart()},outputChart:function(){var t=document.getElementById("chart").getContext("2d");new m.a(t,{type:"bar",data:{datasets:[{label:"死亡者",data:this.chart.deaths,type:"line",order:1,borderColor:"#0d70ff",backgroundColor:"#9ec6ff"},{label:"回復者",data:this.chart.recovered,type:"line",order:2,borderColor:"#23d5ae",backgroundColor:"#a7eedf"},{label:"現在感染者",data:this.chart.active,type:"line",order:3,borderColor:"#fc0368",backgroundColor:"#fe9ac3"},{label:"累計感染者",data:this.chart.confirmed,order:4,borderColor:"#fedaa0",backgroundColor:"#fedaa0"}],labels:this.chart.date},options:{responsive:!1}})}}},f=(r(249),r(42)),v=Object(f.a)(h,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"c-chart"},[e("canvas",{attrs:{id:"chart",width:"820",height:"400"}})])}],!1,null,"4d25c01c",null).exports,x=c.a.extend({components:{Summary:d.a,Chart:v},data:function(){return{params:this.$route.params.country,country:"　",total:{active:0,confirmed:0,deaths:0,recovered:0},history:[],loading:!1,summary:[]}},created:function(){this.getData()},methods:{getData:function(){var t=this,e="".concat(this.apiUrl,"create_detail/").concat(this.params,".json");n.a.get(e).then((function(e){t.country=e.data.slice(-1)[0].country,t.total=e.data.slice(-1)[0].total,t.history=e.data,t.createSummaryData(),t.loading=!0})).catch((function(t){console.error(t)}))},createSummaryData:function(){this.summary=[{text:"累計感染者",number:this.total.confirmed},{text:"現在感染者",number:this.total.active},{text:"回復者",number:this.total.recovered},{text:"死亡者",number:this.total.deaths}]}}}),_=(r(251),Object(f.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"c-hero header"},[r("div",{staticClass:"l-wrapper"},[r("h1",{staticClass:"header__title"},[t._v(t._s(t.country))])])]),t._v(" "),r("Summary",{attrs:{item:t.summary,loading:t.loading}}),t._v(" "),r("Chart",{attrs:{item:t.history}}),t._v(" "),r("div",{staticClass:"c-back"},[r("div",{staticClass:"l-wrapper"},[r("div",{staticClass:"c-box"},[r("nuxt-link",{staticClass:"c-back__text",attrs:{to:"/"}},[t._v("戻る")])],1)])])],1)}),[],!1,null,"0baea1cd",null));e.default=_.exports}}]);