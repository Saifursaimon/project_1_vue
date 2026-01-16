<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { defineProps, reactive, watch } from "vue";
import { ElInput, ElCheckbox, ElSelect, ElOption } from "element-plus";

const props = defineProps({
  modelValue: Object,
});

const stepData = reactive({
  type: "", // '企业' | '个人' | ''
  companyName: "",
  personalName: "",
  department: {
    value: "",
    otherText: "",
  },
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
    otherText: "",
  },
});

// checkbox-style radio behavior + auto-clear disabled fields
const selectType = (value) => {
  if (stepData.type === value) {
    stepData.type = "";
  } else {
    stepData.type = value;
  }

  // clear fields based on disabled logic
  if (stepData.type !== "企业") {
    stepData.companyName = "";
    stepData.department.value = "";
    stepData.department.otherText = "";
  }
  if (stepData.type !== "个人") {
    stepData.personalName = "";

  }
};



const selectCollab = (key) => {
  Object.keys(stepData.collab).forEach((k) => {
    if (k !== "projectHistory") {
      stepData.collab[k] = false;
      stepData.collab.projectHistory = "";
    }
  });
  stepData.collab[key] = true;
};

const selectPlatform = (key) => {
  Object.keys(stepData.discussionPlatform).forEach((k) => {
    stepData.discussionPlatform[k] = false;
  });

  stepData.discussionPlatform[key] = true;

  if (key == "other") {
    stepData.discussionPlatform.otherText = "";
  } else {
    stepData.discussionPlatform.otherText = "";
  }
};

watch(
  () => props.modelValue,
  (val) => {
    if (!val) return

    stepData.type = val.type ?? ""
    stepData.companyName = val.companyName ?? ""
    stepData.personalName = val.personalName ?? ""
    stepData.remark = val.remark ?? ""

    stepData.department.value = val.department?.value ?? ""
    stepData.department.otherText = val.department?.otherText ?? ""

    stepData.contactPerson.name = val.contactPerson?.name ?? ""
    stepData.contactPerson.position = val.contactPerson?.position ?? ""
    stepData.contactPerson.phone = val.contactPerson?.phone ?? ""

    stepData.collab.firstTime = val.collab?.firstTime ?? false
    stepData.collab.repeat = val.collab?.repeat ?? false
    stepData.collab.projectHistory = val.collab?.projectHistory ?? ""

    stepData.discussionPlatform.companyOffice =
      val.discussionPlatform?.companyOffice ?? false
    stepData.discussionPlatform.clientOffice =
      val.discussionPlatform?.clientOffice ?? false
    stepData.discussionPlatform.videoCall =
      val.discussionPlatform?.videoCall ?? false
    stepData.discussionPlatform.other =
      val.discussionPlatform?.other ?? false
    stepData.discussionPlatform.otherText =
      val.discussionPlatform?.otherText ?? ""
  },
  { immediate: true, deep: true }
)


// Sync reactive data to parent
watch(
  stepData,
  (val) => {
    props.modelValue.type = val.type;
    props.modelValue.companyName = val.companyName;
    props.modelValue.personalName = val.personalName;
    props.modelValue.remark = val.remark;

    props.modelValue.department = {
      value: val.department.value,
      otherText: val.department.otherText,
    };

    props.modelValue.contactPerson = { ...val.contactPerson };
    props.modelValue.collab = { ...val.collab };
    props.modelValue.discussionPlatform = { ...val.discussionPlatform };
  },
  { deep: true }
);

watch(
  () => stepData.department.value,
  (val) => {
    if (val !== "其他") {
      stepData.department.otherText = "";
    }
  }
);


</script>

