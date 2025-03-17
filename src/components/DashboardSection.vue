<template>
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="px-4 py-3 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
