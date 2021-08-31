<template>
  <el-dialog 
    :title="title"
    v-model="dialogVisible"
    destroy-on-close
    :before-close="handleCancel">
    <el-form :model="postForm" :rules="postFormRules" ref="postFormRef" label-width="100px">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input type="text" v-model="postForm.categoryName"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="categoryRank">
        <el-input type="number" v-model="postForm.categoryRank"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button :loading="loading" @click="handleCancel">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="submitForm"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>
<script>
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { cloneDeep } from 'lodash'
import { ElMessage } from 'element-plus'

import {
  createCategory,
  updateCategory,
  fetchCategory
} from '@/api/module-mgmt.js'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'CategoryDetailDialog',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: '',
    }
  },
  emits: ['reload'],
  setup(props, { attrs, slots, emit }) {
    const route = useRoute()
    const defaultForm = {
      categoryName: '',
      categoryRank: '',
      categoryLevel: '',
      parentId: '',
    }
    const postFormRef = ref(null)

    const state = reactive({
      dialogVisible: false,
      title: computed(() => {
        if (props.isEdit) {
          return '编辑分类'
        }
        return '添加分类'
      }),
      postForm: cloneDeep(defaultForm),
      postFormRules: {
        categoryName: [
          { required: 'true', message: '分类不能为空', trigger: ['blur'] },
          { max: 128, message: '分类名称不能超过128个字符', trigger: ['blur'] },
        ],
        categoryRank: [
          { required: 'true', message: '分类编号不能为空', trigger: ['blur'] },
        ]
      },
      loading: false,
    })

    const getDetail = (id) => {
      fetchCategory(id).then((res) => {
        state.postForm = Object.assign(state.postForm, res.data)
      })
    }

    const open = () => {
      state.dialogVisible = true
      nextTick(() => {
        if (props.isEdit) {
          getDetail(props.id)
        } else {
          const { level = 1, parent_id = 0 } = route.query
          state.postForm.categoryLevel = level
          state.postForm.parentId = parent_id
        }
      })
    }
    const emitClose = (isReload = false) => {
      state.dialogVisible = false
      state.postForm = cloneDeep(defaultForm)
      emit('reload', { isReload })
    }
    const handleCancel = () => {
      emitClose(false)
    }

    const submitForm = () => {
      postFormRef.value
        .validate()
        .then(() => {
          const postFormCopy = cloneDeep(state.postForm)
          let requestApi = ''
          if (props.isEdit) {
            postFormCopy.id = props.id
            requestApi = updateCategory
          } else {
            requestApi = createCategory
          }

          state.loading = true
          requestApi({
            ...postFormCopy
          })
            .then((res) => {
              ElMessage.success(`${props.isEdit ? '编辑成功' : '添加成功'}`)
              emitClose(true)
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

    return {
      submitForm,
      open,
      ...toRefs(state),
      postFormRef,
      emitClose,
      handleCancel
    }
  },
})
</script>
<style lang="scss" scoped></style>
