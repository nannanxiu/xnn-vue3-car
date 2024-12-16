<template>
    <div class="user-container">
        <div class="search-bar">
            <div class="left-section">
                <span class="label">用户状态:</span>
                <el-input 
                    @keyup.enter="searchHandler" 
                    v-model="searchInfo" 
                    size="large" 
                    placeholder="请输入用户信息"
                    class="search-input"
                />
            </div>
            <div class="right-section">
                <el-button @click="searchHandler" size="large" type="primary" class="action-button">
                    <el-icon><Search /></el-icon>搜索
                </el-button>
                <el-button @click="addUserHandler" size="large" type="success" class="action-button">
                    <el-icon><Plus /></el-icon>添加
                </el-button>
            </div>
        </div>

        <div class="table-container">
            <el-table :data="userList.list" style="width:100%" border>
                <el-table-column label="ID" prop="id" width="100" align="center"></el-table-column>
                <el-table-column label="用户名" prop="username" width="180"></el-table-column>
                <el-table-column label="权限" width="150" align="center">
                    <template #default="scope">
                        <el-tag :type="scope.row.permission === 'admin' ? 'danger' : 'success'">
                            {{ scope.row.permission === 'admin' ? '管理员' : '普通用户' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="电话" prop="phone" width="180"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="handleEditor(scope.$index, scope.row)">
                            <el-icon><Edit /></el-icon>编辑权限
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                            <el-icon><Delete /></el-icon>删除用户
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加用户对话框 -->
        <el-dialog v-model="dialogAddVisible" title="添加用户" width="35%" center destroy-on-close>
            <el-form :model="userForm" status-icon label-width="120px" class="dialog-form">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="permission">
                    <el-radio-group v-model="userForm.permission" size="large">
                        <el-radio-button @click="permissionHandler('admin')" label="管理员" />
                        <el-radio-button @click="permissionHandler('vip')" label="普通用户" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model="userForm.phone" type="text"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogAddVisible = false">取消</el-button>
                    <el-button type="primary" @click="sureAddUserHandler">确定</el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 修改用户对话框 -->
        <el-dialog v-model="dialogUpdateVisible" title="修改用户" width="35%" center destroy-on-close>
            <el-form :model="userUpdateForm" status-icon label-width="120px" class="dialog-form">
                <el-form-item label="用户名" prop="username">
                    <h3>{{ userUpdateForm.username }}</h3>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userUpdateForm.password" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="permission">
                    <el-radio-group v-model="userUpdateForm.permission" size="large">
                        <el-radio-button @click="permissionUpdateHandler('admin')" label="管理员" />
                        <el-radio-button @click="permissionUpdateHandler('vip')" label="普通用户" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model="userUpdateForm.phone" type="text"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogUpdateVisible = false">取消</el-button>
                    <el-button type="primary" @click="sureUpdateUserHandler">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
.user-container {
    padding: 20px;
    background-color: #f5f7fa;
    min-height: calc(100vh - 60px);
}

.search-bar {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.left-section {
    display: flex;
    align-items: center;
    gap: 15px;
}

.label {
    font-weight: 600;
    color: #333;
    font-size: 14px;
}

.search-input {
    width: 300px;
}

.right-section {
    display: flex;
    gap: 10px;
}

.action-button {
    display: flex;
    align-items: center;
    gap: 5px;
}

.table-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.dialog-form {
    padding: 20px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 20px;
}

:deep(.el-table) {
    border-radius: 4px;
}

:deep(.el-button) {
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

:deep(.el-tag) {
    min-width: 80px;
}

:deep(.el-dialog__body) {
    padding: 0;
}
</style>
<script setup>

import api from "@/api/index.js"
import { onMounted, reactive, ref } from "vue"

const userList = reactive({
    list: []
})

const userForm = reactive({
    username: "",
    password: "",
    permission: "",
    phone: ""
})

const userUpdateForm = reactive({
    username: "",
    password: "",
    permission: "",
    phone: ""
})

const searchInfo = ref("")
const dialogAddVisible = ref(false)
const dialogUpdateVisible = ref(false)
const EditorID = ref(0)

onMounted(() => {
    http()
})

const http = () => {
    api.getUserList().then(res => {
        if (res.data.status === 200) {
            userList.list = res.data.result
        }
    }).catch(error => {
        console.log(error);
    })
}

const handleEditor = (index, row) => {
    EditorID.value = row.id
    if (row.id === 1) {
        return
    }
    dialogUpdateVisible.value = true
    api.getPreViewUser({
        id: row.id
    }).then(res => {
        if (res.data.status === 200) {
            userUpdateForm.username = res.data.result[0].username
            userUpdateForm.password = res.data.result[0].password
            userUpdateForm.permission = res.data.result[0].permission
            userUpdateForm.phone = res.data.result[0].phone
        }
    })
}

const handleDelete = (index, row) => {
    ElMessageBox.confirm('是否确定删除用户', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        api.getDelUser({
            id: row.id
        }).then(res => {
            if (res.data.status === 200) {
                ElMessage({
                    type: 'success',
                    message: res.data.msg,
                })
                // 刷新UI
                http()
            } else {
                ElMessage({
                    type: 'danger',
                    message: res.data.msg,
                })
            }
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已经取消删除',
        })
    })

}

/**
 * 搜索按钮事件
 */
const searchHandler = () => {
    api.getSearchUser({
        search: searchInfo.value
    }).then(res => {
        userList.list = res.data.result
    })
}

/**
 * 确定添加用户
 */
const sureAddUserHandler = () => {
    api.getAddUser({
        username: userForm.username,
        password: userForm.password,
        permission: userForm.permission,
        phone: userForm.phone
    }).then(res => {
        if (res.data.status === 200) {
            dialogAddVisible.value = false
            http()
        }
    }).catch(error => {
        console.log(error);
    })
}

const addUserHandler = () => {
    dialogAddVisible.value = true
}

/**
 * 用户权限选择
 */
const permissionHandler = (data) => {
    userForm.permission = data
}

/**
 * 用户修改权限选择
 */
const permissionUpdateHandler = (data) => {
    userUpdateForm.permission = data
}

/**
 * 确定修改用户信息
 */
const sureUpdateUserHandler = () => {
    userUpdateForm.permission === "管理员" ? userUpdateForm.permission = 'admin' : userUpdateForm.permission = 'vip'
    api.getUpdateUser({
        id: EditorID.value,
        password: userUpdateForm.password,
        permission: userUpdateForm.permission,
        phone: userUpdateForm.phone
    }).then(res => {
        if (res.data.status === 200) {
            http();
            dialogUpdateVisible.value = false
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}

</script>