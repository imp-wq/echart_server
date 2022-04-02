<template>
  <div class="com-container" ref="trend_ref"></div>
</template>

<script>
  import * as echarts from 'echarts'
  import { onMounted, onUnmounted } from '@vue/runtime-core'
  export default {
    setup() {
      let chartInstance = null
      let trend_ref = ref(null)
      let allData // 从服务器获取的数据

      const initChart = () => {
        // 初始化
        const initOption = {}
        chartInstance = echarts.init(trend_ref.value)
        chartInstance.echarts.setOption(initOption)
      }

      const getData = async () => {}

      const updateChart = () => {}

      const screenAdapter = () => {
        const adaptOption = {}
        chartInstance.setOption(adaptOption)
        chartInstance.resize()
      }
      onMounted(() => {
        // 初始化，获取数据，渲染图表，添加侦听器，手动调用自适应
        initChart()
        getData()
        updateChart()
        window.addEventListener('resize', screenAdapter)
        screenAdapter()
      })

      onUnmounted(() => {
        // 注销侦听器
        window.removeEventListener('resize', screenAdapter)
      })
      return {
        trend_ref
      }
    }
  }
</script>

<style></style>
