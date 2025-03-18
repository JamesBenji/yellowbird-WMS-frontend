<template>
    <a
    :href="formattedPath" :target="external ? '_blank' : '_self'"
    :rel="external ? 'noopener noreferrer' : 'null'"
    class="w-full flex items-center justify-between underline"
    :style="{color: BLUE}"
    >
        <slot></slot>
        <img src="/icons/link.svg" alt="Page link" class="w-4 h-4 object-contain">
    </a>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { BLUE } from '@/config/colors'

export default defineComponent({
  name: 'DynamicLink',
  props: {
    path: {
      type: String,
      required: true
    },
    absolute: {
      type: Boolean,
      required: false
    }
  },
  setup (props) {
    const formattedPath = computed(() => {
      if (props.absolute) {
        return props.path
      }

      return `/dashboard${props.path.startsWith('/') ? '' : '/'}${props.path}`
    })

    const external = computed(() => {
      return !!(props.path.startsWith('http') || props.path.startsWith('//'))
    })

    return {
      formattedPath,
      external,
      BLUE
    }
  }
})
</script>
