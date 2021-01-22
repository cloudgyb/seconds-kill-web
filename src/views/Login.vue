<template>
  <div>
    <el-container>
      <el-header>
        商品秒杀
        <el-link th:href="@{/signUp}" type="primary" style="font-size: 10px;float:right">免费注册</el-link>
      </el-header>
      <el-main>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0" class="login-form">
          <el-form-item prop="account">
            <el-input v-model="loginForm.account" placeholder="手机号/用户名/邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" show-password placeholder="密码"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" @click="submitForm('loginForm')" type="primary">登录</el-button>
          </el-form-item>
          <el-form-item>
            <span v-html="msg"></span>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      msg: '',
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.login(this.loginForm)
        } else {
          return false
        }
      })
    },
    login: function(p) {
      this.msg = ''
      let self = this
      this.$http
        .post('/doLogin', p)
        .then(function(response) {
          let data = response.data
          if (data && data.code === 200) {
            self.msg = '登录成功!'
            self.$router.replace({ path: self.$route.query.redirect })
          } else {
            self.msg = '<span style="color: #bb0202">' + data.msg + '</span>'
          }
        })
        .catch(function(error) {
          self.msg = '<span style="color: #bb0202">登录失败!</span>'
          console.log(error)
        })
    }
  }
}
</script>

<style scope>
body {
  margin: 0;
}
.el-header {
  line-height: 60px;
  font-size: 40px;
  color: #ee4b19;
}
.el-main {
  background-size: cover;
  background: gray url('/images/login_bg.jpg') no-repeat center 50%;
  height: 600px;
}
.el-footer {
  line-height: 60px;
  color: #9c9c9c;
}
.login-form {
  position: absolute;
  right: 50px;
  top: 120px;
  width: 300px;
  height: 300px;
  padding: 30px;
  border: 1px solid #ccc;
  background: #fafafa;
}
</style>
