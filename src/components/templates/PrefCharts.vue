<script setup lang="ts">
import '@/assets/css/templates/prefCharts.css'
import HeaderComponent from '@/components/organisms/HeaderComponent.vue'
import PrefectureComponent from '@/components/organisms/PrefectureComponent.vue'
import ChartComponent from '@/components/organisms/ChartComponent.vue'
import { PrefInfo } from '@/assets/ts/interfaces/interfaces'
import { ref } from 'vue'

// 都道府県の人口情報
const prefPopulation = ref<PrefInfo[]>([])
// 子コンポーネントから送られた都道府県の人口情報を設定
const setPrefPopulation = (prefPopulations: PrefInfo[]): void => {
    prefPopulation.value = prefPopulations
}
</script>

<template>
    <HeaderComponent />
    <main class="main-content">
        <PrefectureComponent @setPrefPopulation="setPrefPopulation" />
        <ChartComponent :prefPopulation="prefPopulation" />
    </main>
</template>
