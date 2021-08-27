<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-button
        type="danger"
        @click="handlebatchRemove"
        :disabled="multipleSelection.length <= 0"
        >批量删除</el-button
      >
    </el-card>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      style="width: 100%"
      @selection-change="multipleSelection = $event"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" prop="configId" label="id" width="55" />
      <el-table-column align="center" prop="configName" label="商品名称" />
      <el-table-column align="center" prop="redirectUrl" label="跳转链接">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{
            scope.row.redirectUrl
          }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序值" prop="goodsId" />
      <el-table-column align="center" label="商品编号" prop="goodsId" />
      <el-table-column align="center" label="添加时间" prop="createTime" />
      <el-table-column header-align="center" align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" @click="handleRemove(scope.row)"
            >移除</el-button
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
import { fetchIndexConfigList } from '@/api/home-page-config'

export default defineComponent({
  name: 'IndexConfigList',
  props: {
    type: {
      type: Number,
      required: true,
    },
  },
  setup(props, { attrs, slots, emit }) {
    const state = reactive({
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
      },
      multipleSelection: [],
    })

    const getList = () => {
      state.listLoading = true
      fetchIndexConfigList({
        pageNumber: state.listQuery.page,
        pageSize: state.listQuery.limit,
        configType: props.type,
      })
        .then((res) => {
          state.list = res.data.list
          state.total = res.data.totalCount
        })
        .finally(() => {
          state.listLoading = false
        })
    }
    onMounted(() => {
      getList()
    })
    const handleAdd = () => {}
    const handlebatchRemove = () => {}
    const handleEdit = () => {}
    const handleRemove = () => {}
    return {
      ...toRefs(state),
      handleAdd,
      handlebatchRemove,
      handleEdit,
      handleRemove,
      getList,
    }
  },
})
</script>
<style lang="scss" scoped></style>
