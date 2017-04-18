import Vue from 'vue'
import index from './src/components/index/index.vue'
import login from './src/components/index/login.vue'
import user from  './src/components/user/index.vue'
import App from './app.vue'
import ElemenUI from  'element-ui'
import VueRouter from  'vue-router'
import $ from './src/js/jquery-vendor'

Vue.use(ElemenUI);
Vue.use(VueRouter);

const routes = [
    {path: '/', redirect: {name: 'index'}},          //重定向
    {path: '/index', component: index, name: "index"},        //静态路由
    {path: '/login', component: login, name: 'login'},
    /**
     * 动态路由匹配,可以通过$route.params.query_name获取请求的参数
     * /user/:username  /user/evan  { username: 'evan' }        如$router.params.username  输出evan
     * /user/:username/post/:post_id    /user/evan/post/123     {username:evan,post_id:123}
     */
    {path: '/user/:id', component: user, name: 'userIndex'},
];

const router = new VueRouter({routes});         //实例化路由对象

/**
 * 全局路由拦截功能
 * (to,from,next) => {}  等同于function(to,from,next){}
 * to: Route: 即将要进入的目标 路由对象
 * from: Route: 当前导航正要离开的路由
 * next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 *      next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
 *      next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
 *      next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
 */
router.beforeEach((to,from,next) => {
    if(to.name == 'login'){
        next();
    }else{
        var cookiesStr = document.cookie;
        if(cookiesStr.length == 0){
            next({path: '/login'});
        }else{
            //解析userid
            var regexp = new RegExp(/userid=([\d|\w]*)(;?)/);
            if(regexp.test(cookiesStr)){
                regexp.exec(cookiesStr);
                var __next = next;
                var userID = RegExp.$1;
                $.ajax({
                    url: "http://local.service.zuimeimami.com/admin/index/checkAccessToken?userID=" + userID,
                    dataType: 'json',
                    success: function (response) {
                        if(response.code != 1){
                            __next({path: '/login'});
                        }else{
                            __next();
                        }
                    }
                });
            }else{
                next({path: '/login'});
            }
            if(userid.length == 0){
                next({path: '/login'});
            }else{
                next();
            }
        }
    }
});

//注册路由对象到vm实例中，让vm实现路由功能
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');