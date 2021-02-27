<template>
  <div class="login-page">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt="login"
      class="login-page__img"
    />
    <div class="login-page__input">
      <input type="number" placeholder="请输入手机号" v-model="username" />
    </div>
    <div class="login-page__input">
      <input type="password" placeholder="请输入密码" v-model="password" />
    </div>
    <button class="login-page__btn" @click="handleLogin">登录</button>
    <div class="login-page__more">
      <span @click="handleRegister">立即注册</span>
      <span>|</span>
      <span>忘记密码</span>
    </div>
    <Toast v-if="showToast" :msg="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { postJSON } from '../../utils/request'
import { useRouter } from 'vue-router'

import Toast, { showToastEffect } from '../../components/Toast'

const useLoginEffect = setToast => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })

  // 用上 async...await 语法糖
  const handleLogin = async () => {
    // 判断是否填了信息
    if (data.username === '' || data.password === '') {
      setToast('请输入正确账号密码')
      return
    }
    // 利用 try{} 。。。 catch（）{} 捕抓async返回的错误
    try {
      const result = await postJSON('/api/user/login', {
        username: data.username,
        password: data.password
      })
      // c# 语法糖 ？表示如果有才继续执行，如果没有就直接返回undefined
      if (result?.data?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        setToast('登录失败')
      }
    } catch (e) {
      setToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { handleLogin, username, password }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  setup() {
    const { showToast, toastMessage, setToast } = showToastEffect()
    const { handleLogin, username, password } = useLoginEffect(setToast)
    const { handleRegister } = useRegisterEffect()

    return { handleLogin, username, password, handleRegister, showToast, toastMessage }

    // 普通写法
    // const handleLogin = () => {
    //   axios.post('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/login', {
    //     username: data.username,
    //     password: data.password
    //   }).then(() => {
    //     localStorage.isLogin = true
    //     router.push({ name: 'Home' })
    //   }).catch(() => {
    //     alert('登录失败')
    //   }
    //   )
    // }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
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
