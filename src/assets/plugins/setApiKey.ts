import axios from 'axios'
const axios_instance = axios.create()
axios_instance.interceptors.request.use((config) => {
    config.headers = {
        'X-API-KEY': '' /* ここにAPIKeyが入る */,
    }
    return config
})

export default axios_instance
