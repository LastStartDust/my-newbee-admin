<template>
  <el-upload
    class="avatar-uploader"
    :action="uploadImgServer"
    :accept="acceptSuffix.join(',')"
    :headers="{
      token: token,
    }"
    :show-file-list="false"
    :before-upload="handleBeforeUpload"
    :on-success="handleUrlSuccess"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    v-bind="$attrs"
  >
    <i v-if="!imgUrl" class="el-icon-plus avatar-uploader-icon" />
  </el-upload>

  <div v-if="imgUrl" class="image-preview image-app-preview">
    <div class="image-preview-wrapper">
      <img class="avatar" v-if="imgUrl" :src="imgUrl" />
      <div class="image-preview-action">
        <i class="el-icon-delete" @click="handleRemove" />
        <i class="el-icon-zoom-in" @click="handlePictureCardPreview" />
      </div>
    </div>
  </div>

  <ImagePreviewDialog :visible="dialogVisible" :img-url="imgUrl" @close="dialogVisible = false" />
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { uploadImgServer } from '@/utils/upload'
import { isEmpty } from '@/utils'
import { getToken } from '@/utils/auth'
import ImagePreviewDialog from './components/ImagePreview.vue'

export default defineComponent({
  name: 'SingleUpload',
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    // 可接收的图片后缀 如['jpg', 'png']
    acceptSuffix: {
      type: Array,
      default: () => {
        return ['jpg', 'jpeg', 'png']
      },
    },
  },
  emits: ['update:imgUrl'],
  components: {
    ImagePreviewDialog,
  },
  setup(props, { attrs, slots, emit }) {
    const state = reactive({
      token: getToken() || '',
      uploadImgServer,
      dialogVisible: false,
    })

    const handleBeforeUpload = (file) => {
      const suffix = file.name.slice(file.name.lastIndexOf('.') + 1)
      if (
        !isEmpty(props.acceptSuffix) &&
        !props.acceptSuffix.includes(suffix)
      ) {
        const acceptImageText = props.acceptSuffix.join('、')
        ElMessage.error(`请上传 ${acceptImageText} 格式的图片`)
        return false
      }
    }
    const handleUrlSuccess = (res) => {
      const url = res.data || ''
      emit('update:imgUrl', url)
    }
    const handleRemove = () => {
      emit('update:imgUrl', '')
    }
    const handlePictureCardPreview = (file) => {
      state.dialogVisible = true
    }

    return {
      ...toRefs(state),
      handleBeforeUpload,
      handleUrlSuccess,
      handleRemove,
      handlePictureCardPreview,
    }
  },
})
</script>
<style lang="scss" scoped>
$size: 120px;

.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: $size;
    height: $size;
    line-height: $size;
    text-align: center;
  }
  .avatar {
    width: $size;
    height: $size;
    display: block;
  }
}

.image-preview {
  width: $size;
  height: $size;
  position: relative;
  overflow: hidden;
  border: 1px dashed #8c939d;
  border-radius: 6px;

  .image-preview-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .image-preview-action {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    cursor: pointer;
    line-height: 200px;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
