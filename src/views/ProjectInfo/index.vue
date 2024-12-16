<template>
    <!-- 搜索与添加 start -->
    <div class="search">
        <span>项目状态:</span>
        <el-input class="input" @keyup.enter="searchHandler" v-model="searchInfo" size="large" placeholder="请输入要搜索的信息">
        </el-input>
        <el-button @click="searchHandler" class="button" size="large" type="primary" plain>搜索</el-button>
        <el-button @click="addHandler" class="button" size="large" type="primary" plain>添加</el-button>
    </div>
    <!-- 搜索与添加 end -->

    <!-- 表格展示数据 start -->
    <el-table :data="projectInfo.list" :header-cell-style="headerClass" style="width: 100%">
        <el-table-column prop="name" label="项目名称" width="180" />
        <el-table-column prop="number" label="项目编码" width="120" />
        <el-table-column prop="money" label="项目金额" width="120" />
        <el-table-column prop="address" label="项目地址" width="150" />
        <el-table-column prop="duration" label="项目工期(月)" width="120" />
        <el-table-column :formatter="value => detaFormater(Number(value.startTime))" prop="startTime" label="开工时间"
            width="150" />
        <el-table-column :formatter="value => detaFormater(Number(value.endTime))" prop="endTime" label="终止时间"
            width="150" />
        <el-table-column prop="quantity" label="隧道数量" width="120" />
        <el-table-column prop="status" label="项目状态" width="120">
            <template #default="scope">
                <el-tag :type="scope.row.status === '1' ? '' : 'success'">{{ statusHandle(scope.row.status) }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="remark" label="备注">
            <template #default="scope">
                <div v-html="scope.row.remark"></div>
            </template>
        </el-table-column>
        <el-table-column width="135" label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 表格展示数据 end -->
    <!-- 分页 start -->
    <div class="page">
        <el-pagination @current-change="currentChangeHandler" background layout="prev, pager, next,jumper"
            :default-page-size="defaultPageSize" :total="total" />
    </div>
    <!-- 分页 end -->
    <!-- 添加对话框 start -->
    <el-dialog v-model="dialogAddVisible"  title="添加隧道信息"  width="35%" center>
        <el-form :inline="true" :model="addFormInfo">
            <el-form-item label="项目名称">
                <el-input v-model="addFormInfo.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目编码">
                <el-input v-model="addFormInfo.number" placeholder="请输入项目编码"></el-input>
            </el-form-item>
            <el-form-item label="项目金额">
                <el-input v-model="addFormInfo.money" placeholder="请输入项目金额"></el-input>
            </el-form-item>
            <el-form-item label="项目地址">
                <el-input v-model="addFormInfo.address" placeholder="请输入项目地址"></el-input>
            </el-form-item>
            <el-form-item label="项目工期">
                <el-input v-model="addFormInfo.duration" placeholder="请输入项目工期"></el-input>
            </el-form-item>
            <el-form-item label="开工时间">
                <!-- <el-input v-model="addFormInfo.startTime" placeholder="请输入开工时间"></el-input> -->
                <el-date-picker value-format="x" v-model="addFormInfo.startTime" type="date" placeholder="请输入开工时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="终止时间">
                <!-- <el-input v-model="addFormInfo.endTime" placeholder="请输入终止时间"></el-input> -->
                <el-date-picker value-format="x" v-model="addFormInfo.endTime" type="date" placeholder="请输入终止时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="隧道数量">
                <el-input v-model="addFormInfo.quantity" placeholder="请输入隧道数量"></el-input>
            </el-form-item>
            <el-form-item label="项目状态">
                <el-input v-model="addFormInfo.status" placeholder="'1' 施工中  -  '0' 已完工"></el-input>
            </el-form-item>
            <el-form-item label="项目备注">
                <!-- <el-input v-model="addFormInfo.remark" placeholder="请输入项目备注"></el-input> -->
                <TinymceEditor :options="options" @onDataEvent="getInfoEditorHandler" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取消</el-button>
                <el-button type="primary" @click="sureHandler">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 添加对话框 end -->
    <!-- 编辑对话框 start -->
    <!-- destory-on-close:关闭对话框，直接销毁对话框 -->
    <el-dialog destroy-on-close v-model="dialogEditorVisible" title="编辑隧道信息" width="35%" center>
        <el-form :inline="true" :model="editorFormInfo">
            <el-form-item label="项目名称">
                <el-input v-model="editorFormInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="项目编码">
                <el-input v-model="editorFormInfo.number"></el-input>
            </el-form-item>
            <el-form-item label="项目金额">
                <el-input v-model="editorFormInfo.money"></el-input>
            </el-form-item>
            <el-form-item label="项目地址">
                <el-input v-model="editorFormInfo.address"></el-input>
            </el-form-item>
            <el-form-item label="项目工期">
                <el-input v-model="editorFormInfo.duration"></el-input>
            </el-form-item>
            <el-form-item label="开工时间">
                <el-date-picker value-format="x" v-model="editorFormInfo.startTime" type="date">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="终止时间">
                <el-date-picker value-format="x" v-model="editorFormInfo.endTime" type="date">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="隧道数量">
                <el-input v-model="editorFormInfo.quantity"></el-input>
            </el-form-item>
            <el-form-item label="项目状态">
                <el-input v-model="editorFormInfo.status"></el-input>
            </el-form-item>
            <el-form-item label="项目备注">
                <TinymceEditor :editorID="editorID" :remark="editorFormInfo.remark" :options="options" @onDataEvent="updateEditorHandler" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogEditorVisible = false">取消</el-button>
                <el-button type="primary" @click="sureEditorHandler">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 编辑对话框 end -->
</template>
<script setup>

import api from "@/api/index.js"
import { onMounted, reactive, ref } from "vue"
import { detaFormater } from "@/utils/utils.js"
import TinymceEditor from "@/components/TinymceEditor/index.vue"

const projectInfo = reactive({
    list: []
})

// 初始化总条数
const total = ref(0)
// 初始分页显示数量
const defaultPageSize = ref(15)

// 添加对话框控制器
const dialogAddVisible = ref(false)
// 编辑对话框控制器
const dialogEditorVisible = ref(false)
// 定义修改数据的唯一ID
const editorID = ref(0)

// 初始化添加对话框状态
const addFormInfo = reactive({
    name: "",
    number: "",
    money: "",
    address: "",
    duration: "",
    startTime: "",
    endTime: "",
    quantity: "",
    status: "",
    remark: ""
})

// 初始化编辑对话框状态
const editorFormInfo = reactive({
    name: "",
    number: "",
    money: "",
    address: "",
    duration: "",
    startTime: "",
    endTime: "",
    quantity: "",
    status: "",
    remark: ""
})

// 初始获取页面数据
onMounted(() => {
    http(1)
})

// 初始获取总条数
onMounted(() => {
    api.getTotal().then(res => {
        if (res.data.status === 200) {
            total.value = res.data.result[0]['count(*)']
        } else {
            total.value = 0
        }
    })
})

// 搜索初始化状态
const searchInfo = ref("")

/**
 * 网络请求
 */
const http = (page) => {
    api.projectInfo({ page }).then(res => {
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        }
    }).then(error => {
        // console.log(error);
    })
}
/**
 * 隧道状态文本
 */
