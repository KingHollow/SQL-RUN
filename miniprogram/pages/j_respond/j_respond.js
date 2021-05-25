// pages/j_respond/j_respond.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"在层次数据模型中，有2个节点无双亲。",
    items: [
      {value: '正确'},
      {value: '错误'},
    ],
    answer:'',
  },

  radioChange: function(e) {
    this.setData({
      answer:e.detail.value
    })
    console.log(this.data.answer)
  },

  submit:function(){
    var that=this
    wx.showModal({  
      content: '是否确认提交？',  
      success: function(res) {  
          if (res.confirm) { 
            if(that.data.answer!=''){
              wx.showToast({
                title: '完成挑战！',
                icon: 'success', 
                duration: 1500 
              })
            } 
            else{
              wx.showToast({
                title: '还未作答,无法提交！',
                icon:'none',
                duration: 1500 
              })
            }
          } else if (res.cancel) {  
          }  
      }  
  })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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