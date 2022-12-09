<script setup lang="ts">
import { toRefs, watchEffect } from 'vue'
interface Props {
    options: any
}

const props = defineProps<Props>()

const { options } = toRefs(props)
watchEffect(() => console.log(options.value))
</script>

<template>
    <div>{{ options }}</div>
</template>
