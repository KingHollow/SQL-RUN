// pages/s_list/s_list.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    items: [],

    content:"",

    answer:""
  },

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
    });
    db.collection("sinChoice").where({sinID: id}).get().then(res => {
      var temp = [];
      for(var i = 0; i < res.data[0].options.length; i++){
        var data = {value: res.data[0].options[i]};
        temp.push(data);
      }
      this.setData({
        items: temp,
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
    var temp = prevPage.data.s_list;
    var data = {
      sid: this.data.id,
      content: this.data.content
    };
    temp.push(data);
    prevPage.setData({
      s_list: temp
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