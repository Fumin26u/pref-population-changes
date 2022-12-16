import axios from '@/assets/plugins/setApiKey'
import endpoint from '@/assets/ts/endpoint'

// 指定されたURL、Configを基に都道府県情報を取得し返却
export const getPrefInfo = async (config: object = {}) => {
    const apiPath = endpoint + 'api/v1/prefectures'
    return await axios
        .get(apiPath, config)
        .then((response) => {
            return {
                status: 'success',
                content: response.data.result,
            }
        })
        .catch((error) => {
            console.log(error)
            return {
                status: 'error',
                content: '都道府県情報を取得できませんでした。',
            }
        })
}

// 指定されたURL、Configを基に人口情報を取得し返却
export const getPopulationInfo = async (config: object = {}) => {
    const apiPath = endpoint + 'api/v1/population/composition/perYear'
    return await axios
        .get(apiPath, config)
        .then((response) => {
            return {
                status: 'success',
                content: response.data.result,
            }
        })
        .catch((error) => {
            console.log(error)
            return {
                status: 'error',
                content: '指定された都道府県の人口情報を取得できませんでした。',
            }
        })
}
