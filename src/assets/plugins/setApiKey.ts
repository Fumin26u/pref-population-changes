import axios from 'axios'
const axios_instance = axios.create()
axios_instance.interceptors.request.use((config) => {
    config.headers = {
        'X-API-KEY': process.env.VUE_APP_RESAS_API_KEY,
    }
    return config
})

export default axios_instance
