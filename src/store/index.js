import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  localStorage.cartList = JSON.stringify(state.cartList)
}

const getLocalCartList = () => {
  if (localStorage.cartList) {
    return JSON.parse(localStorage.cartList)
  }
}

export default createStore({
  state: {
    cartList: getLocalCartList() || {
      // shopID:{
      // shopName:'',
      // productList:{
      //   productID:{
      //     productinfo
      //   }
      // }
      // }
    }
  },
  mutations: {
    ChangeCartItem(state, payload) {
      const { shopID, productID, product, num, shopName } = payload
      let shopInfo = state.cartList[shopID]
      if (!shopInfo) { shopInfo = { shopID, shopName, productList: {} } }
      let productInfo = shopInfo.productList[productID]
      if (!productInfo) {
        productInfo = product
        productInfo.count = 0
      }
      productInfo.count = productInfo.count + num
      productInfo.check = true
      if (productInfo.count < 0) { productInfo.count = 0 }
      shopInfo.productList[productID] = productInfo
      state.cartList[shopID] = shopInfo
      setLocalCartList(state)
    },
    checkCartItem(state, payload) {
      const { shopID, productID } = payload
      const checked = state.cartList[shopID].productList[productID].check
      state.cartList[shopID].productList[productID].check = !checked
      setLocalCartList(state)
    },
    AllCheckCart(state, payload) {
      const { shopID, allChecked } = payload
      const productList = state.cartList[shopID].productList
      if (productList) {
        if (!allChecked) {
          for (const i in productList) {
            productList[i].check = true
          }
        } else {
          for (const i in productList) {
            productList[i].check = false
          }
        }
      }
      setLocalCartList(state)
    },
    ClearAllCart(state, payload) {
      const { shopID } = payload
      state.cartList[shopID].productList = {}
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
