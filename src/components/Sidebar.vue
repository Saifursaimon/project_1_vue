<script setup>
import { defineProps, defineEmits } from "vue";
import categories from "/src/categories.json";


const props = defineProps({
    selectedCategory: String,
});


const emit = defineEmits(["selectCategory"]);

const handleClick = (id) => {
    emit("selectCategory", id);
};
</script>

<template>
    <div class="bg-linear-to-b from-[#E4F6FF] to-[#F9FBFF] pt-8.5 h-full">
        <div class="flex flex-col gap-5">
            <div v-for="c in categories" :key="c.id" @click="handleClick(c.id)" :class="[
                'w-full flex items-center gap-5 px-3 py-2 transition cursor-pointer',
                props.selectedCategory === c.id
                    ? 'bg-[#ffff]'
                    : 'hover:bg-[#ffff]/50'
            ]">
                <img :src="c.icon" />
                <p class="text-xl">{{ c.name_zh }}</p>
            </div>
        </div>
    </div>
</template>
