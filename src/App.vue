<script setup>
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="relative min-h-screen bg-[#EEF5FD] overflow-hidden">
    <div class="bg" />

    <div class="content ">
      <Navbar />
      <RouterView />
    </div>

  </div>
</template>

<style scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 334px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('/images/bg.svg');
}

@media (min-width: 1921px) {
  .bg {
    background-size: cover;
    background-image: url('/images/bgxl.svg');
    width: 100%;
    height: 642px;
  }
}

.content {
  position: relative;
  z-index: 10;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2.5rem;
  /* px-10 */
  padding-right: 2.5rem;
}

/* ≤ 1919 px – fixed 1452 px width */
@media (max-width: 1919px) {
  .content {
    max-width: 1452px;
  }
}

/* ≥ 1920 px – fluid 76 % width */
@media (min-width: 1920px) {
  .content {
    width: 76%;
    max-width: none;
    margin-top: 80px;
  }
}
</style>
