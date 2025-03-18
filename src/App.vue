<script setup lang="ts">
import IconViewer from './components/shared/IconViewer.vue'
import { YELLOW } from './config/colors'

const BRAND_NAME = 'yellowHOUSE\u2122'

</script>

<template>
  <nav class="bg-gray-900 py-4 px-6 md:px-8 text-[#f8f8f8] w-full">
    <div class="flex items-center justify-between md:mb-1">
      <!-- warehouse logo -->
       <span class="font-quantico select-none text-3xl" :style="{color: YELLOW}">{{BRAND_NAME}}</span>
       <span class="font-quantico select-none text-sm" :style="{color: YELLOW}">WAREHOUSE MANAGEMENT SYSTEM</span>
    </div>

    <div class="flex items-center gap-4 justify-end">

      <router-link to="/notifications">
       <span class="flex items-center justify-center">
        <IconViewer src="/icons/notification.svg" altText="User account icon" />
        Notifications
      </span>

       </router-link>
        <!-- links and actions -->
      <router-link to="/account">
       <span class="flex items-center justify-center">
        <IconViewer src="/icons/account.svg" altText="User account icon" />
        Account
        </span>
       </router-link>
    </div>

  </nav>
  <router-view/>
</template>

<style>

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1C1C1E;
}

</style>
