<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-button type="primary" @click="handleAdd">新增商品</el-button>
    </el-card>

    <el-table :data="list" v-loading="listLoading" border>
      <el-table-column align="center" label="商品编号" prop="goodsId" />
      <el-table-column align="center" label="商品名称" prop="goodsName" />
      <el-table-column align="center" label="商品简介" prop="goodsIntro" />
      <el-table-column align="center" label="商品图片" prop="goodsCoverImg">
        <template #default="scope">
          <img
            class="goods-img"
            :key="scope.row.goodsId"
            :src="parseImgUrl(scope.row.goodsCoverImg)"
            alt="商品图片"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品库存" prop="stockNum" />
      <el-table-column align="center" label="商品售价" prop="sellingPrice" />
      <el-table-column align="center" label="商品状态" prop="goodsSellStatus">
        <template #default="scope">
          <span>{{
            displayGoodsStatusText(scope.row.goodsSellStatus)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column header-align="center" align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="scope.row.goodsSellStatus === goodsSellStatus.OFF_SELL"
            @click="handleUpdateStatus(scope.row, goodsSellStatus.ON_SELL)"
            >上架</el-button
          >
          <el-button
            type="danger"
            v-if="scope.row.goodsSellStatus === goodsSellStatus.ON_SELL"
            @click="handleUpdateStatus(scope.row, goodsSellStatus.OFF_SELL)"
            >下架</el-button
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
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { fetchGoodsList, updateGoodsStatus } from '@/api/module-mgmt'
import {
  parseImgUrl,
  getOptionNameById,
} from '@/utils/index'
import { 
  goodsSellStatus,
  goodsSellStatusMap
} from './options';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'GoodsList',
  setup() {
    const router = useRouter()
    const state = reactive({
      list: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
    })
    onMounted(() => {
      getList()
    })
    const getList = () => {
      state.listLoading = true
      fetchGoodsList({
        pageNumber: state.listQuery.page,
        pageSize: state.listQuery.limit,
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
      router.push({ name: 'AddGoods' })
    }

    const handleEdit = (row) => {
      router.push({ name: 'EditGoods' })
    }

    // 上架和下架
    const handleUpdateStatus = (row, status) => {
      updateGoodsStatus({
        ids: [row.goodsId],
        status
      })
        .then(() => {
          ElMessage.success('修改成功')
          getList()
        })
    }
    const displayGoodsStatusText = (status) => {
      return goodsSellStatusMap[status] || ''
    }

    return {
      ...toRefs(state),
      handleAdd,
      handleEdit,
      handleUpdateStatus,
      parseImgUrl,
      getOptionNameById,
      goodsSellStatus,
      displayGoodsStatusText,
      getList
    }
  },
})
</script>
<style lang="scss" scoped>
.goods-img {
  display: inline-block;
  width: 100px;
  height: 100px;
}
</style>
