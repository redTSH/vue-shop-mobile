<template>
  <div class="mask" v-show="show" @click="handleShowCart"></div>
  <div class="content__list" v-show="show">
    <div class="content__list__header">
      <div class="content__list__header__all">
        <span
          class="content__list__header__all__logo iconfont"
          v-html="checked.allCheck ? '&#xe607;' : '&#xe69d;'"
          @click="() => handleAllCheckCart(shopID, checked.allCheck)"
        ></span>
        全选
      </div>
      <div
        class="content__list__header__clear"
        @click="() => handleClearAllCart(shopID)"
      >
        清空购物车
      </div>
    </div>
    <template v-for="item in checked.productList" :key="item._id">
      <div class="content__list__item" v-show="item.count">
        <div
          class="content__item__logo iconfont"
          @click="() => handleCheckCartItem(shopID, item._id)"
          v-html="item.check ? '&#xe607;' : '&#xe69d;'"
        ></div>
        <img
          class="content__item__img"
          :src="item.imgUrl"
          alt="content__item"
        />
        <div class="content__item__info">
          <h4>{{ item.name }}</h4>
          <div class="content__item__info__price">
            <span>&yen;</span>
            <span>{{ item.price }}</span>
            <span class="content__item__info__price__origin"
              >&yen;{{ item.oldPrice }}</span
            >
          </div>
        </div>
        <div class="content__item__num">
          <span
            class="content__item__num__mins iconfont"
            @click="
              () => {
                handleChangeCartItem(shopID, item._id, item, -1)
              }
            "
            >&#xe7ad;</span
          >
          <span class="content__item__num__total">
            {{ getItemCount(shopID, item._id) }}
          </span>
          <span
            class="content__item__num__add iconfont"
            @click="
              () => {
                handleChangeCartItem(shopID, item._id, item, 1)
              }
            "
            >&#xe63e;</span
          >
        </div>
      </div>
    </template>
  </div>
  <div class="cart">
    <div class="cart__logo" @click="handleShowCart">
      <img
        class="cart__logo__img"
        src="http://www.dell-lee.com/imgs/vue3/basket.png"
        alt="cart_logo"
      />
      <span class="cart__logo__tag" v-show="total.count[shopID]">{{
        total.count[shopID]
      }}</span>
    </div>
    <div
      class="cart__price"
      v-html="
        total.count[shopID]
          ? `总计:&nbsp;
      <span>&yen;${total.money[shopID]}</span>`
          : '购物车是空的'
      "
    ></div>
    <div
      class="cart__total"
      @click="() => handelePayBtn(total.count[shopID], shopID)"
    >
      去结算
    </div>
  </div>
  <Toast v-if="showToast" :msg="toastMessage" />
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartEffect } from '../../effect/useCartEffect'
import Toast, { showToastEffect } from '../../components/Toast'

// 购物车数据相关逻辑
const useAllCartEffect = () => {
  const { cartList, total, handleChangeCartItem, handleCheckCartItem, handleAllCheckCart, handleClearAllCart } = useCartEffect()

  const route = useRoute()
  const shopID = route.params.id
  const checked = computed(() => {
    const productList = cartList?.[shopID]?.productList
    let allCheck = true
    if (productList) {
      for (const item in productList) {
        const product = productList[item]
        if (!product.check) {
          allCheck = false
        }
      }
    }
    return { allCheck, productList }
  })
  return { total, shopID, cartList, checked, handleChangeCartItem, handleCheckCartItem, handleAllCheckCart, handleClearAllCart }
}

// 展示购物车详情的逻辑
const showCartEffect = () => {
  const show = ref(false)
  const handleShowCart = () => {
    show.value = !show.value
  }
  return { show, handleShowCart }
}

// 结算按钮逻辑
const usePayBtnEffect = () => {
  const { showToast, toastMessage, setToast } = showToastEffect()
  const router = useRouter()
  const handelePayBtn = (count, shopID) => {
    if (count > 0) {
      router.push({ name: 'OrderConfirm', params: { id: shopID } })
    } else {
      setToast('购物车是空的')
    }
  }
  return { handelePayBtn, showToast, toastMessage }
}

export default {
  name: 'Cart',
  components: { Toast },
  setup() {
    const { total, shopID, cartList, checked, productList, handleChangeCartItem, handleCheckCartItem, handleAllCheckCart, handleClearAllCart } = useAllCartEffect()

    const { show, handleShowCart } = showCartEffect()

    const { handelePayBtn, showToast, toastMessage } = usePayBtnEffect()

    const getItemCount = (shopID, productId) => {
      return cartList?.[shopID]?.productList?.[productId]?.count
    }
    return {
      total, shopID, cartList, checked, productList, handleChangeCartItem, handleCheckCartItem, handleAllCheckCart, handleClearAllCart, getItemCount, show, handleShowCart, handelePayBtn, showToast, toastMessage
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.content__list {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  background-color: #fff;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.52rem;
    border-bottom: 0.01rem solid #f1f1f1;
    padding: 0 0.18rem;
    font-size: 0.14rem;
    line-height: 0.52rem;
    &__all {
      &__logo {
        vertical-align: middle;
        font-size: 0.2rem;
        color: #0091ff;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0.18rem;
    .content__item {
      &__logo {
        font-size: 0.2rem;
        line-height: 0.46rem;
        color: #0091ff;
        margin-right: 0.16rem;
      }
      &__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.16rem;
      }
      &__info {
        width: 1.05rem;
        h4 {
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: #333;
          font-weight: 600;
          @include ellipsis;
        }
        &__price {
          margin-top: 0.06rem;
          color: #e93b3b;
          font-size: 0.14rem;
          span:first-child {
            font-size: 0.12rem;
          }
          &__origin {
            padding-left: 0.06rem;
            color: #999;
            text-decoration: line-through;
            font-size: 0.12rem;
          }
        }
      }
      &__num {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: absolute;
        width: 0.7rem;
        right: 0.18rem;
        bottom: 0.25rem;
        font-size: 0.14rem;
        &__mins,
        &__add {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          font-size: 0.2rem;
          line-height: 0.2rem;
          text-align: center;
        }
        &__mins {
          color: #666;
        }
        &__add {
          color: #0091ff;
        }
        &__total {
          width: 0.3rem;
          text-align: center;
        }
      }
    }
  }
}
.cart {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  border-top: 0.01rem solid #f1f1f1;
  background-color: #fff;
  &__logo {
    position: relative;
    display: flex;
    height: 0.5rem;
    width: 0.76rem;
    align-items: center;
    justify-content: center;
    &__img {
      display: block;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 58%;
      top: 0.06rem;
      min-width: 0.2rem;
      padding: 0.03rem;
      font-size: 0.16rem;
      text-align: center;
      color: #fff;
      line-height: 0.2rem;
      background-color: #e93b3b;
      border-radius: 0.1rem;
      transform: scale(0.5);
      transform-origin: left top;
    }
  }
  &__price {
    flex: 1;
    padding-left: 0.08rem;
    line-height: 0.5rem;
  }
  &__total {
    width: 0.98rem;
    font-size: 0.14rem;
    text-align: center;
    line-height: 0.5rem;
    color: #fff;
    background-color: #4fb0f9;
  }
}
</style>

<style lang="scss">
.cart__price span {
  vertical-align: middle;
  color: #e93b3b;
  font-size: 0.18rem;
}
</style>
