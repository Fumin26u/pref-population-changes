<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import { ref, toRefs, watch } from 'vue'

interface Props {
    selectedPrefectures: Prefecture[]
}

const props = defineProps<Props>()
const { selectedPrefectures } = toRefs(props)

const prefectures = ref<Prefecture[]>([])
// 親コンポーネントから渡った都道府県一覧を挿入し、コード順にソート
watch(selectedPrefectures, () => {
    prefectures.value = selectedPrefectures.value.sort((prevPref, nextPref) => {
        return prevPref.prefCode > nextPref.prefCode ? 1 : -1
    })
})
</script>
<template>
    <section class="chart-area">
        {{ prefectures }}
    </section>
</template>
