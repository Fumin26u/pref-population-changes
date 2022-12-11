<script setup lang="ts">
import '@/assets/css/templates/prefCharts.css'
import HeaderComponent from '@/components/organisms/HeaderComponent.vue'
import PrefectureComponent from '@/components/organisms/PrefectureComponent.vue'
import ChartComponent from '@/components/organisms/ChartComponent.vue'
import { TransferPrefInfo } from '@/assets/ts/interfaces/interfaces'
import { ref } from 'vue'

// API通信成功の判定と表示用のエラーメッセージ
const isSuccessApiConnection = ref<boolean>(true)
const apiConnectionErrorMessage = ref<string>('')
// API通信時にエラーが発生した場合エラーメッセージを画面表示させる
const setApiConnectionError = (message: string): void => {
    isSuccessApiConnection.value = false
    apiConnectionErrorMessage.value = message
}

// 都道府県の人口情報
const transferPrefInfo = ref<TransferPrefInfo>()
// PrefectureComponentから送られた都道府県の人口情報を設定
const setPrefInfo = (prefInfo: TransferPrefInfo): void => {
    transferPrefInfo.value = prefInfo
}
</script>

<template>
    <HeaderComponent />
    <main class="main-content" v-if="isSuccessApiConnection">
        <PrefectureComponent
            @setPrefInfo="setPrefInfo"
            @setApiConnectionError="setApiConnectionError"
        />
        <ChartComponent :transferPrefInfo="transferPrefInfo" />
    </main>
    <div v-else>
        <p>{{ apiConnectionErrorMessage }}</p>
        <p>お手数ですが、時間をおいてから画面を再読み込みしてください。</p>
    </div>
</template>
