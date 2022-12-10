<script setup lang="ts">
import '@/assets/css/organisms/prefecture.css'
import { PrefInfo } from '@/assets/ts/interfaces/interfaces'
import { toRefs } from 'vue'

interface Props {
    prefectures: PrefInfo[]
    selectedPrefectures: PrefInfo[]
}

interface Emits {
    (emit: 'onSelectPrefecture', pref: PrefInfo): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { prefectures } = toRefs(props)
const { selectedPrefectures } = toRefs(props)

// 都道府県の選択状態に変更があった場合、PrefectureComponentに選択した都道府県を送る
const onSelectPrefecture = (pref: PrefInfo): void => {
    emit('onSelectPrefecture', pref)
}
</script>
<template>
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
</template>
