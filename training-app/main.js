//Creamos la app de vue
import './src/main.css';
import { createApp } from "vue";
import App from "./src/App.vue";
import router from './src/router/router';

const app = createApp(App);

app.use(router);
app.mount('#app');
