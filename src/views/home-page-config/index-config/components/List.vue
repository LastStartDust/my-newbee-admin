<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-button
        type="danger"
        @click="handleBatchRemove"
        :disabled="multipleSelection.length <= 0"
        >批量删除</el-button
      >
    </el-card>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
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
    
    <IndexConfigDialog
      ref="indexConfigDialogRef"
      :id="configId"
      :is-edit="isEdit"
      :config-type="configType"
      @reload="handleReload"
    ></IndexConfigDialog>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { fetchIndexConfigList, deleteIndexConfig } from '@/api/home-page-config'
import IndexConfigDialog from './IndexConfigDialog.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
  name: 'IndexConfigList',
  props: {
    configType: {
      type: Number,
      required: true,
    },
  },
  components: { IndexConfigDialog },
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
      configId: '',
      isEdit: false
    })

    const indexConfigDialogRef = ref(null)

    const getList = () => {
      state.listLoading = true
      fetchIndexConfigList({
        pageNumber: state.listQuery.page,
        pageSize: state.listQuery.limit,
        configType: props.configType,
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

    const handleAdd = () => {
      indexConfigDialogRef.value.open()
    }
    const handleEdit = ({ configId }) => {
      state.configId = configId
      state.isEdit = true
      indexConfigDialogRef.value.open()
    }

    const multipleSelection = ref([])
    const handleBatchRemove = () => {
      if(!multipleSelection.value.length) {
        ElMessage.error('请选择需要移除的商品')
        return false
      }
      const ids = multipleSelection.value.map(item => item.configId)
        ElMessageBox.confirm('此操作将删除所选的商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          deleteIndexConfig(ids)
          .then(() => {
            ElMessage.success('删除成功')
          })
        })
        .catch(() => {
          ElMessage.info('已取消删除')
        });
    }

    const handleRemove = (row) => {
      ElMessageBox.confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          const ids = [row.configId]
          deleteIndexConfig(ids)
          .then(() => {
            ElMessage.success('删除成功')
          })
        })
        .catch(() => {
          ElMessage.info('已取消删除')
        });
    }
    const handleReload = ({ isReload }) => {
      state.configId = ''
      state.isEdit = false
      if(isReload) {
        getList()
      }
    }
    const handleSelectionChange = (val) => {
      multipleSelection.value = val
    }
    return {
      ...toRefs(state),
      handleAdd,
      handleBatchRemove,
      handleEdit,
      handleRemove,
      getList,
      indexConfigDialogRef,
      handleReload,
      multipleSelection,
      handleSelectionChange
    }
  },
})
</script>
<style lang="scss" scoped></style>
