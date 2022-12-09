<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import Highcharts from 'highcharts'
import chart from '@/assets/ts/chart'
import { PrefInfo, PrefCharts } from '@/assets/ts/interfaces/interfaces'
import { ref, computed, watch } from 'vue'

interface Props {
    prefPopulation: PrefInfo[]
}

const props = defineProps<Props>()
// 都道府県人口情報
const prefInfo = computed(() => props.prefPopulation)
// グラフ描画用の都道府県人口情報
const prefCharts = ref<PrefCharts[]>([])

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
watch(prefInfo, () => {
    prefCharts.value = generatePrefCharts(prefInfo.value)
    chart.series = prefCharts.value
    Highcharts.chart('chart', chart)
})
</script>
<template>
    <section class="chart-area">
        <div id="chart"></div>
    </section>
</template>
