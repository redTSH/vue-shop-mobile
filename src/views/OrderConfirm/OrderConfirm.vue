<template>
  <div class="warpper">
    <OrderHeader />
    <OrderContent />
  </div>
</template>

<script>
import OrderHeader from './OdertHeader'
import OrderContent from './OrderContent'
export default {
  name: 'OrderConfirm',
  components: { OrderHeader, OrderContent }
}
</script>

<style lang="scss" scoped>
.warpper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
}
</style>
