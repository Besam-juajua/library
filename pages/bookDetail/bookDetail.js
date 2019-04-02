const app = getApp();
const win = require('../../tools/win.js');
Page({
  data: {
    resPath: 'https://community.jystu.cn',
    book: {}
  },
  onLoad(options) {
    let bookId = options.bookid;
    wx.request({
      url: 'https://community.jystu.cn/activity/mini/bookDetail',
      dataType: 'json',
      method: 'GET',
      header: {
        'x-access-token': app.globalData.token
      },
      data: {
        id: bookId
      },
      success: (res) => {
        if (!res || res.data.errcode != 0) {
          win.toast("请求失败", "none");
          return;
        }
        this.setData({
          book: res.data.description.data.detail
        })
      }
    })
  },
  goBorrow() {
    wx.navigateTo({
      url: '/pages/borrow/borrow?bookNo=' + this.data.book.bookNo
    })
  }
})