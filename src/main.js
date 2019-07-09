// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import './assets/css/reset.css';
import './assets/css/common.css';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY/MM/DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

router.beforeEach((to, from, next) => {

	//让游戏返回能正常返回
	if (from.path == '/') {} else {
		sessionStorage.setItem('fromPath', from.path);
	}

	next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
