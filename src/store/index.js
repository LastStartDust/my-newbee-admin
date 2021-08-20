import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'

const modules = {
  app,
  permission,
  settings,
}

const store = createStore({
  modules,
  getters,
})

export default store
