// pages/j_checkchal/j_checkchal.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judgeid: "",
    content:"",
    answer:""
  },

  popConfirm: function(){
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updatechallenge',
      // 传给云函数的参数
      data: {
        questionid: this.data.judgeid,
        state: 1
      },
    })
    wx.showModal({
      content: '是否将此题加入题库？',
      success: function (res) {
        if (res.confirm) {  
          // 跳转到选择章节难度的页面
          wx.navigateTo({
            url: '../add_challenge/add_challenge?quesid=' + that.data.judgeid,
          })
        } else {   
          wx.navigateBack({
            delta: 1
          });
        }
      }
    })
  },

  back: function(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updatechallenge',
      // 传给云函数的参数
      data: {
        questionid: this.data.judgeid,
        state: 3
      },
    })
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var judgeid = options.chalid;
    this.setData({judgeid: judgeid});
    db.collection("judgement").where({
      judgeID: judgeid,
      type: 1
    }).get().then(res => {
      this.setData({
        content: res.data[0].content,
        answer: res.data[0].answer
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