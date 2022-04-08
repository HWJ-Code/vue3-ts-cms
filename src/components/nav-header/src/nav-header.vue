<template>
  <div class="nav-header">
    <el-icon class="fold-icon" @click="changeFold">
      <component :is="isFold ? 'expand' : 'fold'"></component>
    </el-icon>
    <div class="nav-content">
      <breadcrumb :breadcrumbs="currentRouteMenuPath"></breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { pathMapBreadcrumbs } from '@/utils/map-menus'

import breadcrumb from '@/base-ui/breadcrumb/src/breadcrumb.vue'
import userInfo from './user-info.vue'

export default defineComponent({
  components: { breadcrumb, userInfo },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const changeFold = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //当前面包屑数据 [{name: , path: }]
    const currentRouteMenuPath = computed(() => {
      const store = useStore()
      const route = useRoute()
      return pathMapBreadcrumbs(store.state.login.userMenus, route.path)
    })

    return {
      isFold,
      changeFold,
      currentRouteMenuPath
    }
  }
})
</script>

<style scoped lang="scss">
.flex-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-header {
  @extend .flex-row;
  height: 100%;
  line-height: 100%;
  width: 100%;

  .fold-icon {
    font-size: 26px;
    cursor: pointer;
    margin-right: 10px;
  }

  .nav-content {
    @extend .flex-row;
    flex: 1;
  }
}
</style>
