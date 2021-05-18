// pages/tellyou_detail/tellyou_detail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    answers:[],
    myanswer:'',
    myresult:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var quesid = options.quesid;
    var that = this;
    var id = wx.getStorageSync('id');
    db.collection("question").where({quesID: quesid}).get().then(res => {
      that.setData({content: res.data[0].content});
      var temp = [];
      var myanswer = "";
      var myresult = "";
      for(var i = 0; i < res.data[0].answers.length; i++){
        var data = {
          index: i,
          id: res.data[0].answers[i].id,
          name: res.data[0].answers[i].name,
          answer: res.data[0].answers[i].answer,
          result: res.data[0].answers[i].result
        }
        temp.push(data);
        that.setData({answers: temp});
        if(id == res.data[0].answers[i].id){
          myanswer = res.data[0].answers[i].answer;
          myresult = res.data[0].answers[i].result;
          that.setData({
            myresult: myresult,
            myanswer: myanswer
          })
        }
      }
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