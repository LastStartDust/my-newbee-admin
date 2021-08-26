<template>
  <el-dialog :title="title" v-model="dialogVisible">
    <el-form :model="postForm" :rules="postFormRules" ref="postFormRef">
      <el-form-item label="图片" prop="url">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgServer"
          :accept="acceptImages.join(',')"
          :headers="{
            token: token,
          }"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :on-success="handleUrlSuccess"
        >
          <img
            style="width: 200px; height: 100px; border: 1px solid #e9e9e9"
            v-if="postForm.url"
            :src="postForm.url"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input type="text" v-model="postForm.link"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input type="number" v-model="postForm.sort"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button :loading="loading" @click="close"
        >取 消</el-button
      >
      <el-button :loading="loading" type="primary" @click="submitForm"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>
<script>
import { computed, defineComponent, reactive, readonly, ref, toRefs } from 'vue'
import { cloneDeep } from 'lodash'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import { uploadImgServer } from '@/utils/upload'
import {
  createCarousel,
  updateCarousel,
  fetchCarousel,
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
  },
  emits: ['reload'],
  setup(props, { attrs, slots, emit }) {
    const defaultForm = readonly({
      url: '',
      link: '',
      sort: '',
    })
    const postFormRef = ref(null)

    const state = reactive({
      dialogVisible: false,
      title: computed(() => {
        if (props.isEdit) {
          return '编辑轮播图'
        }
        return '添加轮播图'
      }),
      postForm: cloneDeep(defaultForm),
      postFormRules: {
        url: [{ required: 'true', message: '图片不能为空', trigger: ['change'] }],
        sort: [
          { required: 'true', message: '排序不能为空', trigger: ['change'] },
        ],
      },
      acceptImages: ['jpg', 'jpeg', 'png'],
      loading: false
    })

    const handleBeforeUpload = (file) => {
      const suffix = file.name.slice(file.name.lastIndexOf('.') + 1)
      if (!state.acceptImages.includes(suffix)) {
        ElMessage.error('请上传 jpg、jpeg、png 格式的图片')
        return false
      }
    }

    const handleUrlSuccess = (res) => {
      state.postForm.url = res.data || ''
    }

    const getDetail = (id) => {
      fetchCarousel(id).then((res) => {
        Object.assign(state.postForm, res.data || {})
      })
    }

    const open = () => {
      state.dialogVisible = true
      if (props.isEdit) {
        getDetail(props.id)
      }
    }
    const close = () => {
      state.dialogVisible = false
      state.postForm = cloneDeep(defaultForm)
    }

    const submitForm = () => {
      postFormRef.value.validate((valid) => {
        if (valid) {
          const postFormCopy = cloneDeep(state.postForm)
          let requestApi = ''
          if (props.isEdit) {
            postFormCopy.id = props.id
            requestApi = updateCarousel
          } else {
            requestApi = createCarousel
          }

          satate.loading = true
          requestApi(postFormCopy)
            .then((res) => {
              ElMessage.success(`${props.isEdit ? '编辑成功' : '添加成功'}`)
              state.visible = false
              emit('reload')
            }).catch(err => {
              console.log(err);
            })
            .finally(() => {
              satate.loading = false
            })
        } else {
          console.log('提交失败！')
          return false
        }
      })
    }

    return {
      uploadImgServer,
      token: getToken() || '',
      handleBeforeUpload,
      handleUrlSuccess,
      submitForm,
      open,
      close,
      ...toRefs(state),
      postFormRef
    }
  },
})
</script>
<style lang="scss" scoped></style>
