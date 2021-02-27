import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
    timeout: 10000
})

export const postJSON = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data, {
            headers: {
                'Conrent-Type': 'application/json'
            }
        }).then(response => {
            resolve(response)
        }, err => {
            reject(err)
        })
    })
}

export const get = (url, param = {}) => {
    return new Promise((resolve, reject) => {
        instance.get(url, param).then(response => {
            resolve(response)
        }, err => {
            reject(err)
        })
    })
}
