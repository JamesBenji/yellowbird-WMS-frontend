<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[200px]">
    <!-- Header Section -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 h-12">
      <div class="flex items-center">
        <!-- Icon Section -->
        <IconViewer v-if="iconSrc" :src="iconSrc ?? '/icons/info.svg'" :altText="title + ' icon'" />
        <span v-else :class="['w-6 h-6 mr-2 rounded-full', iconClass]" />
        <h3 class="text-sm font-medium text-gray-700">{{ title }}</h3>
      </div>

      <div class="relative group">
        <span class="text-sm text-gray-400 cursor-pointer">
          <img
            src="/icons/info.svg"
            class="w-4 h-4 object-contain"
            :alt="title + ' info icon'"
          >
        </span>
        <!-- Tooltip -->
        <div
          class="absolute right-0 top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-max max-w-[240px] z-10"
        >
          {{ info }}
        </div>
      </div>
    </div>

    <!-- Customizable Body Section with Slot -->
    <div class="p-4 flex-1">
      <slot />
    </div>

    <!-- Footer Section with DynamicLink -->
    <div v-if="showFooter" class="flex justify-between items-center p-4 border-t border-gray-200 text-sm text-gray-600 h-12">
      <slot name="footer">
        <!-- <span>{{ footerLeft || 'No additional info' }}</span> -->
        <DynamicLink v-if="linkPath" :path="linkPath">
          See more
        </DynamicLink>
        <!-- <span v-else>{{ footerRight || '' }}</span> -->
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import DynamicLink from './dashboard/DynamicLink.vue'
import { defineProps, withDefaults } from 'vue'
import IconViewer from './shared/IconViewer.vue'

withDefaults(defineProps<{
  title: string
  info: string
  iconSrc?: string
  iconClass?: string
  showFooter?: boolean
  footerLeft?: string
  footerRight?: string
  linkPath?: string
}>(), {
  showFooter: true
})
</script>

<style scoped>
/* Optional: Keep color classes if needed for fallback */
.bg-blue-500 {
  background-color: #3b82f6;
}
.bg-green-500 {
  background-color: #22c55e;
}
.bg-yellow-500 {
  background-color: #f59e0b;
}
.bg-purple-500 {
  background-color: #a855f7;
}
</style>
