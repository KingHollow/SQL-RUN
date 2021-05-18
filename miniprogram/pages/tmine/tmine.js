// pages/tmine/tmine.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    db.collection("teacher").where({
      teacherID: id
    }).get().then(res => {
      if (res.data.length) {
        this.setData({
          name: res.data[0].name
        })
      } else {
        db.collection("tutorial").where({
          tutorialID: id
        }).get().then(rm => {
          this.setData({
            name: rm.data[0].name
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  createclass: function(){
    var id = wx.getStorageSync('id');
    db.collection("teacher").where({teacherID: id}).get().then(res => {
      if(!res.data.length){
        wx.showModal({
          titel: "提示",
          content: "您没有创建班级的权限!",
          duration:3000,
          success(res){
          }
        });
      }else{
        wx.navigateTo({
          url: '../create_class/create_class',
        })
      }
    })
  },

  dismissclass: function(){
    var id = wx.getStorageSync('id');
    db.collection("teacher").where({teacherID: id}).get().then(res => {
      if(!res.data.length){
        wx.showModal({
          titel: "提示",
          content: "您没有解散班级的权限!",
          duration:3000,
          success(res){
          }
        });
      }else{
        wx.navigateTo({
          url: '../dismiss_class/dismiss_class',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.editTabBar1(); //显示自定义的底部导航
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