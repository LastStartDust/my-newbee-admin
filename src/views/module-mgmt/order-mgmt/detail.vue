<template>
  <div class='app-container'>
    <div class="order-base-info">
      <el-card class="base-item">
        <template #header>
          <span>订单状态</span>
        </template>
        <div>{{ orderStatusFilter(detail.orderStatus) }}</div>
      </el-card>
      <el-card class="base-item">
        <template #header>
          <span>创建时间</span>
        </template>
        <div>{{ detail.createTime }}</div>
      </el-card>
      <el-card class="base-item">
        <template #header>
          <span>订单号</span>
        </template>
        <div>{{ detail.orderNo }}</div>
      </el-card>
    </div>

    <el-card class="mt15">
      <el-table :data="list" border >
        <el-table-column align="center" label="商品图片" prop="orderNo">
          <template #default="scope">
            <img :src="parseImgUrl(scope.row.goodsCoverImg)" style="max-width: 100px;" />
          </template>
        </el-table-column>

        <el-table-column align="center" label="商品编号" prop="goodsId" />
        <el-table-column align="center" label="商品名" prop="goodsName" />
        <el-table-column align="center" label="商品数量" prop="goodsCount" />
        <el-table-column align="center" label="商品价格" prop="sellingPrice" />
      </el-table>
    </el-card>

  </div>
</template>
<script>
import { defineComponent, onActivated, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { fetchOrder } from '@/api/module-mgmt'
import { isEmpty, parseImgUrl } from '@/utils'
import {
  orderStatusMap,
} from './options'

export default defineComponent({
  name: 'OrderDetail',
  setup(props, { attrs, slots, emit }) {
    const route = useRoute()
    const state = reactive({
      orderId: '',
      detail: {},
      list: []
    })
    state.orderId = +route.query.id

    onMounted(() => {
      console.log('onMounted');
      fetchOrder(state.orderId)
        .then(res => {
          state.detail = res.data
          state.list = res.data.newBeeMallOrderItemVOS
        })
    })

    onActivated(() => {
      console.log('onActivated');
    })

    const orderStatusFilter = (v) => {
      if (isEmpty(v)) {
        return '未知状态'
      }
      return orderStatusMap[v] || ''
    }

    return {
      ...toRefs(state),
      orderStatusFilter,
      parseImgUrl
    }
  }
})
</script>
<style lang='scss' scoped>
.order-base-info {
  display: flex;
  align-items: center;

  .base-item {
    flex: 1;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>