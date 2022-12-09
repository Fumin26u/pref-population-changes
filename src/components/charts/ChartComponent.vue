<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import { ref, watchEffect } from 'vue'

interface Props {
    selectedPrefectures: Prefecture[]
}

const props = defineProps<Props>()

const prefectures = ref<Prefecture[]>([])
// 親コンポーネントから渡った都道府県一覧を挿入し、コード順にソート
watchEffect(() => {
    const unSortPrefs = props.selectedPrefectures
    prefectures.value = unSortPrefs.sort((prevPref, nextPref) => {
        return prevPref.prefCode > nextPref.prefCode ? 1 : -1
    })
})
</script>
<template>
    <section class="chart-area">
        {{ prefectures }}
    </section>
</template>
