// pages/class/class.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    period: [
      "本周",
      "本学期"
    ],
    selectArray: [{
            "text": "电子商务"
          }, {
            "text": "信管一班"
          }, {
            "text": "信管二班"
          },
    ],
    student:[
      {name: '沈黄豪',score:30},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
      {name: '马英杰',score:50},
    ]
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    app.editTabBar1();    //显示自定义的底部导航
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