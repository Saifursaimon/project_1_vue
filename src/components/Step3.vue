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


watch(
  () => props.modelValue,
  (val) => {
    if (!val) return;

    stepData.date.year = val.date?.year ?? "";
    stepData.date.month = val.date?.month ?? "";
    stepData.date.day = val.date?.day ?? "";

    stepData.budgetControll = val.budgetControll ?? "";
    stepData.other = val.other ?? "";
  },
  { immediate: true, deep: true }
);


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
const years = Array.from({ length: 50 }, (_, i) => currentYear + i);

// Months and days
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
</script>

<template>
  <div class="mt-16">
    <div class="mt-9 w-full bg-white p-6">

      <div class="flex flex-col md:flex-row md:items-center gap-5 md:gap-14 mt-6">
        <div class="flex items-center">
          <p class="whitespace-nowrap  font-medium text-[22px]">期望上线时间：</p>
          <ElTooltip content="是否有硬性截止日期？（如：配合活动、财年结束）、关键里程碑：是否有重要的中间节点？" placement="top-start" effect="customized">
            <img src="/images/tooltip.svg" alt="Tooltip" class="w-4 h-4 -ml-2 " />
          </ElTooltip>
        </div>

        <div class="flex flex-col md:flex-row  gap-3">
          <el-select v-model="stepData.date.year" placeholder="年" class=" rounded-lg py-2 custom-select ">
            <el-option v-for="year in years" :key="year" :label="year" :value="year"></el-option>
          </el-select>
          <el-select v-model="stepData.date.month" placeholder="月" class=" rounded-lg py-2 custom-select ">
            <el-option v-for="month in months" :key="month" :value="month" :label="month"></el-option>
          </el-select>
          <el-select v-model="stepData.date.day" placeholder="日" class=" rounded-lg py-2 custom-select ">
            <el-option v-for="day in days" :key="day" :label="day" :value="day"></el-option>
          </el-select>
        </div>
      </div>


      <div class="md:mt-11 mt-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-14">
        <label class="font-medium text-[22px] w-44">预算管控：</label>
        <el-input v-model="stepData.budgetControll" clearable placeholder="请填写大概预算" class=" md:px-6  custom-input " />
      </div>




      <div class="md:my-11 my-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-14">
        <label class="font-medium text-[22px] w-44">其他内容：</label>
        <el-input type="textarea" clearable v-model="stepData.other" placeholder="请填写其他内容"
          class="custom-textarea md:px-6" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.custom-select :deep(.el-select__wrapper) {
  background-color: #F3F8FE;
  padding: 8px 16px;
  box-shadow: none;
  width: 160px;
}

@media (max-width: 768px) {
  .custom-select:deep(.el-select__wrapper) {
    width: 100%;
  }
}

.custom-select :deep(.el-select__selected-item) {
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
