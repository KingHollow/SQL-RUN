// pages/challengeme/challengeme.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      questionID: '',
      crname: '',
      state: '',
      content: "暂无挑战",
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var id = wx.getStorageSync('id');
    var rlist = new Array();
    
    db.collection("challenge").where({
      challengedID: id,
      state: 2
    }).get().then(res => {
      var j = 0;
      console.log(res.data)
      for (var i = 0; i < res.data.length; i++) {
        //获取状态       
        var temp = {
          state: 2,
          crname: res.data[j].challengerName,
          questionID: res.data[j].questionID,
          content: res.data[j].content,
        }
        j++;
        rlist.push(temp);
        that.setData({
          list: rlist
        })
      }
    })
    db.collection("challenge").where({
      challengedID: id,
      state: 1
    }).get().then(res => {
      var j = 0;
      console.log(res.data)
      for (var i = 0; i < res.data.length; i++) {
        //获取状态       
        var temp = {
          state: 1,
          crname: res.data[j].challengerName,
          questionID: res.data[j].questionID,
          content: res.data[j].content,
        }
        j++;
        rlist.push(temp);
        that.setData({
          list: rlist
        })
        
      }
    })
  },

  GotoChallenge: function(e){
    console.log(e)
    var quesid = e.currentTarget.dataset.id;
    if(quesid.charAt(0) == "s"){
      wx.navigateTo({
        url: '../../pages/s_respond/s_respond?id=' + quesid,
      })
    };
    if(quesid.charAt(0) == "m"){
      wx.navigateTo({
        url: '../../pages/m_respond/m_respond?id=' + quesid,
      })
    };
    if(quesid.charAt(0) == "j"){
      wx.navigateTo({
        url: '../../pages/j_respond/j_respond?id=' + quesid,
      })
    };
    if(quesid.charAt(0) == "b"){
      wx.navigateTo({
        url: '../../pages/b_respond/b_respond?id=' + quesid,
      })
    };
    
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