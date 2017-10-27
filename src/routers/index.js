/**
 * Created by HG on 2017/9/19.
 */
import Vue from "vue"
import Router from "vue-router"
import rank from "../components/rank/rank"
import recommend from "../components/recommend/recommend"
import search from "../components/search/search"
import singer from "../components/singer/singer"
import singerDetail from '../components/singerDetail/singerDetail'
import disc from 'components/disc/disc'
import rankDetail from 'components/rankDetail/rankDetail'

Vue.use(Router);
export default new Router({
  routes:[
    {
      path:"/",
      redirect:"/recommend"
    },
    {
      path:"/rank",
      component:rank,
      children:[{
          path:':id',
          component:rankDetail
        }]
    },
    {
      path:'/recommend',
      component:recommend,
      children:[{
        path:':id',
        component:disc
      }]
    },
    {
      path:'/singer',
      component:singer,
      children:[{
       /*:id会在vm.$route中的params中形成id这一属
        性，这样就可以在子组件中获取id了*/
        path:':id',
        component:singerDetail
      }]
    },
    {
      path:'/search',
      component:search
    }
  ]
})
