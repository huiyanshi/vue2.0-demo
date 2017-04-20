<template>
    <div class="login-container" v-on:keyup.enter="sign">
        <el-row style="margin-top: 5px;">
            <el-col :span="24">
                <div class="login-title" style="text-align: center;">
                    <span style="color: #324057;">登陆</span>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 40px; margin-top: 5px;">
            <el-col :span="24"><hr style="border-top: 1px solid #D3DCE6;"> </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :offset="9">
                <el-tabs type="border-card">
                    <el-tab-pane label="账号登录">
                        <div class="alert-box">
                            <el-alert :title="alertTitle" v-show="alertShow" :type="alertType"></el-alert>
                        </div>

                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                            <el-form-item label="用户名">
                                <el-input v-on:input="hideAlert" v-model="formLabelAlign.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-on:input="hideAlert" type="password" v-model="formLabelAlign.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="large" @click="sign">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import Axios from  'axios';
    exports.default = {
        name: 'indexLogin',
        data() {
            return {
                labelPosition: 'left',              //文本位置[top|left|right],
                formLabelAlign: {
                    username: '',
                    password: ''
                },
                alertShow: false,
                alertTitle: '',
                alertType: ''
            }
        },
        methods: {
            sign(){
                var _vm = this;
                if(this.formLabelAlign.username.length == 0 || this.formLabelAlign.password.length == 0){
                       this.$message("用户名和密码不能为空");
                }else{
                    var _router = this.$router;
                    $.ajax({
                        url: 'http://local.service.zuimeimami.com/admin/index/login',
                        type: 'POST',
                        data: {username: this.formLabelAlign.username, password: this.formLabelAlign.password},
                        dataType: 'json',
                        success: function (response) {
                            if(response.code == 1){
                                //保存或者更新Cookie->userid
                                var cookiesStr = document.cookie;
                                var data = $.parseJSON(response.data);
                                if(cookiesStr.length == 0){
                                    document.cookie = 'userid=' + data.id;
                                }else{
                                    if(cookiesStr.indexOf('userid=') == -1){
                                        document.cookie = ';userid=' + data.id;
                                    }else{
                                        var regexp = new RegExp(/userid=([\d|\w]*);/);
                                        if(regexp.test(cookiesStr)){
                                            document.cookie = cookiesStr.replace(/userid=([\d|\w]*);/,'userid='+ data.id + ";");
                                        }else{
                                            document.cookie = cookiesStr.replace(/userid=([\d|\w]*)$/,'userid='+ data.id);
                                        }
                                    }
                                }
                                _router.replace({path: '/index'});
                            }else{
                                _vm.alertType = 'error';
                                _vm.alertShow = true;
                                _vm.alertTitle = response.message;
                                _vm.formLabelAlign.password = '';
                            }
                        }
                    });
                }
            },
            hideAlert() {
                this.alertShow = false;
            }
        }
    }
</script>
<style type="text/css">
    .el-alert {margin-bottom: 15px;}
</style>