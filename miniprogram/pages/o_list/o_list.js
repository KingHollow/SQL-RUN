// pages/o_list/o_list.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    content:"",
    answer: "",
    picurl: "",
    flag: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
    });
    db.collection("subjective").where({subID: id}).get().then(res => {
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
      console.log(this.data)
    })
  },

  back: function(){
    wx.navigateBack({
      delta: 1
    });
  },

  attend: function(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 3];//上两个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var temp = prevPage.data.o_list;
    var data = {
      oid: this.data.id,
      content: this.data.content
    };
    temp.push(data);
    prevPage.setData({
      o_list: temp
    })
    wx.navigateBack({
      delta: 2
    });
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