<template>
  <div>
    <common-header />
    <div>
      <div class="card-wrapper">
        <div v-for="o in goodsList" :key="o.goodsName" @click="goGoodsDetail(o.id)" class="card">
          <img :src="o.goodsImg" />
          <div class="card-content">
            <span class="card-title">{{ o.goodsName }}</span>
            <div class="card-desc">
              <span :title="o.goodsTitle" style="overflow:hidden;white-space:nowrap;text-overflow: ellipsis;display: block" v-text="o.goodsTitle"></span>
            </div>
            <span style="border:1px solid #e1251b;background: #e1251b;color: #f1f1ef">
              <span style="color: #f1f1ef" class="el-icon-"><i style="font-size: 10px">秒杀</i>￥{{ o.miaoshaPrice }}</span>
              <span style="color:#2b2c2d;background:#ffffff;text-decoration: line-through;">￥{{ o.goodsPrice }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from './CommonHeader'
export default {
  name: 'GoodsList',
  components: {
    CommonHeader
  },
  data() {
    return {
      currentDate: '商品列表',
      goodsList: []
    }
  },
  methods: {
    goGoodsDetail: function(goodsId) {
      window.location.href = '/goods/detail/' + goodsId
    }
  },
  mounted: function() {
    let self = this
    return this.$http
      .get('/miaosha/goods/list')
      .then(function(resp) {
        self.goodsList = resp.data.data
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
#app {
  width: 1000px;
  margin: 10px auto 0 auto;
}
.card-wrapper {
  position: relative;
}
.card {
  border: 1px #8c939d solid;
  box-shadow: #8c939d;
  width: 250px;
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
}
.card img {
  width: 180px;
}
.card .card-title {
  font-size: 16px;
  color: #2b2c2d;
}
.card .card-desc {
  font-size: 14px;
  color: #5b5b5c;
  width: 230px;
}
.card .card-content {
  padding: 0 0 5px 10px;
}
</style>
