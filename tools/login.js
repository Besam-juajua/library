const app = getApp();
const win = require('./win.js')
exports.needLogin = (page, callback) => {
  page.getUserInfo = (e) => {
    win.loading('正在加载')
    // 用户点击了授权
    if (app.globalData.code && e.detail.userInfo) {
      //获取用户信息
      wx.getUserInfo({
        success: res => {
          let userInfo = res.userInfo;
          app.globalData.userInfo = userInfo;
          wx.request({
            url: 'https://community.jystu.cn/activity/mini/libLogin',
            dataType: 'json',
            method: 'POST',
            data: {
              code: app.globalData.code,
              nickname: userInfo.nickName,
              gender: userInfo.gender,
              city: userInfo.city,
              avatarUrl: userInfo.avatarUrl,
              country: userInfo.country,
              province: userInfo.province
            },
            success: (rsp)=> {
              if (!rsp || rsp.data.errcode != 0) {
                win.toast("授权失败", "none");
                return;
              }
              win.toast("授权成功");
              let token = rsp.data.description.data.token;
              app.globalData.token = token;
              wx.setStorage({
                key: 'userInfo',
                data: userInfo
              });
              wx.setStorage({
                key: 'userToken',
                data: token
              });
              if (callback) callback();
            }
          })
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