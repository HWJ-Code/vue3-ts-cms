<template>
  <div class="login-phone">
    <el-form :model="phone">
      <el-form-item label="手机号:">
        <el-input v-model="phone.phoneNumber" />
      </el-form-item>
      <el-form-item label="验证码:">
        <div class="get-code">
          <el-input v-model="phone.verifyCode" />
          <el-button type="primary" class="get-code-btn" @click="getCode"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      phoneNumber: '',
      verifyCode: ''
    })
    const getCode = () => {
      console.log('获取验证码')
    }

    const loginAction = (isKeepPassword: boolean) => {
      console.log('手机登录逻辑~')
    }
    return {
      phone,
      getCode,
      loginAction
    }
  }
})
</script>

<style lang="scss" scoped>
.get-code {
  display: flex;
  .get-code-btn {
    margin-left: 5px;
  }
}
</style>
