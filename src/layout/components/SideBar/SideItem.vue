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
          <i :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          <template #title>
            <span>{{ (onlyOneChild.meta.title) }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :ref="subMenuRef" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <i :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <side-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import path from "path-browserify";
import AppLink from './Link.vue';

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
  components: { AppLink },
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
<style lang="scss" scoped>
    // menu hover
    // .submenu-title-noDropdown {
    //   &:hover {
    //     background-color: $menuHover !important;
    //   }
    //   background: $menuBg;
    // }

    // .is-active.submenu-title-noDropdown {
    //   color: $subMenuActiveText !important;
    //   i {
    //     color: $subMenuActiveText !important;
    //   }
    // }
</style>
