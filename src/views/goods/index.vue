<template>
  <div class="app-container">
    <el-form ref="listQueryRef" :model="listQuery" :inline="true" label-width="68px">
      <el-form-item label="ID" prop="id">
        <el-input
          v-model="listQuery.id"
          placeholder="请输入ID"
          clearable
        />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="listQuery.title"
          placeholder="请输入标题"
          clearable
        />
      </el-form-item>
    </el-form>
    列表页
  </div>
</template>

<script>
// import { getGoods } from '@/api/goods'
import { defineComponent, ref, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'GoodsList',
  setup() {
    const state = reactive({
      list: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: ''
      }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
