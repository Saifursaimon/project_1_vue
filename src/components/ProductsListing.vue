<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-start mb-12">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :p="product" />
    </div>
</template>

<script setup>
import ProductsData from '/src/products.json'
import ProductCard from './ProductCard.vue';
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    categoryId: {
        type: String,
        default: "all"
    }
})


const filteredProducts = computed(() => {
    if (props.categoryId === 'all') {
        return ProductsData
    }
    return ProductsData.filter((product) => product.categoryId === props.categoryId)
})
</script>
