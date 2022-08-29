<script setup>
import { ref, reactive, unref } from 'vue'
import { lStorage } from '@/utils/cache'
import { login } from '@/api/auth'
import { setToken } from '@/utils/token'
import { useRouter } from 'vue-router'
const router = useRouter()
const title = import.meta.env.VITE_APP_TITLE
// 路由的数据
const query = unref(router.currentRoute).query
// console.log(router.currentRoute)

const userInfo = reactive({
  name: 'admin',
  password: '12345',
})

/* 判断本地是否保存有登陆信息 */
const localLoginInfo = lStorage.get('loginInfo')
if (localLoginInfo) {
  userInfo.name = localLoginInfo.name || ''
  userInfo.password = localLoginInfo.password || ''
}

// 记住密码
const isRemember = ref(false)
const handleLogin = async () => {
  const { name, password } = userInfo
  if (!name || !password) {
    $message.warning('请用户输入账户和密码')
    return
  }
  try {
    $message.loading('正在验证...')
    const res = await login({ name, password: password.toString() })
    if (res.code === 0) {
      $message.success('登录成功')
      // console.log(res.data.token)
      setToken(res.data.token)
      // 保存账号密码到本地
      if (isRemember.value) {
        lStorage.set('loginInfo', { name, password })
      } else {
        lStorage.remove('loginInfo')
      }

      // 跳转到首页
      if (query.redirect) {
        const path = query.redirect
        Reflect.deleteProperty(query, 'redirect')
        router.push({ path, query })
      } else {
        router.push('/')
      }
    } else {
      $message.warning(res.message)
    }
  } catch (error) {
    $message.error(error.message)
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
