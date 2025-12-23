<script setup>
import { defineProps, reactive, watch } from "vue";
import { ElTooltip } from "element-plus";

const props = defineProps({
    modelValue: Object, // v-model from parent
});

// Step 2 reactive data
const stepData = reactive({
    reason: "",
    objective: "",
    userGoal: "",
    projectName: { provisionalName: "", officialName: "" },
    referenceApp: "",
    coreFunctions: "",
    developmentEcosystem: {
        web: false,
        ios: false,
        android: false,
        wechatMiniProgram: false,
        wechatOfficialAccount: false,
        other: false,
        otherText: "",
    },
    pageStyle: { companySpecific: false, other: false, otherText: "" },
    riskAvoidance: "",
    technicalPreferences: {
        domainAndServer: "",
        techStack: "",
        systemIntegration: "",
        other: "",
    },
});

// Sync with parent via v-model
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
        <h1 class="text-4xl font-medium">核心需求明细</h1>

        <!-- 1. 项目介绍 -->
        <div class="mt-9 w-full bg-white p-6">
            <h2 class="font-medium text-[26px]">1、项目介绍</h2>

            <div class="flex items-start gap-14 mt-14">
                <div class="flex items-center w-1/4">
                    <p class="whitespace-nowrap font-medium text-[22px]">开发的背景或原因：</p>
                    <ElTooltip content="客户为什么要做这个项目？解决什么问题？抓住什么机会？当前业务是如何运作的？痛点在哪里？">
                        <img src="/src/assets/images/tooltip.png" alt="Tooltip" class="w-5 h-5 ml-2" />
                    </ElTooltip>
                </div>
                <textarea v-model="stepData.reason" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40"
                    placeholder="请填写开发的背景或原因" />
            </div>

            <div class="flex items-start gap-14 mt-6">
                <div class="flex items-center w-1/4">
                    <p class="whitespace-nowrap font-medium text-[22px]">核心目标：</p>
                    <ElTooltip content="项目成功上线后，希望达到的具体、可衡量的目标是什么？">
                        <img src="/src/assets/images/tooltip.png" alt="Tooltip" class="w-5 h-5 ml-2" />
                    </ElTooltip>
                </div>
                <textarea v-model="stepData.objective" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40"
                    placeholder="请填写开发的核心目标" />
            </div>

            <div class="flex items-start gap-14 mt-6">
                <div class="flex items-center w-1/4">
                    <p class="whitespace-nowrap font-medium text-[22px]">用户目标：</p>
                    <ElTooltip content="软件给谁用？内部员工、终端消费者、特定商户？">
                        <img src="/src/assets/images/tooltip.png" alt="Tooltip" class="w-5 h-5 ml-2" />
                    </ElTooltip>
                </div>
                <textarea v-model="stepData.userGoal" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40"
                    placeholder="请填写开发的用户目标" />
            </div>

            <!-- 2. 核心范围与核心功能 -->
            <div class="mt-14">
                <h2 class="font-medium text-[26px]">2、核心范围与核心功能</h2>

                <div class="flex items-start gap-14 mt-14">
                    <p class="whitespace-nowrap font-medium text-[22px] w-1/4">项目/产品名称：</p>
                    <div class="w-3/4 flex items-center gap-20">
                        <div class="flex items-center gap-8 w-1/2">
                            <label class="whitespace-nowrap">暂定名称</label>
                            <input v-model="stepData.projectName.provisionalName" type="text" placeholder="请填写暂定名称"
                                class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-full" />
                        </div>
                        <div class="flex items-center gap-8 w-1/2">
                            <label class="whitespace-nowrap">正式名称</label>
                            <input v-model="stepData.projectName.officialName" type="text" placeholder="请填写正式名称"
                                class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-full" />
                        </div>
                    </div>
                </div>

                <div class="flex items-start gap-14 mt-14">
                    <p class="whitespace-nowrap font-medium text-[22px] w-1/4">参考软件/APP：</p>
                    <input v-model="stepData.referenceApp" type="text" placeholder="请填写参考软件名称或网址"
                        class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4" />
                </div>

                <div class="flex items-start gap-14 mt-14">
                    <p class="whitespace-nowrap font-medium text-[22px] w-1/4">项目/产品核心功能：</p>
                    <textarea v-model="stepData.coreFunctions" placeholder="请填写下项目/产品核心的功能"
                        class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
                </div>

                <!-- Development ecosystem checkboxes -->
                <div class="flex items-start gap-14 mt-14">
                    <p class="whitespace-nowrap font-medium text-[22px] w-1/4">计划开发生态：</p>
                    <div class="w-3/4 flex flex-wrap gap-6">
                        <label class="flex items-center gap-2">
                            <input type="checkbox" v-model="stepData.developmentEcosystem.web" />Web端
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="checkbox" v-model="stepData.developmentEcosystem.ios" />IOS移动端
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="checkbox" v-model="stepData.developmentEcosystem.android" />安卓移动端
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="checkbox" v-model="stepData.developmentEcosystem.wechatMiniProgram" />微信小程序
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="checkbox" v-model="stepData.developmentEcosystem.wechatOfficialAccount" />公众号
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="checkbox" v-model="stepData.developmentEcosystem.other" />其他
                        </label>
                        <input v-model="stepData.developmentEcosystem.otherText" type="text" placeholder="请填写其他开发生态"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-full" />
                    </div>
                </div>

                <!-- Page style -->
                <div class="flex items-start gap-14 mt-14">
                    <p class="whitespace-nowrap font-medium text-[22px] w-1/4">页面风格：</p>
                    <div class="w-3/4 flex flex-wrap gap-6">
                        <label class="flex items-center gap-2">
                            <input type="checkbox" v-model="stepData.pageStyle.companySpecific" />公司或产品专属的UI或色彩要求
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="checkbox" v-model="stepData.pageStyle.other" />其他
                        </label>
                        <input v-model="stepData.pageStyle.otherText" type="text" placeholder="请填写偏向于哪种风格"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-full" />
                    </div>
                </div>

                <!-- Risk avoidance -->
                <div class="flex items-start gap-14 mt-14">
                    <p class="whitespace-nowrap font-medium text-[22px] w-1/4">风险规避：</p>
                    <textarea v-model="stepData.riskAvoidance" class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-2/3 h-40"
                        placeholder="请填写风险规避" />
                </div>

                <!-- Technical preferences -->
                <div class="mt-14">
                    <h2 class="font-medium text-[26px]">3、 技术与集成偏好</h2>

                    <div class="flex items-start gap-14 mt-14">
                        <p class="whitespace-nowrap font-medium text-[22px] w-1/4">域名及服务器：</p>
                        <textarea v-model="stepData.technicalPreferences.domainAndServer" placeholder="请填写域名及服务器"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
                    </div>

                    <div class="flex items-start gap-14 mt-6">
                        <p class="whitespace-nowrap font-medium text-[22px] w-1/4">技术偏好：</p>
                        <textarea v-model="stepData.technicalPreferences.techStack" placeholder="请填写技术偏好"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
                    </div>

                    <div class="flex items-start gap-14 mt-6">
                        <p class="whitespace-nowrap font-medium text-[22px] w-1/4">现有系统集成：</p>
                        <textarea v-model="stepData.technicalPreferences.systemIntegration" placeholder="请填写系统集成"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
                    </div>

                    <div class="flex items-start gap-14 mt-6">
                        <p class="whitespace-nowrap font-medium text-[22px] w-1/4">其他内容：</p>
                        <textarea v-model="stepData.technicalPreferences.other" placeholder="请填写其他内容"
                            class="bg-[#f5f6f8] px-6 py-3.5 rounded-lg w-3/4 h-40" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
