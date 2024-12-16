<template>
    <div class="section-test">
        <!-- 切面示意图和实时数据 -->
        <div class="visual-section">
            <div class="diagram">
                <h3>切面实时监测</h3>
                <div class="tunnel-section">
                    <!-- 隧道切面示意图 -->
                    <div class="tunnel-outline">
                        <!-- 可以使用SVG或Canvas绘制隧道切面 -->
                        <div class="measurement-points">
                            <!-- 测点标记 -->
                            <div v-for="point in measurementPoints" 
                                 :key="point.id" 
                                 :class="['point', point.status]"
                                 :style="{left: point.x + '%', top: point.y + '%'}"
                                 @click="showPointDetails(point)">
                                <el-tooltip :content="point.value + point.unit">
                                    <div class="point-marker"></div>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 实时数据面板 -->
            <div class="data-panel">
                <el-card class="data-card">
                    <template #header>
                        <div class="card-header">
                            <span>实时监测数据</span>
                            <el-tag type="success">正常运行中</el-tag>
                        </div>
                    </template>
                    <div class="data-list">
                        <div v-for="item in monitoringData" 
                             :key="item.id" 
                             class="data-item">
                            <span class="label">{{item.label}}</span>
                            <span class="value" :class="item.status">
                                {{item.value}}{{item.unit}}
                            </span>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>

        <!-- 切面分析图表 -->
        <div class="analysis-charts">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="chart-container" id="deformation-chart"></div>
                </el-col>
                <el-col :span="12">
                    <div class="chart-container" id="stress-chart"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 测点数据
const measurementPoints = ref([
    { id: 1, x: 25, y: 20, value: '2.5', unit: 'mm', status: 'normal' },
    { id: 2, x: 75, y: 20, value: '3.1', unit: 'mm', status: 'warning' },
    { id: 3, x: 50, y: 80, value: '1.8', unit: 'mm', status: 'normal' },
    // 更多测点...
])

// 监测数据
const monitoringData = ref([
    { id: 1, label: '变形量', value: '2.5', unit: 'mm', status: 'normal' },
    { id: 2, label: '应力', value: '245', unit: 'kPa', status: 'warning' },
    { id: 3, label: '位移', value: '1.2', unit: 'mm', status: 'normal' },
    { id: 4, label: '裂缝宽度', value: '0.05', unit: 'mm', status: 'normal' },
])

// 显示测点详情
const showPointDetails = (point) => {
    console.log('测点详情:', point)
}

// 初始化图表
onMounted(() => {
    // 变形监测图表
    const deformationChart = echarts.init(document.getElementById('deformation-chart'))
    deformationChart.setOption({
        title: { text: '变形监测趋势' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'time' },
        yAxis: { type: 'value', name: '变形量(mm)' },
        series: [{
            name: '变形量',
            type: 'line',
            data: generateData()
        }]
    })

    // 应力监测图表
    const stressChart = echarts.init(document.getElementById('stress-chart'))
    stressChart.setOption({
        title: { text: '应力监测趋势' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'time' },
        yAxis: { type: 'value', name: '应力(kPa)' },
        series: [{
            name: '应力',
            type: 'line',
            data: generateData()
        }]
    })
})

// 生成模拟数据
const generateData = () => {
    const data = []
    let now = new Date()
    for (let i = 0; i < 100; i++) {
        data.push({
            name: now.toString(),
            value: [
                now.getTime(),
                Math.random() * 5
            ]
        })
        now = new Date(now.getTime() + 1000 * 60)
    }
    return data
}
</script>

<style scoped>
.section-test {
    padding: 20px;
}

.visual-section {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.diagram {
    flex: 2;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.tunnel-section {
    height: 400px;
    border: 1px solid #eee;
    border-radius: 4px;
    position: relative;
}

.tunnel-outline {
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    position: relative;
}

.point {
    position: absolute;
    width: 12px;
    height: 12px;
    transform: translate(-50%, -50%);
    cursor: pointer;
}

.point-marker {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #409EFF;
    transition: all 0.3s;
}

.point.warning .point-marker {
    background: #E6A23C;
    animation: pulse 1.5s infinite;
}

.data-panel {
    flex: 1;
}

.data-card {
    height: 100%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.data-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.data-item .value.warning {
    color: #E6A23C;
}

.chart-container {
    height: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(230,162,60,0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(230,162,60,0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(230,162,60,0);
    }
}
</style>