<template>
  <div class="md:mt-14">

    <h1 class="text-4xl font-medium hidden md:block">基础信息</h1>
    <h3 class="font-medium text-[26px] mb-12 md:hidden">客户信息</h3>

    <div class="mt-9 w-full bg-white p-6 rounded-lg shadow">
      <h3 class="font-medium text-[26px] mb-12 hidden md:block">客户信息</h3>

      <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-start gap-5 md:gap-12">
          <h3 class="font-medium text-[22px] md:w-1/5 whitespace-nowrap">
            客户全称/类型：
          </h3>

          <div class="md:w-3/4 space-y-4">
            <div>
              <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-7">

                <!-- 企业 -->
                <div class="flex items-center w-full gap-3 md:gap-0">
                  <el-checkbox :model-value="stepData.type === '企业'" @change="selectType('企业')">
                    企业
                  </el-checkbox>

                  <el-input v-model="stepData.companyName" clearable placeholder="请填写企业信息"
                    :disabled="stepData.type !== '企业'" class="md:px-6 py-3.5 custom-input" />
                </div>

                <!-- 部门 -->
                <div class="flex items-center gap-3 w-full">
                  <label class="whitespace-nowrap hidden md:flex">所属部门:</label>
                  <el-select v-model="stepData.department.value" placeholder="请选择部门" :disabled="stepData.type !== '企业'"
                    class="rounded-lg md:px-4 py-2 custom-select">
                    <el-option label="研发" value="研发" />
                    <el-option label="市场" value="市场" />
                    <el-option label="销售" value="销售" />
                    <el-option label="人事" value="人事" />
                    <el-option label="财务" value="财务" />
                    <el-option label="行政" value="行政" />
                    <el-option label="法务" value="法务" />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </div>
                <el-input :disabled="stepData.department.value !== '其他'" v-model="stepData.department.otherText"
                  clearable placeholder="请填写其他部门" class="md:px-6 py-3.5 custom-input" />
              </div>

              <!-- 个人 -->
              <div class="flex items-center md:w-1/2 md:pr-10 gap-3 md:gap-0 mt-2">
                <el-checkbox :model-value="stepData.type === '个人'" @change="selectType('个人')">
                  个人
                </el-checkbox>

                <el-input v-model="stepData.personalName" clearable placeholder="请填写个人信息"
                  :disabled="stepData.type !== '个人'" class="md:px-6 py-3.5 rounded-lg custom-input" />
              </div>
            </div>

            <div class="flex items-start w-full mt-2">
              <label class="whitespace-nowrap hidden md:flex">备注:</label>
              <el-input type="textarea" clearable v-model="stepData.remark"
                class="md:pl-10 md:pr-5 w-full rounded-lg" />
            </div>
          </div>
        </div>

        <!-- 核心对接人 -->
        <div class="flex flex-col md:flex-row md:items-center md:gap-12 mt-10 md:mt-0">
          <h3 class="font-medium text-[22px] md:w-1/5">核心对接人：</h3>

          <div class="md:w-3/4 space-y-4 mt-5 md:mt-0">
            <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">

              <div class="flex items-center w-full">
                <label class="whitespace-nowrap hidden md:flex">姓名：</label>
                <el-input v-model="stepData.contactPerson.name" clearable placeholder="请填写客户姓名"
                  class="md:px-6 py-3.5 rounded-lg custom-input" />
              </div>

              <div class="flex items-center w-full">
                <label class="whitespace-nowrap hidden md:flex">职务：</label>
                <el-input v-model="stepData.contactPerson.position" clearable placeholder="请填写职务信息"
                  class="md:px-6 py-3.5 rounded-lg custom-input" />
              </div>

              <div class="flex items-center w-full">
                <label class="whitespace-nowrap hidden md:flex">电话：</label>
                <el-input v-model="stepData.contactPerson.phone" clearable type="number" placeholder="请输入联系方式"
                  class="md:px-6 py-3.5 rounded-lg custom-input" />
              </div>

            </div>
          </div>
        </div>

        <!-- 合作背景 -->
        <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 mt-10 md:mt-0">
          <h3 class="font-medium text-[22px] md:w-1/5">合作背景：</h3>

          <div class="md:w-3/4 flex flex-col gap-4 mt-5 md:mt-0">
            <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-7">
              <div class="flex item-center gap-3 md:gap-7">
                <el-checkbox :model-value="stepData.collab.firstTime" @change="selectCollab('firstTime')">
                  首次合作
                </el-checkbox>
                <el-checkbox :model-value="stepData.collab.repeat" @change="selectCollab('repeat')">
                  复购
                </el-checkbox>
              </div>

              <div class="flex items-center w-full">
                <label class="whitespace-nowrap hidden md:flex">历史项目：</label>
                <el-input v-model="stepData.collab.projectHistory" :disabled="!stepData.collab.repeat" clearable
                  placeholder="请填写历史合作或项目编号" class="md:px-6 py-3.5 rounded-lg w-full custom-input" />
              </div>
            </div>
          </div>
        </div>

        <!-- 洽谈方式 -->
        <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 mt-10 md:mt-0">
          <h3 class="font-medium text-[22px] md:w-1/5">洽谈方式/平台：</h3>

          <div class="md:w-1/2 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-2 mt-5 md:mt-0">
            <el-checkbox v-model="stepData.discussionPlatform.companyOffice"
              :model-value="stepData.discussionPlatform.companyOffice"
              @change="selectPlatform('companyOffice')">公司办公室</el-checkbox>
            <el-checkbox v-model="stepData.discussionPlatform.clientOffice"
              :model-value="stepData.discussionPlatform.clientOffice"
              @change="selectPlatform('clientOffice')">客户办公室</el-checkbox>
            <el-checkbox v-model="stepData.discussionPlatform.videoCall"
              :model-value="stepData.discussionPlatform.videoCall"
              @change="selectPlatform('videoCall')">远程视频</el-checkbox>

            <div class="flex flex-col md:flex-row md:items-center gap-3 md:col-span-2">
              <el-checkbox v-model="stepData.discussionPlatform.other" :model-value="stepData.discussionPlatform.other"
                @change="selectPlatform('other')">其他</el-checkbox>
              <el-input v-if="stepData.discussionPlatform.other" v-model="stepData.discussionPlatform.otherText"
                placeholder="请填写其他开发生态" class="custom-input" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-input :deep(.el-input__wrapper) {
  background-color: #F3F8FE;
  box-shadow: none;
  padding-top: 3px;
  padding-bottom: 3px;
}

.custom-input :deep(.el-input__inner) {
  background-color: transparent;
}

.custom-select :deep(.el-select__wrapper) {
  background-color: #F3F8FE;
  padding: 8px 16px;
  box-shadow: none;
}

.custom-select :deep(.el-select__selected-item) {
  background-color: transparent;
}
</style>
