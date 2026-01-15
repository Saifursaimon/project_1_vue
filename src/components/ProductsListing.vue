<template>
  <div class="grid grid-cols-1 md:grid-cols-3  gap-5 items-start mb-12 ">
    <ProductCard v-for="product in filteredProducts" :key="product.id" :p="product" />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import { computed, onMounted, reactive, defineProps } from 'vue'

const props = defineProps({
  categoryId: {
    type: String,
    default: 'all'
  }
})

const state = reactive({
  products: [],
  loading: true
})

/* ✅ SORT FIRST (latest → oldest) */
const sortedProducts = computed(() => {
  return [...state.products].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
})

/* ✅ FILTER AFTER SORT */
const filteredProducts = computed(() => {
  if (props.categoryId === 'all') {
    return sortedProducts.value
  }
  return sortedProducts.value.filter(
    product => product.categoryId === props.categoryId
  )
})

onMounted(async () => {
  try {
    state.loading = true
    const res = await fetch('https://backend-server-o6mn.onrender.com/products')
    const data = await res.json()
    state.products = data
  } catch (error) {
    console.error(error)
  } finally {
    state.loading = false
  }
})
</script>
