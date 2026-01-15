<template>
  <div class="mt-3">
    <h2 class="font-medium hidden md:block text-[28px]">业务分类</h2>
    <div class="flex md:hidden">
      <MobileCategoryNavigation :selectedCategory="selectedCategory" @selectCategory="handleSelectCategory" />
    </div>


    <div class="flex items-stretch mt-5 gap-5 min-h-screen">

      <div class="hidden md:flex ">
        <Sidebar :selectedCategory="selectedCategory" @selectCategory="handleSelectCategory" />
      </div>

      <div class="flex-1">
        <ProductsListing :categoryId="selectedCategory" />
      </div>
    </div>
  </div>
</template>


<script setup>
import ProductsListing from '@/components/ProductsListing.vue';
import MobileCategoryNavigation from '@/components/MobileCategoryNavigation.vue';
import Sidebar from '@/components/Sidebar.vue';
import { ref } from 'vue';

const selectedCategory = ref("all");

const handleSelectCategory = (id) => {
  selectedCategory.value = id;
};
</script>
