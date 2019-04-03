const win = require('../../tools/win.js')
const login = require('../../tools/login.js')
const app = getApp();
Page({
  data: {
    resPath: 'https://community.jystu.cn',
    bannerList: [],
    bookList: [],
    _needLogin: false
  },
  goBorrow() {
    wx.navigateTo({
      url: '/pages/borrow/borrow',
    })
  },
  goReturn() {
    wx.navigateTo({
      url: '/pages/return/return',
    })
  },
  goBookDetail(e) {
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookid=' + e.currentTarget.dataset.id
    })
  },
  onShow() {
    this.setData({
      _needLogin: !app.globalData.userInfo
    })
    if (!app.globalData.userInfo) {
      login.needLogin(this, ()=> {
        this.onShow();
      })
      return;
    }
    // 获取广告信息
    wx.request({
      url: 'https://community.jystu.cn/activity/mini/libAdvers',
      dataType: 'json',
      method: 'GET',
      header: {
        'x-access-token': app.globalData.token
      },
      success: (res) => {
        if(!res || res.data.errcode != 0) {
          return;
        }
        this.setData({
          bannerList: res.data.description.data.advers
        })
      }
    })
    // 获取图书列表
    wx.request({
      url: 'https://community.jystu.cn/activity/mini/libIndex',
      dataType: 'json',
      method: 'GET',
      header: {
        'x-access-token': app.globalData.token
      },
      data: {
        page: 1
      },
      success: (res) => {
        if (!res || res.data.errcode != 0) {
          win.toast("获取列表失败", "none")
          return;
        }
        this.setData({
          bookList: res.data.description.data.books
        })
      }
    })
  }
})