// pages/question/question.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    var state='';
    db.collection("question").where({stuID: id}).get().then(res => {
      console.log(res.data)
      for(var i = 0;i < res.data.length;i++) {
        //获取状态：answers为空-未回答；不空-只要有pass，就是，已回答
        if (res.data[i].answers.length == 0) {state = '未回答';}
        else {
          for(var j = 0;j<res.data[i].answers.length;j++) {
            if (res.data[i].answers[j].result == 'pass') {
              state='已回答';
              break;} else {
                state = '未回答';
              }
          }
        }
        res.data[i].state = state;
      }
      this.setData({
        list: res.data
      })
    })
  },

  NavigateToQues_de:function(e) {
    console.log(e)
    var quesid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/question_detail/question_detail?id=' + quesid,
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