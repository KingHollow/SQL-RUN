// pages/o_correct/o_correct.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    answer: "",
    picurl: "",
    flag: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var problemID = options.problemID
    console.log(problemID)
    var type = parseInt(options.type)
    console.log(type)
    db.collection("subjective").where({
      subID: problemID,
      type: type
    }).get().then(res => {
      this.setData({
        content: res.data[0].content.split('&hc').join('\n'),
        answer: res.data[0].answer.split('&hc').join('\n'),
        picurl: res.data[0].picurl
      })
      if(res.data[0].picurl != "" && res.data[0].picurl != undefined){
        this.setData({
          flag: 1
        })
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