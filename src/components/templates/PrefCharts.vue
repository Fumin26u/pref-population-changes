<script setup lang="ts">
import '@/assets/css/templates/prefCharts.css'
import HeaderComponent from '@/components/organisms/HeaderComponent.vue'
import PrefectureComponent from '@/components/organisms/PrefectureComponent.vue'
import ChartComponent from '@/components/organisms/ChartComponent.vue'
import { PrefInfo } from '@/assets/ts/interfaces/interfaces'
import { ref } from 'vue'

// API通信成功の判定と表示用のエラーメッセージ
const isSuccessApiConnection = ref<boolean>(true)
const apiConnectionErrorMessage = ref<string>('')
// 子コンポーネントでのAPI通信時にエラーが発生した場合エラーメッセージを画面表示させる
const setApiConnectionError = (message: string): void => {
    isSuccessApiConnection.value = false
    apiConnectionErrorMessage.value = message
}

// 都道府県の人口情報
const prefPopulation = ref<PrefInfo[]>([])
// PrefectureComponentから送られた都道府県の人口情報を設定
const setPrefPopulation = (prefPopulations: PrefInfo[]): void => {
    prefPopulation.value = prefPopulations
}
</script>

<template>
    <HeaderComponent />
    <main class="main-content" v-if="isSuccessApiConnection">
        <PrefectureComponent
            @setPrefPopulation="setPrefPopulation"
            @setApiConnectionError="setApiConnectionError"
        />
        <ChartComponent :prefPopulation="prefPopulation" />
    </main>
    <div v-else>
        <p>{{ apiConnectionErrorMessage }}</p>
        <p>お手数ですが、時間をおいてから画面を再読み込みしてください。</p>
    </div>
</template>
