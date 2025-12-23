<script setup>
import { defineProps, reactive, watch } from "vue";
import {
    ElInput,
    ElCheckbox,
    ElSelect,
    ElOption,
    ElCheckboxGroup,

} from "element-plus";

const props = defineProps({
    modelValue: Object, // this is formData.basicInfo from parent
});

// Create a local copy for two-way binding
const stepData = reactive({
    type: [],
    companyName: "",
    personalName: "",
    department: "",
    remark: "",
    contactPerson: {
        name: "",
        position: "",
        phone: "",
    },
    collab: {
        firstTime: false,
        repeat: false,
        projectHistory: "",
    },
    discussionPlatform: {
        companyOffice: false,
        clientOffice: false,
        videoCall: false,
        other: false,
    },
});

// Watch local stepData and sync with parent
watch(
    stepData,
    (val) => {
        Object.assign(props.modelValue, val);
    },
    { deep: true }
);
</script>

<template>
    <div class="mt-14">
        <h1 class="text-4xl font-medium">基础信息</h1>
        <div class="mt-9 w-full bg-white p-6 rounded-lg shadow">
            <!-- 客户信息 -->
            <h3 class="font-medium text-2xl mb-6">客户信息</h3>
            <div class="space-y-6">
                <div class="flex items-start gap-12">
                    <h3 class="font-medium text-[22px] w-1/5">客户全称/类型：</h3>
                    <div class="w-3/4 space-y-4">
                        <div class="flex items-center gap-6">
                            <el-checkbox-group v-model="stepData.type" class="flex gap-4 items-center">
                                <el-checkbox label="企业"></el-checkbox>
                                <el-checkbox label="个人"></el-checkbox>
                            </el-checkbox-group>
                            <el-input v-model="stepData.companyName" placeholder="请填写企业信息"
                                class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                            <el-input v-model="stepData.personalName" placeholder="请填写个人信息"
                                class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                        </div>

                        <div class="flex items-center gap-3">
                            <label class="whitespace-nowrap">所属部门:</label>
                            <el-select v-model="stepData.department" placeholder="请选择部门"
                                class="bg-[#f5f6f8] rounded-lg px-4 py-2">
                                <el-option label="研发" value="研发"></el-option>
                                <el-option label="市场" value="市场"></el-option>
                                <el-option label="销售" value="销售"></el-option>
                                <el-option label="人事" value="人事"></el-option>
                                <el-option label="财务" value="财务"></el-option>
                                <el-option label="行政" value="行政"></el-option>
                                <el-option label="法务" value="法务"></el-option>
                            </el-select>
                        </div>

                        <div class="flex items-start gap-12">
                            <p class="whitespace-nowrap">备注: </p>
                            <el-input type="textarea" v-model="stepData.remark" class="border p-3 w-full rounded-lg" />
                        </div>
                    </div>
                </div>

                <!-- 核心对接人 -->
                <div class="flex items-center gap-12">
                    <h3 class="font-medium text-[22px] w-1/5">核心对接人：</h3>
                    <div class="w-3/4 space-y-4">
                        <div class="flex items-center gap-6">
                            <label class="whitespace-nowrap">姓名：</label>
                            <el-input v-model="stepData.contactPerson.name" placeholder="请填写客户姓名"
                                class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                            <label class="whitespace-nowrap">职务：</label>
                            <el-select v-model="stepData.contactPerson.position" placeholder="请选择职务"
                                class="bg-[#f5f6f8] rounded-lg px-4 py-2">
                                <el-option label="经理" value="经理" />
                                <el-option label="主管" value="主管" />
                                <el-option label="专员" value="专员" />
                                <el-option label="其他" value="其他" />
                            </el-select>
                            <label class="whitespace-nowrap">电话：</label>
                            <el-input v-model="stepData.contactPerson.phone" type="number" placeholder="请输入联系方式"
                                class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg" />
                        </div>
                    </div>
                </div>

                <!-- 合作背景 -->
                <div class="flex items-center gap-12">
                    <h3 class="font-medium text-[22px] w-1/5">合作背景：</h3>
                    <div class="w-3/4 flex flex-col gap-4">
                        <div class="flex items-center gap-6">
                            <el-checkbox v-model="stepData.collab.firstTime">首次合作</el-checkbox>
                            <el-checkbox v-model="stepData.collab.repeat">复购</el-checkbox>
                            <div class="flex items-center gap-3">
                                <label class="whitespace-nowrap">历史项目：</label>
                                <el-input v-model="stepData.collab.projectHistory" placeholder="请填写历史合作或项目编号"
                                    class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 洽谈方式/平台 -->
                <div class="flex items-center gap-12">
                    <h3 class="font-medium text-[22px] w-1/5">洽谈方式/平台：</h3>
                    <div class="w-3/4 flex items-center gap-4">
                        <el-checkbox v-model="stepData.discussionPlatform.companyOffice">公司办公室</el-checkbox>
                        <el-checkbox v-model="stepData.discussionPlatform.clientOffice">客户办公室</el-checkbox>
                        <el-checkbox v-model="stepData.discussionPlatform.videoCall">远程视频</el-checkbox>
                        <el-checkbox v-model="stepData.discussionPlatform.other">其他</el-checkbox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
