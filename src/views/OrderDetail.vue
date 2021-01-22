<!--
    订单详情页面
    @author:geng
 -->
<template>
  <div class="main">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="img" label="">
        <template slot-scope="scope">
          <img :src="scope.row.goodsImgUrl" alt="" width="100px" />
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" label="商品" width="300"> </el-table-column>
      <el-table-column prop="goodsNo" label="商品编号" width="180"> </el-table-column>
      <el-table-column prop="originPrice" label="原价"> </el-table-column>
      <el-table-column prop="secondsKillPrice" label="秒杀价"> </el-table-column>
      <el-table-column prop="count" label="商品数量"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  data() {
    return {
      goods: {},
      order: {},
      tableData: []
    }
  },
  methods: {
    toStatus: function(s) {
      //0 未支付，1已支付，2已发货，3已收货，4已退款，5已完成
      switch (s) {
        case 0:
          return '未支付'
        case 1:
          return '1已支付'
        case 2:
          return '2已发货'
        case 3:
          return '3已收货'
        case 4:
          return '4已退款'
        case 5:
          return '5已完成'
      }
      return '未知'
    }
  },
  mounted: function() {
    let _self = this
    let orderId = this.$route.query.orderId
    this.$http.get('/order/detail?id=' + orderId).then(function(resp) {
      let data = resp.data
      if (data && data.code === 200) {
        _self.goods = data.data.goods
        _self.order = data.data.orderInfo
        _self.tableData.push({
          goodsImgUrl: _self.goods.goodsImg,
          goodsName: _self.order.goodsName + _self.goods.goodsTitle,
          goodsNo: _self.order.goodsId,
          originPrice: _self.goods.goodsPrice,
          secondsKillPrice: _self.order.goodsPrice,
          count: _self.order.goodsCount,
          status: _self.toStatus(_self.order.status)
        })
      } else {
        _self.$message({
          message: data.msg,
          type: 'error'
        })
      }
    })
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
.main {
  width: 1000px;
  margin: 10px auto 0 auto;
}
</style>
