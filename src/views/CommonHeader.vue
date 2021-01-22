<template>
  <div>
    <header class="header-container">
      <router-link v-if="!isLoged" :to="{ path: '/login' }" style="color: #f22e00">亲，请登录</router-link>
      <router-link v-if="!isLoged" :to="{ path: '/signUp' }">免费注册</router-link>
      <a v-if="isLoged">欢迎，{{ userName }} </a>
      <a v-if="isLoged" href="javascript:;" @click="logout">退出登录</a>
      <router-link to="/myCart" class="el-icon-shopping-cart-1" style="float: right">我的购物车</router-link>
    </header>
  </div>
</template>
<script>
export default {
  name: 'commonHeader',
  data() {
    return {
      isLoged: false,
      userName: ''
    }
  },
  methods: {
    logout: function() {
      this.$http.post('/doLogout').then(function(resp) {
        let data = resp.data
        if (data.code === 200) window.location.reload()
      })
    }
  },
  mounted: function() {
    let _self = this
    this.$http.get('/getLoginUserInfo').then(function(resp) {
      let data = resp.data
      if (data.data != undefined) {
        _self.isLoged = true
        _self.userName = data.data.nickName
      }
    })
  }
}
</script>

<style scoped>
.header-container {
  padding: 0 50px;
  height: 40px;
  font-size: 12px;
  color: #6c6c6c;
  line-height: 40px;
  border-bottom: #d7dee8 1px solid;
}
.header-container > a {
  padding: 0 10px;
  float: left;
  color: inherit;
  text-decoration: none;
  line-height: 40px !important;
}
</style>
