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

// 都道府県の更新差分を取得
const getPrefDiffs = (
    prevPrefs: Prefecture[],
    newPrefs: Prefecture[]
): Prefecture[] => {
    return newPrefs.filter((pref) => prevPrefs.indexOf(pref) === -1)
}

// 都道府県をコード順にソートしたものを取得
const getPrefCodeAsc = (prefs: Prefecture[]): Prefecture[] => {
    const sortedPrefs = prefs.sort((prev, next) => {
        return prev.prefCode > next.prefCode ? 1 : -1
    })
    return sortedPrefs
}

// 子コンポーネントの都道府県一覧のチェックボックスの選択内容を反映
const onSelectPrefecture = (prefs: Prefecture[]): void => {
    prefDiffs.value = getPrefDiffs(selectedPrefectures.value, prefs)[0]
    selectedPrefectures.value = getPrefCodeAsc(prefs)
}
</script>

<template>
    <HeaderComponent />
    <main class="main-content">
        <PrefectureComponent @onSelectPrefecture="onSelectPrefecture" />
        <ChartComponent
            :selectedPrefectures="selectedPrefectures"
            :prefDiffs="prefDiffs"
        />
    </main>
</template>
