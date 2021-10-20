// pages/s_mistake/s_mistake.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],

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
    var sinid = options.quesid;
    var type = parseInt(options.type);
    this.setData({sinid: sinid});
    db.collection("sinChoice").where({
      sinID: sinid,
      type: type
    }).get().then(res => {
      var temp = [];
      for(var i = 0; i < res.data[0].options.length; i++){
        var data = {value: res.data[0].options[i]};
        temp.push(data);
      }
      this.setData({
        items: temp,
        content: res.data[0].content,
        nbanswer: res.data[0].answer
      })
    })
    db.collection("mistake").where({
      questionID: sinid,
      type: type,
      studentID: wx.getStorageSync('id')
    }).get().then(rm => {
      this.setData({myanswer: rm.data[0].answer})
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