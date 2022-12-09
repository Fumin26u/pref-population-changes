<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import endpoint from '@/assets/ts/endpoint'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import axios from '@/assets/plugins/setApiKey'
import { ref, toRefs, watch } from 'vue'

interface Props {
    selectedPrefectures: Prefecture[]
    prefDiffs: Prefecture[]
}

const props = defineProps<Props>()
// Propsで送られた選択された都道府県一覧
const { selectedPrefectures } = toRefs(props)
// 都道府県の更新差分
const { prefDiffs } = toRefs(props)

// 都道府県の人口情報
const prefPopulation = ref<any>([])

// 指定した都道府県の人口情報をAPIから取得して挿入する
const getPopulationInfo = async (
    url: string,
    prefCode: number
): Promise<any> => {
    console.log(url, prefCode)
    return await axios
        .get(url, {
            params: {
                prefCode: prefCode,
                cityCode: '-',
            },
        })
        .then((response) => {
            return response.data.result
        })
        .catch((error) => {
            console.log(error)
            return
        })
}

const getPrefPopulation = async (prefs: Prefecture[]): Promise<any> => {
    const url = endpoint + 'api/v1/population/composition/perYear'
    const populations: any = []

    prefs.map(async (pref) => {
        populations.push(await getPopulationInfo(url, pref.prefCode))
    })

    return await populations
}
watch(selectedPrefectures, async () => {
    prefPopulation.value.push(await getPrefPopulation(prefDiffs.value))
    // console.log(prefPopulation.value)
})
</script>
<template>
    <section class="chart-area">
        {{ selectedPrefectures }}
    </section>
</template>
