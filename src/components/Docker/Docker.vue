<template>
  <div class="docker">
    <router-link
      :class="{ docker__item: true, 'docker__item--active': active === 'home' }"
      to="/"
    >
      <span class="iconfont">&#xe676;</span>
      <span class="docker__title">首页</span>
    </router-link>
    <router-link
      :class="{ docker__item: true, 'docker__item--active': active === 'cart' }"
      to="/cartpage"
    >
      <span class="iconfont">&#xe60b;</span>
      <span class="docker__title">购物车</span>
    </router-link>
    <router-link
      :class="{
        docker__item: true,
        'docker__item--active': active === 'orderList',
      }"
      to="/orderList"
    >
      <span class="iconfont">&#xe608;</span>
      <span class="docker__title">订单</span>
    </router-link>
    <router-link
      :class="{ docker__item: true, 'docker__item--active': active === 'my' }"
      to="/my"
    >
      <span class="iconfont">&#xe602;</span>
      <span class="docker__title">我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['active']
}
</script>

<style lang="scss">
.docker {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 0.49rem;
  width: 100%;
  padding: 0 0.18rem;
  box-sizing: border-box;
  border-top: 0.01rem solid #f1f1f1;
  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.2rem;
    color: #333;
    padding-top: 0.07rem;
    .iconfont {
      font-size: 0.2rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
