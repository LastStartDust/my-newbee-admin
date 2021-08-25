<template>
  <div class="login-container-wrapper">
    <div class="login">
      <el-form
        :model="postForm"
        :rules="postFormRules"
        ref="postFormRef"
        class="post-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="postForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            show-password
            v-model="postForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" class="login-btn" type="primary" @click="handleLogin"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { validUsername } from '@/utils/validate'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'

export default defineComponent({
  name: 'Login',
  setup(props, { attrs, slots, emit }) {
    // const { title } = toRefs(props)
    const postForm = reactive({
      username: 'admin',
      password: 'admin',
    })
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的账户'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度至少6位数'))
      } else {
        callback()
      }
    }
    const postFormRules = reactive({
      username: [
        { required: true, message: '账户不能为空', trigger: 'blur'},
        { required: true, trigger: 'blur', validator: validateUsername }
      ],
      password: [
        { required: 'true', message: '密码不能为空', trigger: 'blur' },
        { required: true, validator: validatePassword, trigger: 'blur' }
      ],
    })
    const postFormRef = ref(null)
    const loading = ref(false)
    const redirect = ref(undefined)
    const store = useStore()
    const router = useRouter()

    const handleLogin = () => {
      postFormRef.value.validate((valid) => {
        if (valid) {
          loading.value = true
          const { username, password } = postForm
          store
            .dispatch('user/login', {
              userName: username,
              passwordMd5: md5(password)
            })
            .then(() => {
              ElMessage.success('登录成功')
              router.push({ path: redirect.value || '/' })
            })
            .finally(() => {
              loading.value = false
            })
        } else {
          console.log('登录失败！')
          return false
        }
      })
    }

    const route = useRoute()
    watch(
      () => route.path,
      (newRoute) => {
        redirect.value = newRoute.query && newRoute.query.redirect
      },
      { immediate: true }
    )
    return {
      postForm,
      postFormRules,
      postFormRef,
      handleLogin,
      loading
    }
  },
})
</script>
<style lang="scss" scoped>
.login-container-wrapper {
  display: flex;
  margin: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background: url('@/assets/bg.png') no-repeat center;
  background-size: cover;

  .login {
    width: 550px;
    height: 300px;
    position: absolute;
    border-radius: 20px;
    right: 10vw;
    top: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to bottom,
      rgb(162 166 181 / 5%) 0%,
      rgb(160 175 184 / 25%) 50%,
      rgb(162 184 188 / 24%) 100%
    );
    box-shadow: 20px 20px 40px -6px rgb(0 0 0 / 20%);

    @media screen and (max-width: 750px) {
      width: 70vw;
      min-width: 280px;
      right: 10vw;
      top: 22vh;
    }
    .post-form {
      width: 76%;
      .login-btn {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
