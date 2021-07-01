// pages/j_mistake/j_mistake.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    
    myanswer:"",
    nbanswer:"",

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
    var judgeid = options.quesid;
    var type = parseInt(options.type);
    this.setData({judgeid: judgeid});
    db.collection("judgement").where({
      judgeID: judgeid,
      type: type
    }).get().then(res => {
      this.setData({
        content: res.data[0].content,
        nbanswer: res.data[0].answer
      })
    })
    db.collection("mistake").where({
      questionID: judgeid,
      type: type,
      studentID: wx.getStorageSync('id')
    }).get().then(rm => {
      this.setData({myanswer: rm.data[0].answer[0]})
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