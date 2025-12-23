<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    loginType: String
});

const emit = defineEmits(["success"]);
const router = useRouter();

const pin = ref(["", "", "", "", "", ""]);

const USERS = {
    123456: { id: 1, name: "Admin" },
    111111: { id: 2, name: "Sales Manager" },
    222222: { id: 3, name: "Employee" },
};

const handleChange = (value, index) => {
    if (value.length > 1) return;
    pin.value[index] = value;

    if (value && index < 5) {
        document.getElementById(`pin-${index + 1}`)?.focus();
    }
};

const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin.value[index] && index > 0) {
        pin.value[index - 1] = "";
        document.getElementById(`pin-${index - 1}`)?.focus();
    }
};

const handleSubmit = () => {
    const enteredPin = pin.value.join("");
    const user = USERS[enteredPin];

    if (!user) {
        alert("密码错误，请重试！");
        pin.value = ["", "", "", "", "", ""];
        document.getElementById("pin-0")?.focus();
        return;
    }

    if (props.loginType === "record") {
        localStorage.setItem("record_pin_verified", "true");
        localStorage.setItem("record_user", JSON.stringify(user));
    }

    emit("success", user);
};

const handleCancel = () => {
    pin.value = ["", "", "", "", "", ""];
    router.push("/");
};
</script>

<template>
    <div class="w-full h-full flex justify-center mt-20">
        <div class="bg-[#eee] px-12 py-10 rounded-3xl shadow-md text-center">
            <p class="font-semibold text-2xl mb-5">请输入密码</p>

            <div class="flex gap-3 justify-center mb-6">
                <input v-for="(digit, i) in pin" :key="i" :id="`pin-${i}`" maxlength="1" :value="digit"
                    @input="handleChange($event.target.value, i)" @keydown="handleKeyDown($event, i)"
                    class="w-10 h-12 border text-center rounded-md" />
            </div>

            <div class="flex justify-center gap-6">
                <button @click="handleCancel" class="w-24 h-10 bg-gray-300 rounded-md">
                    取 消
                </button>
                <button @click="handleSubmit" class="w-24 h-10 bg-gray-400 text-white rounded-md">
                    解 锁
                </button>
            </div>
        </div>
    </div>
</template>
