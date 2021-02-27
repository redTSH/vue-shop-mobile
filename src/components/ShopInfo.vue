<template>
  <div class="shop__item">
    <img :src="item.imgUrl" alt="shop" class="shop__img" />
    <div :class="{ shop__content: true, 'shop__content--border': border }">
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__info">
        <span>月售{{ item.sales }}</span>
        <span>起送{{ item.expressLimit }}</span>
        <span>基础运费{{ item.expressPrice }}</span>
      </div>
      <div class="shop__content__spec">
        {{ item.slogan }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'border']
}
</script>

<style lang="scss" scoped>
.shop {
  &__item {
    display: flex;
    padding: 0.12rem 0;
    color: #333;
    .shop__content--border {
      border-bottom: 0.01rem solid #f1f1f1;
    }
  }
  &__img {
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    flex: 1;
    margin-left: 0.16rem;
    &__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
    }
    &__info {
      font-size: 0.13rem;
      line-height: 0.18rem;
      padding: 0.08rem 0;
      span {
        margin-right: 0.16rem;
      }
    }
    &__spec {
      font-size: 0.13rem;
      line-height: 0.18rem;
      color: #e93b3b;
      padding-bottom: 0.12rem;
    }
  }
}
</style>
