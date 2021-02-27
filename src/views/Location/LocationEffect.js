import { reactive, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'
export const useLocationEffect = (locationId) => {
    const router = useRouter()
    const handleBackBtn = () => {
        router.back()
    }

    const locationInfo = computed(() => {
        const locationInfo = listObj?.value?.[locationId] || { city: '', department: '', houseNumber: '', name: '', phone: '' }
        return locationInfo
    })

    const data = reactive({ list: [], listObj: {} })
    const handleGetAddress = async () => {
        try {
            const result = await get('/api/user/address')
            if (result?.data?.errno === 0 && result?.data?.data?.length) {
                data.list = result.data.data
                const locationList = result.data.data
                locationList.forEach(location => {
                    const id = location._id
                    data.listObj[id] = location
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleGetAddress()
    const { list, listObj } = toRefs(data)
    return { list, listObj, handleBackBtn, locationInfo }
}
