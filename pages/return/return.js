const app = getApp();
const win = require('../../tools/win.js');
Page({
  data: {
    bookNo: ''
  },
  enterCode(e) {
    this.setData({
      bookNo: e.detail.value
    })
  },
  scanCode() {
    wx.scanCode({
      scanType: "barCode",
      success: (res) => {
        this.setData({
          bookNo: res.result
        })
      }
    })
  },
  toSubmit() {
    wx.request({
      url: 'https://community.jystu.cn/activity/mini/remandBook',
      dataType: 'json',
      method: 'GET',
      header: {
        'x-access-token': app.globalData.token
      },
      data: {
        bookNo: this.data.bookNo
      },
      success: (res) => {
        if (!res || res.data.errcode != 0) {
          win.toast("请求失败", "none");
          return;
        }
        let result = res.data.description.description;
        wx.showModal({
          title: result == 'SUCCESS'? '还书成功' : '还书失败',
          content: result == 'SUCCESS'? '恭喜还书成功' : res.data.description.description,
          showCancel: false
        })
      }
    })
  }
})