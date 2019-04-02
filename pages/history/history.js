Page({
  data: {
    bookList: [{
      bookName: '计算机科学与导论',
      borrowTime: '2018/3/25',
      returnTime: '2018/3/25',
      currentState: '正常',
      hasReturn: 0 // 0代表已归还，1代表租用中，2代表已逾期
    }, {
      bookName: '计算机科学与导论',
      borrowTime: '2018/3/25',
      returnTime: '2018/3/25',
      currentState: '正常',
      hasReturn: 1
    }, {
      bookName: '计算机科学与导论',
      borrowTime: '2018/3/25',
      returnTime: '2018/3/25',
      currentState: '正常',
      hasReturn: -1
    }, {
      bookName: '计算机科学与导论',
      borrowTime: '2018/3/25',
      returnTime: '2018/3/25',
      currentState: '正常',
      hasReturn: 1
    }]
  }
})