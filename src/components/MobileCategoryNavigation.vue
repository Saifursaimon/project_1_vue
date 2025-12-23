<script setup>
import { defineProps, defineEmits } from "vue";
import categories from "/src/categories.json";

const props = defineProps({
    selectedCategory: String
});

const emit = defineEmits(["selectCategory"]);

const handleClick = (id) => {
    emit("selectCategory", id);
};
</script>

<template>
    <!-- Horizontal slider container -->
    <div class="px-4 py-3 overflow-x-auto scrollbar-hide">
        <div class="flex gap-3 w-max">
            <button v-for="c in categories" :key="c.id" @click="handleClick(c.id)" :class="[
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                props.selectedCategory === c.id
                    ? 'bg-[#22B4FF] text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-[#E4F6FF]'
            ]">
                {{ c.name_zh }}
            </button>
        </div>
    </div>
</template>
