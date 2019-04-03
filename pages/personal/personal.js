const win = require('../../tools/win.js')
const login = require('../../tools/login.js')
const app = getApp();
Page({
  data: {
    resPath: 'https://community.jystu.cn',
    profile: {},
    _needLogin: false
  },
  goIdentification() {
    wx.navigateTo({
      url: '/pages/identification/identification',
    })
  },
  goAboutUs() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  goMessage() {
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  goHistory() {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  onShow() {
    this.setData({
      _needLogin: !app.globalData.userInfo
    })
    if (!app.globalData.userInfo) {
      login.needLogin(this, ()=> {
        this.onShow();
      });
      return;
    }
    wx.request({
      url: 'https://community.jystu.cn/activity/mini/libUser',
      dataType: 'json',
      method: 'GET',
      header: {
        'x-access-token': app.globalData.token
      },
      success: (res)=> {
        if (!res || res.data.errcode != 0) {
          win.toast("请求失败", "none");
          return;
        }
        this.setData({
          profile: res.data.description.data.userinfo
        })
      }
    })
    
    
  }
})