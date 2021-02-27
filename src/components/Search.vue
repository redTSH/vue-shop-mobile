<template>
  <div class="searchbox">
    <span class="iconfont">&#xe600;</span>
    <input class="search" type="text" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['placeholder']
}
</script>

<style lang="scss" scoped>
@import '../style/content.scss';
.searchbox {
  position: relative;
  width: 3.39rem;
  height: 0.32rem;
  font-size: 0.16rem;
  .iconfont {
    position: absolute;
    top: 0.08rem;
    left: 0.16rem;
    color: $bgcolor-b7;
    font-size: 0.16rem;
  }
}
.search {
  width: 100%;
  height: 100%;
  padding-left: 0.44rem;
  font-size: 0.14rem;
  line-height: 0.32rem;
  outline: none;
  border: none;
  border-radius: 0.16rem;
  box-sizing: border-box;
  background-color: #f1f1f1;
  color: $bgcolor-b7;
  &::-webkit-input-placeholder {
    color: $bgcolor-b7;
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: $bgcolor-b7;
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: $bgcolor-b7;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: $bgcolor-b7;
  }
}
</style>
