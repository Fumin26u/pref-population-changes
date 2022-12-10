<script setup lang="ts">
import '@/assets/css/organisms/prefecture.css'
import PrefectureCheckbox from '@/components/molecules/PrefectureCheckbox.vue'
import endpoint from '@/assets/ts/endpoint'
import getPrefInfo from '@/components/api/getPrefInfo'
import {
    Pref,
    PrefInfo,
    PopulationInfo,
} from '@/assets/ts/interfaces/interfaces'
import { ref, onMounted } from 'vue'

interface Emits {
    (emit: 'setPrefPopulation', prefPopulations: PrefInfo[]): void
}
const emit = defineEmits<Emits>()

// 都道府県一覧
const prefectures = ref<Pref[]>([])
// 選択された都道府県一覧
const selectedPrefectures = ref<Pref[]>([])
// 都道府県の人口情報
const prefPopulation = ref<PrefInfo[]>([])
// 表示する人口の種類
const populationType = ref<string>('0')

// APIから指定された都道府県の人口情報を取得する
const getPrefPopulation = async (
    prefCode: number,
    type: number
): Promise<PopulationInfo> => {
    const url = endpoint + 'api/v1/population/composition/perYear'
    const prefInfo = await getPrefInfo(url, {
        params: {
            prefCode: prefCode,
            cityCode: '-',
        },
    })

    console.log(prefInfo.data[type])
    return prefInfo.data[type]
}

// 配列が都道府県コード順になるように該当の都道府県の挿入位置を取得する
const getPushPrefInfoAt = (haystack: Pref[], needle: Pref): number => {
    const index = haystack.findIndex(
        (stack) => stack.prefCode > needle.prefCode
    )
    return index !== -1 ? index : haystack.length
}

// 都道府県の選択状態に変更があった場合、選択内容と人口動態内容を変更
const onSelectPrefecture = async (pref: Pref) => {
    const prefIndex = selectedPrefectures.value.indexOf(pref)
    if (prefIndex !== -1) {
        // checkboxで選択が解除された場合削除
        selectedPrefectures.value.splice(prefIndex, 1)
        prefPopulation.value.splice(prefIndex, 1)
    } else {
        // 選択された場合人口情報と選択都道府県一覧の指定位置にデータを追加
        selectedPrefectures.value.splice(
            getPushPrefInfoAt(selectedPrefectures.value, pref),
            0,
            pref
        )
        prefPopulation.value.splice(
            getPushPrefInfoAt(prefPopulation.value, pref),
            0,
            {
                ...pref,
                population: await getPrefPopulation(
                    pref.prefCode,
                    parseInt(populationType.value)
                ),
            }
        )
    }

    emit('setPrefPopulation', prefPopulation.value)
}

// viewでlabelとinputの接続のためのidを作成する
const setPrefId = (prefs: Pref[]): Pref[] => {
    prefs.map((pref: Pref, index: number) => {
        prefs[index]['prefId'] = 'pref_' + pref.prefCode
    })
    return prefs
}

// APIから都道府県一覧を取得する
const getPrefectures = async (): Promise<Pref[]> => {
    const url = endpoint + 'api/v1/prefectures'
    return await getPrefInfo(url)
}

// 画面読み込み時、取得した都道府県一覧をRefオブジェクトに挿入
onMounted(async () => {
    prefectures.value = setPrefId(await getPrefectures())
})
</script>

<template>
    <section class="pref-area">
        <h2>都道府県を選択</h2>
        <div class="pref-list">
            <PrefectureCheckbox
                v-for="prefecture in prefectures"
                :key="prefecture.prefCode"
                :prefecture="prefecture"
                :selectedPrefectures="selectedPrefectures"
                @onSelectPrefecture="onSelectPrefecture"
            />
        </div>
        <div class="population-type-select">
            <input
                type="radio"
                value="0"
                v-model="populationType"
                id="population-type-0"
            />
            <label for="population-type-0">総人口</label>
            <input
                type="radio"
                value="1"
                v-model="populationType"
                id="population-type-1"
            />
            <label for="population-type-1">年少人口</label>
            <input
                type="radio"
                value="2"
                v-model="populationType"
                id="population-type-2"
            />
            <label for="population-type-2">生産年齢人口</label>
            <input
                type="radio"
                value="3"
                v-model="populationType"
                id="population-type-3"
            />
            <label for="population-type-3">老齢人口</label>
        </div>
    </section>
</template>
