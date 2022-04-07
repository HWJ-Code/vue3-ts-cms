<template>
  <div class="login-account">
    <el-form :model="account" :rules="rules" ref="formRef">
      <!-- prop 在需要进行表单验证时，prop必传 -->
      <el-form-item label="账号:" prop="user_name">
        <el-input v-model="account.user_name" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="account.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from '@/store'
import { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const account = reactive({
      user_name: localCache.getCache('user_name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const store = useStore()

    //表单校验
    const formRef = ref<InstanceType<typeof ElForm>>()

    //isKeepPassword是否记住密码
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((isValid) => {
        //表单验证通过--真正的登录逻辑
        if (isValid) {
          //保存用户名
          localCache.setCache('user_name', account.user_name)
          //判断是否记住密码
          if (isKeepPassword) {
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('password')
          }

          //进行登录验证
          store.dispatch('login/accountLoginAction', {
            name: account.user_name,
            password: account.password
          })
        }
      })
    }
    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style lang="scss" scoped></style>
