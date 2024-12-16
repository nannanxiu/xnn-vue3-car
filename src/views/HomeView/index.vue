<template>
    <div class="card">
        <div class="box">
            <el-icon class="box-icon" style="color:#40c9c6"><Notification /></el-icon>
            <span class="box-title">隧道数量: 8888 个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#36a3f7"><Compass /></el-icon>
            <span class="box-title">检验合格：{{ checkCount }}个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#f4516c"><Bell /></el-icon>
            <span class="box-title">正在施工：{{ number }} 个 </span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#34bfa3"><Odometer /></el-icon>
            <span class="box-title">地址预报：5000个</span>
        </div>
    </div>

    <!-- echarts -->
    <div class="line" id="line"></div>
    <div class="charts">
        <div id="charts-radar"></div>
        <div id="charts-rose"></div>
        <div id="charts-bar"></div>
    </div>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'

// 实时随机数
const number = ref(100)


onMounted(() => {
    setInterval(() => {
        const newNumber = Math.floor(Math.random() * (500 - 100) + 100)
        number.value = newNumber
    }, 2000)
})

//每2秒加1
const checkCount = ref(805)
const maxCount = 7777  // 最大值

onMounted(() => {
    setInterval(() => {
        if(checkCount.value >= maxCount) {
            checkCount.value = 7777  // 达到最大值后重置
        } else {
            checkCount.value++
        }
    }, 2000)
})

// import { getCurrentInstance,onMounted } from "vue"
import api from "@/api/index.js"

const { proxy } = getCurrentInstance()

onMounted(() =>{
    api.getLine().then(res =>{
        if(res.data.status === 200){
            proxy.$line("line",res.data.result.lines)
        }
    }).catch(error =>{
        console.log(error);
    })
    // 加载图表
    proxy.$radar("charts-radar")
    proxy.$rose("charts-rose")
    proxy.$bar("charts-bar")
})


</script>
<style scoped>
.card {
    display: flex;
    gap: 20px; /* 卡片之间的间距 */
    padding: 10px;
}

.card .box {
    flex: 1;
    height: 130px;
    padding: 20px;
    background: #ffffff;
    border-radius: 12px; /* 圆角 */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); /* 柔和阴影 */
    transition: all 0.3s ease; /* 过渡效果 */
    border: 1px solid #e8f2ff; /* 浅蓝色边框 */
    background: linear-gradient(145deg, #ffffff, #f5f9ff); /* 渐变背景 */
}

.card .box:hover {
    transform: translateY(-5px); /* 悬停效果 */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-color: #d0e3ff;
}

.card .box .box-icon {
    display: block;
    font-size: 80px;
    line-height: 130px;
    float: left;
    padding-left: 20px;
    transition: transform 0.3s ease;
}

.card .box:hover .box-icon {
    transform: scale(1.1); /* 图标悬停放大效果 */
}

.box-title {
    display: block;
    font-size: 20px;
    color: #5a6d95; /* 更柔和的文字颜色 */
    line-height: 130px;
    float: right;
    padding-right: 20px;
    font-weight: 500;
}

/* 移除第一个和最后一个盒子的特殊外边距 */
.card .box:first-child {
    margin-left: 0;
}

.card .box:last-child {
    margin-right: 0;
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
    .card {
        flex-wrap: wrap;
    }
    
    .card .box {
        flex: calc(50% - 20px);
        margin: 10px;
    }
}

@media screen and (max-width: 768px) {
    .card .box {
        flex: 100%;
    }
}

.line {
    width: 100%;
    height: 300px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    margin: 20px 0;
    padding: 20px;
    transition: all 0.3s ease;
}

.line:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.charts {
    display: flex;
    gap: 20px;
    margin: 20px 0;
}

.charts div {
    flex: 1;
    height: 450px;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #e8f2ff;
    transition: all 0.3s ease;
}

.charts div:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
    .charts {
        flex-wrap: wrap;
    }
    
    .charts div {
        flex: calc(50% - 10px);
        margin: 0;
    }
}

@media screen and (max-width: 768px) {
    .charts div {
        flex: 100%;
    }
}

</style>