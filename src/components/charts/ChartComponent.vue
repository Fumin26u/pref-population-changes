<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import { ref, watchEffect } from 'vue'

interface Props {
    selectedPrefectures: Prefecture[]
}

const props = defineProps<Props>()

const prefectures = ref<Prefecture[]>([])
watchEffect(() => (prefectures.value = props.selectedPrefectures))
</script>
<template lang="">
    <section class="chart-area">
        {{ prefectures }}
    </section>
</template>
