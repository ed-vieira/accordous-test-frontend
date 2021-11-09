// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate, { Validator } from 'vee-validate'
import VueTheMask from 'vue-the-mask'
import ptBR from 'vee-validate/dist/locale/pt_BR';
import App from './App'
import router from './router'
import store  from './store'
import VueI18n from 'vue-i18n'
import { axios } from '@/services'
import  config from '@/config/common'


Vue.prototype.$http = axios
Vue.use(VueTheMask)
Vue.use(VueI18n)
Vue.use(VeeValidate, config.VeeValidate)
Validator.localize('pt_BR', ptBR);
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
