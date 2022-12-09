<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import HighCharts from 'highcharts'
import { PrefInfo } from '@/assets/ts/interfaces/interfaces'
import { computed } from 'vue'

interface Props {
    prefPopulation: PrefInfo[]
}

const props = defineProps<Props>()
// 都道府県とその人口情報
const prefInfo = computed(() => props.prefPopulation)
</script>
<template>
    <section class="chart-area">
        {{ prefInfo }}
    </section>
</template>
