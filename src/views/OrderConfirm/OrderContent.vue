<template>
  <div class="content">
    <div class="content__item">
      <div class="content__item__title">{{ cartList?.[shopID]?.shopName }}</div>
      <div
        class="content__item__product"
        v-for="item in productList"
        :key="item._id"
        v-show="item.count && item.check"
      >
        <img
          :src="item.imgUrl"
          alt="product"
          class="content__item__product__img"
        />
        <div class="content__item__product__info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.price }} x {{ item.count }}</p>
        </div>
        <div class="content__item__product__price">
          <span>&yen;</span>
          {{ (item.price * item.count).toFixed(2) }}
        </div>
      </div>
      <div class="content__item__bar">
        共计{{ total.count[shopID] || 0 }}件/{{ total.weight[shopID] || 0 }}kg
        <span class="iconfont">&#xe60c;</span>
      </div>
    </div>
  </div>
  <Payment />
</template>

<script>
import { useRoute } from 'vue-router'
import { useCartEffect } from '../../effect/useCartEffect'
import Payment from './OrderPayment'

const useShowCartItemEffect = () => {
  const { cartList, total } = useCartEffect()

  const route = useRoute()
  const shopID = route.params.id
  const productList = cartList?.[shopID]?.productList
  return { cartList, productList, shopID, total }
}
export default {
  name: 'OrderContent',
  components: { Payment },
  setup() {
    const { cartList, productList, shopID, total } = useShowCartItemEffect()

    return { cartList, shopID, productList, total }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 1.9rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  &__item {
    padding: 0.16rem;
    margin: 0 0.18rem 0.16rem;
    background-color: #fff;
    &__title {
      font-size: 0.16rem;
    }
    &__product {
      position: relative;
      display: flex;
      margin-top: 0.16rem;
      font-size: 0.14rem;
      line-height: 0.2rem;
      &__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.16rem;
      }
      &__info {
        h4 {
          margin-bottom: 0.06rem;
        }
        p {
          color: #e93b3b;
        }
      }
      &__price {
        position: absolute;
        display: flex;
        right: 0;
        bottom: 0;
        span {
          display: block;
          font-size: 0.2rem;
          transform: scale(0.5);
        }
      }
    }
    &__bar {
      width: 3.07rem;
      height: 0.28rem;
      margin-top: 0.16rem;
      text-align: center;
      line-height: 0.28rem;
      font-size: 0.14rem;
      color: #999;
      background-color: #f5f5f5;
    }
  }
}
</style>
