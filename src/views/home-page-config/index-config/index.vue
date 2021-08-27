<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="activeTab" @change="handleTabsChange">
      <el-tab-pane
        v-for="tabItem in tabs"
        :key="`${tabItem.name}`"
        :name="tabItem.name"
        lazy
      >
        <template #label>
          <span>
            <i :class="tabItem.icon"></i>
            {{ tabItem.title }}
          </span>
        </template>

        <IndexConfigList :type="+tabItem.name"></IndexConfigList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { configType, configTypeOptions } from './options'
import IndexConfigList from './components/List.vue'

export default defineComponent({
  name: 'IndexConfig',
  components: { IndexConfigList },
  setup(props, { attrs, slots, emit }) {
    const tabs = [
      {
        name: `${configType.HOT}`,
        title: '热销商品配置',
        icon: 'el-icon-star-on',
      },
      {
        name: `${configType.NEW}`,
        title: '新品上线配置',
        icon: 'el-icon-sell',
      },
      {
        name: `${configType.RECOMMEND}`,
        title: '为你推荐配置',
        icon: 'el-icon-thumb',
      },
    ]

    const state = reactive({
      activeTab: `${configType.HOT}`,
    })
    const handleTabsChange = (v) => {
      console.log(v)
    }

    return {
      configType,
      tabs,
      ...toRefs(state),
      handleTabsChange,
    }
  },
})
</script>
<style lang="scss" scoped></style>
