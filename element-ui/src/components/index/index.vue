<template>
    <div class="container">
        <el-row>
            <el-col :span="23">
                <el-menu mode="horizontal" theme="dark" class="el-menu-custom">
                    <el-menu-item>顶部导航一</el-menu-item>
                    <el-menu-item>顶部导航二</el-menu-item>
                    <el-menu-item>顶部导航三</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="1">
                <el-menu mode="horizontal" theme="dark">
                    <el-menu-item @click="logout">注销</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <el-menu mode="vertical" theme="dark" @open="handlerOpen">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>接口文档</template>
                        <el-submenu v-for="(module,moduleIndex) in rpcMenus" :index="'1-' + moduleIndex" :module="module">
                            <template slot="title">{{ module }}</template>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>导航二</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20"></el-col>
        </el-row>
    </div>

</template>

<script type="text/javascript">
    exports.default = {
        name: 'index',
        data(){
            return {
                'rpcMenus': ''
            }
        },
        methods: {
            logout(){
                var _router = this.$router;
                var _vm = this;
                this.$confirm('确认注销当前账号吗?',"提示",{
                    showCancelButton: true,
                    showConfirmButton: true,
                    callback(action,instance){
                        if(action == 'confirm'){
                            var cookiesStr = document.cookie;
                            var regexp = new RegExp(/userid=([\d|\w]*)(;?)/);
                            if(regexp.test(cookiesStr)) {
                                regexp.exec(cookiesStr);
                                var userID = RegExp.$1;
                                $.ajax({
                                    url: "http://local.service.zuimeimami.com/admin/index/logout?userID=" + userID,
                                    dataType: 'json',
                                    success: function (response) {
                                        if(response.code == 1){
                                            console.log(response);
                                            _router.replace({path: '/login'});
                                        }else{
                                            _vm.$message(response.message);
                                        }
                                    }
                                });
                            }
                        }
                    },
                    type: 'warning'
                });
            },

            //导航栏处理中心
            handlerOpen(index,indexPath) {
                switch (index) {
                    case "1":
                        this.getMenus();
                        break;
                }
            },

            //获取模块中心
            getMenus(){
                var _vm = this;
                $.ajax({
                    url: 'http://local.service.zuimeimami.com/admin/rpcdoc/modules',
                    dataType: 'json',
                    success(response) {
                        if(response.code == 1){
                            _vm.rpcMenus = response.data;
                        }else{
                            _vm.rpcMenus = [];
                        }
                    }
                });
            }
        }
    }
</script>

<style type="text/css">
    .el-menu {border-radius: 0px;}
</style>