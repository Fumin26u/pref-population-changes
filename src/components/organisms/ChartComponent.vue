<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import { PrefInfo } from '@/assets/ts/interfaces/interfaces'
import { ref, toRefs, watch } from 'vue'

interface Props {
    prefPopulation: PrefInfo[]
}

const props = defineProps<Props>()

const { prefPopulation } = toRefs(props)
const prefInfo = ref<PrefInfo[]>([])
watch(prefPopulation, () => {
    prefInfo.value = prefPopulation.value
    console.log(prefInfo.value)
})
</script>
<template>
    <section class="chart-area">
        {{ prefInfo }}
    </section>
</template>
