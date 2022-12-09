<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import chartOptions from '@/assets/ts/chartOptions'
import { PrefInfo, PrefCharts } from '@/assets/ts/interfaces/interfaces'
import { ref, toRefs, watchEffect, nextTick } from 'vue'

interface Props {
    prefPopulation: PrefInfo[]
}

const props = defineProps<Props>()
// 都道府県人口情報
const { prefPopulation } = toRefs(props)

// グラフ描画用の人口情報を生成
const generatePrefCharts = (prefs: PrefInfo[]): PrefCharts[] => {
    return prefs.map((pref) => {
        const populationList =
            pref.population === undefined
                ? []
                : pref.population[0].data.map((v) => v.value)

        return {
            name: pref.prefName,
            data: populationList,
        }
    })
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
    chartOptions.series = generatePrefCharts(prefPopulation.value)
    forceRenderer()
})
</script>
<template>
    <section class="chart-area">
        <VueHighcharts
            v-if="prefPopulation.length > 0 && renderComponent"
            type="chart"
            :options="chartOptions"
        />
        <div v-else>
            <p>都道府県が選択されていません。</p>
        </div>
    </section>
</template>
