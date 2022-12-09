<script setup lang="ts">
import '@/assets/css/prefCharts.css'
import HeaderComponent from '@/components/organisms/HeaderComponent.vue'
import PrefectureComponent from '@/components/organisms/PrefectureComponent.vue'
import ChartComponent from '@/components/organisms/ChartComponent.vue'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import { ref } from 'vue'

// 選択された都道府県一覧
const selectedPrefectures = ref<Prefecture[]>([])
// 選択された都道府県の更新差分
const prefDiffs = ref<Prefecture>()
</script>

<template>
    <HeaderComponent />
    <main class="main-content">
        <PrefectureComponent />
        <ChartComponent
            :selectedPrefectures="selectedPrefectures"
            :prefDiffs="prefDiffs"
        />
    </main>
</template>
