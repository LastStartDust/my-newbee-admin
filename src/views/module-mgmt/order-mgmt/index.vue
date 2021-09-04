<template>
  <div class="app-container">
    <el-card>
      <el-form
        ref="listQueryRef"
        :model="listQuery"
        :inline="true"
        label-width="100px"
        size="small"
      >
        <el-form-item>
          <el-input
            v-model="listQuery.orderNo"
            placeholder="请输入订单号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="listQuery.orderStatus"
            placeholder="请选择订单状态"
          >
            <el-option
              v-for="orderStatusItem in orderStatusOptions"
              :key="orderStatusItem.value"
              :label="orderStatusItem.label"
              :value="orderStatusItem.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
          <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="operate-container mt15">
      <el-button type="primary" size="small" @click="handleBatchConfig"
        >配货完成</el-button
      >
      <el-button type="primary" size="small" @click="handleBatchSend">
        <svg-icon icon-class="shipped_out"></svg-icon>
        <span>出库</span>
      </el-button>
      <el-button
        type="danger"
        class="el-icon-delete"
        size="small"
        @click="handleBatchClose"
        >关闭订单</el-button
      >
    </div>

    <el-table :data="list" v-loading="listLoading" border>
      <el-table-column align="center" label="订单号" prop="orderNo" />
      <el-table-column align="center" label="订单总价" prop="totalPrice" />
      <el-table-column align="center" label="订单状态" prop="orderStatus">
        <template #default="scope">
          <span>{{ orderStatusFilter(scope.row.orderStatus) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付方式" prop="payType">
        <template #default="scope">
          <span>{{ payTypeFilter(scope.row.payType) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" prop="createTime" />
      <el-table-column header-align="center" align="center" label="操作">
        <template #default="scope">
          <el-button
            v-if="scope.row.orderStatus === orderStatus.PAID"
            size="small"
            @click="handleConfig(scope.row)"
            >配货完成</el-button
          >
          <el-button
            v-if="scope.row.orderStatus === orderStatus.PICKING_COMPLETE"
            size="small"
            @click="handleSend(scope.row)"
            >出库</el-button
          >
          <el-button
            v-if="
              !(scope.row.orderStatus === orderStatus.TRANSACTION_COMPLETE ||
              scope.row.orderStatus < orderStatus.WAIT_PAID)
            "
            size="small"
            @click="handleClose(scope.row)"
            >关闭订单</el-button
          >

          <el-button type="primary" class="el-icon-view" size="small" @click="handleViewDetail(scope.row)">订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :total="total"
      v-model:page="listQuery.pageNumber"
      v-model:limit="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import {
  orderStatus,
  orderStatusMap,
  orderStatusOptions,
  payWayMap,
} from './options'
import { cloneDeep } from 'lodash'
import { fetchOrderList } from '@/api/module-mgmt'
import { isEmpty } from '@/utils'

export default defineComponent({
  name: 'OrderList',
  setup(props, { attrs, slots, emit }) {
    // const { title } = toRefs(props)
    const listQueryRef = ref(null)
    const defaultListQuery = {
      pageNumber: 1,
      pageSize: 20,
      orderNo: '',
      orderStatus: orderStatus.ALL,
    }
    const state = reactive({
      listQuery: cloneDeep(defaultListQuery),
      list: [],
      total: 0,
      listLoading: false,
    })

    const getList = () => {
      state.listLoading = true
      fetchOrderList(state.listQuery)
        .then((res) => {
          state.list = res.data.list
          state.total = res.data.totalCount
        })
        .finally(() => {
          state.listLoading = false
        })
    }
    const handleSearch = () => {
      state.listQuery.pageNumber = 1
      getList()
    }
    const resetQuery = () => {
      state.listQuery = cloneDeep(defaultListQuery)
      getList()
    }
    const handleConfig = () => {}
    const handleSend = () => {}
    const handleClose = () => {}
    const handleBatchConfig = () => {}
    const handleBatchSend = () => {}
    const handleBatchClose = () => {}

    const orderStatusFilter = (v) => {
      if (isEmpty(v)) {
        return '未知状态'
      }
      return orderStatusMap[v] || ''
    }
    const payTypeFilter = (v) => {
      return payWayMap[v] || '未知'
    }
    const handleViewDetail = (row) => {
      // TODO
    }

    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state),
      orderStatus,
      orderStatusOptions,
      handleSearch,
      resetQuery,
      listQueryRef,
      getList,
      handleBatchConfig,
      handleBatchSend,
      handleBatchClose,
      handleConfig,
      handleSend,
      handleClose,
      orderStatusFilter,
      payTypeFilter,
      handleViewDetail
    }
  },
})
</script>
<style lang="scss" scoped></style>
