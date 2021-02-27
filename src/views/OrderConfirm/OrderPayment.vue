<template>
  <div class="pay">
    <div class="pay__price">
      支付金额<span>&yen;{{ total.money[shopID] }}</span>
    </div>
    <div class="pay__submit" @click="handelSubmitOrder">提交订单</div>
  </div>
  <div class="mask" v-show="goPay" @click="handleMask"></div>
  <div class="payment" v-show="goPay">
    <div class="payment__paying">
      <h4 class="payment__paying__title">确认离开收银台？</h4>
      <p class="payment__paying__text">请尽快完成支付，否则将被取消</p>
      <div class="payment__paying__btns">
        <div
          class="payment__paying__btns__cancel"
          @click="() => handlePayment(true)"
        >
          取消订单
        </div>
        <div
          class="payment__paying__btns__confirm"
          @click="() => handlePayment(false)"
        >
          确认支付
        </div>
      </div>
    </div>
    <div class="payment__paid" v-if="paid">
      <span class="payment__paid__icon iconfont">&#xe60d;</span
      ><span class="payment__paid__cancel iconfont" @click="handleCancelNow"
        >&#xe634;</span
      >支付成功，等待配送
    </div>
    <div class="payment__paid" v-if="paidCancel">
      <span class="payment__paid__icon iconfont">&#xe634;</span
      ><span class="payment__paid__cancel iconfont" @click="handleCancelNow"
        >&#xe634;</span
      >已取消订单
    </div>
  </div>
  <Toast v-if="showToast" :msg="toastMessage" />
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { postJSON } from '../../utils/request'
import { useCartEffect } from '../../effect/useCartEffect'
import Toast, { showToastEffect } from '../../components/Toast'
export default {
  name: 'Payment',
  components: { Toast },
  setup() {
    const goPay = ref(false)
    const paid = ref(false)
    const paidCancel = ref(false)

    const { showToast, toastMessage, setToast } = showToastEffect()
    const route = useRoute()
    const router = useRouter()
    const shopID = route.params.id
    const { cartList, total, handleClearAllCart } = useCartEffect()
    const shopName = cartList[shopID].shopName
    const productList = cartList[shopID].productList
    const products = []
    for (const i in productList) {
      if (productList[i].check) {
        products.push({ id: productList[i]._id, num: productList[i].count })
      }
    }
    const handlePayment = async (isCanceled) => {
      try {
        const result = await postJSON('/api/order', {
          addressId: 1,
          shopId: shopID,
          shopName,
          isCanceled,
          products
        })
        if (result?.data?.errno === 0) {
          if (isCanceled) {
            paidCancel.value = true
          } else {
            paid.value = true
          }
          setTimeout(() => {
            router.push('/orderList')
            handleClearAllCart(shopID)
          }, 1500)
        } else {
          setToast('通讯错误，请稍后再尝试')
        }
      } catch (e) {
        setToast('网络错误，请稍后再尝试')
      }
    }
    const handelSubmitOrder = () => {
      goPay.value = true
    }
    const handleMask = () => {
      goPay.value = false
    }
    const handleCancelNow = () => {
      router.push('/')
    }
    return { total, handlePayment, shopID, handelSubmitOrder, goPay, handleMask, paid, paidCancel, handleCancelNow, showToast, toastMessage }
  }

}
</script>

<style lang="scss" scoped>
.pay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 0.5rem;
  background-color: #fff;
  &__price {
    padding-left: 0.24rem;
    line-height: 0.5rem;
    font-size: 0.14rem;
    span {
      margin-left: 0.05rem;
      font-size: 0.16rem;
    }
  }
  &__submit {
    width: 0.98rem;
    background-color: #4fb0f9;
    font-size: 0.14rem;
    color: #fff;
    line-height: 0.5rem;
    text-align: center;
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.payment {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 3.01rem;
  height: 1.57rem;
  background-color: #fff;
  padding: 0.24rem 0;
  text-align: center;
  border-radius: 0.04rem;
  box-sizing: border-box;
  z-index: 999;
  &__paying {
    &__title {
      font-size: 0.18rem;
      line-height: 0.25rem;
      margin-bottom: 0.08rem;
      font-weight: bolder;
    }
    &__text {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #666;
      margin-bottom: 0.24rem;
    }
    &__btns {
      display: flex;
      font-size: 0.14rem;
      padding: 0 0.58rem;
      justify-content: space-between;
      &__cancel,
      &__confirm {
        width: 0.8rem;
        height: 0.32rem;
        line-height: 0.32rem;
        color: #4fb0f9;
        border: 0.01rem solid #4fb0f9;
        border-radius: 0.16rem;
      }
      &__confirm {
        color: #fff;
        background-color: #4fb0f9;
      }
    }
  }
  &__paid {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    padding: 0.99rem 0.69rem 0 0.69rem;
    font-size: 0.18rem;
    border-radius: 0.04rem;
    &__icon {
      position: absolute;
      top: 0.35rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.5rem;
    }
    &__cancel {
      position: absolute;
      right: 0.05rem;
      top: 0.05rem;
      font-size: 0.22rem;
    }
  }
}
</style>
