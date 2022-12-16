<script setup lang="ts">
import '@/assets/css/organisms/prefecture.css'
import PrefectureCheckbox from '@/components/molecules/PrefectureCheckbox.vue'
import { getPrefInfo, getPopulationInfo } from '@/components/api/getPrefInfo'
import {
    Pref,
    PopulationInfo,
    TransferPrefInfo,
} from '@/assets/ts/interfaces/interfaces'
import { ref, onMounted } from 'vue'

interface Emits {
    (emit: 'setPrefInfo', prefInfo: TransferPrefInfo): void
    (emit: 'setApiConnectionError', message: string): void
}
const emit = defineEmits<Emits>()

// API通信に失敗した場合、PrefChartsにエラーメッセージを送信
const setApiConnectionError = (message: string): void => {
    emit('setApiConnectionError', message)
}

// APIから指定された都道府県の人口情報を取得する
const getPrefPopulation = async (
    prefCode: number
): Promise<PopulationInfo[]> => {
    const prefInfo = await getPopulationInfo({
        params: {
            prefCode: prefCode,
            cityCode: '-',
        },
    })

    if (prefInfo.status === 'error') setApiConnectionError(prefInfo.content)
    return prefInfo.content.data
}

// 配列が都道府県コード順になるように該当の都道府県の挿入位置を取得する
const getPushPrefInfoAt = (haystack: Pref[], needle: Pref): number => {
    const index = haystack.findIndex(
        (stack) => stack.prefCode > needle.prefCode
    )
    return index !== -1 ? index : haystack.length
}

// 都道府県一覧
const prefectures = ref<Pref[]>([])
// 選択された都道府県一覧
const selectedPrefectures = ref<Pref[]>([])
// 都道府県の選択の有効状態
const isPrefSelectable = ref<boolean>(true)

// 都道府県の選択状態に変更があった場合、都道府県情報を更新し選択内容をPrefChartsに送信
// この処理が完了するまで都道府県の選択を無効にする
const onSelectPrefecture = async (pref: Pref): Promise<void> => {
    isPrefSelectable.value = false

    const prefIndex = selectedPrefectures.value.indexOf(pref)
    if (prefIndex !== -1) {
        // checkboxで選択が解除された場合削除
        selectedPrefectures.value.splice(prefIndex, 1)
        emit('setPrefInfo', {
            method: 'remove',
            index: prefIndex,
        })
    } else {
        // 選択された場合人口情報と選択都道府県一覧の指定位置にデータを追加
        const pushIndex = getPushPrefInfoAt(selectedPrefectures.value, pref)
        selectedPrefectures.value.splice(pushIndex, 0, pref)
        emit('setPrefInfo', {
            method: 'push',
            index: pushIndex,
            prefInfo: {
                ...pref,
                population: await getPrefPopulation(pref.prefCode),
            },
        })
    }

    isPrefSelectable.value = true
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
    const prefInfo = await getPrefInfo()

    if (prefInfo.status === 'error') setApiConnectionError(prefInfo.content)
    return await prefInfo.content
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
            <div class="select-disabled-cover" v-show="!isPrefSelectable"></div>
        </div>
    </section>
</template>
