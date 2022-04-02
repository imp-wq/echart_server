<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import axios from 'axios'
  import * as echarts from 'echarts'
  import initOption from './initOption'

  export default {
    setup() {
      const seller_ref = ref(null)

      let data
      let currentPage = 1
      let totalPage = 1
      let timerId = null
      let chartInstance = null

      const initChart = () => {
        const instance = echarts.init(seller_ref.value, 'dark')
        // 鼠标移入时图表内容不进行自动切换
        instance.on('mouseover', () => {
          clearInterval(timerId)
        })

        instance.on('mouseout', () => {
          timerId = startInterval()
        })

        instance.setOption(initOption)
        return instance
      }

      const getData = async () => {
        const { data: ret } = await axios.get('/seller')
        console.log(ret)
        data = ret
        data.sort((a, b) => a.value - b.value)
        totalPage = Math.ceil(data.length / 5)
        return ret
      }

      const updateChart = () => {
        const start = (currentPage - 1) * 5
        const end = currentPage * 5
        const showData = data.slice(start, end)
        console.log(start, end, showData)

        const sellerList = showData.map((item) => item.name)
        const valueList = showData.map((item) => item.value)

        const dataOption = {
          yAxis: {
            data: sellerList
          },
          series: {
            data: valueList
          }
        }

        chartInstance.setOption(dataOption)
      }

      const screenAdapter = () => {
        const titleFontSize =
          (Math.min(
            seller_ref.value.offsetWidth,
            seller_ref.value.offsetHeight
          ) /
            100) *
          4
          // 和屏幕自适应相关的配置项
        const adapterOption = {
          title: {
            textStyle: {
              fontSize: titleFontSize
            }
          },
          tooltip: {
            axisPointer: {
              lineStyle: {
                width: titleFontSize
              }
            }
          },
          series: [
            {
              barWidth: titleFontSize,
              itemStyle: {
                borderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
              }
            }
          ]
        }
        chartInstance.setOption(adapterOption)
        chartInstance.resize()
      }

      const startInterval = () => {
        if (timerId) clearInterval(timerId)
        return setInterval(() => {
          currentPage++
          currentPage = currentPage > totalPage ? 1 : currentPage
          console.log(currentPage, totalPage)
          updateChart()
        }, 2000)
      }

      onMounted(async () => {
        chartInstance = initChart()
        await getData()
        updateChart()
        timerId = startInterval()
        window.addEventListener('resize', screenAdapter)
        screenAdapter()
      })
      onUnmounted(() => {
        // 组件销毁的时候，要注销掉侦听器
        clearInterval(timerId)
        window.removeEventListener('resize',screenAdapter)
      })

      return {
        seller_ref
      }
    }
  }
</script>

<style></style>
