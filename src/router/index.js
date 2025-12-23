import HomeView from '@/views/HomeView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import RecordView from '@/views/RecordView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component:HomeView
    },
    {
      path:'/products/:id',
      name:'product details',
      component:ProductDetailsView
    },
    {
      path:'/records',
      name:'records',
      component:RecordView
    },
  ],
})

export default router
