<template>
  <div class="main">
    <header>
      <span style="color: #ee4b19">商品秒杀</span>
      <span style="font-size: 20px;">欢迎注册</span>
    </header>
    <div id="app">
      <el-steps :active="active" finish-status="success">
        <el-step title="验证邮箱"></el-step>
        <el-step title="填写账号信息"></el-step>
        <el-step title="注册完成"></el-step>
      </el-steps>
      <div style="margin: 20px" v-show="active == 0">
        <el-input v-model="regForm.email" placeholder="填写邮箱,可用于找回密码，登录"></el-input>
        <br /><br />
        <el-button style="width:100%" @click="sendValidCode()">发送验证码</el-button>
      </div>
      <div style="margin: 20px" v-show="active == 1">
        <el-input v-model="regForm.email" placeholder="填写邮箱,可用于找回密码，登录"></el-input>
        <el-input v-model="regForm.phone" placeholder="填写手机号"></el-input>
        <el-input v-model="regForm.age" placeholder="年龄"></el-input>
      </div>
      <div style="margin: 20px" v-show="active == 2">
        <span>恭喜完成注册！</span>
        <a href="/login">请登录</a>
      </div>
      <router-link :to="{ name: 'Login' }">
        <el-link type="primary" style="font-size: 10px;float:right">已有账号？去登陆</el-link>
      </router-link>
      <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      active: 0,
      isEmailValidated: false,
      regForm: {
        email: '',
        nickName: '',
        phone: '',
        password: '',
        secPassword: '',
        msg: ''
      },
      rules: {}
    }
  },
  methods: {
    next: function() {
      if (this.active++ >= 3) {
        this.active = 0
      }
    },
    sendValidCode: function() {},
    signUpValidate: function() {
      if (this.nickName.trim() === '') {
        this.msg = '用户名不能为空!'
        return false
      }
      if (this.phone.trim() === '') {
        this.msg = '手机号不能为空!'
        return false
      }
      let phoneReg = /^1[35789]\d{9}$/
      if (!phoneReg.test(this.phone.trim())) {
        this.msg = '手机号不合法!'
        return false
      }
      if (this.password.trim() === '') {
        this.msg = '密码不能为空,且不能包含空格!'
        return false
      }
      if (this.secPassword.trim() === '') {
        this.msg = '请再次输入密码!'
        return false
      }
      if (this.secPassword !== this.password) {
        this.msg = '两次输入密码不一致!'
        return false
      }
      return true
    },
    signUp: function() {
      this.msg = ''
      let p = {
        nickName: this.nickName,
        phone: this.phone,
        password: this.password
      }
      let self = this
      this.$http.post('/doSignUp', p).then(response => {
        let data = response.data
        if (data && data.code === 200) {
          self.msg = '注册成功!'
        } else self.msg = data.msg
      })
    }
  }
}
</script>

<style scoped>
header {
  padding: 0 50px;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  border-bottom: 1px #c8c9cc solid;
}
.main {
  margin: 20px auto;
  width: 600px;
}
</style>
