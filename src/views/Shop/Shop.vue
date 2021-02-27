<template>
  <div class="shop">
    <div class="shop__header">
      <div class="iconfont" @click="handleBack">&#xe603;</div>
      <Search :placeholder="'请输入商品名称搜索'" />
    </div>
    <ShopInfo :item="item" :boder="false" v-show="item.imgUrl" />
  </div>
  <Content :shopName="item.name" />
  <Cart />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import Search from '../../components/Search'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'

// 处理获取商铺信息
const getItemDataEffect = () => {
  const data = reactive({ item: {} })
  const route = useRoute()
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.data.errno === 0 && result?.data) {
      data.item = result.data.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 处理后退按钮
const useBackEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return handleBack
}

export default {
  name: 'Shop',
  components: { Search, ShopInfo, Content, Cart },
  setup() {
    const { item, getItemData } = getItemDataEffect()
    getItemData()
    const handleBack = useBackEffect()

    return { item, handleBack }
  }
}
</script>

<style lang="scss" scoped>
.shop {
  padding: 0 0.18rem;
  &__header {
    display: flex;
    padding: 0.16rem 0 0.04rem 0;
    .iconfont {
      font-size: 0.2rem;
      line-height: 0.32rem;
      margin-right: 0.16rem;
      color: #b6b6b6;
    }
  }
}
</style>
