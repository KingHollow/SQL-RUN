// pages/b_mistake/b_mistake.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    
    myanswer:[],
    nbanswer: [],

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
    var blankid = options.quesid;
    var type = parseInt(options.type);
    this.setData({blankid: blankid});
    db.collection("blank").where({
      blankID: blankid,
      type: type
    }).get().then(res => {
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
        nbanswer: temp
      })
    })
    db.collection("mistake").where({
      questionID: blankid,
      type: type,
      studentID: wx.getStorageSync('id')
    }).get().then(rm => {
      var temp1 = [];
      for(var i = 0; i < rm.data[0].answer.length; i++){
        var data1 = {value: rm.data[0].answer[i]}
        temp1.push(data1);
      }
      this.setData({myanswer: temp1});
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