<template>
  <div class="app-container" ref="appContainerRef">
    <el-card class="home">
      <div class="order">
        <el-card
          class="order-item"
          v-for="orderItem in orderList"
          :key="`orderItem-${orderItem.id}`"
        >
          <template #header>
            <span>{{ orderItem.label }}</span>
          </template>
          <div>
            <span>{{ orderItem.value }}</span>
          </div>
        </el-card>
      </div>

      <div class="echarts-dom" ref="echartsDomRef"></div>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import echarts from '@/plugins/echarts'
import { useResizeObserver } from '@vueuse/core'
import { debounce } from 'lodash'

export default defineComponent({
  name: 'Home',
  setup() {
    const orderList = ref([
      { id: 1, label: '今日订单数', value: 1888 },
      { id: 2, label: '今日日活', value: 2333 },
      { id: 3, label: '今日转化率', value: 25 },
    ])

    let lineChartsIns = null
    // 指定图表的配置项和数据
    const option = {
      title: {
        text: '系统折线图',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['新增注册', '付费用户', '活跃用户', '订单数', '当日总收入'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            '2021-03-11',
            '2021-03-12',
            '2021-03-13',
            '2021-03-14',
            '2021-03-15',
            '2021-03-16',
            '2021-03-17',
          ],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '新增注册',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '付费用户',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '活跃用户',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: '订单数',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: '当日总收入',
          type: 'line',
          stack: '总量',
          label: {
            show: true,
            position: 'top',
          },
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    }

    const appContainerRef = ref(null)
    const echartsDomRef = ref(null)
    // 内容容器改变时，修改图表尺寸
    useResizeObserver(appContainerRef, debounce(() => {
      if (!lineChartsIns) {
        return
      }
      lineChartsIns.resize()
    }, 200))

    onMounted(() => {
      // 创建图表
      // 基于准备好的dom，初始化echarts实例
      if (echartsDomRef.value) {
        lineChartsIns = echarts.init(echartsDomRef.value)
        // 使用刚指定的配置项和数据显示图表。
        lineChartsIns.setOption(option)
      }
    })
    onBeforeUnmount(() => {
      if (lineChartsIns) {
        lineChartsIns.dispose()
        lineChartsIns = null
      }
    })
    return {
      orderList,
      appContainerRef,
      echartsDomRef,
    }
  },
})
</script>
<style lang="scss" scoped>
.order {
  display: flex;
  margin-bottom: 50px;

  .order-item {
    flex: 1;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.echarts-dom {
  min-height: 300px;
}
</style>
