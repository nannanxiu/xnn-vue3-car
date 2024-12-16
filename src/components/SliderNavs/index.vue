<template>
    <div class="slider-navs" :style="{ width:menuStore.isCollapse ? '64px' :'210px' }">
        <div v-show="systemStore.toggleStore" class="logo">{{ menuStore.isCollapse ? '隧道' : 'xnn-car' }}</div>
        <el-menu
            background-color="#808080"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="active"
            router
            :collapse="menuStore.isCollapse"
            class="el-menu-vertical-demo"
        >
            <!-- 循环生成视图，不会增加页面结构 有子菜单用 el-sub-menu，没有子菜单用 el-menu-item-->
            <template v-for="(item,index) in menuStore.menus" :key="index">
                <el-sub-menu v-if="item.children" :index="item.path">
                    <template #title>
                        <component class="icon" :is="item.icon"></component>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="childItem.path" v-for="(childItem,childIndex) in item.children" :key="childIndex">
                        <span>{{ childItem.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.path">
                    <component class="icon" :is="item.icon"></component>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { useMenuStore } from "@/stores/menuStore.js"
import { useSystemStore } from "@/stores/systemStore.js"

const active = ref("/")
const menuStore = useMenuStore()
const systemStore = useSystemStore()

const props = defineProps({
    myToggle:{
        type:Boolean,
        default:false
    }
})

/**
 * 修复刷新页面的高亮设置
 */
if(localStorage.getItem("active")){
    active.value = localStorage.getItem("active")
}

</script>
<style scoped>

.slider-navs{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 210px;
    background-color: #808080;
    transition: 0.3s ease-in;
}

.logo{
    width: 100%;
    height: 60px;
    background-color: #404040;
    text-align: center;
    font-size: 25px;
    color: #fff;
    line-height: 60px;
}

.icon{
    width: 16px;
    height: 16px;
    margin-right: 5px;
}

</style>