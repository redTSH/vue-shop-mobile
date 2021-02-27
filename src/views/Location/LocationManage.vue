<template>
  <div class="header">
    <span class="header__icon iconfont" @click="handleBackBtn">&#xe603;</span>
    <span class="header__text">管理收货地址</span>
    <span class="header__tag" @click="handleCreateBtn">新建</span>
  </div>
  <div class="content">
    <div class="content__title">我的收货地址</div>
    <router-link
      class="content__item"
      v-for="item in list"
      :key="item._id"
      :to="`/locationEdit/${item._id}`"
    >
      <span class="content__item__name">{{ item.name }}</span>
      <span class="content__item__phone">{{ item.phone }}</span>
      <div class="content__item__address">
        {{ item.city }}市&nbsp;{{ item.department }}&nbsp;{{ item.houseNumber }}
      </div>
      <div class="content__item__icon iconfont">&#xe603;</div>
    </router-link>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useLocationEffect } from './LocationEffect'
export default {
  name: 'LocationManage',
  setup() {
    const router = useRouter()
    const handleCreateBtn = () => {
      router.push('/locationCreate')
    }
    const handleBackBtn = () => {
      router.push('/my')
    }
    const { list } = useLocationEffect()
    return { list, handleBackBtn, handleCreateBtn }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 0.44rem;
  padding: 0 0.18rem;
  display: flex;
  align-items: center;
  &__icon {
    width: 0.3rem;
    color: #b6b6b6;
  }
  &__text {
    text-align: center;
    flex: 1;
    font-size: 0.16rem;
  }
  &__tag {
    width: 0.3rem;
    font-size: 0.14rem;
  }
}
.content {
  overflow-y: scroll;
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f1f1f1;
  padding: 0.16rem 0.18rem 0 0.18rem;
  &__title {
    margin-bottom: 0.12rem;
  }
  &__item {
    position: relative;
    display: block;
    background-color: #fff;
    margin-bottom: 0.16rem;
    padding: 0.16rem 0.18rem;
    border-radius: 0.04rem;
    &__name,
    &__phone {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #999;
    }
    &__name {
      margin-right: 0.66rem;
    }
    &__address {
      width: 2.6rem;
      line-height: 0.2rem;
      margin-top: 0.08rem;
      font-size: 0.14rem;
      color: #333;
    }
    &__icon {
      position: absolute;
      top: 50%;
      right: 0.18rem;
      font-size: 0.16rem;
      color: #999;
      transform: rotate(180deg) translateY(50%);
    }
  }
}
</style>
