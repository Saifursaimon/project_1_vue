<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { defineProps, reactive, watch } from "vue";
import { ElInput, ElCheckbox, ElSelect, ElOption } from "element-plus";

const props = defineProps({
  modelValue: Object,
});

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

watch(stepData, (val) => {
  // eslint-disable-next-line vue/no-mutating-props
  Object.assign(props.modelValue, val);
}, { deep: true });

</script>


<template>
  <div class="md:mt-14">

    <h1 class="text-4xl font-medium hidden md:block">基础信息</h1>
    <h3 class="font-medium text-[26px] mb-12  md:hidden">客户信息</h3>

    <div class="mt-9 w-full bg-white  p-6 rounded-lg shadow">
      <h3 class="font-medium text-[26px] mb-12 hidden md:block">客信息</h3>

      <div class="space-y-6 ">
        <div class="flex flex-col md:flex-row md:items-start gap-5 md:gap-12">
          <h3 class="font-medium text-[22px] md:w-1/5 whitespace-nowrap">客户全称/类型：</h3>
          <div class="md:w-3/4 space-y-4">
            <div>
              <div class="flex flex-col md:flex-row md:items-center  gap-4 md:gap-20">
                <div class="flex items-center w-full gap-3 md:gap-0">
                  <el-checkbox v-model="stepData.type" label="企业"></el-checkbox>
                  <el-input v-model="stepData.companyName" clearable placeholder="请填写企业信息"
                    class=" md:px-6 py-3.5 custom-input " />
                </div>
                <div class="flex items-center gap-3 w-full">
                  <label class="whitespace-nowrap hidden md:flex">所属部门:</label>
                  <el-select v-model="stepData.department" placeholder="请选择部门"
                    class=" rounded-lg md:px-4 py-2 custom-select">
                    <el-option label="研发" value="研发">
                    </el-option>
                    <el-option label="市场" value="市场"></el-option>
                    <el-option label="销售" value="销售"></el-option>
                    <el-option label="人事" value="人事"></el-option>
                    <el-option label="财务" value="财务"></el-option>
                    <el-option label="行政" value="行政"></el-option>
                    <el-option label="法务" value="法务"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="flex items-center md:w-1/2 md:pr-10 gap-3 md:gap-0">
                <el-checkbox v-model="stepData.type" label="个人"></el-checkbox>
                <el-input v-model="stepData.personalName" clearable placeholder="请填写个人信息"
                  class=" md:px-6 py-3.5 rounded-lg custom-input" />
              </div>
            </div>
            <div class="flex items-start w-full ">
              <label class="whitespace-nowrap hidden md:flex">备注: </label>
              <el-input type="textarea" clearable v-model="stepData.remark"
                class="md:pl-10 md:pr-5 w-full rounded-lg" />
            </div>
          </div>
        </div>


        <div class="flex flex-col md:flex-row md:items-center md:gap-12 mt-10 md:mt-0">
          <h3 class="font-medium text-[22px] md:w-1/5">核心对接人：</h3>

          <div class="md:w-3/4 space-y-4 mt-5 md:mt-0">
            <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">

              <div class="flex items-center w-full">
                <label class="whitespace-nowrap hidden md:flex">姓名：</label>
                <el-input v-model="stepData.contactPerson.name" clearable placeholder="请填写客户姓名"
                  class=" md:px-6 py-3.5 rounded-lg custom-input" />
              </div>

              <div class="flex items-center w-full">
                <label class="whitespace-nowrap hidden md:flex">职务：</label>
                <el-select v-model="stepData.contactPerson.position" placeholder="请选择职务信息"
                  class=" rounded-lg md:px-4 py-2 custom-select">
                  <el-option label="经理" value="经理" />
                  <el-option label="主管" value="主管" />
                  <el-option label="专员" value="专员" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </div>

              <div class="flex items-center w-full">
                <label class="whitespace-nowrap hidden md:flex">电话：</label>
                <el-input v-model="stepData.contactPerson.phone" clearable type="number" placeholder="请输入联系方式"
                  class=" md:px-6 py-3.5 rounded-lg custom-input" />
              </div>

            </div>
          </div>
        </div>


        <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 mt-10 md:mt-0">
          <h3 class="font-medium text-[22px] md:w-1/5">合作背景：</h3>
          <div class="md:w-3/4 flex flex-col gap-4 mt-5 md:mt-0">
            <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-7">
              <div class="flex item-center gap-3 md:gap-7">
                <el-checkbox v-model="stepData.collab.firstTime">首次合作</el-checkbox>
                <el-checkbox v-model="stepData.collab.repeat">复购</el-checkbox>
              </div>
              <div class="flex items-center w-full">
                <label class="whitespace-nowrap hidden md:flex">历史项目：</label>
                <el-input v-model="stepData.collab.projectHistory" clearable placeholder="请填写历史合作或项目编号"
                  class=" md:px-6 py-3.5 rounded-lg w-full custom-input" />
              </div>
            </div>
          </div>
        </div>


        <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 mt-10 md:mt-0">
          <h3 class="font-medium text-[22px] md:w-1/5">洽谈方式/平台：</h3>
          <div class="md:w-1/2 grid grid-cols-2 md:grid-cols-5  gap-8 md:gap-2 mt-5 md:mt-0 ">
            <el-checkbox v-model="stepData.discussionPlatform.companyOffice">公司办公室</el-checkbox>
            <el-checkbox v-model="stepData.discussionPlatform.clientOffice">客户办公室</el-checkbox>
            <el-checkbox v-model="stepData.discussionPlatform.videoCall">远程视频</el-checkbox>
            <div class="flex flex-col md:flex-row md:items-center gap-3 md:col-span-2">
              <el-checkbox v-model="stepData.discussionPlatform.other">其他</el-checkbox>
              <el-input v-if="stepData.discussionPlatform.other" v-model="stepData.discussionPlatform.otherText"
                placeholder="请填写其他开发生态" class="custom-input " />
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
