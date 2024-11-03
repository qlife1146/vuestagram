import { createApp } from "vue";
import App from "./App.vue";
let app = createApp(App);

import mitt from "mitt";
let emitter = mitt();
app.config.globalProperties.emitter = emitter;

// import axios from "axios";
// app.config.globalProperties.axios = axios;
//this.axios로 사용가능

import store from "./stores/store";

import './registerServiceWorker'

// 전역 변수 보관함
app.use(store).mount("#app");
// createApp(App).mount("#app");
