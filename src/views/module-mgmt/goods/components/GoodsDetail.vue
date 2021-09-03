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
      <el-cascader v-model="selectCategoryId" :props="cascaderProps" :placeholder="defaultCate || '请选择商品分类'"></el-cascader>
    </el-form-item>
    <el-form-item label="商品名称" prop="goodsName" class="w300">
      <el-input v-model="postForm.goodsName" placeholder="请输入商品名称" class="w300"></el-input>
    </el-form-item>
    <el-form-item label="商品简介" prop="goodsIntro">
      <el-input v-model="postForm.goodsIntro" placeholder="请输入商品简介" class="w300"></el-input>
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
    <el-form-item label="详情内容">
      <div ref='editorRef'></div>
    </el-form-item>

    <el-form-item>
      <el-button :loading="loading" type="primary" @click="handleSumbit">提 交</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </el-form-item>

    </el-form>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, computed, onMounted, onBeforeMount } from 'vue'
import { cloneDeep } from 'lodash'
import { goodsSellStatus } from '../options'
import { createGoods, fetchCategories, fetchGoods, updateGoods } from '@/api/module-mgmt'
import { isEmpty, parseImgUrl } from '@/utils'
import SingleUpload from '@/components/SingleUpload/index.vue'
import WangEditor from 'wangeditor'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { uploadImgServer } from '@/utils/upload'
import { getToken } from '@/utils/auth'

export default defineComponent({
  name: 'GoodsDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    SingleUpload
  },
  setup(props) {
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
      id: '',
      postForm: cloneDeep(defaultPostForm),
      postFormRules: {
        goodsCategoryId: [
          { required: 'true', message: '请选择商品分类', trigger: ['change'] },
        ],
        goodsName: [
          { required: 'true', message: '请输入商品名称', trigger: ['blur'] },
        ],
        goodsIntro: [
          { required: 'true', message: '请输入商品简介', trigger: ['blur'] },
        ],
        originalPrice: [
          { required: 'true', message: '请输入商品原价', trigger: ['blur'] },
        ],
        sellingPrice: [
          { required: 'true', message: '请输入商品售价', trigger: ['blur'] },
        ],
        stockNum: [
          { required: 'true', message: '请输入商品库存', trigger: ['blur'] },
        ],
        tag: [
          { required: 'true', message: '请输入商品标签', trigger: ['blur'] },
        ],
        goodsCoverImg: [
          { required: 'true', message: '请上传商品主图', trigger: ['blur, change'] },
        ],
      },
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
      loading: false,
      defaultCate: ''
    })

    const editorRef = ref(null)
    let editorInstance = null
    const route = useRoute()
    onMounted(() => {
      initEditor()
      if(props.isEdit) {
        state.id = +route.query.id
        
        if(state.id) {
          fetchGoods(state.id)
            .then(res => {
              const { goods, firstCategory, secondCategory, thirdCategory } = res.data
              Object.keys(state.postForm).map(key => {
                const currentValue = goods[key]
                if(key === 'goodsSellStatus') {
                  state.postForm[key] = `${currentValue}`
                } else if(key === 'goodsCoverImg') {
                  state.postForm[key] = parseImgUrl(currentValue)
                } else if(key === 'goodsDetailContent') {
                  state.postForm[key] = currentValue
                  if(editorInstance) {
                    // 初始化商品详情 html
                    editorInstance.txt.html(currentValue)
                  }
                }
                else {
                  state.postForm[key] = currentValue
                }
              })
              
              state.defaultCate = `${firstCategory.categoryName}/${secondCategory.categoryName}/${thirdCategory.categoryName}`
            })

        }
      }
    })
    onBeforeMount(() => {
      if(editorInstance) {
        editorInstance.destroy()
        editorInstance = null
      }
    })

    const initEditor = () => {
      editorInstance = new WangEditor(editorRef.value) // 初始化 wangEditor
      Object.assign(editorInstance.config, {
        showLinkImg: false,
        showLinkImgAlt: false,
        showLinkImgHref: false,
        uploadImgMaxSize: 2 * 1024 * 1024, // 最大上传大小 2M 
        uploadFileName: 'file', // 上传时，key 值自定义
        uploadImgHeaders: {
          token: getToken() || '' // 添加 token，否则没有权限调用上传接口
        },
        uploadImgServer, // 上传接口地址配置
        // 图片返回格式不同，需要自定义返回格式
        uploadImgHooks: {
          // 主要用于回显
          // 图片上传并返回了结果，想要自己把图片插入到编辑器中
          // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
          customInsert: function(insertImgFn, result) {
            console.log('result', result)
            // result 即服务端返回的接口
            // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            if(result.data) {
              if(Array.isArray(result.data)) {
                // 数组循环插入
                result.data.forEach(item => insertImgFn(item))
              } else {
                // 单个插入
                insertImgFn(result.data)
              }
            }
          }
        },
        onchange() {
          console.log('change')
        }
      })

      editorInstance.create()
    }

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

    const router = useRouter()
    const handleSumbit = () => {
      postFormRef.value
        .validate()
        .then(() => {
          const postFormCopy = cloneDeep(state.postForm)
          postFormCopy.goodsDetailContent = editorInstance.txt.html()
          let requestApi = createGoods
          if(props.isEdit) {
            requestApi = updateGoods
            postFormCopy.goodsId = state.id
          }

          state.loading = true
          requestApi(postFormCopy)
            .then((res) => {
              ElMessage.success(`${props.isEdit ? '编辑成功' : '添加成功'}`)
              router.push({ name: 'GoodsList' })
            })
            .finally(() => {
              state.loading = false
            })
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    }

    const handleCancel = () => {
      router.back()
    }

    return {
      ...toRefs(state),
      postFormRef,
      goodsSellStatus,
      selectCategoryId,
      editorRef,
      handleSumbit,
      handleCancel
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
