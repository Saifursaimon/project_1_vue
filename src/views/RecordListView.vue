<template>
    <div>
        <div
            class="bg-white rounded-xl px-6 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
            <!-- Left content -->
            <div>
                <h2 class="text-lg font-semibold text-gray-900">
                    {{ recordData.record.basicInfo?.companyName || 'Loading...' }}
                </h2>

                <div class="flex flex-wrap gap-6 mt-2 text-sm text-gray-500">
                    <span>
                        洽谈编号：
                        <span class="text-gray-700">{{ recordNumber }}</span>
                    </span>
                    <span>
                        洽谈时间：
                        <span class="text-gray-700">{{ recordDate }}</span>
                    </span>
                </div>
            </div>

            <!-- Right buttons -->
            <div class="flex gap-3 justify-end">
                <el-button size="large" type="primary" class="btn">查看</el-button>

                <el-button size="large" type="primary" class="btn" plain>编辑</el-button>

                <el-button size="large" type="success" class="btn" plain>下载</el-button>
            </div>
        </div>
        <div class="flex justify-end mt-5">
            <el-button @click="router.push('/records')" size="large" type="primary" class="btn"> <img :src="addIcon"
                    class="mr-2" />新增洽谈记录</el-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import addIcon from '/src/assets/images/add-icon.svg'
import { useRouter } from "vue-router";

const router = useRouter()

const recordData = reactive({
    record: {},
    isLoading: false
})

const recordNumber = ref(Math.floor(Math.random() * 9000) + 1000)
const recordDate = ref(new Date().toISOString().slice(2, 10)) // yy-mm-dd

onMounted(() => {
    recordData.isLoading = true
    const data = localStorage.getItem("record_form_data");
    if (data) {
        recordData.record = JSON.parse(data)
        recordData.isLoading = false
        console.log(recordData.record)
    }
});
</script>
