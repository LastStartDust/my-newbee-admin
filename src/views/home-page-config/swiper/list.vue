<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="handleAdd">添加轮播图</el-button>
      <el-button type="danger" @click="handlebatchRemove" :disabled="multipleSelection.length <= 0">批量删除</el-button>
    </el-row>

    <el-table :data="list" v-loading="listLoading" border style="width: 100%" @selection-change="multipleSelection = $event">
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" prop="carouselId" label="id" width="55" />
      <el-table-column align="center" prop="carouselUrl" label="轮播图">
        <template #default="scope">
          <img class="carousel-img" :src="scope.row.carouselUrl" alt="轮播图" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="redirectUrl" label="跳转链接">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{
            scope.row.redirectUrl
          }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序值" prop="carouselRank" />
      <el-table-column align="center" label="添加时间" prop="createTime" />
      <el-table-column
        header-align="center"
        align="center"
        label="操作" >
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleRemove(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination 
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      :page-sizes="[10, 20, 30, 50]"
      @pagination="getCarouseList" />

    <AddSwiperDialog
      ref="swiperDialogRef"
      :id="carouselId"
      :is-edit="isEdit"
      @reload="handleReload"
    ></AddSwiperDialog>
  </div>
</template>
<script>
import { toRefs } from '@vueuse/shared'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { deleteCarousel, fetchCarouselList } from '@/api/home-page-config'
import AddSwiperDialog from './components/AddSwiperDialog.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
  name: 'SwiperList',
  components: { AddSwiperDialog },
  setup(props, { attrs, slots, emit }) {
    const listState = reactive({
      list: [],
      total: 0,
      listLoading: false,
    })
    const listQuery = reactive({
      page: 1,
      limit: 10,
    })
    const getCarouseList = () => {
      listState.listLoading = true
      fetchCarouselList({
        pageNumber: listQuery.page,
        pageSize: listQuery.limit,
      })
        .then((res) => {
          listState.list = res.data.list
          listState.total = res.data.totalCount
        })
        .finally(() => {
          listState.listLoading = false
        })
    }

    onMounted(() => {
      getCarouseList()
    })

    const swiperDialogRef = ref(null)
    const handleAdd = () => {
      swiperDialogRef.value?.open()
    }

    const carouselId = ref('')
    const isEdit = ref(false)
    const handleEdit = (row) => {
      carouselId.value = row.carouselId
      isEdit.value = true
      swiperDialogRef.value?.open()
    }
    const handleRemove = (row) => {
      ElMessageBox.confirm('此操作将删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          deleteCarousel([row.carouselId])
          .then(() => {
            ElMessage.success('删除成功')
          })
        })
        .catch(() => {
          ElMessage.info('已取消删除')
        });
    }

    const multipleSelection = ref([])
    const handlebatchRemove = () => {
      if(!multipleSelection.value.length) {
        ElMessage.warning('请先选择需要移除的轮播图！')
        return false
      }
      const ids = multipleSelection.value.map(item => item.carouselId)
      ElMessageBox.confirm('此操作将删除所选的轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          deleteCarousel(ids)
          .then(() => {
            ElMessage.success('删除成功')
          })
        })
        .catch(() => {
          ElMessage.info('已取消删除')
        });
    }

    const handleReload = ({ isReload }) => {
      carouselId.value = ''
      isEdit.value = false
      if(isReload) {
        getCarouseList()
      }
    }

    return {
      listQuery,
      ...toRefs(listState),
      getCarouseList,
      swiperDialogRef,
      handleAdd,
      handleEdit,
      carouselId,
      handleRemove,
      isEdit,
      handleReload,
      handlebatchRemove,
      multipleSelection
    }
  },
})
</script>
<style lang="scss" scoped>
.carousel-img {
  width: 100px;
  height: 100px;
}
</style>
