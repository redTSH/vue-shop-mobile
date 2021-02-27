// 处理购物车的逻辑
import { computed } from 'vue'
import { useStore } from 'vuex'
export const useCartEffect = () => {
    const store = useStore()
    const { cartList } = store.state
    // 产品增减
    const handleChangeCartItem = (shopID, productID, product, num, shopName) => {
        store.commit('ChangeCartItem', { shopID, productID, product, num, shopName })
    }
    // 勾选产品
    const handleCheckCartItem = (shopID, productID) => {
        store.commit('checkCartItem', { shopID, productID })
    }
    // 全选&反选
    const handleAllCheckCart = (shopID, allChecked) => {
        store.commit('AllCheckCart', { shopID, allChecked })
    }
    // 情况购物车
    const handleClearAllCart = (shopID) => {
        store.commit('ClearAllCart', { shopID })
    }
    // 计算数量价格
    const total = computed(() => {
        const count = {}
        const weight = {}
        const money = {}
        let totalCount = 0
        for (const i in cartList) {
            const productList = cartList[i].productList
            const shopID = cartList[i].shopID
            count[shopID] = 0
            weight[shopID] = 0
            money[shopID] = 0
            for (const j in productList) {
                if (productList[j].check) {
                    count[shopID] = count[shopID] + productList[j].count
                    weight[shopID] = weight[shopID] + Number(productList[j].name.replace(/[^0-9]/ig, '')) * productList[j].count
                    money[shopID] = money[shopID] + productList[j].count * productList[j].price
                }
            }
            weight[shopID] = weight[shopID] / 1000
            money[shopID] = money[shopID].toFixed(2)
            totalCount = totalCount + count[shopID]
        }
        return { count, totalCount, weight, money }
    })
    return { cartList, total, handleChangeCartItem, handleCheckCartItem, handleAllCheckCart, handleClearAllCart }
}
