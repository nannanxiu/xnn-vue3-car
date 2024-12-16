<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* 公共样式 */

body,html,#app{
  height: 100%;
}

/* 去掉element menu 的右侧边框 */
.el-menu{
  border-right: 0 !important;
}

/* 修改dialog的header样式 */
.el-dialog__header{
  background-color: #ffffff;
  margin-right: 0 !important;
  padding-bottom: 20px !important;
}

:deep(.el-dialog__title) {
    color: #000000 !important; 
}


/* tree 选中样式修改 */
.is-current .el-tree-node__content{
  background-color: #cccccc !important;
  color: #fff;
}

</style>
