<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-form">
                <div class="title-container">
                    <h3 class="title">xnn-car系统</h3>
                    <p class="subtitle">Tunnel Engineering Management System</p>
                </div>
                
                <el-form class="user" size="large" :model="user">
                    <el-form-item prop="username">
                        <el-input 
                            :prefix-icon="User" 
                            v-model="user.username" 
                            type="text" 
                            placeholder="请输入用户名"
                            name="username">
                        </el-input>
                    </el-form-item>
                    
                    <el-form-item prop="password">
                        <el-input 
                            :prefix-icon="Lock" 
                            type="password" 
                            v-model="user.password" 
                            placeholder="请输入密码"
                            name="password"
                            @keyup.enter="handleLogin">
                        </el-input>
                    </el-form-item>
                    
                    <el-button 
                        type="primary" 
                        :loading="loading"
                        class="login-button" 
                        @click.native.prevent="handleLogin">
                        {{ loading ? '登录中...' : '登录' }}
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { User, Lock } from "@element-plus/icons-vue"
import api from "@/api/index.js"
import { useLoginStore } from "@/stores/loginStore.js"
import { useRouter } from "vue-router"

const loginStore = useLoginStore()
const router = useRouter()
const loading = ref(false)

const user = reactive({
    username: "",
    password: ""
})

const handleLogin = () => {
    loading.value = true
    api.getLogin({
        username: user.username,
        password: user.password
    }).then(res => {
        if (res.data.status === 200) {
            loginStore.token = res.data.token
            loginStore.username = res.data.username
            loginStore.permission = res.data.permission
            router.push("/")
        } else {
            ElMessage.error(res.data.msg)
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    width: 100%;
    background-image: linear-gradient(to right, #1890ff, #87ceeb);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.login-box {
    width: 420px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    animation: slideIn 0.6s ease-out;
}

.title-container {
    text-align: center;
    margin-bottom: 40px;
}

.title {
    font-size: 28px;
    color: #2c3e50;
    margin-bottom: 10px;
    font-weight: bold;
}

.subtitle {
    font-size: 14px;
    color: #7f8c8d;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.el-form-item {
    margin-bottom: 25px;
}

.el-input {
    height: 50px;
}

:deep(.el-input__wrapper) {
    background: #f5f7fa;
    border: none;
    border-radius: 8px;
    padding: 0 15px;
    box-shadow: none !important;
    transition: all 0.3s;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
    background: #fff;
    box-shadow: 0 0 0 1px #409EFF !important;
}

:deep(.el-input__prefix) {
    font-size: 18px;
    color: #909399;
}

.login-button {
    width: 100%;
    height: 50px;
    font-size: 16px;
    border-radius: 8px;
    margin-top: 10px;
    background: linear-gradient(to right, #1890ff, #87ceeb);
    border: none;
    transition: all 0.3s;
}

.login-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
    .login-box {
        width: 90%;
        padding: 20px;
    }
    
    .title {
        font-size: 24px;
    }
}
</style>