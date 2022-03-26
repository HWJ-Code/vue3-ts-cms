<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-view></router-view>
    <el-button>按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <!-- 使用v-loading指令添加加载层 -->
    <!-- <el-table v-loading="loading"></el-table> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    let loading = ref(true)
    return {
      loading
    }
  }
})
</script>

<style lang="scss"></style>
