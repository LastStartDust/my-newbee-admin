import router from '@/router'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { useNProgress } from '@/plugins/nprogress'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const NProgress = useNProgress()
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
    // 开始显示进度条
    NProgress.start()
  
    // 设置网页标题
    document.title = getPageTitle(to.meta.title)
  
    // 获取登录的token
    const hasToken = getToken()
  
    if (hasToken) {
      if (to.path === '/login') {
        // 如果已经登录了，就重定向到首页
        next({ path: '/' })
        NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
          next()
        } else {
          try {
            // 获取用户信息
            // note: roles必须是一个数组，比如: ['admin'] or ,['developer','editor']
            const { roles } = await store.dispatch('user/getInfo')
            //通过roles生成可访问的路由
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
            // 添加动态可访问路由
            for (const item of accessRoutes) {
              router.addRoute(item)
            }
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            ElMessage.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  })
  
  router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })
  