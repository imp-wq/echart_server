export default (colorTop,colorBottom) => {
  return {
    smooth: true,
    type: 'line',
    stack: 'map', // 进行堆叠
    areaStyle: {
      // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
      color: {
        type: 'linear', // linear为线性渐变
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color:colorTop
          },
          {
            offset: 1,
            color:colorBottom
          }
        ],
        global: false // 缺省为 false
      }
    }
  }
}
