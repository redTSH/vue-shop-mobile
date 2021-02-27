<template>
  <div class="cartpage">
    <div class="cartpage__header">我的全部购物车（{{ total.totalCount }}）</div>
    <div class="cartpage__content">
      <template v-for="item in cartList" :key="item.shopName">
        <div class="cartpage__content__item" v-show="total.count[item.shopID]">
          <div
            class="cartpage__item__title"
            @click="() => handleTitleRouter(item.shopID)"
          >
            {{ item.shopName }}
          </div>
          <template
            v-for="(productItem, productIndex) in productList[item.shopID]"
            :key="productIndex"
          >
            <div
              class="cartpage__item__product"
              v-if="show[item.shopID] || productIndex < 2"
            >
              <img
                :src="productItem.imgUrl"
                alt="product"
                class="cartpage__item__product__img"
              />
              <div class="cartpage__item__product__info">
                <h4>{{ productItem.name }}</h4>
                <p>{{ productItem.price }} x {{ productItem.count }}</p>
              </div>
              <div class="cartpage__item__product__price">
                <span>&yen;</span>
                {{ (productItem.price * productItem.count).toFixed(1) }}
              </div>
            </div>
          </template>
          <div
            class="cartpage__item__bar"
            v-if="productList[item.shopID].length > 2 && !show[item.shopID]"
            @click="() => handleShow(item.shopID)"
          >
            共计{{ total.count[item.shopID] }}件/{{
              total.weight[item.shopID]
            }}kg
            <span class="iconfont">&#xe60c;</span>
          </div>
        </div>
      </template>
    </div>
  </div>
  <Docker :active="'cart'" />
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartEffect } from '../../effect/useCartEffect'
import Docker from '../../components/Docker/Docker'

export default {
  name: 'CartPage',
  components: { Docker },
  setup() {
    const { cartList, total } = useCartEffect()
    const productList = {}
    const show = reactive({})
    for (const i in cartList) {
      const shopID = cartList[i].shopID
      const products = cartList[i].productList
      productList[shopID] = []
      show[shopID] = false
      for (const j in products) {
        if (products[j].count > 0) {
          productList[shopID].push(products[j])
        }
      }
    }
    const handleShow = (id) => {
      show[id] = !show[id]
    }
    const router = useRouter()
    const handleTitleRouter = (id) => {
      router.push(`/shop/${id}`)
    }
    return { cartList, total, productList, show, handleShow, handleTitleRouter }
  }
}
</script>

<style lang="scss" scoped>
.cartpage {
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.49rem;
  background-color: #f5f5f5;
  padding: 0 0.18rem;
  &__header {
    position: fixed;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.16rem;
    text-align: center;
    z-index: 999;
  }
  &__content {
    margin: 0.6rem 0 0.16rem 0;
    &__item {
      color: #333;
      background-color: #fff;
      padding: 0.16rem;
      margin-top: 0.16rem;
      .cartpage__item {
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
  }
}
</style>
