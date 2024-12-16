<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <h2>页面未找到</h2>
      <p>抱歉，您访问的页面不存在或已被移除</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 0 20px;
}

.content {
  text-align: center;
  margin-right: 50px;
}

h1 {
  font-size: 120px;
  color: #409eff;
  margin: 0;
  line-height: 1;
  font-weight: bold;
}

h2 {
  font-size: 30px;
  color: #303133;
  margin: 20px 0;
}

p {
  font-size: 16px;
  color: #606266;
  margin-bottom: 30px;
}

.image-container {
  max-width: 400px;
}

.image-container img {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .not-found {
    flex-direction: column;
  }
  
  .content {
    margin-right: 0;
    margin-bottom: 30px;
  }
  
  h1 {
    font-size: 80px;
  }
  
  h2 {
    font-size: 24px;
  }
  
  .image-container {
    max-width: 300px;
  }
}
</style>