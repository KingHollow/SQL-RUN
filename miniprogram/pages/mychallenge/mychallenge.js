// pages/mychallenge/mychallenge.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        questionID: '',
        cdname: '',
        state: 10,
        content: "暂无挑战",
      }
    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var id = wx.getStorageSync('id');
    var rlist = new Array();
    
    db.collection("challenge").where({
      challengerID: id
    }).get().then(res => {
      var j = 0;
      console.log(res.data)
      for (var i = 0; i < res.data.length; i++) {
        //获取状态       
        var temp = {
          state: res.data[j].state,
          cdname: res.data[j].challengedName,
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

  GotoChadetail: function(e){
    
    var quesid = e.currentTarget.dataset.id;
    console.log(quesid)
    if(quesid.charAt(0) == "s"){
      wx.navigateTo({
        url: '../../pages/s_cdetail/s_cdetail?id=' + quesid,
      })
    };
    if(quesid.charAt(0) == "m"){
      wx.navigateTo({
        url: '../../pages/m_cdetail/m_cdetail?id=' + quesid,
      })
    };
    if(quesid.charAt(0) == "j"){
      wx.navigateTo({
        url: '../../pages/j_cdetail/j_cdetail?id=' + quesid,
      })
    };
    if(quesid.charAt(0) == "b"){
      wx.navigateTo({
        url: '../../pages/b_cdetail/b_cdetail?id=' + quesid,
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