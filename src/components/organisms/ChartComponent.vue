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
// 表示する人口の種類
const populationType = ref<string>('0')

// グラフ描画用の人口情報を生成
const generatePrefCharts = (prefs: PrefInfo[], type: number): PrefCharts[] => {
    return prefs.map((pref) => {
        console.log(pref)
        const populationList = pref.population[type].data.map((v) => v.value)

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
    chartOptions.series = generatePrefCharts(
        prefPopulation.value,
        parseInt(populationType.value)
    )
    forceRenderer()
})
</script>
<template>
    <section class="chart-area">
        <h2>選択した都道府県の年別人口変化</h2>
        <div class="population-type-select">
            <input
                type="radio"
                value="0"
                v-model="populationType"
                id="population-type-0"
            />
            <label for="population-type-0">総人口</label>
            <input
                type="radio"
                value="1"
                v-model="populationType"
                id="population-type-1"
            />
            <label for="population-type-1">年少人口</label>
            <input
                type="radio"
                value="2"
                v-model="populationType"
                id="population-type-2"
            />
            <label for="population-type-2">生産年齢人口</label>
            <input
                type="radio"
                value="3"
                v-model="populationType"
                id="population-type-3"
            />
            <label for="population-type-3">老齢人口</label>
        </div>
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
