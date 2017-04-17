<template>
    <div>
        <div class="login-header">
            <mt-header title="登陆"></mt-header>
        </div>
        <div class="login">
            <mt-field label="用户名" placeholder="请输入手机号码、或者账号"></mt-field>
            <mt-field label="密码" placeholder="请输入密码"></mt-field>
            <mt-field label="验证码"><img src="captcha_url" height="45px" width="100px"></mt-field>
        </div>
    </div>
</template>
<script type="text/javascript">
    exports.default = {
        name: 'login',
        mounted: function () {
            this.$http.get("http://local.service.zuimeimami.com/admin/index/verifycode").then(response => {
                console.log(response);
                this.captcha_url = response.body;
            },response => {
                //error response callback
            });
        },
        data: function () {
            return {
                captcha_url: ''
            }
        }
    }
</script>
<style>

</style>