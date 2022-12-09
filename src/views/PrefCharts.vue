<script setup lang="ts">
import '@/assets/css/prefCharts.css'
import PrefectureComponent from '@/components/prefectures/PrefectureComponent.vue'
import ChartComponent from '@/components/charts/ChartComponent.vue'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import { ref } from 'vue'

// 選択された都道府県一覧
const selectedPrefectures = ref<Prefecture[]>([])

// 子コンポーネントの都道府県一覧のチェックボックスの選択内容を反映
const onSelectPrefecture = (pref: Prefecture): void => {
    // 選択された都道府県一覧にデータが存在する場合、そのデータを削除
    const prefIndex = selectedPrefectures.value.indexOf(pref)
    if (prefIndex !== -1) {
        selectedPrefectures.value.splice(prefIndex, 1)
    } else {
        // 存在しない場合、都道府県コードの昇順でデータを挿入
    }
}
</script>

<template>
    <main class="main-content">
        <PrefectureComponent @onSelectPrefecture="onSelectPrefecture" />
        <ChartComponent :selectedPrefectures="selectedPrefectures" />
    </main>
</template>
