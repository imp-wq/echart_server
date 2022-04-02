import { createApp } from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'
import axios from 'axios'
import router from './router'
import './assets/css/global.css'


axios.defaults.baseURL='http://localhost:9000/api/'
const app=createApp(App)
app.config.globalProperties.$echarts=echarts
app.use(router)
app.mount('#app')
