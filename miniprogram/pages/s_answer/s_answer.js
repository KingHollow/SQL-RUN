// pages/s_answer/s_answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: 'A.文件形式'},
      {value: 'B.数据模型'},
      {value: 'C.记录形式'},
      {value: 'D.数据存储方式'},
    ],

    content:"数据库类型是按照_______来划分的。",

    myanswer:"B",
    nbanswer:"D",

    show:false,
  },

  click:function(){
    this.setData({
      show:!this.data.show
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