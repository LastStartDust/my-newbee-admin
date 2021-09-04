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
      <el-button type="primary" size="small" @click="handleConfig(multipleSelectionIds)"
        >配货完成</el-button
      >
      <el-button type="primary" size="small" @click="handleSend(multipleSelectionIds)">
        <svg-icon icon-class="shipped_out"></svg-icon>
        <span>出库</span>
      </el-button>
      <el-button
        type="danger"
        class="el-icon-delete"
        size="small"
        @click="handleClose(multipleSelectionIds)"
        >关闭订单</el-button
      >
    </div>

    <el-table :data="list" v-loading="listLoading" border @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
            @click="handleConfig([scope.row.orderId])"
            >配货完成</el-button
          >
          <el-button
            v-if="scope.row.orderStatus === orderStatus.PICKING_COMPLETE"
            size="small"
            @click="handleSend([scope.row.orderId])"
            >出库</el-button
          >
          <el-button
            v-if="
              !(scope.row.orderStatus === orderStatus.TRANSACTION_COMPLETE ||
              scope.row.orderStatus < orderStatus.WAIT_PAID)
            "
            size="small"
            @click="handleClose([scope.row.orderId])"
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
import { 
  fetchOrderList,
  checkDoneOrder,
  closeOrder,
  checkoutOrder
 } from '@/api/module-mgmt'
import { isEmpty } from '@/utils'
import { ElMessageBox, ElMessage } from 'element-plus'

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
      multipleSelectionIds: []
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
    const handleConfig = (ids) => {
      ElMessageBox.confirm('确定配货完成吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        checkDoneOrder(ids)
        .then(() => {
          ElMessage.success('配货操作成功')
          getList()
        })
      })
      .catch(() => {
        ElMessage.info('已取消操作')
      });
    }
    const handleSend = (ids) => {
      ElMessageBox.confirm('确定出库吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        checkoutOrder(ids)
        .then(() => {
          ElMessage.success('出库操作成功')
          getList()
        })
      })
      .catch(() => {
        ElMessage.info('已取消操作')
      });
    }
    const handleClose = (ids) => {
      ElMessageBox.confirm('确定要关闭订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        closeOrder(ids)
        .then(() => {
          ElMessage.success('关闭订单操作成功')
          getList()
        })
      })
      .catch(() => {
        ElMessage.info('已取消操作')
      });
    }

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

    const handleSelectionChange = (val) => {
      state.multipleSelectionIds = val.map(item => item.orderId)
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
      handleConfig,
      handleSend,
      handleClose,
      orderStatusFilter,
      payTypeFilter,
      handleViewDetail,
      handleSelectionChange
    }
  },
})
</script>
<style lang="scss" scoped></style>
