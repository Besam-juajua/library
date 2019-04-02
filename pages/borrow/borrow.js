const app = getApp();
const win = require('../../tools/win.js');
Page({
  data: {
    bookNo: '',
    day: ''
  },
  onLoad(options) {
    if(options.bookNo) {
      this.setData({
        bookNo: options.bookNo
      })
    }
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
  enterDay(e) {
    this.setData({
      day: e.detail.value
    })
  },
  toSubmit() {
    wx.request({
      url: 'https://community.jystu.cn/activity/mini/rentBook',
      dataType: 'json',
      method: 'GET',
      header: {
        'x-access-token': app.globalData.token
      },
      data: {
        bookNo: this.data.bookNo,
        day: this.data.day
      },
      success: (res) => {
        console.log(res)
        if (!res || res.data.errcode != 0) {
          win.toast("请求失败", "none");
          return;
        }
        wx.showModal({
          title: '借书结果',
          content: res.data.description.description,
          showCancel: false
        })
      }
    })
  }
})