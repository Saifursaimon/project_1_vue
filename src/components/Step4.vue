<script setup>
import { reactive, watch, defineProps } from "vue";

const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
    },
});

// Local reactive form for Step 4
const stepData = reactive({
    customerRequirements: "",
    negotiationIssues: "",
    potentialRisks: "",
    internalFollowUp: "",
    recorder: {
        name: "",
        date: {
            year: "",
            month: "",
            day: "",
        },
    },
    contactPerson: {
        name: "",
        position: "",
        phone: "",
        wechat: "",
    },
    assistant: {
        name: "",
        phone: "",
    },
    additionalNotes: "",
});

// Sync data to parent (Records page)
watch(
    stepData,
    (val) => {
        Object.assign(props.modelValue, val);
    },
    { deep: true }
);

// Date options
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
</script>

<template>
    <div class="mt-14">
        <h1 class="text-4xl font-medium">客户特殊需求</h1>

        <div class="mt-9 w-full bg-white p-6">
            <!-- 客户特殊需求 -->
            <div class="flex items-start gap-14 mt-14">
                <p class="w-1/4 font-medium text-[22px]">客户特殊需求：</p>
                <textarea v-model="stepData.customerRequirements"
                    class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
            </div>

            <!-- 洽谈遗留问题 -->
            <div class="flex items-start gap-14 mt-6">
                <p class="w-1/4 font-medium text-[22px]">洽谈遗留问题：</p>
                <textarea v-model="stepData.negotiationIssues" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
            </div>

            <!-- 潜在风险 -->
            <div class="flex items-start gap-14 mt-6">
                <p class="w-1/4 font-medium text-[22px]">潜在风险点：</p>
                <textarea v-model="stepData.potentialRisks" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
            </div>

            <!-- 内部跟进 -->
            <div class="flex items-start gap-14 mt-6">
                <p class="w-1/4 font-medium text-[22px]">内部跟进：</p>
                <div class="w-3/4">
                    <textarea v-model="stepData.internalFollowUp"
                        class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-full h-40" />

                    <!-- 记录人 -->
                    <div class="flex items-center gap-36 mt-6">
                        <div class="flex items-center gap-6">
                            <label>记录人</label>
                            <input v-model="stepData.recorder.name" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                        </div>

                        <!-- 记录时间 -->
                        <div class="flex items-center gap-6">
                            <label>记录时间</label>
                            <div class="flex gap-3">
                                <select v-model="stepData.recorder.date.year"
                                    class="bg-[#f5f6f8] px-4 py-3.5 rounded-lg">
                                    <option value="">年</option>
                                    <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                                </select>
                                <select v-model="stepData.recorder.date.month"
                                    class="bg-[#f5f6f8] px-4 py-3.5 rounded-lg">
                                    <option value="">月</option>
                                    <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
                                </select>
                                <select v-model="stepData.recorder.date.day"
                                    class="bg-[#f5f6f8] px-4 py-3.5 rounded-lg">
                                    <option value="">日</option>
                                    <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 客户信息 -->
            <div class="flex items-start gap-14 mt-11">
                <p class="w-1/4 font-medium text-[22px]">客户信息：</p>
                <div class="w-3/4">
                    <div class="flex items-center gap-6">
                        <input v-model="stepData.contactPerson.name" placeholder="姓名"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                        <select v-model="stepData.contactPerson.position" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg">
                            <option value="">职务</option>
                            <option>经理</option>
                            <option>主管</option>
                            <option>专员</option>
                            <option>其他</option>
                        </select>
                        <input v-model="stepData.contactPerson.phone" placeholder="电话"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                    </div>

                    <div class="flex items-center gap-6 mt-5">
                        <label>微信</label>
                        <input v-model="stepData.contactPerson.wechat" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                    </div>

                    <div class="h-px my-5 bg-[#eaeaea]" />

                    <div class="flex items-center gap-9">
                        <input v-model="stepData.assistant.name" placeholder="助理姓名"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                        <input v-model="stepData.assistant.phone" placeholder="助理电话"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                    </div>
                </div>
            </div>

            <!-- 其他补充 -->
            <div class="flex items-start gap-14 mt-6">
                <p class="w-1/4 font-medium text-[22px]">其他补充：</p>
                <textarea v-model="stepData.additionalNotes" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
            </div>
        </div>
    </div>
</template>
