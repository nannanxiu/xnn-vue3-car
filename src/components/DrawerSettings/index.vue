<template>
    <div class="setting">
        <!-- 控制抽屉按钮 -->
        <el-button size="large" class="setting-btn" type="primary" @click="drawer = true">
            <el-icon class="setting-icon">
                <Setting />
            </el-icon>
        </el-button>
        <!-- 抽屉 -->
        <el-drawer v-model="drawer" title="系统设置" size="20%">
            <el-icon><Unlock /></el-icon>
            <span class="logo-show">Logo显示与隐藏</span>
            <el-switch v-model="systemStore.toggleStore" />
        </el-drawer>
    </div>
</template>
<script setup>

import { ref,watch } from "vue"
import { useSystemStore } from "@/stores/systemStore.js"

const emit = defineEmits(["onToggleEvent"])

const systemStore = useSystemStore()

const drawer = ref(false)
const logoToggle = ref(false)
watch(logoToggle,(newValue,oldValue) =>{
    emit("onToggleEvent",newValue)
})

</script>
<style scoped>
.setting {
    position: fixed;
    right: 0;
    top: 200px;
    z-index: 100;
}

.setting-icon {
    font-size: 25px;
}

.logo-show{
    margin-right: 20px;
    margin-left: 10px;
}
</style>