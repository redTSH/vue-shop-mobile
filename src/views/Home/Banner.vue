<template>
  <div class="banner">
    <img
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt="banner"
      class="banner__img"
    />
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style lang="scss" scoped>
.banner {
  height: 0;
  margin: 0.12rem 0 0.16rem;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
</style>
