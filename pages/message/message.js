const app = getApp();
const win = require('../../tools/win.js');
// 列表刷新
let loadMessageList = function(page, self, isReload = false) {
  let list = isReload ? [] : self.data.messageList;
  wx.request({
    url: 'https://community.jystu.cn/activity/mini/systemMsg',
    dataType: 'json',
    method: 'GET',
    header: {
      'x-access-token': app.globalData.token
    },
    data: {
      page: page
    },
    success: (res) => {
      if (!res || res.data.errcode != 0) {
        win.toast("请求失败", "none");
        return;
      }
      list.concat(res.data.description.data.systemMsgs);
      self.setData({
        messageList: list,
        page: isReload? 1 : self.data.page + 1
      })
      wx.stopPullDownRefresh;
    }
  })
}
Page({
  data: {
    messageList: [],
    page: 1
  },
  onShow() {
    loadMessageList(1, this, true)
  },
  onPullDownRefresh() {
    loadMessageList(1, this, true);
  },
  onReachBottom() {
    loadMessageList(this.data.page + 1, this);
  }
})