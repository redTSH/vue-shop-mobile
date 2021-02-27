<template>
  <div class="warpper">
    <Header />
    <Search :placeholder="'山姆会员商店优惠商品'" />
    <Banner />
    <Nav />
    <div class="bar"></div>
    <Nearby />
  </div>
  <Docker :active="'home'" />
</template>

<script>
import Docker from '../../components/Docker/Docker'
import Header from './Header'
import Search from '../../components/Search'
import Banner from './Banner'
import Nav from './Nav'
import Nearby from './Nearby'
export default {
  name: 'Home',
  components: { Docker, Header, Search, Banner, Nav, Nearby }
}
</script>

<style lang="scss" scoped>
.warpper {
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.49rem;
  background-color: #fff;
  padding: 0 0.18rem;
  .bar {
    height: 0.1rem;
    background-color: #f7f7f7;
    margin: 0 -0.19rem;
  }
}
</style>
