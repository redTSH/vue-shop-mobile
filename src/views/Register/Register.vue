<template>
  <div class="register-page">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt="register"
      class="register-page__img"
    />
    <div class="register-page__input">
      <input type="number" placeholder="请输入手机号" v-model="username" />
    </div>
    <div class="register-page__input">
      <input type="password" placeholder="请输入密码" v-model="password" />
    </div>
    <div class="register-page__input">
      <input type="password" placeholder="确认密码" v-model="confirmPassword" />
    </div>
    <button class="register-page__btn" @click="handleRegister">注册</button>
    <div class="register-page__more">
      <span @click="handleLogin">已有账号去登录</span>
    </div>
    <Toast v-if="showToast" :msg="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { postJSON } from '../../utils/request'

import Toast, { showToastEffect } from '../../components/Toast'

const useRegisterEffect = setToast => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleRegister = async () => {
    if (data.password !== data.confirmPassword) {
      setToast('两次输入密码不一致')
      return
    } else if (data.username === '' || data.password === '') {
      setToast('请输入正确账号密码')
      return
    }
    try {
      const result = await postJSON('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.data?.errno === 0) {
        router.push({ name: 'Login' })
        // setToast('注册成功')
      } else {
        setToast('注册失败')
      }
    } catch (e) {
      setToast('连接错误')
    }
  }
  const { username, password, confirmPassword } = toRefs(data)
  return { handleRegister, username, password, confirmPassword }
}

const useLoginEffect = () => {
  const router = useRouter()
  const handleLogin = () => {
    router.push({ name: 'Login' })
  }
  return { handleLogin }
}

export default {
  name: 'register',
  components: { Toast },
  setup() {
    const { showToast, toastMessage, setToast } = showToastEffect()
    const { handleRegister, username, password, confirmPassword } = useRegisterEffect(setToast)
    const { handleLogin } = useLoginEffect()

    return { handleLogin, Toast, showToast, toastMessage, handleRegister, username, password, confirmPassword }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  padding: 1.2rem 0.4rem 0;
  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem;
  }
  &__input {
    margin-bottom: 0.16rem;
    height: 0.48rem;
    input {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 0.01rem solid rgba(0, 0, 0, 0.1);
      outline: none;
      background-color: #f9f9f9;
      border-radius: 0.06rem;
      padding: 0 0.16rem;
      font-size: 0.16rem;
      color: #888;
      &::-webkit-input-placeholder {
        color: #888;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #888;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #888;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #888;
      }
    }
  }
  &__btn {
    width: 100%;
    height: 0.48rem;
    margin-top: 0.16rem;
    background-color: #0091ff;
    border: none;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    color: #fff;
    font-size: 0.16rem;
    line-height: 0.24rem;
    outline: none;
  }
  &__more {
    text-align: center;
    margin-top: 0.18rem;
    font-size: 0.14rem;
    color: #888;
    span {
      margin: 0 0.06rem;
    }
  }
}
</style>
