<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-start mb-12">
    <ProductCard v-for="product in filteredProducts" :key="product.id" :p="product" />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue';
import { computed, onMounted, reactive } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  categoryId: {
    type: String,
    default: "all"
  }
})

const state = reactive({
  products: [],
  loading: true
})


const filteredProducts = computed(() => {
  if (props.categoryId === 'all') {
    return state.products
  }
  return state.products.filter((product) => product.categoryId === props.categoryId)
})

onMounted(async () => {
  try {
    state.loading = true
    const res = await fetch('https://backend-server-o6mn.onrender.com/products')
    const data = await res.json()
    state.products = data
    state.loading = false

  } catch (error) {
    console.log(error)
  }
})
</script>
