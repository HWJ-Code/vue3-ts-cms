<template>
  <div class="nav-menu">
    <div class="nav-title">
      <img src="~assets/img/logo.svg" class="logo" alt="" />
      <span v-if="!isCollapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="currentMenuId"
      :collapse="isCollapse"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <!-- 有children的一级菜单 -->
          <el-sub-menu :index="item.id + ''">
            <!-- 一级菜单标题 需要用插槽 -->
            <template #title>
              <el-icon v-if="item.icon" :class="item.icon">
                <!-- 动态icon组件 -->
                <component :is="splitIcon(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历二级菜单 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="subItemClick(subItem)"
              >
                <!-- 二级菜单标题 -->
                <el-icon v-if="subItem.icon" :class="subItem.icon">
                  <!-- 动态icon组件 -->
                  <component :is="splitIcon(subItem.icon)"></component>
                </el-icon>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <!-- 没有children的一级菜单 -->
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon" :class="item.icon">
              <!-- 动态icon组件 -->
              <component :is="splitIcon(item.icon)"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { getMenuByRoute } from '@/utils/map-menus'
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    //对菜单中的icon进行处理 因为返回的数据是el-icon-xx 但是el-icon需要引入对应组件 所以用动态组件来实现
    const splitIcon = computed(() => {
      return function (icon: string) {
        return icon.split('el-icon-')[1]
      }
    })

    const router = useRouter()
    const route = useRoute()

    //当前路由对应的id（使用computed 例如直接在导航栏改变路径时 currentMenuId要相应改变）
    const currentMenuId = computed(() => {
      const currentMenu = getMenuByRoute(userMenus.value, route.path)
      return currentMenu ? currentMenu.id + '' : ''
    })

    //点击菜单显示对应路由
    const subItemClick = (subItem: any) => {
      router.push({
        path: subItem.url ?? '/not-found'
      })
    }

    return { userMenus, splitIcon, currentMenuId, subItemClick }
  }
})
</script>

<style scoped lang="scss">
.nav-menu {
  height: 100%;
  width: 100%;
  .nav-title {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    .logo {
      width: 28px;
      height: 30px;
      margin-right: 10px;
    }
    .title {
      color: #fff;
      font-weight: 700;
    }
  }
  .el-menu {
    border-right: 0;
    .el-menu-item:hover {
      color: #fff;
      background-color: #1c3146;
    }
    .el-sub-menu .el-menu-item {
      padding-left: 50px !important;
      background-color: #15293c;
    }
    .el-menu-item.is-active {
      color: #fff;
      background: #0a60bd;
    }
  }
}

// 激活菜单一级图标颜色
.el-menu--collapse .el-sub-menu.is-active i {
  color: var(--el-color-primary);
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
