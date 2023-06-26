import './assets/main.css'
import 'vant/lib/index.css'

import { createApp } from 'vue'
import { Swipe, SwipeItem, Tab, Tabs, Tabbar, TabbarItem, ConfigProvider, Button } from 'vant'
import '@vant/touch-emulator'
import App from './App.vue'

const app = createApp(App)

app.use(Swipe)
app.use(SwipeItem)
app.use(Tab)
app.use(Tabs)
app.use(Tabbar)
app.use(TabbarItem)
app.use(ConfigProvider)
app.use(Button)

app.mount('#app')
