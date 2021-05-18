// pages/b_list/b_list.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    content:"",
    answer: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
    });
    db.collection("blank").where({blankID: id}).get().then(res => {
      var temp = [];
      var ans = "";
      for(var i = 0; i < res.data[0].answer.length; i++){
        ans = "";
        for(var j = 0; j < res.data[0].answer[i].length; j++){
          ans = ans + res.data[0].answer[i][j] + ",";
        }
        var data = {value: ans.substring(0, ans.length-1)};
        temp.push(data);
      }
      this.setData({
        content: res.data[0].content,
        answer: temp
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
    var temp = prevPage.data.b_list;
    var data = {
      bid: this.data.id,
      content: this.data.content
    };
    temp.push(data);
    prevPage.setData({
      b_list: temp
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