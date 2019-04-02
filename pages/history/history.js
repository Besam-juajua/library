const app = getApp();
const win = require('../../tools/win.js');
// 格式化时间
let format = function(stamp) {
  let date = new Date(stamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10? '0' + month : month;
  day = day < 10? '0' + day : day;
  return year + "-" + month + "-" + day;
}
// 列表刷新
let loadMessageList = function (page, self, isReload = false) {
  let list = isReload ? [] : self.data.bookList;
  wx.request({
    url: 'https://community.jystu.cn/activity/mini/rentRecord',
    dataType: 'json',
    method: 'GET',
    header: {
      'x-access-token': app.globalData.token
    },
    data: {
      page: page
    },
    success: (res) => {
      console.log(res.data)
      if (!res || res.data.errcode != 0) {
        win.toast("请求失败", "none");
        return;
      }
      let rents = res.data.description.data.rents;
      rents.forEach(((val, index)=> {
        val.createDate = format(val.createDate);
        val.rentDate = format(val.rentDate);
        list.push(val)
      }))
      // let bookList = list.concat(res.data.description.data.rents);
      let bookList = list;
      self.setData({
        bookList: bookList,
        page: isReload ? 1 : self.data.page + 1
      })
      console.log(bookList);
      wx.stopPullDownRefresh;
    }
  })
}
Page({
  data: {
    bookList: [],
    page: 1
  },
  onShow() {
    loadMessageList(1, this, true)
  },
  onPullDownRefresh() {
    loadMessageList(1, this, true);
  },
  onReachBottom() {
    loadMessageList(this.data.page + 1, this);
  },
  formatDate(stamp) {
    return new Date(stamp);
  }
})