<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import Step1 from "@/components/Step1.vue";
import PinLogin from "@/components/PinLogin.vue";
import Step2 from "@/components/Step2.vue";
import Step3 from "@/components/Step3.vue";
import Step4 from "@/components/Step4.vue";



const router = useRouter();
const authorized = ref(false);
const step = ref(0);

const steps = [
  "基础信息",
  "核心需求明细",
  "项目约束与期望",
  "特殊需求与问题跟进",
];

const formData = reactive({
  basicInfo: {},
  coreNeeds: {},
  projectConstraints: {},
  specialNeeds: {},
});



onMounted(() => {
  const verified = localStorage.getItem("record_pin_verified");
  if (verified === "true") {
    authorized.value = true;
  }
});

const handleLoginSuccess = () => {
  authorized.value = true;
};


const handleNext = () => {
  if (step.value === steps.length - 1) {
    handleFinalSubmit();
  } else {
    step.value++;
  }
};

const handleBack = () => {
  if (step.value > 0) step.value--;
};

const handleFinalSubmit = async () => {
  try {
    const res = await fetch("/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        basicInfo: formData.basicInfo,
        coreNeeds: formData.coreNeeds,
        projectConstraints: formData.projectConstraints,
        specialNeeds: formData.specialNeeds,
      }),
    });

    if (!res.ok) throw new Error("Submit failed");
    console.log('saved to db')

    router.push("/records/lists");
  } catch (err) {
    console.error(err);
  }

};
</script>

<template>

  <PinLogin v-if="!authorized" @success="handleLoginSuccess" />


  <div v-else class="md:p-5 md:mt-20">
    <!-- Step indicator -->
    <div class="md:flex items-center gap-4 mb-8 hidden">
      <div v-for="(s, index) in steps" :key="index" class="flex-1 ">
        <div class="flex items-center -mr-5">
          <div class="w-4 h-4 mx-auto rounded-full transition flex items-center justify-center"
            :class="index <= step ? 'bg-[#22B4FF] w-5 h-5' : 'bg-gray-400'">
            <p :class="index < step ? 'block text-white transition' : 'hidden'">✓</p>
          </div>
          <div class="w-full h-px bg-[#22B4FF]" />
        </div>
        <p class="mt-1 text-sm font-medium"
          :class="index < step ? 'text-[#22B4FF]' : index <= step ? 'text-black' : 'text-gray-400'">
          {{ s }}
        </p>
      </div>
    </div>

    <!-- Step content -->
    <Step1 v-if="step === 0" v-model="formData.basicInfo" />
    <Step2 v-if="step === 1" v-model="formData.coreNeeds" />
    <Step3 v-if="step === 2" v-model="formData.projectConstraints" />
    <Step4 v-if="step === 3" v-model="formData.specialNeeds" />

    <!-- Buttons -->
    <div class="flex justify-center md:justify-end mt-5 gap-3">
      <button v-if="step > 0" @click="handleBack"
        class="px-10 py-4 bg-[#EDF4FF] text-[#22B4FF] border-[#22B4FF] border rounded-lg">
        上一页
      </button>

      <button @click="handleNext" class="px-10 py-4 bg-[#22B4FF] text-white rounded-lg">
        {{ step === steps.length - 1 ? "保存" : "下一页" }}
      </button>
    </div>
  </div>
</template>
