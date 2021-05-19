// pages/rank/rank.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: [],
    name: ""
  },

  challenge: function (e) {
    if (e.currentTarget.dataset.id == wx.getStorageSync('id')) {
      wx.showModal({
        content: "你不能挑战你自己"
      })
    } else {
      wx.showModal({
        content: '确认要挑战' + e.currentTarget.dataset.name + '同学吗？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/challenge/challenge?challengedid' + e.currentTarget.dataset.id
            })
          } else {}
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    var that = this;
    db.collection("student").where({
      studentID: id
    }).get().then(res => {
      var classid = res.data[0].classID;
      db.collection("student").where({
        classID: classid
      }).orderBy("point", "desc").get().then(r => {
        var temp = [];
        for (var i = 0; i < r.data.length; i++) {
          var data = {
            id: r.data[i].studentID,
            name: r.data[i].name,
            score: r.data[i].point
          }
          temp.push(data);
          that.setData({
            student: temp
          });
        }
      })
    })
  },

  turntomychallenge:function(e) {
    wx.navigateTo({
      url: '../../pages/mychallenge/mychallenge',
    })


  },

  turntorandom:function(e) {
    wx.navigateTo({
      url: '../../pages/random/random',
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
    app.editTabBar(); //显示自定义的底部导航
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