import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/axios.js'
import moment from "moment"


Vue.config.productionTip = false

window.base = "http://47.92.151.165:8080";
window.signin = "company=wecise&username=admin&password=admin";
window.session = "";
window.MATRIX_LANG = 'zh-CN';

Vue.prototype.moment = moment;
Vue.prototype.moment.locale(window.MATRIX_LANG);

new Vue({
  render: h => h(App),
}).$mount('#app')
