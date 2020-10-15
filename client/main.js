import { Meteor } from 'meteor/meteor'
import VueMeteorTracker from 'vue-meteor-tracker'
import { BootstrapVue } from 'bootstrap-vue'
import router from './router/Index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(VueMeteorTracker)
Vue.use(BootstrapVue)

import Vue from 'vue'
import App from './App'
import './main.html'

Meteor.startup(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})