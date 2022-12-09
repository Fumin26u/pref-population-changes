<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import { ref, toRefs, watch } from 'vue'

interface Props {
    selectedPrefectures: Prefecture[]
    prefDiffs: Prefecture[]
}

const props = defineProps<Props>()
// Propsで送られた選択された都道府県一覧
const { selectedPrefectures } = toRefs(props)
// 都道府県の更新さ文
const { prefDiffs } = toRefs(props)

// 都道府県の人口情報
const prefPopulation = ref<any>([])

// 親コンポーネントから渡った都道府県一覧を挿入し、コード順にソート
watch(selectedPrefectures, () => {
    console.log(selectedPrefectures)
    console.log(prefDiffs)
})
</script>
<template>
    <section class="chart-area">
        {{ selectedPrefectures }}
    </section>
</template>
