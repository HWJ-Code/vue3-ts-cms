<template>
  <div class="page-search">
    <!-- modelValue+@update:modelValue = v-model -->
    <hh-form v-bind="searchFormConfig" v-model="formDataValues">
      <template #footer>
        <el-button-group>
          <el-button type="primary" @click="searchTb">
            <el-icon><Search /></el-icon>搜索
          </el-button>
          <el-button type="default">
            <el-icon><RefreshLeft /></el-icon>重置
          </el-button>
        </el-button-group>
      </template>
    </hh-form>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import hhForm from '@/base-ui/form'
const props = defineProps({
  searchFormConfig: {
    //表单组件项
    type: Object,
    required: true
  },
  formData: {
    //默认值
    type: Object,
    default: () => {}
  }
})

//v-model 不能直接绑定通过props传进来的数据（单向数据流原则），使用computed做个转换 -> 使用props.formData
const formDataValues = computed(() => props.formData)

//formData如果被修改，@update:model-value可以实时监听，如果pageSearch的父组件也想实时监听，可以通过emit传到父组件
// const emits = defineEmits(['changeForm'])
// const changeForm = (forms: any) => {
//   // emits('changeForm', forms)
// }

//搜索按钮--发送数据请求->通过action
const searchTb = () => {
  console.log(formDataValues)
}
</script>

<style scoped></style>
