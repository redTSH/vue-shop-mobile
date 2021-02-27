<template>
  <div class="toast">{{ msg }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Toast',
  props: ['msg']
}
export const showToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })
  const setToast = msg => {
    toastData.showToast = true
    toastData.toastMessage = msg
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 1500)
  }
  const { showToast, toastMessage } = toRefs(toastData)
  return { showToast, toastMessage, setToast }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.35);
  padding: 0.08rem;
  color: #fff;
  border-radius: 0.06rem;
  z-index: 99999;
}
</style>
