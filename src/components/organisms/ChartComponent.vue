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
</script>
<template>
    <section class="chart-area">
        {{ selectedPrefectures }}
    </section>
</template>
