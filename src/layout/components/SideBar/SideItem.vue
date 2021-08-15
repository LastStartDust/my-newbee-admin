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
          <MenuItem 
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :ref="subMenuRef" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <MenuItem v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
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
import MenuItem from './Item.vue';

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
  components: { AppLink, MenuItem },
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
