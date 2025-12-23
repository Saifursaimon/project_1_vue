<script setup>
import { reactive, defineProps, watch } from "vue";
import { ElTooltip } from "element-plus";

const props = defineProps({
    modelValue: Object, // v-model from parent
});

// Step 3 reactive data
const stepData = reactive({
    date: { year: "", month: "", day: "" },
    budgetControll: "",
    other: "",
});

// Sync with parent via v-model
watch(
    stepData,
    (val) => {
        Object.assign(props.modelValue, val);
    },
    { deep: true }
);

// Generate years array
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

// Months and days
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
</script>

<template>
    <div class="mt-16">
        <div class="mt-9 w-full bg-white p-6">
            <!-- 上线时间 -->
            <div class="flex items-center gap-14 mt-6">
                <div class="flex items-center">
                    <p class="whitespace-nowrap w-40 font-medium text-[22px]">期望上线时间：</p>
                    <ElTooltip content="是否有硬性截止日期？（如：配合活动、财年结束）、关键里程碑：是否有重要的中间节点？">
                        <img src="/src/assets/images/tooltip.png" alt="Tooltip" class="w-5 h-5 ml-2" />
                    </ElTooltip>
                </div>

                <div class="flex gap-3">
                    <!-- 年 -->
                    <select v-model="stepData.date.year" class="bg-[#f5f6f8] px-4 py-3.5 rounded-lg">
                        <option value="">年</option>
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>

                    <!-- 月 -->
                    <select v-model="stepData.date.month" class="bg-[#f5f6f8] px-4 py-3.5 rounded-lg">
                        <option value="">月</option>
                        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
                    </select>

                    <!-- 日 -->
                    <select v-model="stepData.date.day" class="bg-[#f5f6f8] px-4 py-3.5 rounded-lg">
                        <option value="">日</option>
                        <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                    </select>
                </div>
            </div>

            <!-- 预算管控 -->
            <div class="mt-11 flex items-center gap-14">
                <label class="font-medium text-[22px] w-44">预算管控：</label>
                <input type="text" v-model="stepData.budgetControll" placeholder="请填写大概预算"
                    class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4" />
            </div>

            <!-- 其他内容 -->
            <div class="my-11 flex items-center gap-14">
                <label class="font-medium text-[22px] w-44">其他内容：</label>
                <textarea v-model="stepData.other" placeholder="请填写其他内容"
                    class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
            </div>
        </div>
    </div>
</template>
