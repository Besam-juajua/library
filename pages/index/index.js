const win = require('../../tools/win.js')
const login = require('../../tools/login.js')
const app = getApp();
Page({
  data: {
    bannerList: [
      'https://dummyimage.com/600x400/000/fff',
      'https://dummyimage.com/600x400/000/fff',
      'https://dummyimage.com/600x400/000/fff'
    ],
    bookList: [{
        img: 'https://dummyimage.com/600x400/000/fff',
        bookName: '计算科学与导论',
        author: '刘某某',
        introduction: '这是一本介绍某某某的图书,其它的内容暂时想不出来懒懒不想出去走'
      }, {
        img: 'https://dummyimage.com/600x400/000/fff',
        bookName: '计算科学与导论',
        author: '刘某某',
        introduction: '这是一本介绍某某某的图书,其它的内容暂时想不出来懒懒不想出去走'
      }, {
        img: 'https://dummyimage.com/600x400/000/fff',
        bookName: '计算科学与导论',
        author: '刘某某',
        introduction: '这是一本介绍某某某的图书,其它的内容暂时想不出来懒懒不想出去走'
      }, {
        img: 'https://dummyimage.com/600x400/000/fff',
        bookName: '计算科学与导论',
        author: '刘某某',
        introduction: '这是一本介绍某某某的图书,其它的内容暂时想不出来懒懒不想出去走'
      }, {
        img: 'https://dummyimage.com/600x400/000/fff',
        bookName: '计算科学与导论',
        author: '刘某某',
        introduction: '这是一本介绍某某某的图书,其它的内容暂时想不出来懒懒不想出去走'
      }],
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
  goBookDetail() {
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail',
    })
  },
  onShow() {
    if (!app.globalData.userInfo) {
      login.needLogin(this)
    }
    this.setData({
      _needLogin: !app.globalData.userInfo
    })
    console.log(app.globalData.userInfo)
  }
})