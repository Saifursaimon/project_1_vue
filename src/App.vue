<script setup>
import bg from '@/assets/images/bg.svg'
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="relative min-h-screen bg-[#EEF5FD] ">
    <div class="absolute inset-0 max-h-83.5 bg-no-repeat bg-top bg-contain"
      :style="{ backgroundImage: `url(${bg})` }" />

    <div class="relative z-10 max-w-360 mx-auto px-10 ">
      <Navbar />
      <RouterView />
    </div>

  </div>
</template>
