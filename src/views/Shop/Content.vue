<template>
  <div class="content">
    <div class="content__aside">
      <ul>
        <li
          v-for="item in list"
          :key="item.tab"
          :class="{ 'content__aside--active': item.tab === currentTab }"
          @click="() => handleTabClick(item.tab)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="content__list">
      <div class="content__list__item" v-for="item in itemList" :key="item._id">
        <img
          class="content__item__img"
          :src="item.imgUrl"
          alt="content__item"
        />
        <div class="content__item__info">
          <h4>{{ item.name }}</h4>
          <p>月售{{ item.sales }}份</p>
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
            v-show="cartList?.[shopID]?.productList?.[item._id]?.count"
            @click="
              () => {
                handleChangeCartItem(shopID, item._id, item, -1, shopName)
              }
            "
            >&#xe7ad;</span
          >
          <span
            class="content__item__num__total"
            v-show="cartList?.[shopID]?.productList?.[item._id]?.count"
            >{{ cartList?.[shopID]?.productList?.[item._id]?.count || 0 }}</span
          >
          <span
            class="content__item__num__add iconfont"
            @click="
              () => {
                handleChangeCartItem(shopID, item._id, item, 1, shopName)
              }
            "
            >&#xe63e;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import { get } from '../../utils/request'
import { useCartEffect } from '../../effect/useCartEffect'

const list = [{
  name: '全部商品',
  tab: 'all'
}, {
  name: '秒杀',
  tab: 'seckill'
}, {
  name: '新鲜水果',
  tab: 'fruit'
}]

// 处理侧边导航栏
const useTabEffect = () => {
  const currentTab = ref(list[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 处理展示内容
const useListItemEffect = currentTab => {
  const listData = reactive({
    itemList: []
  })
  const route = useRoute()
  const shopID = route.params.id
  const getListItem = async () => {
    const result = await get(`/api/shop/${shopID}/products`, { params: { tab: currentTab.value } })
    if (result.data.errno === 0 && result.data.data) {
      listData.itemList = result.data.data
    }
  }

  // 通过watchEffect监听getListItem函数 函数内依赖了currentTab
  watchEffect(() => { getListItem() })
  const { itemList } = toRefs(listData)

  return { itemList, shopID }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup() {
    const { currentTab, handleTabClick } = useTabEffect()
    const { itemList, shopID } = useListItemEffect(currentTab)
    const { cartList, handleChangeCartItem } = useCartEffect()
    return { list, currentTab, handleTabClick, itemList, shopID, cartList, handleChangeCartItem }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.content {
  position: absolute;
  display: flex;
  left: 0;
  top: 1.62rem;
  right: 0;
  bottom: 0.5rem;
  &__aside {
    overflow-y: scroll;
    height: 100%;
    width: 0.76rem;
    background-color: #f5f5f5;
    li {
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.14rem;
      color: #333;
      padding: 0 0.1rem;
      @include ellipsis;
    }
    &--active {
      background-color: #fff;
    }
  }
  &__list {
    flex: 1;
    overflow-y: scroll;
    padding: 0 0.18rem 0 0.16rem;
    &__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      border-bottom: 0.01rem solid #f1f1f1;
      .content__item {
        &__img {
          width: 0.68rem;
          height: 0.68rem;
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
          p {
            line-height: 0.16rem;
            font-size: 0.12rem;
            color: #333;
            margin: 0.06rem 0;
          }
          &__price {
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
          right: 0;
          bottom: 0.12rem;
          font-size: 0.14rem;
          &__mins,
          &__add {
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            font-size: 0.2rem;
            line-height: 0.2rem;
            border-radius: 50%;
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
}
</style>
