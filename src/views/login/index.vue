<script setup>
import { ref, reactive } from 'vue'
import { lStorage } from '@/utils/cache'
import { login } from '@/api/auth'
import { setToken } from '@/utils/token'
import { useRouter } from 'vue-router'
const router = useRouter()
const title = import.meta.env.VITE_APP_TITLE

const userInfo = reactive({
  name: 'admin',
  password: '12345',
})

iniLoginInfo()
/* 判断本地是否保存有登陆信息 */
function iniLoginInfo() {
  const localLoginInfo = lStorage.get('loginInfo')
  if (localLoginInfo) {
    userInfo.name = localLoginInfo.name || ''
    userInfo.password = localLoginInfo.password || ''
  }
}
// 记住密码
const isRemember = ref(false)
const handleLogin = async () => {
  const { name, password } = userInfo
  if (!name || !password) {
    $naive.message.warning('请用户输入账户和密码')
    return
  }
  try {
    const res = await login({ name, password: password.toString() })
    if (res.code === 0) {
      $naive.message.success('登录成功')
      setToken(res.data.token)
      // 保存账号密码到本地
      if (isRemember.value) {
        lStorage.setToken('loginInfo', { name, password })
      } else {
        lStorage.remove('loginInfo')
      }

      // 跳转到首页
      router.push({ path: '/' })
    } else {
      $naive.message.warning(res.message)
    }
  } catch (error) {
    $naive.message.warning(error.message)
  }
}
</script>

<template>
  <div flex h-full>
    <div m-auto w-350 f-c-c flex-col bg-white bg-opacity-60 p-20 rounded-10 card-shadow>
      <h5 text-24 font-normal color="#6a6a6a">{{ title }}</h5>
      <div mt-30 w-full>
        <n-input
          v-model:value="userInfo.name"
          autofocus
          :maxlength="20"
          class="text-16 items-center h-50 pl-10"
          placeholder="admin"
        >
        </n-input>
      </div>

      <div mt-30 w-full>
        <n-input
          v-model:value="userInfo.password"
          type="password"
          show-password-on="click"
          placeholder="12345"
          :maxlength="20"
          class="text-16 items-center h-50 pl-10"
          @keydown.enter="handleLogin"
        >
        </n-input>
      </div>

      <div mt-24 w-full>
        <n-checkbox v-model:checked="isRemember" label="记住我" />
      </div>

      <div mt-20 w-full>
        <n-button w-full h-50 rounded-5 text-16 type="primary" @click="handleLogin">登录</n-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
