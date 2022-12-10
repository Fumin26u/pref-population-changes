<script setup lang="ts">
import '@/assets/css/organisms/chart.css'
import chartOptions from '@/assets/ts/chartOptions'
import VueHighcharts from 'vue3-highcharts'
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
        const populationList = pref.population[0].data.map((v) => v.value)

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
        <h2>選択した都道府県の年別人口変化</h2>
        <div class="chart-detail">
            <VueHighcharts
                class="chart"
                v-if="prefPopulation.length > 0 && renderComponent"
                type="chart"
                :options="chartOptions"
            />
            <div v-else class="not-selected">
                <p>都道府県が選択されていません。</p>
            </div>
        </div>
    </section>
</template>
