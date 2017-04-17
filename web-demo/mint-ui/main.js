import Vue from 'vue'
import MintUI from 'mint-ui'
import Index from './src/index/components/index.vue'
import VueResource from 'vue-resource'

Vue.use(MintUI);
Vue.use(VueResource);           //实现和后端数据交互的插件

new Vue({
    el: "#app",
    render: h => h(Index)
});