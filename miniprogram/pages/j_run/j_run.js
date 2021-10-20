// pages/j_run/j_run.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    items: [
      {value: '正确'},
      {value: '错误'},
    ],
    answer:'',
    nbanswer:'',
    level: 0,
    _id: ''
  },

  radioChange: function(e) {
    this.setData({
      answer:e.detail.value
    })
    console.log(this.data.answer)
  },

  submit:function(){
    var that = this
    var pages = getCurrentPages()
    var lastpage = pages[pages.length - 2]
    wx.showModal({
      content: '是否确认提交？',
      success: function (res) {
        if (res.confirm) {
          if (that.data.answer != '') {
            var correct = false;
            if (that.data.answer == that.data.nbanswer) {
              correct = true
            }
            if (!correct) {
              lastpage.setData({
                state: 2,
                time: 5,
                flag: true
              })
            } else {
              if(lastpage.data.locked == 0){
                db.collection('sqlrun').add({
                  data: {
                    ID: wx.getStorageSync('id'),
                    move: that.data.level
                  },
                })
                lastpage.setData({
                  state: 1
                })
                if(lastpage.data.countP + that.data.level >= 10){
                  lastpage.setData({
                    countP: 10
                  })
                }
                else{
                  lastpage.setData({
                    countP: lastpage.data.countP + that.data.level
                  })
                }
              }
              else{
                lastpage.setData({
                  state: 3,
                  locked: lastpage.data.locked - 1
                })
              }
            }
            wx.navigateBack({
              delta: 0,
            })
          } else {
            wx.showToast({
              title: '还未作答！',
              icon: 'none',
              duration: 1500
            })
          }
        } else if (res.cancel) {}
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      level: parseInt(options.level),
      _id: options._id
    })
    db.collection('judgement').where({
      judgeID: options.problemID
    }).get().then(res => {
      that.setData({
        content: res.data[0].content,
        nbanswer: res.data[0].answer
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})