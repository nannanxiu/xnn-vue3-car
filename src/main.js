import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPersist from "pinia-plugin-persist"
import elementIcon from "./plugins/icons";
import echarts from "./plugins/echarts.js"
import i18n from "./locales/i18n.js"
import ElementPlus from 'element-plus'
import zh from "element-plus/dist/locale/zh-cn.mjs"
import en from "element-plus/dist/locale/en.mjs"
import VuePdf from 'vue3-pdfjs'
import "./assets/init.css"

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.use(elementIcon)
app.use(echarts)
app.use(i18n)
app.use(VuePdf)
app.use(ElementPlus,{
    locale:localStorage.getItem("lang") === 'zh' ? zh : en
})

app.mount('#app')
