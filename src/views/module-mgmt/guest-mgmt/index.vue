<template>
  <div class="app-container">
    <div>
      <el-button
        type="primary"
        class="el-icon-unlock"
        size="medium"
        :disabled="multipleSelectionIds.length <= 0"
        @click="handleSolve(multipleSelectionIds)"
        >批量解除禁用</el-button
      >
      <el-button
        type="danger"
        class="el-icon-lock"
        size="medium"
        :disabled="multipleSelectionIds.length <= 0"
        @click="handleForbid(multipleSelectionIds)"
        >批量禁用账户</el-button
      >
    </div>

    <el-table class="mt15" :data="list" v-loading="listLoading" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" label="昵称" prop="nickName" />
      <el-table-column align="center" label="登录名" prop="loginName" />
      <el-table-column align="center" label="身份状态" prop="lockedFlag">
        <template #default="scope">
          <span>{{ scope.row.lockedFlag === 0 ? '正常' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否注销" prop="stockNum">
        <template #default="scope">
          <span>{{ scope.row.isDeleted === 0 ? '正常' : '注销' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" prop="createTime" />
      <el-table-column align="center" label="操作">
        <template #default="scope">
            <el-button
                type="primary"
                class="el-icon-unlock"
                size="small"
                @click="handleSolve([scope.row.userId])"
                >解除禁用</el-button
            >
            <el-button
                type="danger"
                class="el-icon-lock"
                size="small"
                @click="handleForbid([scope.row.userId])"
                >禁用账户</el-button
            >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { fetchGuestList, solveGuest, forbidGuest } from '@/api/module-mgmt'
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  name: 'GuestMgmtList',
  setup(props, { attrs, slots, emit }) {
    const state = reactive({
      listQuery: {
        pageNumber: 1,
        pageSize: 20,
      },
      list: [],
      total: 0,
      listLoading: false,
      multipleSelectionIds: [],
    })
    const getList = () => {
      state.listLoading = true
      fetchGuestList(state.listQuery)
        .then((res) => {
          state.list = res.data.list
          state.total = res.data.totalCount
        })
        .finally(() => {
            state.listLoading = false
        })
    }
    const handleSelectionChange = (val) => {
      state.multipleSelectionIds = val.map((item) => item.userId)
    }
    const handleSolve = (ids) => {
      ElMessageBox.confirm('确定解除禁用吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        solveGuest(ids)
        .then(() => {
          ElMessage.success('解除禁用操作成功')
          getList()
        })
      })
      .catch(() => {
        ElMessage.info('已取消操作')
      })
    }
    const handleForbid = (ids) => {
        ElMessageBox.confirm('确定要禁用账户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          forbidGuest(ids)
          .then(() => {
            ElMessage.success('禁用账户操作成功')
            getList()
          })
        })
        .catch(() => {
          ElMessage.info('已取消操作')
        })
    }

    onMounted(() => {
        getList()
    })
    return {
      ...toRefs(state),
      handleSolve,
      handleForbid,
      getList,
      handleSelectionChange,
    }
  },
})
</script>
<style lang="scss" scoped></style>
