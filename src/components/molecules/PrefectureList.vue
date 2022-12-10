<script setup lang="ts">
import { PrefInfo } from '@/assets/ts/interfaces/interfaces'

interface Props {
    prefectures: PrefInfo[]
}

interface Emits {
    (emit: 'onSelectPrefecture', pref: PrefInfo): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
<template lang="">
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
