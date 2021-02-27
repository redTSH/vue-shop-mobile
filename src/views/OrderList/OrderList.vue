<template>
  <div class="header">我的订单</div>
  <div class="orderlist">
    <div class="orderlist__item" v-for="(item, index) in list" :key="index">
      <div class="orderlist__item__title">{{ item.shopName }}</div>
      <span class="orderlist__item__state">{{
        item.isCanceled ? '已取消' : '已下单'
      }}</span>
      <div class="orderlist__item__product">
        <div class="orderlist__item__product__imgs">
          <img
            v-for="(productItem, productIndex) in item.products"
            :key="productIndex"
            class="orderlist__item__product__imgs__img"
            :src="productItem.product.img"
            alt="product"
            v-show="productIndex < 4"
          />
        </div>

        <div class="orderlist__item__product__info">
          <span class="orderlist__item__product__info__price"
            >&yen;{{ item.totalPrice }}</span
          >
          <span class="orderlist__item__product__info__count"
            >共{{ item.totalNumber }}件</span
          >
        </div>
      </div>
    </div>
  </div>
  <Docker :active="'orderList'" />
  <Toast v-if="showToast" :msg="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker/Docker'
import Toast, { showToastEffect } from '../../components/Toast'
import { get } from '../../utils/request'
export default {
  name: 'OrderList',
  components: { Docker, Toast },
  setup() {
    const { setToast, showToast, toastMessage } = showToastEffect()
    const data = reactive({ list: [] })
    const handleGetOrderList = async () => {
      try {
        const result = await get('/api/order')
        if (result?.data?.errno === 0 && result?.data?.data?.length) {
          const orderList = result.data.data
          orderList.forEach(order => {
            const products = order.products
            let totalNumber = 0
            let totalPrice = 0
            products.forEach(productItem => {
              totalNumber += productItem.orderSales
              totalPrice += (productItem.product.price * productItem.orderSales)
            })
            order.totalNumber = totalNumber
            order.totalPrice = totalPrice
          })
          data.list = orderList
        } else {
          setToast('网络错误，请稍后再尝试')
        }
      } catch (e) {
        setToast('网络错误，请稍后再尝试')
      }
    }
    handleGetOrderList()
    const { list } = toRefs(data)
    return { showToast, toastMessage, list }
  }

}
</script>

<style lang="scss" scoped>
.header {
  height: 0.44rem;
  background-color: #fff;
  font-size: 0.16rem;
  line-height: 0.44rem;
  text-align: center;
}
.orderlist {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  top: 0.44rem;
  padding: 0.16rem;
  background-color: rgba(248, 248, 248);
  &__item {
    position: relative;
    padding: 0.16rem;
    background-color: #fff;
    &__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
      margin-bottom: 0.16rem;
    }
    &__state {
      position: absolute;
      right: 0.16rem;
      top: 0.16rem;
      font-size: 0.14rem;
      line-height: 0.22rem;
      color: #999;
    }
    &__product {
      display: flex;
      justify-content: space-between;
      &__imgs {
        &__img {
          width: 0.4rem;
          height: 0.4rem;
          margin-right: 0.12rem;
        }
      }
      &__info {
        display: flex;
        flex-direction: column;
        &__price {
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: #e93b3b;
          text-align: right;
          margin-bottom: 0.04rem;
        }
        &__count {
          font-size: 0.12rem;
          color: #333;
          text-align: right;
          line-height: 0.14rem;
        }
      }
    }
  }
}
</style>