const statusHandle = (status) => {
    return status === '1' ? '施工中' : '已完工'
}
/**
 * 设置表格头部样式
 */
const headerClass = () => {
    return {
        background: "#dcdcdc",
        color: "#999",
        fontWeight: 700
    }
}
/**
 * 表格 编辑按钮
 */
const handleEdit = (index, row) => {
    dialogEditorVisible.value = true;
    editorID.value = row.id
    api.getPreProject({ id:row.id }).then(res =>{
        if(res.data.status === 200){
            editorFormInfo.name = res.data.result.name
            editorFormInfo.number = res.data.result.number
            editorFormInfo.money = res.data.result.money
            editorFormInfo.address = res.data.result.address
            editorFormInfo.duration = res.data.result.duration
            // 修改事件日期格式
            editorFormInfo.startTime = Number(res.data.result.startTime)
            editorFormInfo.endTime = Number(res.data.result.endTime)
            editorFormInfo.quantity = res.data.result.quantity
            editorFormInfo.status = res.data.result.status
            editorFormInfo.remark = res.data.result.remark
        }else{
            ElMessage.error(res.data.msg)
        }
    }).catch(error =>{
        console.log(error);
    })
}
/**
 * 表格 删除按钮
 */
const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        '确定要删除当前数据么?',
        '删除数据',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            // 确定删除
            api.getDelProject({ id: row.id }).then(res => {
                if (res.data.status === 200) {
                    ElMessage({
                        type: 'success',
                        message: res.data.msg,
                    })
                    // 刷新UI
                    http(1)
                }else{
                    ElMessage({
                        type: 'error',
                        message: res.data.msg,
                    })
                }
            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })

}

/**
 * 搜索按钮
 */
const searchHandler = () => {
    api.getSearch({ search: searchInfo.value }).then(res => {
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        } else {
            projectInfo.list = []
        }
    })
}

/**
 * 分页事件
 */
