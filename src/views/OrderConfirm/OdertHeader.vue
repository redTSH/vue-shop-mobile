<template>
  <div class="header">
    <div class="header__topbar">
      <span class="header__topbar__icon iconfont" @click="handleBackBtn"
        >&#xe603;</span
      >
      <span class="header__topbar__text">确认订单</span>
    </div>
    <div class="header__posi">
      <h3 class="header__posi__title">收货地址</h3>
      <p class="header__posi__local">北京理工大学国防科技园2号楼10层</p>
      <p class="header__posi__person">瑶妹（先生）18911024266</p>
      <span class="header__posi__icon iconfont">&#xe603;</span>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
const useBackBtnEffect = () => {
  const router = useRouter()

  const handleBackBtn = () => {
    router.back()
  }
  return { handleBackBtn }
}
export default {
  name: 'OrderHeader',
  setup() {
    const { handleBackBtn } = useBackBtnEffect()

    return { handleBackBtn }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 1.39rem;
  padding: 0 0.18rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  &__topbar {
    position: relative;
    color: #fff;
    text-align: center;
    padding: 0.2rem 0;
    &__icon {
      position: absolute;
      left: 0;
      font-size: 0.2rem;
    }
    &__text {
      font-size: 0.14rem;
      line-height: 0.22rem;
    }
  }
  &__posi {
    position: relative;
    width: 3.39rem;
    height: 1.11rem;
    background-color: #fff;
    border-radius: 0.04rem;
    padding: 0.16rem;
    box-sizing: border-box;
    &__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
      margin-bottom: 0.14rem;
    }
    &__local {
      font-size: 0.14rem;
      line-height: 0.2rem;
      margin-bottom: 0.06rem;
    }
    &__person {
      color: #666;
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      top: 50%;
      margin-top: -0.08rem;
      font-size: 0.16rem;
      transform: rotate(180deg);
    }
  }
}
</style>
