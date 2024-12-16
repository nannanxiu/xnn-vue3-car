<template>
    <div class="user-center">
        <!-- 头部信息卡片 -->
        <el-card class="user-info-card">
            <div class="user-header">
                <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <div class="user-meta">
                    <h2>{{ username }}</h2>
                    <p>用户</p>
                </div>
            </div>
        </el-card>

        <!-- 信息统计卡片 -->
        <div class="stats-container">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-card class="stats-card" shadow="hover">
                        <template #header>
                            <div class="card-header">
                                <span>项目总数</span>
                            </div>
                        </template>
                        <div class="stats-value">
                            <span class="number">{{ projectCount }}</span>
                            <span class="label">个项目</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="stats-card" shadow="hover">
                        <template #header>
                            <div class="card-header">
                                <span>进行中项目</span>
                            </div>
                        </template>
                        <div class="stats-value">
                            <span class="number">{{ activeProjects }}</span>
                            <span class="label">个进行中</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top: 24px;">
                <el-col :span="12">
                    <el-card class="stats-card" shadow="hover">
                        <template #header>
                            <div class="card-header">
                                <span>已完成项目</span>
                            </div>
                        </template>
                        <div class="stats-value">
                            <span class="number">{{ completedProjects }}</span>
                            <span class="label">个已完成</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="stats-card" shadow="hover">
                        <template #header>
                            <div class="card-header">
                                <span>项目完成率</span>
                            </div>
                        </template>
                        <div class="stats-value">
                            <span class="number">{{ ((completedProjects / projectCount) * 100).toFixed(1) }}%</span>
                            <span class="label">完成率</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useLoginStore } from '@/stores/loginStore'
import { ElMessage } from 'element-plus'
import api from '@/api'

const loginStore = useLoginStore()
const username = ref(loginStore.username)
const role = ref(loginStore.permission)

// 项目统计数据
const projectCount = ref(0)
const activeProjects = ref(0)
const completedProjects = ref(0)

// 获取项目统计数据
onMounted(async () => {
    try {
        const res = await api.getTotal()
        if (res.data.status === 200) {
            projectCount.value = res.data.result[0]['count(*)']
            // 这里需要根据实际API补充获取进行中和已完成的项目数量
            activeProjects.value = 0  // 示例数据
            completedProjects.value = 0  // 示例数据
        }
    } catch (error) {
        console.error('获取数据失败:', error)
    }
})

onMounted(async () => {
  try {
    const res = await api.getProjectStats()
    if (res.data.status === 200) {
      const stats = res.data.result
      projectCount.value = stats.total
      activeProjects.value = stats.inProgress   // status = 0 的项目数量
      completedProjects.value = stats.completed  // status = 1 的项目数量
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    ElMessage.error('获取统计数据失败')
  }
})
</script>

<style scoped>
.user-center {
    padding: 24px;
    background: #f0f2f5;
    min-height: calc(100vh - 60px);
}

.user-info-card {
    margin-bottom: 24px;
    background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
}

.user-header {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 20px;
}

.user-meta {
    h2 {
        margin: 0 0 12px 0;
        color: #ffffff;
        font-size: 28px;
    }
    p {
        margin: 0;
        color: rgba(255, 255, 255, 0.85);
        font-size: 16px;
    }
}

.stats-container {
    padding: 0 40px;
}

.stats-card {
    height: 180px;
    transition: all 0.3s;
}

.stats-card:hover {
    transform: translateY(-5px);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
        font-size: 18px;
        font-weight: 600;
        color: #1f2f3d;
    }
}

.stats-value {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 60px);
    
    .number {
        font-size: 36px;
        font-weight: bold;
        color: #409EFF;
        margin-bottom: 8px;
    }
    
    .label {
        font-size: 14px;
        color: #909399;
    }
}

:deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid #ebeef5;
    background: #fafafa;
}

/* 响应式布局 */
@media screen and (max-width: 1200px) {
    .stats-container {
        padding: 0 20px;
    }
    
    .stats-card {
        height: 150px;
        margin-bottom: 20px;
    }
    
    .stats-value .number {
        font-size: 28px;
    }
}

@media screen and (max-width: 768px) {
    .stats-container {
        padding: 0;
    }
    
    .el-col {
        width: 100% !important;
    }
    
    .user-header {
        flex-direction: column;
        text-align: center;
    }
    
    .user-meta {
        text-align: center;
    }
}
</style>