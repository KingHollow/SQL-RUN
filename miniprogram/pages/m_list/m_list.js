// pages/m_list/m_list.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    content:"",
    list: [],
    answer:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
    });
    db.collection("mulChoice").where({mulID: id}).get().then(res => {
      var temp = [];
      for(var i = 0; i < res.data[0].options.length; i++){
        var data = {value: res.data[0].options[i]};
        temp.push(data);
      }
      this.setData({
        list: temp,
        content: res.data[0].content,
        answer: res.data[0].answer
      })
    })
  },

  back: function(){
    wx.navigateBack({
      delta: 1
    });
  },

  attend: function(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 3];//上两个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var temp = prevPage.data.m_list;
    var data = {
      mid: this.data.id,
      content: this.data.content
    };
    temp.push(data);
    prevPage.setData({
      m_list: temp
    })
    wx.navigateBack({
      delta: 2
    });
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