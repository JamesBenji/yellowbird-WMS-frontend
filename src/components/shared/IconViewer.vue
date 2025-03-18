<template>
    <img
        :src="src"
        :class="smallIcons ? 'w-6 h-6 mr-4 object-contain' : 'w-8 h-8 mr-2 object-contain'"
        :alt="altText"
    >
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

withDefaults(defineProps<{
src: string,
altText: string
smallIcons?: boolean
}>(), {
  smallIcons: false
})

</script>
