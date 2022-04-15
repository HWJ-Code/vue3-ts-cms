<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="foldProp ? '65px' : '210px'">
        <nav-menu :isCollapse="foldProp"></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @foldChange="handlerFoldChange"></nav-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import navMenu from '@/components/nav-menu'
import navHeader from '@/components/nav-header'

export default defineComponent({
  components: {
    navMenu,
    navHeader
  },
  setup() {
    const foldProp = ref(false)
    const handlerFoldChange = (isFold: boolean) => {
      foldProp.value = isFold
    }
    return {
      foldProp,
      handlerFoldChange
    }
  }
})
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  width: 100%;
}
.main-container {
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    background: #0c2135;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-header {
    height: 50px;
    line-height: 50px;
  }

  .el-main {
    background: #f3f3f3;
  }
}
</style>
