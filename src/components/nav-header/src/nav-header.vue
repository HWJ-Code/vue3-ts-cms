<template>
  <div class="nav-header">
    <div class="nav-left">
      <el-icon class="fold-icon" @click="changeFold">
        <component :is="isFold ? 'expand' : 'fold'"></component>
      </el-icon>
    </div>
    <div class="nav-right"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const changeFold = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      changeFold
    }
  }
})
</script>

<style scoped lang="scss">
.flex-row {
  display: flex;
  align-items: center;
}
.nav-header {
  @extend .flex-row;
  justify-content: space-between;
  height: 100%;
  line-height: 100%;
  width: 100%;

  .nav-left {
    @extend .flex-row;
    .fold-icon {
      font-size: 26px;
      cursor: pointer;
      margin-right: 10px;
    }
  }

  .nav-right {
  }
}
</style>
