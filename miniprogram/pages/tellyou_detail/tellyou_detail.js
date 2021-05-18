// pages/tellyou_detail/tellyou_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quesID:"00001",
    content:"图书馆七楼研讨室什么时候可以开空调呢？",
    stuID:"001",
    classID:"001",
    answers:[{
        "index": 0,
        "id":"002",
        "name":"陆亦王",
        "answer":"图书管理员说要等到六月份了",
        "result":""
      },{
        "index": 1,
        "id":"003",
        "name":"郑雅心",
        "answer":"那我们不如在这里殉职算了",
        "result":""
      },
    ],
    myanswer:'我们联合！',
    myresult:'2',

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