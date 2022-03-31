<template>
  <div class="login-panel">
    <h2 class="title">标题标题标题</h2>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="login-tab-title">
            <el-icon class="el-icon"><user-filled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="login-tab-title">
            <el-icon class="el-icon"><iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="login-handler">
      <el-checkbox v-model="isKeepPassword" label="记住密码" />
      <el-link type="primary">忘记密码?</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="toLogin"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account') //当前点击的选项卡，与el-tab-pane的name对应

    //登录逻辑 -- 放到各自的组件中执行
    const toLogin = () => {
      if (currentTab.value == 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginAction(isKeepPassword.value)
      }
    }

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      toLogin
    }
  }
})
</script>

<style lang="scss" scoped>
.login-panel {
  width: 320px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .login-tab-title {
    display: flex;
    align-items: center;
    justify-content: center;

    .el-icon {
      margin-right: 5px;
    }
  }

  .login-handler {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
