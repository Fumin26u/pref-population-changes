<script setup lang="ts">
import '@/assets/css/charts/chart.css'
// import chartOptions from '@/assets/ts/chartOptions'
import { PrefInfo, PrefCharts } from '@/assets/ts/interfaces/interfaces'
import { ref, toRefs, watchEffect, computed } from 'vue'

interface Props {
    prefPopulation: PrefInfo[]
}

const props = defineProps<Props>()
// 都道府県人口情報
const { prefPopulation } = toRefs(props)
const chartData = ref<PrefCharts[]>([])

const chartOptions = computed(() => ({
    type: 'line',
    datasets: chartData.value,
    options: {
        title: {
            display: true,
            text: '各都道府県の年別人口動態',
        },
        plugins: {
            scheme: 'brewer.Paired12',
        },
    },
}))

// グラフ描画用の人口情報を生成
const generatePrefCharts = (prefs: PrefInfo[]): PrefCharts[] => {
    const chartData = prefs.map((pref) => {
        const populationList =
            pref.population === undefined
                ? []
                : pref.population[0].data.map((v) => v.value)

        return {
            label: pref.prefName,
            data: populationList,
        }
    })

    return chartData
}

// 都道府県人口情報が更新された際チャートを更新
watchEffect(() => {
    chartData.value = generatePrefCharts(prefPopulation.value)
})
</script>
<template>
    <section class="chart-area">
        {{ chartOptions.datasets }}
    </section>
</template>
