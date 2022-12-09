<script setup lang="ts">
import '@/assets/css/prefCharts.css'
import PrefectureComponent from '@/components/prefectures/PrefectureComponent.vue'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import { ref } from 'vue'

// 選択された都道府県一覧
const selectedPrefectures = ref<Prefecture[]>([])

// 子コンポーネントの都道府県一覧のチェックボックスの選択内容を反映
const onSelectPrefecture = (prefs: Prefecture[]): void => {
    selectedPrefectures.value = prefs
    console.log(selectedPrefectures.value)
}
</script>

<template>
    <main class="main-content">
        <PrefectureComponent @onSelectPrefecture="onSelectPrefecture" />
    </main>
</template>
