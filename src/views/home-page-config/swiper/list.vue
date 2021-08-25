<template>
  <div class='app-container'>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { toRefs } from '@vueuse/shared'
import { defineComponent, onMounted, reactive } from 'vue'
import { fetchCarouselList } from '@/api/home-page-config';

export default defineComponent({
  name: 'SwiperList',
  setup(props, { attrs, slots, emit }) {
    // const { title } = toRefs(props)
    const listState = reactive({
      list: [],
      total: 0,
      listLoading: false,
    })
    const listQuery = reactive({
      page: 1,
      limit: 20
    })
    const getCarouseList = () => {
      listState.listLoading = true
      fetchCarouselList({
        pageNumber: listQuery.page,
        pageSize: listQuery.limit
      })
      .then(res => {
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

    const handleSizeChange = () => {

    }
    const handleCurrentChange = () => {

    }
    return {
      listQuery,
      ...toRefs(listState),
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang='scss' scoped>
</style>