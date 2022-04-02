import  { createRouter,createWebHashHistory } from 'vue-router'

import SellerPage from '../view/seller/sellerPage.vue'
import TrendPage from '../view/trend/trendPage.vue'

const routes = [{
  path:'/seller',
  component:SellerPage
},{
  path:'/',
  component:TrendPage
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router