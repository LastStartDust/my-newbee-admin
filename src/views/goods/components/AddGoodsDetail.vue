<template>
  <div class="app-container">
    <div>是否出于编辑状态：{{ isEdit }}</div>
    <el-form ref="postFormRef" :model="postForm" :rules="postFormRules" label-width="120px" label-suffix="：">
    <el-form-item label="标题" prop="title">
        <el-input v-model="postForm.title" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="postForm.price" />
      </el-form-item>
      <el-form-item label="大小">
        <el-select v-model="postForm.size" placeholder="请输入大小">
          <el-option
            v-for="item in sizeStatusOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';

const defaultPostForm = {
  title: '',
  price: 0,
  size: ''
}

export default defineComponent({
  name: 'EditGoodsDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const postForm = reactive(defaultPostForm)
    const postFormRules = reactive({})
    const postFormRef = ref(null)
    const sizeStatusOptions = reactive([
      {
        id: 1,
        name: 'big',
      },
      {
        id: 2,
        name: 'medium',
      },
      {
        id: 3,
        name: 'small',
      }
    ])
    return {
      postForm,
      postFormRules,
      postFormRef,
      sizeStatusOptions
    }
  }
})
</script>
