<template>
  <div>
    <div style="margin-bottom:15px;">
      当前拥有的角色: {{ roles }}
    </div>
    
    切换角色:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SwitchRoles',
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    const store = useStore()
    const roles = computed(() => store.getters.roles)
    const switchRoles = computed({
      get() {
        return roles.value[0]
      },
      set(val) {
        store.dispatch('user/changeRoles', val).then(() => {
          emit('change')
        })
      }
    })

    return {
      roles,
      switchRoles
    };
  }
})
</script>
<style lang='scss' scoped>
</style>