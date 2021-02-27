<template>
  <ul class="nav">
    <li v-for="item in iconsList" :key="item.desc" class="nav__item">
      <img
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
        :alt="item.imgName"
        class="nav__icon"
      />
      <p class="nav__desc">{{ item.desc }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Nav',
  setup() {
    const iconsList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: 20%;
    padding-bottom: 0.16rem;
  }
  &__icon {
    display: block;
    margin: 0 auto;
    width: 0.4rem;
    height: 0.4rem;
    margin-bottom: 0.06rem;
  }
  &__desc {
    text-align: center;
  }
}
</style>
