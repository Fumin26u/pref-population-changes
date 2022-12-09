<script setup lang="ts">
import '@/assets/css/charts/chart.css'
import endpoint from '@/assets/ts/endpoint'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import axios from '@/assets/plugins/setApiKey'
import { ref, toRefs, watch } from 'vue'

interface Props {
    selectedPrefectures: Prefecture[]
    prefDiffs: Prefecture | undefined
}

const props = defineProps<Props>()
</script>
<template>
    <section class="chart-area">
        {{ selectedPrefectures }}
    </section>
</template>
