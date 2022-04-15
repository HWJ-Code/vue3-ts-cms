<template>
  <div class="hh-form">
    <div class="form-header">
      <slot name="header"></slot>
    </div>
    <div class="form-content">
      <el-form :label-width="labelWidth">
        <el-row :gutter="20">
          <template v-for="item in formItems" :key="item.label">
            <el-col v-bind="formLayout">
              <el-form-item :label="item.label" :style="itemStyle">
                <template
                  v-if="item.type === 'input' || item.type === 'password'"
                >
                  <el-input
                    v-model="formData[`${item.field}`]"
                    :placeholder="item.placeholder"
                    :show-password="item.type === 'password'"
                  ></el-input>
                </template>
                <template v-if="item.type === 'select'">
                  <el-select
                    v-model="formData[`${item.field}`]"
                    :placeholder="item.placeholder"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="selectOption in item.options"
                      :key="selectOption.value"
                      :label="selectOption.label"
                      :value="selectOption.value"
                    ></el-option>
                  </el-select>
                </template>
                <template v-if="item.type === 'datepicker'">
                  <el-date-picker
                    v-model="formData[`${item.field}`]"
                    v-bind="item.otherOptions"
                    style="width: 100%"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity'
import { defineComponent, PropType, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    formLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = computed(() => props.modelValue) //表单组件项v-model的值
    console.log(props.modelValue)

    watch(
      () => formData,
      (forms) => {
        //实时监听表单修改并传到父级去（比如：form.vue -> page-search -> user.vue ）
        emit('update:modelValue', forms)
      },
      { deep: true }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped>
.hh-form {
  background: #fff;
  padding: 20px 20px 20px 0;
}
.form-footer {
  text-align: right;
}
</style>
