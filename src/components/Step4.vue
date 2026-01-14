<script setup>
import { reactive, watch, defineProps } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});


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

      <div class="flex flex-col md:flex-row items-start gap-5 md:gap-14 mt-14">
        <p class="md:md:w-1/4 font-medium text-[22px]">客户特殊需求：</p>
        <el-input type="textarea" clearable v-model="stepData.customerRequirements" placeholder="请填写客户特殊需求"
          class="custom-textarea " />
      </div>

      <div class="flex flex-col md:flex-row items-start gap-5 md:gap-14 mt-6">
        <p class="md:md:w-1/4 font-medium text-[22px]">洽谈遗留问题：</p>
        <el-input type="textarea" clearable v-model="stepData.negotiationIssues" placeholder="请填写客户特殊需求"
          class="custom-textarea " />
      </div>

      <div class="flex flex-col md:flex-row items-start gap-5 md:gap-14 mt-6">
        <p class="md:md:w-1/4 font-medium text-[22px]">潜在风险点：</p>
        <el-input type="textarea" clearable v-model="stepData.potentialRisks" placeholder="请填写客户特殊需求"
          class="custom-textarea " />
      </div>


      <div class="flex flex-col md:flex-row items-start gap-5 md:gap-14 mt-6">
        <p class="md:w-1/4 font-medium text-[22px]">内部跟进：</p>
        <el-input type="textarea" clearable v-model="stepData.internalFollowUp" placeholder="请填写客户特殊需求"
          class="custom-textarea " />
      </div>
      <div class="flex flex-col md:flex-row items-start">
        <div class=" w-[24%]" />
        <div class="md:w-3/4 w-full">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-36 mt-6">
            <div class="flex flex-col md:flex-row md:items-center w-full gap-2 md:gap-6">
              <label class="whitespace-nowrap">记录人</label>
              <el-input v-model="stepData.recorder.name" clearable placeholder="请填写企业信息"
                class="  py-3.5 custom-input " />
            </div>
            <div class="flex flex-col md:flex-row md:items-center gap-6">
              <label class="whitespace-nowrap">记录时间</label>
              <div class="flex flex-col md:flex-row gap-3">
                <el-select v-model="stepData.recorder.date.year" placeholder="年"
                  class=" rounded-lg py-2 custom-select ">
                  <el-option v-for="year in years" :key="year" :label="year" :value="year"></el-option>
                </el-select>
                <el-select v-model="stepData.recorder.date.month" placeholder="月"
                  class=" rounded-lg py-2 custom-select ">
                  <el-option v-for="month in months" :key="month" :value="month" :label="month"></el-option>
                </el-select>
                <el-select v-model="stepData.recorder.date.day" placeholder="日" class=" rounded-lg py-2 custom-select ">
                  <el-option v-for="day in days" :key="day" :label="day" :value="day"></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-start mt-11">
        <p class="md:w-1/4 font-medium text-[22px]">客户信息：</p>

        <div class="md:w-3/4 w-full">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="flex items-center ">
              <label class="whitespace-nowrap hidden md:flex">姓名：</label>
              <el-input v-model="stepData.contactPerson.name" clearable placeholder="请填写客户姓名"
                class="  py-3.5 rounded-lg custom-input" />
            </div>

            <div class="flex items-center ">
              <label class="whitespace-nowrap hidden md:flex">职务：</label>
              <el-input v-model="stepData.contactPerson.position" clearable placeholder="请填写职务信息"
                class="  py-3.5 rounded-lg custom-input" />
            </div>

            <div class="flex items-center ">
              <label class="whitespace-nowrap hidden md:flex">电话：</label>
              <el-input v-model="stepData.contactPerson.phone" clearable type="number" placeholder="请输入联系方式"
                class="  py-3.5 rounded-lg custom-input" />
            </div>

            <div class="flex items-center ">
              <label class="whitespace-nowrap hidden md:flex">微信：</label>
              <el-input v-model="stepData.contactPerson.wechat" clearable placeholder="请输入客户微信"
                class="  py-3.5 rounded-lg custom-input" />
            </div>

          </div>



          <el-divider border-style="double" />

          <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-9">
            <div class="flex items-center ">
              <label class="whitespace-nowrap hidden md:flex">助理：</label>
              <el-input v-model="stepData.assistant.name" clearable placeholder="请填写助理姓名"
                class="  py-3.5 rounded-lg custom-input" />
            </div>
            <div class="flex items-center ">
              <label class="whitespace-nowrap hidden md:flex">电话：</label>
              <el-input v-model="stepData.assistant.phone" clearable type="number" placeholder="请填写助理电话"
                class="  py-3.5 rounded-lg custom-input" />
            </div>
          </div>
        </div>
      </div>

      <!-- 其他补充 -->
      <div class="flex flex-col md:flex-row items-start gap-5 md:gap-14 mt-6">
        <p class="md:w-1/4 font-medium text-[22px]">其他补充：</p>
        <el-input type="textarea" clearable v-model="stepData.additionalNotes" placeholder="请填写客户其他需求"
          class="custom-textarea " />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-select :deep(.el-select__wrapper) {
  background-color: #F3F8FE;
  padding: 8px 16px;
  box-shadow: none;
  width: 90px;
}

@media (max-width: 768px) {
  .custom-select:deep(.el-select__wrapper) {
    width: 100%;
  }
}

.custom-select :deep(.el-select__selected-item) {
  background-color: transparent;
}



.custom-select2 :deep(.el-select__wrapper) {
  background-color: #F3F8FE;
  padding: 10px 18px;
  box-shadow: none;
}

.custom-select2 :deep(.el-select__selected-item) {
  background-color: transparent;
}

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
</style>
