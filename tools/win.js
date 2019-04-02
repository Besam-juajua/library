exports.loading = msg => {
  wx.showLoading({
    title: msg
  })
}

exports.toast = (msg, icon = 'success', duration = 1000) => {
  wx.showToast({
    title: msg,
    icon: icon,
    duration: duration
  })
}

exports.modal = () => {

}

exports.hideLoading = () => {
  wx.hideLoading();
}

exports.hideToast = () => {
  wx.hideToast();
}