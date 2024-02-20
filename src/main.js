import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({
  baseURL: 'https://iapitest.eva.guru'
});

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
