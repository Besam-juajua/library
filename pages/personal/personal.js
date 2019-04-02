const win = require('../../tools/win.js')
const login = require('../../tools/login.js')
const app = getApp();
Page({
  data: {
    profile: {
      img: 'https://dummyimage.com/600x400/000/fff',
      nickName: '刘某某',
      id: '131110191',
      willReturn: '0'
    },
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
    if (!app.globalData.userInfo) {
      login.needLogin(this)
    }
    this.setData({
      _needLogin: !app.globalData.userInfo
    })
  }
})