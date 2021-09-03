<template>
  <div class="app-container">
    <el-form
      ref="postFormRef"
      :model="postForm"
      :rules="postFormRules"
      label-width="120px"
      label-suffix="："
    >
    <el-form-item label="商品分类" prop="goodsCategoryId">
      <el-cascader v-model="selectCategoryId" :props="cascaderProps"></el-cascader>
    </el-form-item>
    <el-form-item label="商品名称" prop="goodsName" class="w300">
      <el-input v-model="postForm.goodsName" placeholder="请输入商品名称" class="w300"></el-input>
    </el-form-item>
    <el-form-item label="商品简洁" prop="goodsIntro">
      <el-input v-model="postForm.goodsIntro" placeholder="请输入商品简洁" class="w300"></el-input>
    </el-form-item>
    <el-form-item label="商品原价" prop="originalPrice">
      <el-input v-model.number="postForm.originalPrice" placeholder="请输入商品原价" type="number" class="w300"></el-input>
    </el-form-item>
    <el-form-item label="商品售卖价" prop="sellingPrice">
      <el-input v-model.number="postForm.sellingPrice" placeholder="请输入商品售卖价" type="number" class="w300"></el-input>
    </el-form-item>
    <el-form-item label="商品库存" prop="stockNum">
      <el-input v-model.number="postForm.stockNum" placeholder="请输入商品库存" type="number" class="w300"></el-input>
    </el-form-item>
    <el-form-item label="商品标签" prop="tag">
      <el-input v-model="postForm.tag" placeholder="请输入商品标签" class="w300"></el-input>
    </el-form-item>
    <el-form-item label="上架状态" prop="goodsSellStatus">
      <el-radio-group v-model="postForm.goodsSellStatus" size="medium">
        <el-radio-button :label="goodsSellStatus.ON_SELL">上架</el-radio-button>
        <el-radio-button :label="goodsSellStatus.OFF_SELL">下架</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="商品主图" prop="goodsCoverImg">
      <SingleUpload v-model:imgUrl="postForm.goodsCoverImg"></SingleUpload>
    </el-form-item>

    </el-form>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { cloneDeep } from 'lodash'
import { goodsSellStatus } from '../options'
import { fetchCategories } from '@/api/module-mgmt';
import { isEmpty } from '@/utils'
import SingleUpload from '@/components/SingleUpload/index.vue';

export default defineComponent({
  name: 'GoodsDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [Number, String],
      default: '',
    },
  },
  components: {
    SingleUpload
  },
  setup() {
    const postFormRef = ref(null)
    const defaultPostForm = {
      goodsCategoryId: '',
      goodsName: '',
      goodsIntro: '',
      originalPrice: '',
      sellingPrice: '',
      stockNum: '',
      tag: '',
      goodsSellStatus: goodsSellStatus.ON_SELL,
      goodsCoverImg: '',
      goodsDetailContent: '',
    }
    const state = reactive({
      postForm: cloneDeep(defaultPostForm),
      postFormRules: {},
      // 动态加载，具体用法参考https://element-plus.org/#/zh-CN/component/cascader
      cascaderProps: {
        lazy: true,
        // node当前点击的节点，resolve为数据加载完成的回调
        lazyLoad(node, resolve) {
          const { level = 0, value } = node
          fetchCategories({
            pageNumber: 1,
            pageSize: 1000,
            categoryLevel: level + 1,
            parentId: value || 0
          }).then(res => {
            const list = res.data.list
            const nodes = list.map(item => {
              return {
                value: item.categoryId,
                label: item.categoryName,
                // 是否为叶子节点的标志位
                leaf: level > 1
              }
            })
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          })
        },
      },

    })

    // 已选分类
    const selectCategoryId = computed({
      set(val) {
        if(!isEmpty(val)) {
          // 获取最后一个值
          const categoryId = val[val.length - 1]
          state.postForm.goodsCategoryId = categoryId || ''
        }
      },
      get() {
        return state.postForm.goodsCategoryId
      }
    })

    return {
      ...toRefs(state),
      postFormRef,
      goodsSellStatus,

      selectCategoryId
    }
  },
})
</script>
<style lang="scss" scoped>
.w300 {
  width: 300px;
}
:deep(.el-cascader) {
  width: 300px;
}
</style>
