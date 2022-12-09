<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import VueHighcharts from 'vue3-highcharts'
// import chartOptions from '@/assets/ts/chartOptions'
import TestComponent from './TestComponent.vue'
import { PrefInfo, PrefCharts } from '@/assets/ts/interfaces/interfaces'
import { ref, toRefs, watchEffect, computed, nextTick } from 'vue'

interface Props {
    prefPopulation: PrefInfo[]
}

const props = defineProps<Props>()
// 都道府県人口情報
const { prefPopulation } = toRefs(props)
const prefCharts = ref<PrefCharts[]>([])

const chartOptions = computed(() => ({
    title: {
        text: '都道府県の人口動態',
    },
    xAxis: {
        categories: [...Array(18)].map((_, index) => 1960 + index * 5),
    },
    yAxis: {
        title: {
            text: '人口(人)',
        },
        plotLines: [
            {
                value: 0,
                width: 1,
                color: '#888',
            },
        ],
    },
    tooltip: {
        valueSuffix: '人',
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0,
    },
    series: prefCharts.value,
    responsive: {
        rules: [
            {
                condition: {
                    maxWidth: 600,
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                    },
                },
            },
        ],
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
            name: pref.prefName,
            data: populationList,
        }
    })

    return chartData
}

// チャートを強制更新する
const renderComponent = ref<boolean>(true)
const forceRenderer = async () => {
    renderComponent.value = false
    await nextTick()
    renderComponent.value = true
}

// 都道府県人口情報が更新された際チャートを更新
watchEffect(() => {
    prefCharts.value.splice(0)
    generatePrefCharts(prefPopulation.value).map((pref) => {
        prefCharts.value.push(pref)
    })

    forceRenderer()
})
</script>
<template>
    <section class="chart-area">
        <VueHighcharts
            v-if="renderComponent"
            type="chart"
            :options="chartOptions"
        />
    </section>
</template>
