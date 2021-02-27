<template>
  <h3 class="nearby__title">附近店铺</h3>
  <router-link
    v-for="item in nearbyList"
    :key="item._id"
    :to="{ path: `/shop/${item._id}` }"
  >
    <ShopInfo :item="item" :border="true" />
  </router-link>
  <Toast v-if="showToast" :msg="toastMessage" />
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'

import ShopInfo from '../../components/ShopInfo'
import Toast, { showToastEffect } from '../../components/Toast'
const useNearbyEffect = () => {
  const { showToast, toastMessage, setToast } = showToastEffect()
  const nearbyList = ref([])
  const getNearbyList = async () => {
    try {
      const result = await get('/api/shop/hot-list')
      if (result?.data?.errno === 0 && result?.data?.data?.length) {
        nearbyList.value = result.data.data
      } else {
        setToast('网络错误，请稍后再尝试')
      }
    } catch (e) {
      setToast('网络错误，请稍后再尝试')
    }
  }
  return { nearbyList, getNearbyList, showToast, toastMessage }
}
export default {
  name: 'Nearby',
  components: { ShopInfo, Toast },
  setup() {
    const { nearbyList, getNearbyList, showToast, toastMessage } = useNearbyEffect()
    getNearbyList()
    return { nearbyList, showToast, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
.nearby {
  &__title {
    font-size: 0.18rem;
    padding: 0.16rem 0 0.02rem 0;
  }
}
</style>
