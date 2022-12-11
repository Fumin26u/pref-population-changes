<script setup lang="ts">
import '@/assets/css/organisms/chart.css'
import chartOptions from '@/assets/ts/chartOptions'
import PopulationTypes from '@/components/molecules/PopulationTypes.vue'
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
const populationType = ref<number>(0)
const populationName = ref<string>('総人口')

// 人口の種類のラジオボタンが変更された際、グラフとタイトルの表示を変更
const setPopulationType = (popuType: { [key: string]: string }): void => {
    populationType.value = parseInt(popuType.type)
    populationName.value = popuType.name
}

// グラフ描画用の人口情報を生成
const generatePrefCharts = (prefs: PrefInfo[], type: number): PrefCharts[] => {
    return prefs.map((pref) => {
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
        populationType.value
    )
    forceRenderer()
})
</script>
<template>
    <section class="chart-area">
        <h2>選択した都道府県の{{ populationName }}統計</h2>
        <PopulationTypes @setPopulationType="setPopulationType" />
        <div
            class="chart-detail"
            v-if="prefPopulation.length > 0 && renderComponent"
        >
            <VueHighcharts class="chart" type="chart" :options="chartOptions" />
            <small class="caption">※2015年以降は推計値</small>
        </div>
        <div v-else class="not-selected">
            <p>都道府県が選択されていません。</p>
        </div>
    </section>
</template>
