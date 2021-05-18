// pages/rank/rank.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    ],

    name:""
  },

  challenge:function(e){
    wx.showModal({
      content: '确认要挑战'+e.currentTarget.dataset.name+'同学吗？',
      success: function (res) {
        if (res.confirm) {  
          wx.navigateTo({
            url: '/pages/challenge/challenge'
          })
        } else {   
        }
      }
  })
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
    app.editTabBar();    //显示自定义的底部导航
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