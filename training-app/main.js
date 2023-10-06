//Creamos la app de vue
import './src/main.css';
import { createApp } from "vue";
import App from "./src/App.vue";

const app = createApp(App);

app.mount('#app');