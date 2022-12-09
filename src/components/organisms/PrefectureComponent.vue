<script setup lang="ts">
import '@/assets/css/prefectures/prefecture.css'
import endpoint from '@/assets/ts/endpoint'
import { PrefInfo, PopulationInfo } from '@/assets/ts/interfaces/interfaces'
import axios from '@/assets/plugins/setApiKey'
import { ref, onMounted } from 'vue'

interface Emits {
    (emit: 'setPrefPopulation', prefPopulations: PrefInfo[]): void
}
const emit = defineEmits<Emits>()

// 都道府県一覧
const prefectures = ref<PrefInfo[]>([])
// 選択された都道府県一覧
const selectedPrefectures = ref<PrefInfo[]>([])
// 都道府県の人口情報
const prefPopulation = ref<PrefInfo[]>([])

// 都道府県データをコード順にソートしたものを取得
const sortPrefCodeAsc = (prefs: PrefInfo[]): PrefInfo[] => {
    const sortedPrefs = prefs.sort((prev, next) => {
        return prev.prefCode > next.prefCode ? 1 : -1
    })
    return sortedPrefs
}

// APIから指定された都道府県の人口情報を取得する
const getPrefPopulation = async (
    prefCode: number
): Promise<PopulationInfo[]> => {
    const url = endpoint + 'api/v1/population/composition/perYear'
    return await axios
        .get(url, {
            params: {
                prefCode: prefCode,
                cityCode: '-',
            },
        })
        .then((response) => {
            // 利用するのは人口データのみなのでそれを返す
            return response.data.result.data
        })
        .catch((error) => {
            console.log(error)
            return
        })
}

// 都道府県の選択状態に変更があった場合、選択内容と人口動態内容を変更
const onSelectPrefecture = async (pref: PrefInfo) => {
    const prefIndex = selectedPrefectures.value.indexOf(pref)
    // checkboxで選択が解除された場合削除
    if (prefIndex !== -1) {
        selectedPrefectures.value.splice(prefIndex, 1)
        prefPopulation.value.splice(prefIndex, 1)
    } else {
        // 選択された場合人口情報と選択された都道府県一覧にデータを追加しソート
        selectedPrefectures.value.push(pref)
        selectedPrefectures.value = sortPrefCodeAsc(selectedPrefectures.value)

        prefPopulation.value.push({
            ...pref,
            population: await getPrefPopulation(pref.prefCode),
        })
        prefPopulation.value = sortPrefCodeAsc(prefPopulation.value)
    }

    emit('setPrefPopulation', prefPopulation.value)
}

// viewでlabelとinputの接続のためのidを作成する
const setPrefId = (prefs: PrefInfo[]): PrefInfo[] => {
    prefs.map((pref: PrefInfo, index: number) => {
        prefs[index]['prefId'] = 'pref_' + pref.prefCode
    })
    return prefs
}

// APIから都道府県一覧を取得する
const getPrefectures = async (): Promise<PrefInfo[]> => {
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
                    @click="onSelectPrefecture(prefecture)"
                />
                <label :for="prefecture.prefId">
                    {{ prefecture.prefName }}
                </label>
            </div>
        </div>
    </section>
</template>
