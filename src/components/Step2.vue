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


    <div class="mt-9 w-full bg-white p-6">
      <h2 class="font-medium text-[26px]">1、项目介绍</h2>

      <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-14">
        <div class="flex items-center w-1/4">
          <p class="whitespace-nowrap font-medium text-[22px]">开发的背景或原因：</p>
          <ElTooltip effect="customized" placement="top-start" content="（客户为什么要做这个项目？解决什么问题？抓住什么机会？当前业务是如何运作的？痛点在哪里？）">
            <img src="/images/tooltip.svg" alt="Tooltip" class="w-4 h-4 -  -ml-2" />
          </ElTooltip>
        </div>
        <el-input type="textarea" clearable v-model="stepData.reason" placeholder="请填写开发的背景或原因"
          class="custom-textarea w-3/4" />
      </div>

      <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-6">
        <div class="flex items-center w-1/4">
          <p class="whitespace-nowrap font-medium text-[22px]">核心目标：</p>
          <ElTooltip effect="customized" placement="top-start"
            content="（项目成功上线后，希望达到的具体、可衡量的目标是什么？例如：将订单处理时间缩短30%，将客户转化率提升15%，实现业务全流程线上化等。）">
            <img src="/images/tooltip.svg" alt="Tooltip" class="w-4 h-4  -ml-2" />
          </ElTooltip>
        </div>
        <el-input type="textarea" clearable v-model="stepData.objective" placeholder="请填写开发的核心目标"
          class="custom-textarea w-3/4" />
      </div>

      <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-6">
        <div class="flex items-center w-1/4">
          <p class="whitespace-nowrap font-medium text-[22px]">用户目标：</p>
          <ElTooltip effect="customized" placement="top-start" content="（软件给谁用？内部员工、终端消费者、特定商户？请描述用户的基本特征和使用场景。)">
            <img src="/images/tooltip.svg" alt="Tooltip" class="w-4 h-4  -ml-2" />
          </ElTooltip>
        </div>
        <el-input type="textarea" clearable v-model="stepData.userGoal" placeholder="请填写开发的用户目标"
          class="custom-textarea w-3/4" />
      </div>


      <div class="mt-14">
        <h2 class="font-medium text-[26px] whitespace-nowrap">2、核心范围与核心功能</h2>

        <div class="flex flex-col md:flex-row items-start  mt-14">
          <p class="whitespace-nowrap font-medium text-[22px] w-1/4">项目/产品名称：</p>
          <div class="w-full md:w-3/4 flex flex-col md:flex-row md:items-center mt-5 md:mt-0 gap-5 md:gap-20">
            <div class="flex items-center gap-3 md:w-1/2">
              <label class="whitespace-nowrap hidden md:block">暂定名称</label>
              <el-input v-model="stepData.projectName.provisionalName" clearable placeholder="请填写暂定名称"
                class="  custom-input " />
            </div>
            <div class="flex items-center gap-3 md:w-1/2">
              <label class="whitespace-nowrap hidden md:block">正式名称</label>
              <el-input v-model="stepData.projectName.officialName" clearable placeholder="请填写正式名称"
                class="  custom-input " />
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-10">
          <p class="whitespace-nowrap font-medium text-[22px] w-1/4">参考软件/APP：</p>
          <el-input v-model="stepData.referenceApp" clearable placeholder="请填写参考软件名称或网址" class="  custom-input " />
        </div>

        <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-10">
          <p class="whitespace-nowrap font-medium text-[22px] w-1/4">项目/产品核心功能：</p>
          <el-input type="textarea" clearable v-model="stepData.coreFunctions" placeholder="请填写下项目/产品核心的功能"
            class="custom-textarea w-3/4" />
        </div>

        <!-- Development ecosystem checkboxes -->
        <div class="flex flex-col md:flex-row items-start  mt-14">
          <p class="whitespace-nowrap font-medium text-[22px] w-1/4">计划开发生态：</p>
          <div class="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-5 md:gap-4">
            <el-checkbox v-model="stepData.developmentEcosystem.web" label="Web端" />

            <el-checkbox v-model="stepData.developmentEcosystem.ios" label="IOS移动端" />

            <el-checkbox v-model="stepData.developmentEcosystem.android" label="安卓移动端" />

            <el-checkbox v-model="stepData.developmentEcosystem.wechatMiniProgram" label="微信小程序" />

            <el-checkbox v-model="stepData.developmentEcosystem.wechatOfficialAccount" label="公众号" />

            <div class=" flex flex-col md:flex-row md:items-center gap-3 md:col-span-5">
              <el-checkbox v-model="stepData.developmentEcosystem.other" label="其他" />
              <el-input v-if="stepData.developmentEcosystem.other" v-model="stepData.developmentEcosystem.otherText"
                placeholder="请填写其他开发生态" class="custom-input w-full " />
            </div>
          </div>

        </div>

        <!-- Page style -->
        <div class="flex flex-col md:flex-row items-start  mt-14">
          <div class="flex items-center w-1/4">
            <p class="whitespace-nowrap font-medium text-[22px]">页面风格：</p>
            <ElTooltip effect="customized" placement="top-start" content="公司或产品的UI/商标/色彩要求">
              <img src="/images/tooltip.svg" alt="Tooltip" class="w-4 h-4  -ml-2" />
            </ElTooltip>
          </div>
          <div class="w-3/4 flex flex-col md:flex-row md:items-center gap-3 mt-3 md:mt-0 md:gap-6">
            <el-checkbox v-model="stepData.pageStyle.companySpecific" label="公司或产品专属的UI或色彩要求" />
            <el-checkbox v-model="stepData.pageStyle.other" label="其他" />
            <el-input v-if="stepData.pageStyle.other" v-model="stepData.pageStyle.otherText" placeholder="请填写偏向于哪种风格"
              class="custom-input w-full " />
          </div>
        </div>


        <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-14">
          <div class="flex items-center w-1/4">
            <p class="whitespace-nowrap font-medium text-[22px]">风险规避：</p>
            <ElTooltip effect="customized" placement="top-start" content="项目/产品禁忌/合规要求">
              <img src="/images/tooltip.svg" alt="Tooltip" class="w-4 h-4  -ml-2" />
            </ElTooltip>
          </div>
          <el-input type="textarea" clearable v-model="stepData.riskAvoidance" placeholder="请填写下风险规避"
            class="custom-textarea w-3/4" />
        </div>


        <div class="mt-14">
          <h2 class="font-medium text-[26px]">3、 技术与集成偏好</h2>

          <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-14">
            <div class="flex items-center w-1/4">
              <p class="whitespace-nowrap font-medium text-[22px]">域名及服务器：</p>
              <ElTooltip effect="customized" placement="top-start" content="客户是否有可供使用的域名及服务器？以及相关的配置情况。">
                <img src="/images/tooltip.svg" alt="Tooltip" class="w-4 h-4  -ml-2" />
              </ElTooltip>
            </div>
            <el-input type="textarea" clearable v-model="stepData.technicalPreferences.domainAndServer"
              placeholder="请填写域名及服务器" class="custom-textarea w-3/4" />
          </div>

          <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-6">
            <div class="flex items-center w-1/4">
              <p class="whitespace-nowrap font-medium text-[22px]">技术偏好：</p>
              <ElTooltip effect="customized" placement="top-start"
                content="客户是否有偏好的技术栈？（如：Java/Python， Vue/React， MySQL/PostgreSQL）">
                <img src="/images/tooltip.svg" alt="Tooltip" class="w-4 h-4  -ml-2" />
              </ElTooltip>
            </div>
            <el-input type="textarea" clearable v-model="stepData.technicalPreferences.techStack" placeholder="请填写技术偏好"
              class="custom-textarea w-3/4" />
          </div>

          <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-6">
            <div class="flex items-center w-1/4">
              <p class="whitespace-nowrap font-medium text-[22px]">现有系统集成：</p>
              <ElTooltip effect="customized" placement="top-start"
                content="是否需要与客户现有的系统（如：ERP、CRM、支付系统）对接？ 对方系统是否提供了接口文档？">
                <img src="/images/tooltip.svg" alt="Tooltip" class="w-4 h-4  -ml-2" />
              </ElTooltip>
            </div>
            <el-input type="textarea" clearable v-model="stepData.technicalPreferences.systemIntegration"
              placeholder="请填写现有系统集成" class="custom-textarea w-3/4" />
          </div>

          <div class="flex flex-col md:flex-row items-start gap-7 md:gap-14 mt-6">
            <p class="whitespace-nowrap font-medium text-[22px] w-1/4">其他内容：</p>
            <el-input type="textarea" clearable v-model="stepData.technicalPreferences.other" placeholder="请填写其他内容"
              class="custom-textarea w-3/4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-textarea :deep(textarea.el-textarea__inner) {
  background-color: #F3F8FE;
  min-height: 160px;
  padding: 16px 24px;


}

.custom-textarea :deep(.el-textarea) {
  background-color: transparent;

}


.custom-input :deep(.el-input__wrapper) {
  background-color: #F3F8FE;
  height: 50px;
  padding-top: 3px;
  padding-bottom: 3px;
}

.custom-input :deep(.el-input__inner) {
  background-color: transparent;
}


:global(.el-popper.is-customized) {
  padding: 6px 12px;
  background: #22B4FF;
  color: white;
}

:global(.el-popper.is-customized .el-popper__arrow::before) {
  background: #22B4FF;
  right: 0;
}
</style>
