<script setup lang="ts">
import '@/assets/css/molecules/prefectureList.css'
import { Pref } from '@/assets/ts/interfaces/interfaces'
import { toRefs } from 'vue'

interface Props {
    prefecture: Pref
    selectedPrefectures: Pref[]
}

interface Emits {
    (emit: 'onSelectPrefecture', pref: Pref): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { prefecture } = toRefs(props)
const { selectedPrefectures } = toRefs(props)

// 都道府県の選択状態に変更があった場合、PrefectureComponentに選択した都道府県を送る
const onSelectPrefecture = (pref: Pref): void => {
    emit('onSelectPrefecture', pref)
}
</script>
<template>
    <div class="prefecture">
        <div
            :class="[
                selectedPrefectures.includes(prefecture) ? 'selected' : '',
                'checkbox-label',
            ]"
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
</template>
