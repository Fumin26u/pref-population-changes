<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import endpoint from '@/assets/ts/endpoint'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import axios from '@/assets/plugins/setApiKey'
import { ref, toRefs, watch } from 'vue'

interface Props {
    selectedPrefectures: Prefecture[]
    prefDiffs: Prefecture | undefined
}

const props = defineProps<Props>()
// Propsで送られた選択された都道府県一覧
const { selectedPrefectures } = toRefs(props)
// 都道府県の更新差分
const { prefDiffs } = toRefs(props)

// 都道府県の人口情報
const prefPopulation = ref<any>([])

// 指定した都道府県の人口情報をAPIから取得して挿入する
const getPrefPopulation = async (prefCode: number): Promise<any> => {
    const url = endpoint + 'api/v1/population/composition/perYear'
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

watch(selectedPrefectures, async () => {
    console.log(prefDiffs.value)
    if (prefDiffs.value !== undefined) {
        prefPopulation.value.push(
            await getPrefPopulation(prefDiffs.value.prefCode)
        )
        console.log(prefPopulation.value)
    }
})
</script>
<template>
    <section class="chart-area">
        {{ selectedPrefectures }}
    </section>
</template>
