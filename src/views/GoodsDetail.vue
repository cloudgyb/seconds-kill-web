<template>
  <div>
    <div class="main">
      <div class="card-wrapper">
        <el-row>
          <el-col :span="12">
            <div class="card-img">
              <img :src="goodsDetail.goodsImg" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-content">
              <span class="card-title">{{ goodsDetail.goodsName }}</span>
              <div class="card-desc">
                <span :title="goodsDetail.goodsTitle" style="display: block">{{ goodsDetail.goodsTitle }}</span>
              </div>
              <span
                style="
                border: 1px solid #e1251b;
                background: #e1251b;
                color: #f1f1ef;
              "
              >
                <span style="color: #f1f1ef" class="el-icon-">
                  <i style="font-size: 10px">秒杀</i>
                  <span>{{ '￥' + goodsDetail.miaoshaPrice }}</span>
                </span>
                <span
                  style="
                  color: #2b2c2d;
                  background: #ffffff;
                  text-decoration: line-through;
                "
                  >{{ '￥' + goodsDetail.goodsPrice }}</span
                >
              </span>
              <br /><br />
              <div>
                <span v-if="miaoshaStatus == 0">
                  距离秒杀开始还剩
                  <span v-text="remainTime" style="color: #e1251b">{{ remainTime }}</span>
                </span>
                <span v-if="miaoshaStatus == 1">
                  距离秒杀结束还剩
                  <span v-text="remainTime" style="color: #e1251b">{{ remainTime }}</span>
                </span>
                <span v-if="miaoshaStatus == 2">
                  <span style="color: #e1251b">来晚了哦，秒杀已结束</span>
                </span>
              </div>
              <el-button type="danger" @click="secondsKill" :disabled="miaoshaStatus != 1">立即秒杀</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsDetail',
  data() {
    return {
      goodsDetail: {},
      miaoshaStatus: 0,
      remainSeconds: 0,
      remainTime: '00天00时00分00秒',
      timer: null
    }
  },
  methods: {
    addZero: function(i) {
      return i < 10 ? '0' + i : i + ''
    },
    countDown: function() {
      var d = parseInt(this.remainSeconds / (24 * 60 * 60))
      var h = parseInt((this.remainSeconds / (60 * 60)) % 24)
      var m = parseInt((this.remainSeconds / 60) % 60)
      var s = parseInt(this.remainSeconds % 60)
      d = this.addZero(d)
      h = this.addZero(h)
      m = this.addZero(m)
      s = this.addZero(s)
      this.remainTime = d + '天' + h + '时' + m + '分' + s + '秒'
      this.remainSeconds -= 1
      if (this.remainSeconds === 0) {
        clearInterval(this.timer)
      }
    },
    secondsKill: function() {
      let _self = this
      let param = 'goodsId=' + this.goodsDetail.goodsId
      this.$http.post('/secondsKill', param).then(function(response) {
        let data = response.data
        if (data && data.code === 200) {
          window.location.href = '/order/detail?id=' + data.data.id
        } else {
          _self.$message({
            message: data.msg,
            type: 'warning'
          })
        }
      })
    },
    confirmMiaoshaStatus(startDateTime, endDateTime) {
      let startTime = new Date(startDateTime).getTime()
      let endTime = new Date(endDateTime).getTime()
      let now = new Date().getTime()
      if (startTime > now) {
        //秒杀还没开始
        this.miaoshaStatus = 0
        this.remainSeconds = startTime - now
      } else if (startTime < now && now < endTime) {
        //秒杀进行中
        this.miaoshaStatus = 1
        this.remainSeconds = endTime - now
      } else {
        //秒杀结束
        this.miaoshaStatus = 2
      }
      this.remainSeconds = this.remainSeconds / 1000
    }
  },
  mounted: function() {
    let self = this
    let goodsId = this.$route.params.goodsId
    this.$http
      .get('/miaosha/goods/detail/' + goodsId)
      .then(function(resp) {
        console.log(resp)
        self.goodsDetail = resp.data.data
        self.confirmMiaoshaStatus(self.goodsDetail.startDate, self.goodsDetail.endDate)
      })
      .catch(function(err) {
        console.log(err)
      })
    this.timer = setInterval(this.countDown, 1000)
  }
}
</script>

<style>
body {
  margin: 0;
}
.main {
  width: 1000px;
  margin: 10px auto 0 auto;
}
.card-img {
  border: 1px #8c939d solid;
  box-shadow: #8c939d;
  display: inline-block;
  margin: 0 5px;
}
.card-img img {
  width: 400px;
}
.card-content .card-title {
  font-size: 16px;
  color: #2b2c2d;
}
.card-content .card-desc {
  font-size: 20px;
  color: #5b5b5c;
}
</style>
