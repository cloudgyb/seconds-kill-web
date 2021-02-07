export function getGoodsList(_self) {
  _self.$http.get('/miaosha/goods/list').then(resp => {
    _self.goodsList = resp.data.data
  })
}
