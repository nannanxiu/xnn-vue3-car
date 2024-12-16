import { defineStore } from "pinia"

export const useLoginStore = defineStore("login",{
    // 组合式API
    state:() =>{
        return{
            token:"",
            permission:"",
            username:""
        }
    },
    // 本地持久化存储
    persist:{
        enabled:true,
        strategies:[
            {
                key:"login", // 自定义的key值  存储到本地时候的key
                storage:localStorage,  // 选择存储方式
            }
        ]
    }
})