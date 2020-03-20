import Vue from 'vue';

import App from './App';
import cuCustom from './colorui/components/cu-custom.vue';
import navbar from '@/components/navbar.vue';
import tabbar from '@/components/tabbar.vue';

Vue.component('cu-custom', cuCustom);
Vue.component('c-navbar', navbar);
Vue.component('c-tabbar', tabbar);
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App
});

app.$mount();
