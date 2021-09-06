<template>
  <div class='app-container'>
    
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import {
  updateUserName,
  updateUserPassword
} from '@/api/user'
import { toRefs } from '@vueuse/shared'

export default defineComponent({
  name: 'UpdateUser',
  setup(props, { attrs, slots, emit }) {
    const userInfoFormRef = ref(null)
    const passwordFormRef = ref(null)

    const state = reactive({
      userInfoForm: {
        loginUserName: '',
        nickName: ''
      },
      passwordForm: {
        originalPassword: '',
        newPassword: ''
      }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang='scss' scoped>
</style>