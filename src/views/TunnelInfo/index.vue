<template>
    <div class="tunnel-container">
        <div class="tunnel-list">
            <h3>选择断面</h3>
            <el-tree lazy :load="loadNode" :props="defaultProps" @node-click="handleNodeClick" class="custom-tree" />
        </div>
        <div class="tunnel-content">
            <el-table :data="tunnelContent.data" style="width:100%" class="custom-table">
                <el-table-column label="序号" prop="id" width="80"></el-table-column>
                <el-table-column label="隧道名称" prop="tunnelname"></el-table-column>
                <el-table-column label="图名" prop="imagename"></el-table-column>
                <el-table-column label="图号" prop="num"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="preViewHandler(scope.$index, scope.row)">预览
                        </el-button>
                        <el-button size="small" type="success" @click="updateHandler(scope.$index, scope.row)">上传</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    
    <el-dialog destroy-on-close center v-model="dialogUploadVisible" title="上传文件" width="30%">
        <el-upload 
            v-model:file-list="fileList" 
            action="http://localhost:3000/api/upload" 
            :limit="1" 
            class="upload-container"
            :on-success="handlePDFSuccess"
            :on-exceed="handleExceed">
            <el-button type="primary">点击上传</el-button>
        </el-upload>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogUploadVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogUploadVisible = false">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>

import api from "@/api/index.js"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const defaultProps = {
    children: 'children',
    label: 'name'
}

const tunnelContent = reactive({
    data: []
})

const fileList = ref([])
const dialogUploadVisible = ref(false)
const currentID = ref(0)

const handleNodeClick = (data) => {
    api.getTunnelContent({ content: data.content }).then(res => {
        if (res.data.status === 200) {
            tunnelContent.data = res.data.result
        } else {
            tunnelContent.data = []
        }
    }).catch(error => {
        console.log(error);
    })
}

const loadNode = (node, resolve) => {
    // 一级节点
    if (node.level === 0) {
        api.getTunnelList().then(res => {
            if (res.data.status === 200) {
                resolve(res.data.result)
            } else {
                resolve([])
            }
        })
    }
    // 二级节点
    if (node.level === 1) {
        api.getTunnelListChild({
            cid: node.data.cid
        }).then(res => {
            if (res.data.status === 200) {
                resolve(res.data.result)
            } else {
                resolve([])
            }
        })
    }
    // 大于二级节���
    if (node.level > 1) {
        resolve([])
    }
}

/**
 * 预览
 */
const preViewHandler = (index, row) => {
    router.push("/pdf/" + row.id)
}   
/**
 * 上传
 */
const updateHandler = (index, row) => {
    currentID.value = row.id
    dialogUploadVisible.value = true
}

/**
 * 上传文件超出
 */
const handleExceed = () => {
    console.log("上传文件超出");
}
/**
 * 上传成功
 */
const handlePDFSuccess = (response,uploadFile) =>{
    api.getUploadTunnelContent({
        id:currentID.value,
        urlName:response.url.substr(7)
    }).then(res =>{
        console.log(res.data);
    }).catch(error =>{
        console.log(error);
    })
}

</script>
<style scoped>
.tunnel-container {
    display: flex;
    gap: 20px;
    padding: 20px;
    min-height: calc(100vh - 100px);
}

.tunnel-list {
    width: 280px;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.tunnel-list h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.tunnel-content {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.custom-table {
    margin-top: 10px;
}

.custom-tree {
    margin-top: 10px;
}

.upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

:deep(.el-table) {
    border-radius: 4px;
}

:deep(.el-button) {
    margin-right: 8px;
}

:deep(.el-tree-node__content) {
    height: 36px;
}

:deep(.el-tree-node__content:hover) {
    background-color: #f5f7fa;
}
</style>