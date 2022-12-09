<script setup lang="ts">
import '@/assets/css/prefectures/prefecture.css'
import endpoint from '@/assets/ts/endpoint'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import axios from '@/assets/plugins/setApiKey'
import { ref, onMounted } from 'vue'

interface Emits {
    (emit: 'onSelectPrefecture', pref: Prefecture): void
}

const emit = defineEmits<Emits>()

// 都道府県一覧
const prefectures = ref<Prefecture[]>([])
// 選択された都道府県一覧
const selectedPrefectures = ref<Prefecture[]>([])

// checkboxで選択された都道府県を親コンポーネントに送る
const onSelectPrefecture = (pref: Prefecture) => {
    emit('onSelectPrefecture', pref)
}

// viewでlabelとinputの接続のためのidを作成する
const setPrefId = (prefs: Prefecture[]): Prefecture[] => {
    prefs.map((pref: Prefecture, index: number) => {
        prefs[index]['prefId'] = 'pref_' + pref.prefCode
    })
    return prefs
}

// APIから都道府県一覧を取得する
const getPrefectures = async (): Promise<Prefecture[]> => {
    const url = endpoint + 'api/v1/prefectures'
    return await axios
        .get(url)
        .then((response) => {
            return response.data.result
        })
        .catch((error) => {
            console.log(error)
            return
        })
}

// 画面読み込み時、取得した都道府県一覧をRefオブジェクトに挿入
onMounted(async () => {
    prefectures.value = setPrefId(await getPrefectures())
})
</script>

<template>
    <section class="pref-area">
        <div class="pref-selected">
            <p>選択している都道府県：</p>
            <p
                v-for="(selectedPrefecture, index) in selectedPrefectures"
                :key="index"
            >
                {{ selectedPrefecture.prefName }}
            </p>
        </div>
        <div class="pref-list">
            <div
                class="prefecture"
                v-for="prefecture in prefectures"
                :key="prefecture.prefCode"
            >
                <input
                    type="checkbox"
                    v-model="selectedPrefectures"
                    :value="prefecture"
                    :id="prefecture.prefId"
                    @change="onSelectPrefecture(prefecture)"
                />
                <label :for="prefecture.prefId">
                    {{ prefecture.prefName }}
                </label>
            </div>
        </div>
    </section>
</template>
