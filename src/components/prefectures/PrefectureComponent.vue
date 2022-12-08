<script setup lang="ts">
import endpoint from '@/assets/ts/endpoint'
import axios from '@/assets/plugins/setApiKey'
import { ref, onMounted } from 'vue'

// 都道府県一覧
const prefectures = ref<any>([])

// APIから都道府県一覧を取得する
const getPrefectures = async () => {
    const url = endpoint + 'api/v1/prefectures'
    return await axios
        .get(url)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error)
            return
        })
}

// 画面読み込み時、取得した都道府県一覧をRefオブジェクトに挿入
onMounted(async () => {
    prefectures.value = await getPrefectures()
    console.log(prefectures.value)
})
</script>

<template>
    <div>This is PrefectureComponent.vue</div>
</template>
