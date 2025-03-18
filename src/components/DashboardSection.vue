<template>
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class=" flex items-center justify-between align-middle px-4 py-3 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
        <!-- actions -->
          <div class="flex items-center mt-1">

            <div class="relative group">
              <button @click="handleCreate">
                <IconViewer src="/icons/add.svg" altText="Add icon" :smallIcons="true"/>
              </button>
              <div
                class="absolute right-0 top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-max max-w-[240px] z-10"
              >
                Create an entry
              </div>
            </div>

            <div class="relative group">
              <button @click="handleSearch">
            <IconViewer src="/icons/search.svg" altText="Search icon" :smallIcons="true"/>
          </button>
              <div
                class="absolute right-0 top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-max max-w-[240px] z-10"
              >
                Search
              </div>
            </div>

            <div class="relative group">
              <button @click="handleScan">
                <IconViewer src="/icons/scan.svg" altText="Scan icon" :smallIcons="true"/>
              </button>
              <div
                class="absolute right-0 top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-max max-w-[240px] z-10"
              >
                Scan a code
              </div>
            </div>

            <div class="relative group">
              <button @click="handleView">
                <IconViewer src="/icons/view.svg" altText="View icon" :smallIcons="true"/>
              </button>
              <div
                class="absolute right-0 top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-max max-w-[240px] z-10"
              >
                View all entries
              </div>
            </div>

          </div>
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </template>

<script setup lang="ts">
import IconViewer from './shared/IconViewer.vue'
import { defineProps } from 'vue'

defineProps<{
  title: string
}>()

const handleCreate = () => {
  return null
}
const handleSearch = () => {
  return null
}
const handleScan = () => {
  return null
}
const handleView = () => {
  return null
}

</script>
