const app = getApp();
Page({
  data: {
    userName: '',
    studentId: '',
    college: '',
    phone: ''
  },
  onShow() {

  },
  setName(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  setId(e) {
    this.setData({
      studentId: e.detail.value
    })
  },
  setCollege(e) {
    this.setData({
      college: e.detail.value
    })
  },
  setPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  toSubmit() {
    wx.request({
      url: 'https://community.jystu.cn/activity/mini/resetUinfo',
      dataType: 'json',
      method: 'POST',
      header: {
        'x-access-token': app.globalData.token
      },
      data: {
        realname: this.data.userName,
        studentId: this.data.studentId,
        classroom: this.data.college,
        mobile: this.data.phone
      },
      success: (res) => {
        if (!res || res.data.errcode != 0) {
          win.toast("提交失败", "none");
          return;
        }
        win.toast("提交成功");
      }
    })
  }
})