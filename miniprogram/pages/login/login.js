// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLogin: function(e) {

    const db = wx.cloud.database();
    var userid = e.detail.value.userid;
    var password = e.detail.value.password;

    db.collection("teacher").where({
      teacherID: userid,
      password: password
    }).get().then(res => {
      if (res.data.length) {
        wx.setStorageSync('id', res.data[0].teacherID); //将user_name存入本地缓存
        wx.redirectTo({
          url: '../tmine/tmine',
        })
      } else {
        db.collection("tutorial").where({
          tutorialID: userid,
          password: password
        }).get().then(rm => {
          if(rm.data.length) {
            wx.setStorageSync('id', rm.data[0].tutorialID); //将user_name存入本地缓存
            wx.redirectTo({
              url: '../tmine/tmine',
            })
          } else {
            db.collection("student").where({
              studentID: userid,
              password: password
            }).get().then(r => {
              if(r.data.length) {
                wx.setStorageSync('id', r.data[0].studentID); //将user_name存入本地缓存
                wx.redirectTo({
                  url: '../rank/rank',
                })
              } else {
                wx.showModal({
                  title: "提示",
                  content: "用户名不存在或密码错误"
                })
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  turntoregister:function(){
    wx.redirectTo({
      url: '../../pages/register/register',
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