// pages/create_class/create_class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  formSubmit: function (e){
    var teacherid = wx.getStorageSync('id');
    var classid = e.detail.value.classid;
    var classname = e.detail.value.classname;
    const db = wx.cloud.database();
    db.collection("class").where({classID: classid}).get().then(res => {
      if(res.data.length){
        wx.showToast({
          icon: 'none',
          title: '已存在此班级编号',
        })
      }else{
        db.collection("class").add({
          data: {
            classID: classid,
            name: classname,
            teacherID: teacherid
          }
        })
        wx.showModal({
          titel: "提示",
          content: "创建成功!",
          duration:3000,
          success(res){
            wx.redirectTo({
              url: '../tmine/tmine',
            })
          }
        });
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