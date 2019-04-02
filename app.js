//app.js
const win = require('./tools/win.js')
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        this.globalData.code = res.code;
      }
    });
    this.globalData.userInfo = wx.getStorageSync('userInfo');
    this.globalData.token = wx.getStorageSync('userToken');
  },

  globalData: {
    code: null,
    userInfo: null,
    token: null
  }
})