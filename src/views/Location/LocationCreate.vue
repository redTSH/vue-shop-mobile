<template>
  <div class="header">
    <span class="header__icon iconfont" @click="handleBackBtn">&#xe603;</span>
    <span class="header__text">新建收货地址</span>
    <span class="header__tag" @click="handleCreateBtn">保存</span>
  </div>
  <div class="content">
    <div class="content__inputs">
      <div class="content__input">
        所在城市：<input
          type="text"
          placeholder="如北京市"
          v-model="locationInfo.city"
        />
      </div>
      <div class="content__input">
        小区/大厦/学校：<input
          type="text"
          placeholder="如理工大学国防科技园"
          v-model="locationInfo.department"
        />
      </div>
      <div class="content__input">
        楼号-门牌号：<input
          type="text"
          placeholder="A号楼B层"
          v-model="locationInfo.houseNumber"
        />
      </div>
      <div class="content__input">
        收货人：<input
          type="text"
          placeholder="请填写收货人姓名"
          v-model="locationInfo.name"
        />
      </div>
      <div class="content__input">
        联系电话：<input
          type="number"
          placeholder="请填写收货人手机号"
          v-model="locationInfo.phone"
        />
      </div>
    </div>
  </div>
  <Toast v-show="showToast" :msg="toastMessage" />
</template>

<script>
import { useRouter } from 'vue-router'
import { postJSON } from '../../utils/request'
import { useLocationEffect } from './LocationEffect'
import Toast, { showToastEffect } from '../../components/Toast'
export default {
  name: 'LocationManage',
  components: { Toast },
  setup() {
    const { setToast, showToast, toastMessage } = showToastEffect()
    const router = useRouter()
    const { handleBackBtn, locationInfo } = useLocationEffect()
    const handleCreateBtn = async () => {
      for (const i in locationInfo.value) {
        if (locationInfo.value[i] === '') {
          setToast('请输入正确的地址信息')
          return
        }
      }
      try {
        const result = await postJSON('/api/user/address/', {
          city: locationInfo.value.city,
          department: locationInfo.value.department,
          houseNumber: locationInfo.value.houseNumber,
          name: locationInfo.value.name,
          phone: locationInfo.value.phone,
          updatedAt: new Date(),
          createdAt: new Date()
        })
        if (result?.data?.errno === 0) {
          setToast('新建成功')
          setTimeout(() => {
            router.push('/locationManage')
          }, 1000)
        } else {
          setToast('保存失败，请稍后再尝试')
        }
      } catch (e) {
        setToast('通讯错误，请稍后再尝试')
      }
    }
    return { showToast, toastMessage, locationInfo, handleBackBtn, handleCreateBtn }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 0.44rem;
  padding: 0 0.18rem;
  display: flex;
  align-items: center;
  &__icon {
    width: 0.3rem;
    color: #b6b6b6;
  }
  &__text {
    text-align: center;
    flex: 1;
    font-size: 0.16rem;
  }
  &__tag {
    width: 0.3rem;
    font-size: 0.14rem;
  }
}
.content {
  overflow-y: scroll;
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f1f1f1;
  padding: 0.12rem 0 0.12rem 0;
  &__inputs {
    padding: 0 0.18rem;
    background-color: #fff;
  }
  &__input {
    display: flex;
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.14rem;
    color: #666;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #f1f1f1;
    &:last-child {
      border: none;
    }
    input {
      flex: 1;
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 0.14rem;
      color: #333;
      &::-webkit-input-placeholder {
        color: #999;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #999;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #999;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #999;
      }
    }
  }
}
</style>
