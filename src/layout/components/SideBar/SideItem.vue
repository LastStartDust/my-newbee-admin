<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      ">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <MenuItemIcon :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          <template #title>
            <MenuItemTitle :title="onlyOneChild.meta.title" />
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else :ref="subMenuRef" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <template v-if="item.meta">
          <MenuItemIcon :icon="item.meta.icon" />
          <MenuItemTitle :title="item.meta.title" />
        </template>
      </template>
      <side-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import path from "path-browserify";
import AppLink from './Link.vue';
import MenuItemIcon from './MenuItemIcon.vue'
import MenuItemTitle from './MenuItemTitle.vue'

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
  components: { 
    AppLink,
    MenuItemIcon,
    MenuItemTitle
  },
  setup(props, ctx) {

    const subMenuRef = ref(null)
    const onlyOneChild = ref({})

    const hasOneShowingChild = (children= [], parent) => {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          onlyOneChild.value = item;
          return true;
        }
      });

      if (showingChildren.length === 1) {
        return true;
      }

      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    }

    const resolvePath = (routePath) => {
      return path.resolve(props.basePath, routePath);
    };

    return { 
      hasOneShowingChild,
      resolvePath,
      onlyOneChild,
      subMenuRef
    };
  }
});
</script>
