webpackJsonp([6],{"3xUb":function(n,a,i){"use strict";var t=function(){var n=this,a=n.$createElement,i=n._self._c||a;return i("div",{attrs:{id:"rank"}},[i("scroll",{staticClass:"rank-list",attrs:{data:n.rankList}},[i("ul",n._l(n.rankList,function(a){return i("li",{on:{click:function(i){n.selectItem(a)}}},[i("img",{attrs:{src:a.picUrl,alt:""}}),n._v(" "),i("div",{staticClass:"rank-song"},[i("h1",{staticClass:"rank-title"},[n._v(n._s(a.topTitle))]),n._v(" "),n._l(a.songList,function(a,t){return i("p",[i("span",[n._v(n._s(t+1)+".")]),n._v("\n            "+n._s(a.songname)+"--"+n._s(a.singername)+"\n          ")])})],2)])}))]),n._v(" "),i("router-view")],1)},A=[],e={render:t,staticRenderFns:A};a.a=e},BRgg:function(n,a,i){"use strict";function t(){var n=o()({},s.b,{g_tk:5381,format:"jsonp",notice:"0",platform:"h5",needNewCode:1,uin:"0"});return i.i(r.a)("https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",n,{param:"jsonpCallback"})}function A(n){var a=o()({},s.b,{g_tk:5381,uin:0,format:"json",platform:"h5",needNewCode:1,tpl:3,page:"detail",type:"top",topid:n});return i.i(r.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",a,{param:"jsonpCallback"})}a.b=t,a.a=A;var e=i("aA9S"),o=i.n(e),r=i("cQcd"),s=i("T452")},I5bp:function(n,a,i){a=n.exports=i("BkJT")(!0),a.push([n.i,".rank-list[data-v-106fcaa0]{width:100%;position:absolute;bottom:60px;top:88px;overflow:hidden;padding:0 5px;-webkit-box-sizing:border-box;box-sizing:border-box}.rank-list ul[data-v-106fcaa0]{position:absolute;top:0;width:100%}.rank-list li[data-v-106fcaa0]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100px;margin:10px 0;padding:5px;background:rgba(0,0,0,.3);border-radius:5px}.rank-list li img[data-v-106fcaa0]{height:100%;border-radius:5px}.rank-list li .rank-song[data-v-106fcaa0]{font-size:14px;padding:0 10px;color:rgba(255,205,49,.5);-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:center;align-content:center;overflow:hidden}.rank-list li .rank-song .rank-title[data-v-106fcaa0]{font-size:16px;color:#ffcd32;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;margin:5px 0}.rank-list li .rank-song p[data-v-106fcaa0]{width:100%;display:block;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;margin:4px 0}","",{version:3,sources:["F:/personalDemo/vue/vue-music-app/vue-music/src/components/rank/rank.vue"],names:[],mappings:"AACA,4BACE,WAAY,AACZ,kBAAmB,AACnB,YAAa,AACb,SAAU,AACV,gBAAiB,AACjB,cAAe,AACf,8BAA+B,AACvB,qBAAuB,CAChC,AACD,+BACE,kBAAmB,AACnB,MAAO,AACP,UAAY,CACb,AACD,+BACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,aAAc,AACd,cAAe,AACf,YAAiB,AACjB,0BAA+B,AAC/B,iBAAmB,CACpB,AACD,mCACE,YAAa,AACb,iBAAmB,CACpB,AACD,0CACE,eAAgB,AAChB,eAAgB,AAChB,0BAA+B,AAC/B,8BAA+B,AACvB,sBAAuB,AAC/B,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,mBAAoB,AAChB,eAAgB,AACpB,0BAA2B,AACvB,qBAAsB,AAC1B,eAAiB,CAClB,AACD,sDACE,eAAgB,AAChB,cAAe,AACf,mBAAoB,AACpB,uBAAwB,AACxB,gBAAiB,AACjB,YAAc,CACf,AACD,4CACE,WAAY,AACZ,cAAe,AACf,mBAAoB,AACpB,uBAAwB,AACxB,gBAAiB,AACjB,YAAc,CACf",file:"rank.vue",sourcesContent:["\n.rank-list[data-v-106fcaa0] {\n  width: 100%;\n  position: absolute;\n  bottom: 60px;\n  top: 88px;\n  overflow: hidden;\n  padding: 0 5px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.rank-list ul[data-v-106fcaa0] {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.rank-list li[data-v-106fcaa0] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 100px;\n  margin: 10px 0;\n  padding: 5px 5px;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 5px;\n}\n.rank-list li img[data-v-106fcaa0] {\n  height: 100%;\n  border-radius: 5px;\n}\n.rank-list li .rank-song[data-v-106fcaa0] {\n  font-size: 14px;\n  padding: 0 10px;\n  color: rgba(255, 205, 49, 0.5);\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-line-pack: center;\n      align-content: center;\n  overflow: hidden;\n}\n.rank-list li .rank-song .rank-title[data-v-106fcaa0] {\n  font-size: 16px;\n  color: #ffcd32;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  margin: 5px 0;\n}\n.rank-list li .rank-song p[data-v-106fcaa0] {\n  width: 100%;\n  display: block;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  margin: 4px 0;\n}\n"],sourceRoot:""}])},Kjo5:function(n,a,i){"use strict";function t(n){i("Kv95")}Object.defineProperty(a,"__esModule",{value:!0});var A=i("uE0z"),e=i("3xUb"),o=i("o7Pn"),r=t,s=o(A.a,e.a,r,"data-v-106fcaa0",null);a.default=s.exports},Kv95:function(n,a,i){var t=i("I5bp");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);i("8bSs")("70195390",t,!0)},uE0z:function(n,a,i){"use strict";var t=i("4YfN"),A=i.n(t),e=i("BRgg"),o=i("T452"),r=i("qwAB"),s=i("Vdk4");a.a={data:function(){return{rankList:[]}},created:function(){this._getRankList()},methods:A()({},i.i(s.d)({setRankList:"SET_RANK_LIST"}),{_getRankList:function(){var n=this;i.i(e.b)().then(function(a){a.code===o.a&&(n.rankList=a.data.topList)})},selectItem:function(n){this.$router.push({path:"/rank/"+n.id}),this.setRankList(n)}}),components:{scroll:r.a}}}});
//# sourceMappingURL=6.e054c56a195ea6bec954.js.map