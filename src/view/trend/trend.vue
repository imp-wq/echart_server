<template>
  <div class="com-container" ref="trend_ref"></div>
</template>

<script>
  import * as echarts from 'echarts'
  import { onMounted, onUnmounted, ref } from '@vue/runtime-core'
  import axios from 'axios'
  import initOption from './initOption'
  import seriesItem from './seriesItem'
  import color from './color'

  export default {
    setup() {
      let chartInstance = null
      let trend_ref = ref(null)
      let allData // 从服务器获取的数据

      const initChart = () => {
        chartInstance = echarts.init(trend_ref.value, 'dark')
        chartInstance.setOption(initOption)
      }

      const getData = async () => {
        const { data: res } = await axios.get('trend')
        allData = res
        console.log(allData)
      }

      const updateChart = () => {
        const legendArr = allData.map.data.map((item) => item.name)
        console.log(legendArr)
        const timeArr = allData.common.month
        const curValueArr = allData.map.data
        // 用map方法直接生成series数组
        const seriesArr = curValueArr.map((item,index) => {
          console.log(seriesItem(color.colorArr1[index],color.colorArr2[index]))
         return {
             data: item.data,
             name: item.name,
             ...seriesItem(color.colorArr1[index],color.colorArr2[index])
         }
        })
        const dataOption = {
          legend: { data: legendArr },
          xAxis: {
            data: timeArr
          },
          series: seriesArr
        }
        chartInstance.setOption(dataOption)
      }

      const screenAdapter = () => {
        const adaptOption = {}
        chartInstance.setOption(adaptOption)
        chartInstance.resize()
      }
      onMounted(async () => {
        initChart()
        await getData()
        updateChart()
        window.addEventListener('resize', screenAdapter)
        screenAdapter()
      })

      onUnmounted(() => {
        window.removeEventListener('resize', screenAdapter)
      })
      return {
        trend_ref
      }
    }
  }
</script>

<style></style>
