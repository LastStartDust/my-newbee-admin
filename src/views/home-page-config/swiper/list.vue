<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="handleAdd">添加轮播图</el-button>
    </el-row>

    <el-table :data="list" v-loading="listLoading" border style="width: 100%">
      <el-table-column type="selection" width="55" />
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
    </el-table>

    <pagination 
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      :page-sizes="[10, 20, 30, 50]"
      @pagination="getCarouseList" />

    <AddSwiperDialog
      ref="swiperDialogRef"
      @reload="getCarouseList"
    ></AddSwiperDialog>
  </div>
</template>
<script>
import { toRefs } from '@vueuse/shared'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { fetchCarouselList } from '@/api/home-page-config'
import AddSwiperDialog from './components/AddSwiperDialog.vue';

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
      console.log(swiperDialogRef);
      swiperDialogRef.value?.open()
    }

    const dialogVisible = ref(false);
      
      const handleClose = (done) => {
        ElMessageBox
          .confirm('确认关闭？')
          .then((_) => {
            done();
          })
          .catch((_) => {
            // catch
          });
      };

    return {
      listQuery,
      ...toRefs(listState),
      getCarouseList,
      swiperDialogRef,
      handleAdd,
      dialogVisible,
        handleClose,
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