const currentChangeHandler = (val) => {
    http(val)
}

/**
 * 添加对话框弹出事件
 */
const addHandler = () => {
    dialogAddVisible.value = true
}

/**
 * 添加对话框 确定事件
 */
const sureHandler = () => {
    api.getAddProject({
        name: addFormInfo.name,
        number: addFormInfo.number,
        money: addFormInfo.money,
        address: addFormInfo.address,
        duration: addFormInfo.duration,
        startTime: addFormInfo.startTime,
        endTime: addFormInfo.endTime,
        quantity: addFormInfo.quantity,
        status: addFormInfo.status,
        remark: addFormInfo.remark
    }).then(res => {
        if (res.data.status === 200) {
            dialogAddVisible.value = false
            // 刷新页面
            http(1)
        } else {
            ElMessage.error(res.data.msg)
        }
    }).catch(error => {
        console.log(error);
    })
}

/**
 * 定义富文本编辑器宽高
 */
const options = {
    width: "100%",
    height: "300px"
}

/**
 * 富文本编辑器获取数据事件
 */
const getInfoEditorHandler = (data) => {
    addFormInfo.remark = data
}

/**
 * 修改提交富文本编辑器数据
 */
const updateEditorHandler = (data) =>{
    editorFormInfo.remark = data
}

/**
 * 确认修改事件
 */
const sureEditorHandler = () =>{
    api.getUpdateProject(editorID.value,{
        name: editorFormInfo.name,
        number: editorFormInfo.number,
        money: editorFormInfo.money,
        address: editorFormInfo.address,
        duration: editorFormInfo.duration,
        startTime: editorFormInfo.startTime,
        endTime: editorFormInfo.endTime,
        quantity: editorFormInfo.quantity,
        status: editorFormInfo.status,
        remark: editorFormInfo.remark  // 富文本编辑器中的数据
    }).then(res =>{
        if(res.data.status === 200){
            dialogEditorVisible.value = false;
            http(1)
        }else{
            ElMessage.error(res.data.msg)
        }
    })

}
</script>
<style scoped>
/* 搜索区域样式优化 */
.search {
    margin: 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    display: flex;
    align-items: center;
    gap: 15px;
}

.search span {
    font-weight: 600;
    color: #606266;
}

.search .input {
    width: 300px;
    transition: all 0.3s ease;
}

.search .input:hover {
    transform: translateY(-1px);
}

.search .button {
    transition: all 0.3s ease;
}

.search .button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

/* 表格样式优化 */
:deep(.el-table) {
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    overflow: hidden;
}

:deep(.el-table th) {
    background-color: #f5f7fa !important;
    color: #606266 !important;
    font-weight: 600 !important;
    height: 50px;
}

:deep(.el-table td) {
    padding: 12px 0;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
    background-color: #f5f7fa;
}

/* 表格内按钮样式 */
:deep(.el-button--small) {
    padding: 8px 15px;
    transition: all 0.3s;
}

:deep(.el-button--small:hover) {
    transform: translateY(-1px);
}

/* 状态标签样式 */
:deep(.el-tag) {
    padding: 4px 12px;
    border-radius: 4px;
}

/* 分页器样式优化 */
.page {
    position: fixed;
    right: 20px;
    bottom: 20px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
}


:deep(.el-pagination) {
    padding: 0;
    font-weight: normal;
}

/* 对话框样式优化 */
:deep(.el-dialog) {
    border-radius: 8px;
    overflow: hidden;
}

:deep(.el-dialog__header) {
    margin: 0;
    padding: 20px;
    background: #f5f7fa;
    border-bottom: 1px solid #ebeef5;
}

:deep(.el-dialog__title) {
    font-weight: 600;
    color: #303133;
}

:deep(.el-dialog__body) {
    padding: 30px 20px;
}

:deep(.el-form--inline .el-form-item) {
    margin-right: 20px;
    margin-bottom: 20px;
}

:deep(.el-dialog__footer) {
    padding: 15px 20px;
    border-top: 1px solid #ebeef5;
}

/* 表单项样式优化 */
:deep(.el-form-item__label) {
    font-weight: 500;
    color: #606266;
}

:deep(.el-input__wrapper) {
    border-radius: 4px;
    transition: all 0.3s;
}

:deep(.el-input__wrapper:hover) {
    box-shadow: 0 0 0 1px #409EFF !important;
}

/* 响应式优化 */
@media screen and (max-width: 768px) {
    .search {
        flex-direction: column;
        align-items: stretch;
    }
    
    .search .input {
        width: 100%;
    }
    
    .page {
        position: static;
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
}
</style>