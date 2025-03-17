<template>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="px-3 py-2 whitespace-nowrap text-sm text-gray-900"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script>
export default {
  props: {
    headers: Array,
    rows: Array
  }
}
</script>
