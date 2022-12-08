<script setup lang="ts">
import endpoint from '@/assets/ts/endpoint'
import { Prefecture } from '@/assets/ts/interfaces/interfaces'
import axios from '@/assets/plugins/setApiKey'
import { ref, onMounted } from 'vue'

// 都道府県一覧
const prefectures = ref<Prefecture[]>([])
// 選択された都道府県一覧
const selectedPrefectures = ref<Prefecture[]>([])

// viewでlabelとinputの接続のためのidを作成する
const setPrefId = (prefs: Prefecture[]): Prefecture[] => {
    console.log(prefs)
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
    console.log(prefectures.value)
})
</script>

<template>
    <section class="pref-area">
        <div>This is PrefectureComponent.vue</div>
        <div>
            <p>選択している都道府県：</p>
            <span
                v-for="(selectedPrefecture, index) in selectedPrefectures"
                :key="index"
                >{{ selectedPrefecture.prefName }}</span
            >
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
                />
                <label :for="prefecture.prefId">{{
                    prefecture.prefName
                }}</label>
            </div>
        </div>
    </section>
</template>
