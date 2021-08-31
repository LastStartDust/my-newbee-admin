<template>
  <div class="app-container">
    <el-page-header
      v-if="level > 1"
      @back="() => $router.back()"
      style="margin-bottom: 12px"
    />

    <el-card class="operate-container" shadow="never">
      <el-button type="primary" @click="handleAdd">添加分类</el-button>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" label="id" prop="categoryId" width="55" />
      <el-table-column align="center" label="分类名称" prop="categoryName" />
      <el-table-column align="center" label="排序值" prop="categoryRank" />
      <el-table-column align="center" label="创建时间" prop="createTime" />
      <el-table-column header-align="center" align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="primary"
            v-if="scope.row.categoryLevel < 3"
            icon="el-icon-caret-right"
            @click="handleNext(scope.row)"
            >下级分类</el-button
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

    <CategoryDetailDialog
      ref="categoryDetailDialogRef"
      :id="categoryId"
      :is-edit="isEdit"
      @reload="handleReload"
    ></CategoryDetailDialog>
  </div>
</template>
<script>
import { toRefs } from '@vueuse/shared'
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { deleteCategory, fetchCategoryList } from '@/api/module-mgmt'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import CategoryDetailDialog from './components/CategoryDetailDialog.vue'

export default defineComponent({
  name: 'CategoryMgmtList',
  components: { CategoryDetailDialog },
  setup(props, { attrs, slots, emit }) {
    // const { title } = toRefs(props)
    const router = useRouter()
    const route = useRoute()
    const categoryDetailDialogRef = ref(null)
    const state = reactive({
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
      },
      multipleSelection: [],
      level: 1, // 等级参数
      parent_id: 0, // 父级id
      categoryId: '',
      isEdit: false,
    })

    onMounted(() => {
      getList()
    })
    onBeforeUnmount(() => {
      unwatch()
    })

    // 监听路由变化
    const unwatch = watch(
      () => route.path,
      () => {
        const { level = 1, parent_id = 0 } = route.query
        state.level = +level
        state.parent_id = +parent_id
        getList()
      }
    )

    const getList = () => {
      state.listLoading = true
      fetchCategoryList({
        pageNumber: state.listQuery.page,
        pageSize: state.listQuery.limit,
        categoryLevel: state.level,
        parentId: state.parent_id,
      })
        .then((res) => {
          state.list = res.data.list
          state.total = res.data.totalCount
        })
        .finally(() => {
          state.listLoading = false
        })
    }

    const handleAdd = () => {
      categoryDetailDialogRef.value.open()
    }
    const handleEdit = (row) => {
      state.categoryId = row.categoryId
      state.isEdit = true
      categoryDetailDialogRef.value.open()
    }
    const handleRemove = (row) => {
      ElMessageBox.confirm('此操作将删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteCategory([row.categoryId]).then(() => {
            ElMessage.success('删除成功')
          })
        })
        .catch(() => {
          ElMessage.info('已取消删除')
        })
    }
    const handlebatchRemove = () => {
      if (!state.multipleSelection.length) {
        ElMessage.warning('请先选择需要移除的分类！')
        return false
      }
      const ids = state.multipleSelection.map((item) => item.categoryId)
      ElMessageBox.confirm('此操作将删除所选的分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteCategory(ids).then(() => {
            ElMessage.success('删除成功')
          })
        })
        .catch(() => {
          ElMessage.info('已取消删除')
        })
    }

    const handleSelectionChange = (val) => {
      state.multipleSelection = val
    }

    const handleReload = ({ isReload }) => {
      state.categoryId = ''
      state.isEdit = false
      if (isReload) {
        getList()
      }
    }
    // 下一级分类
    const handleNext = (row) => {
      const levelNumber = row.categoryLevel + 1
      if (levelNumber >= 4) {
        ElMessage.error('已经没有下一级啦')
        return
      }
      router.push({
        name: `CategoryLevel${levelNumber}`,
        query: {
          level: levelNumber,
          parent_id: row.categoryId,
        },
      })
    }
    return {
      ...toRefs(state),
      getList,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleRemove,
      handlebatchRemove,
      handleNext,
      categoryDetailDialogRef,
      handleReload,
    }
  },
})
</script>
<style lang="scss" scoped></style>
