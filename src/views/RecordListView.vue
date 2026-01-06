<template>
  <div class="space-y-5">
    <!-- RECORD LIST -->
    <div v-for="record in records" :key="record.id" class="bg-white rounded-xl px-6 py-7
             flex flex-col md:flex-row
             md:items-center md:justify-between
             gap-4 shadow-sm">
      <!-- Left -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900">
          {{ record.basicInfo?.companyName || "未填写公司名称" }}
        </h2>

        <div class="flex flex-wrap gap-6 mt-2 text-sm text-gray-500">
          <span>
            洽谈编号：
            <span class="text-gray-700">{{ record.id }}</span>
          </span>

          <span>
            洽谈时间：
            <span class="text-gray-700">
              {{ formatDate(record.createdAt) }}
            </span>
          </span>
        </div>
      </div>

      <!-- Right buttons -->
      <div class="flex gap-3 justify-end">
        <el-button size="large" type="primary" @click="viewRecord(record.id)">
          查看
        </el-button>

        <el-button size="large" type="primary" plain @click="editRecord(record.id)">
          编辑
        </el-button>

        <el-button size="large" type="success" plain @click="downloadPDF(record.id)">
          下载
        </el-button>
      </div>
    </div>

    <!-- ADD NEW -->
    <div class="flex justify-end mt-5">
      <el-button size="large" type="primary" @click="router.push('/records')">
        <img :src="addIcon" class="mr-2" />
        新增洽谈记录
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import addIcon from "/images/add-icon.svg";

const router = useRouter();
const records = ref([]);
const loading = ref(false);

/* ---------- FETCH RECORDS ---------- */
const fetchRecords = async () => {
  loading.value = true;
  try {
    const res = await fetch("https://backend-server-o6mn.onrender.com/records");
    const data = await res.json();

    // backend already sends DESC, but safe sort
    records.value = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } catch (err) {
    console.error("Failed to load records", err);
  } finally {
    loading.value = false;
  }
};

/* ---------- HELPERS ---------- */
const formatDate = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

/* ---------- ACTIONS ---------- */
const viewRecord = (id) => {
  router.push(`/records/${id}`);
};

const editRecord = (id) => {
  router.push(`/records/edit/${id}`);
};

const downloadPDF = async (id) => {
  try {
    const res = await fetch(
      `https://backend-server-o6mn.onrender.com/records/${id}/download`
    );

    if (!res.ok) throw new Error("Download failed");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `record-${id}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};


onMounted(fetchRecords);
</script>
