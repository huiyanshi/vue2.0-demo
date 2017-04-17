<template>
    <div>
        <div class="login-header">
            <mt-header title="登陆"></mt-header>
        </div>
        <div class="login">
            <mt-field label="用户名" v-model="user_id" placeholder="请输入手机号码、或者账号"></mt-field>
            <mt-field label="密码" v-model="password" placeholder="请输入密码"></mt-field>
            <mt-field label="验证码"><img :src="captcha_url" @click="refreshCaptcha" height="45px" width="100px"></mt-field>
            <div class="submit-area">
                <mt-button size="large" type="primary" @click="sign">登陆</mt-button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { Toast } from 'mint-ui';

    exports.default = {
        name: 'login',
        /*mounted: function () {
            this.$http.get("http://local.service.zuimeimami.com/admin/index/verifycode").then(response => {
                console.log(response);
                this.captcha_url = response.body;
                //this.captcha_url = "123123";
            },response => {
                //error response callback
            });
        },*/
        data: function () {
            return {
                captcha_url: 'http://local.service.zuimeimami.com/admin/index/verifycode' + "?timestamp=" + new Date().getTime(),
                user_id: '',
                password: ''
            }
        },
        methods: {
            refreshCaptcha: function (event) {
                event.target.setAttribute("src",'http://local.service.zuimeimami.com/admin/index/verifycode' + "?timestamp=" + new Date().getTime());
            },
            sign: function () {
                if(this.user_id == "admin" && this.password == "admin"){
                    Toast({
                        message: '登陆成功'
                    });
                }else{
                    Toast({
                        message: '账号或者密码错误',
                    });
                }
            }
        }
    }
</script>
<style>
    .submit-area {margin-top: 15px;}
</style>