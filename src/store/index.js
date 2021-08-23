import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import user from './modules/user'

const modules = {
  app,
  permission,
  settings,
  tagsView,
  user
}

const store = createStore({
  modules,
  getters,
})

export default store
