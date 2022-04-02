<template>
  <h2>test组件</h2>
  <div class="liner"></div>
  <div ref="chart" class="chart">123123123</div>
</template>

<script>
  import { onMounted, ref } from '@vue/runtime-core'
  import * as echarts from 'echarts'

  export default {
    setup() {
      const chart = ref(null)
      const  dataSource = {
          '外来国际': 10,
          '外来省内': 20,
          '外来省外': 20,
          '外来总数': 50
        }


      onMounted(() => {
        // console.log(chart.value)
        const myChart = echarts.init(chart.value)

        const drawData = ['省内', '省外', '国际']

        var option = {
          tooltip: {
            trigger: 'item',
            backgroundColor: '#001c38cf',
            borderColor: '#00B8FF',
            borderWidth: 2,
            borderRadius: 4 * window.iocRate,
            textStyle: {
              align: 'left',
              fontSize: 14 * window.iocRate,
              color: '#CCF2FF'
            },
            formatter: function (v) {
              return `<div style="border-radius: 2px; color: #CCF2FF; padding: 2px 2px;">${v.marker}${v.name}</br>人数：${v.value}人</br>占比：${v.percent}%</div>`
            }
          },
      
          legend: {
            top: '25%',
            right: '7%',
            // textStyle: {
            //   color: '#CCF2FF',
            //   fontSize: 18 * window.iocRate,
            //   overflow: 'break',
            //   width: 200 * window.iocRate
            // },
            // itemGap: 34 * window.iocRate,
            // itemWidth: 14 * window.iocRate,
            // itemHeight: 14 * window.iocRate,
            // orient: 'vertical',
            // formatter: (name) => {
            //   var tarValue = dataSource['外来' + name] || 0
            //   var total = dataSource['外来总数'] || 0
            //   if (tarValue === 0 || total === 0) {
            //     return name + ' ' + '      ' + '0%'
            //   }
            //   var p = (parseInt((tarValue / total) * 100 * 100) / 100).toFixed(
            //     2
            //   )
            //   return name + ' ' + '      ' + p + '%'
            // }
          },
          color: ['#00FF46', '#409EFF', '#FFCC4B'],
          series: [
            {
              // name: "占比",
              type: 'pie',
              radius: ['50%', '55%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderColor: 'rgba(0,0,0,.5)',
                borderWidth: 3
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: false,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true
              },
              data: drawData.map((name) => {
                return {
                  name,
                  value: dataSource['外来' + name]
                }
              }),
              center: ['20%', '49%']
            }
          ]
        }

        option && myChart.setOption(option)
      })

      return {
        chart
      }
    }
  }
</script>

<style scoped>
  .liner {
    width: 300px;
    height: 300px;
    background-image: linear-gradient(to bottom, #ffffff, #00e6ff);
  }

  .chart {
  height: 300px;
  height: 300px;
}
</style>
