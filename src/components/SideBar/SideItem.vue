<template>
  <div>
    <template v-if="hasChildren(item.children)">
      <el-submenu :index="`${item.path}`">
        <template #title>{{ item.title }}</template>

        <SideItem
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
          :is-nest="true"
        />
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item :index="`${item.path}`">{{ item.title }}</el-menu-item>
    </template>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import path from "path-browserify";

export default defineComponent({
  name: "SideItem",
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true,
    },
    // 是否嵌套
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  setup(props, ctx) {
    const hasChildren = (children = []) => {
      if (children && children.length > 0) {
        return true;
      }
      return false;
    };

    const resolvePath = (routePath) => {
      return path.resolve(props.basePath, routePath);
    };

    return {
      hasChildren,
      resolvePath
    };
  },
});
</script>

