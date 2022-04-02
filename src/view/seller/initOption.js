export default {
  title: {
    text: '| 商家销售统计',
    textStyle: {
      color: '#fff'
    }
  },
  grid: {
    top: '20%',
    left: '3%',
    right: '6%',
    bottom: '3%',
    containLbabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      z: 0,
      lineStyle: {
        type: 'solid',
        color: '#2D3443'
      }
    }
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#5052EE' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#AB6EE5' // 100% 处的颜色
            }
          ]
        }
      },
      label: {
        show: true,
        position: 'right',
        color: '#fff'
      }
    }
  ]
}
