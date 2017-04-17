import Vue from 'vue'
import MintUI from 'mint-ui'
import Index from './src/index/components/index.vue'

Vue.use(MintUI);

new Vue({
    el: "#app",
    render: h => h(Index)
});