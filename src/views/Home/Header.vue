<template>
  <div class="header">
    <span class="iconfont">&#xe664;</span>
    <span class="location">北京理工大学国防科技园2号楼10层</span>
    <span class="iconfont">&#xe70c;</span>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.header {
  margin: 0.16rem 0;
  display: flex;
  .location {
    flex: 1;
    font-size: 0.16rem;
    margin-left: 0.09rem;
    @include ellipsis;
  }
  .iconfont {
    position: relative;
    top: -0.02rem;
    font-size: 0.18rem;
  }
}
</style>
