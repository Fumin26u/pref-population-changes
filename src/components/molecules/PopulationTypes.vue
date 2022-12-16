<script setup lang="ts">
import '@/assets/css/molecules/populationTypes.css'
import { ref, watch } from 'vue'

interface Emits {
    (
        emit: 'setPopulationType',
        selectedPopulationType: { [key: string]: string }
    ): void
}
const emit = defineEmits<Emits>()

const selectedType = ref<string>('0')
const populationTypes = [
    {
        type: '0',
        name: '総人口',
    },
    {
        type: '1',
        name: '年少人口',
    },
    {
        type: '2',
        name: '生産年齢人口',
    },
    {
        type: '3',
        name: '老齢人口',
    },
]

// 人口種別が変更された際ChartComponentに変更内容を送信
watch(selectedType, () => {
    emit('setPopulationType', populationTypes[parseInt(selectedType.value)])
})
</script>
<template>
    <div class="population-type-select">
        <div
            class="radio-label"
            v-for="populationType in populationTypes"
            :key="populationType.type"
        >
            <input
                type="radio"
                :value="populationType.type"
                v-model="selectedType"
                :id="'population-type-' + populationType.type"
            />
            <label :for="'population-type-' + populationType.type">
                {{ populationType.name }}
            </label>
        </div>
    </div>
</template>
