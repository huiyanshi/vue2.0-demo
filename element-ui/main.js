import Vue from 'vue';
import Index from './components/index/index.vue';
import ElemenUI from  'element-ui';

Vue.use(ElemenUI);

new Vue({
    el: "#app",
    render: h => h(Index)
});