<template>
  <div class="app-container">
    <el-form
      ref="usernameFormRef"
      :model="usernameForm"
      :rules="usernameFormRules"
      label-width="80px"
      label-suffix="："
    >
      <el-form-item label="登录名" prop="loginUserName">
        <el-input
          v-model="usernameForm.loginUserName"
          class="w300"
          placeholder="请输入登录名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          v-model="usernameForm.nickName"
          class="w300"
          placeholder="请输入昵称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="handleUpdateUser"
          v-loading="loading"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>

    <el-form
      class="mt15"
      ref="passwordFormRef"
      :model="passwordForm"
      :rules="passwordFormRules"
      label-width="80px"
      label-suffix="："
    >
      <el-form-item label="原密码" prop="originalPassword">
        <el-input
          v-model="passwordForm.originalPassword"
          class="w300"
          show-password
          placeholder="请输入原密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="passwordForm.newPassword"
          class="w300"
          show-password
          placeholder="请输入新密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="handleUpdatePwd"
          v-loading="pwdLoading"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import { updateUserName, updateUserPassword } from '@/api/user'
import { cloneDeep } from 'lodash'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'UpdateUser',
  setup(props, { attrs, slots, emit }) {
    const store = useStore()
    const userInfo = computed(() => store.state.user.userInfo)
    const usernameFormRef = ref(null)
    const passwordFormRef = ref(null)

    const state = reactive({
      usernameForm: {
        loginUserName: userInfo.value.loginUserName,
        nickName: userInfo.value.nickName,
      },
      usernameFormRules: {
        loginUserName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
        ],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
      },
      passwordForm: {
        originalPassword: '',
        newPassword: '',
      },
      passwordFormRules: {
        originalPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
      },
      loading: false,
      pwdLoading: false,
    })

    const handleUpdateUser = () => {
      usernameFormRef.value
        .validate()
        .then(() => {
          const userInfoFormCopy = cloneDeep(state.usernameForm)
          state.loading = true
          updateUserName(userInfoFormCopy)
            .then(() => {
              ElMessage.success('修改用户信息成功')
              // 刷新整个页面，重新获取用户信息
              window.location.reload()
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
    const handleUpdatePwd = () => {
      passwordFormRef.value
        .validate()
        .then(() => {
          const passwordFormCopy = cloneDeep(state.passwordForm)
          state.pwdLoading = true
          updateUserPassword(passwordFormCopy)
            .then(() => {
              ElMessage.success('修改密码成功')
              window.location.reload()
            })
            .finally(() => {
              state.pwdLoading = false
            })
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    }
    return {
      ...toRefs(state),
      usernameFormRef,
      passwordFormRef,
      handleUpdateUser,
      handleUpdatePwd,
    }
  },
})
</script>
<style lang="scss" scoped>
.w300 {
  width: 300px;
}
</style>
