const app = getApp();
const win = require('./win.js')
exports.needLogin = (page, callback) => {
  page.getUserInfo = (e) => {
    win.loading('正在加载')
    // 用户点击了授权
    if (e.detail.userInfo) {
      //获取用户信息
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          console.log(res)
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo
          });
          if (callback) callback();
        }
      })
      page.setData({
        _needLogin: false
      })
    } else {
      wx.showModal({
        title: '登录失败',
        content: '请点击“允许”，才可进行后续操作',
        showCancel: false
      })
    }
    win.hideLoading();
  }
}