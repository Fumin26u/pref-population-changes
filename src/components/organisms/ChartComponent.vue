<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import chartOptions from '@/assets/ts/chartOptions'
import { PrefInfo, PrefCharts } from '@/assets/ts/interfaces/interfaces'
import { toRefs, watchEffect } from 'vue'

interface Props {
    prefPopulation: PrefInfo[]
}

const props = defineProps<Props>()
// 都道府県人口情報
const { prefPopulation } = toRefs(props)

// グラフ描画用の人口情報を生成
const generatePrefCharts = (prefs: PrefInfo[]): PrefCharts[] => {
    const chartData = prefs.map((pref) => {
        const populationList =
            pref.population === undefined
                ? []
                : pref.population[0].data.map((v) => v.value)

        return {
            name: pref.prefName,
            data: populationList,
        }
    })

    return chartData
}

// 都道府県人口情報が更新された際チャートを更新
watchEffect(() => {
    chartOptions.series = generatePrefCharts(prefPopulation.value)
})
</script>
<template>
    <section class="chart-area">
        {{ chartOptions.series }}
    </section>
</template>
