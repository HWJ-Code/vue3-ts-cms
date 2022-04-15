<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      :formData="formData"
    ></page-search>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import pageSearch from '@/components/page-search'
import { searchFormConfig } from './config/searchFormConfig'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch
  },
  setup() {
    //表单默认值 传到page-search.vue中再传到form.vue（搜索请求在page-search中操作）
    const formData = ref({
      name: '管理员',
      username: 'admin',
      password: '123456',
      name2: '测试测试名字',
      select: 3,
      date: ['2022-10-10', '2022-12-10'],
      datetime: ['2022-01-01 10:10:20', '2022-03-03:20:21:30']
    })

    return { searchFormConfig, formData }
  }
})
</script>

<style scoped lang="scss"></style>
