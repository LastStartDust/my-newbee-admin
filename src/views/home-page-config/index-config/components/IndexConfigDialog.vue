<template>
  <el-dialog 
    :title="title"
    v-model="dialogVisible"
    destroy-on-close
    :before-close="handleCancel">
    <el-form :model="postForm" :rules="postFormRules" ref="postFormRef" label-width="100px">
      <el-form-item label="商品名称" prop="configName">
        <el-input type="text" v-model="postForm.configName"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="redirectUrl">
        <el-input type="text" v-model="postForm.redirectUrl"></el-input>
      </el-form-item>
      <el-form-item label="商品编号" prop="goodsId">
        <el-input type="number" v-model="postForm.goodsId"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="configRank">
        <el-input type="number" v-model="postForm.configRank"></el-input>
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
  createIndexConfig,
  updateIndexConfig,
  fetchIndexConfig,
} from '@/api/home-page-config'

export default defineComponent({
  name: 'AddSwiperDialog',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: '',
    },
    configType: {
      type: Number,
      required: true,
    }
  },
  emits: ['reload'],
  setup(props, { attrs, slots, emit }) {
    const defaultForm = {
      configName: '',
      redirectUrl: '',
      goodsId: '',
      configRank: '',
    }
    const postFormRef = ref(null)
    const state = reactive({
      dialogVisible: false,
      title: computed(() => {
        if (props.isEdit) {
          return '编辑商品'
        }
        return '添加商品'
      }),
      postForm: cloneDeep(defaultForm),
      postFormRules: {
        configName: [
          { required: 'true', message: '商品不能为空', trigger: ['blur'] },
        ],
        goodsId: [
          { required: 'true', message: '商品编号不能为空', trigger: ['blur'] },
        ],
        configRank: [
          { required: 'true', message: '排序不能为空', trigger: ['blur'] },
        ],
      },
      loading: false,
    })

    const getDetail = (id) => {
      fetchIndexConfig(id).then((res) => {
        state.postForm = Object.assign(state.postForm, res.data)
      })
    }

    const open = () => {
      state.dialogVisible = true
      nextTick(() => {
        if (props.isEdit) {
          getDetail(props.id)
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
            requestApi = updateIndexConfig
          } else {
            requestApi = createIndexConfig
          }

          state.loading = true
          requestApi({
            configType: props.configType,
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
