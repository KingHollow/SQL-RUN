// pages/random/random.js

const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapter:[{
      flag:1,
      name:'第一章',
    },{
      flag:2,
      name:'第二章',
    }
    ,{
      flag:3,
      name:'第三章',
    }
    ,{
      flag:4,
      name:'第四章',
    }
    ,{
      flag:5,
      name:'第五章',
    }
    ,{
      flag:6,
      name:'第六章',
    }
    ,{
      flag:7,
      name:'第七章',
    }
    ,{
      flag:8,
      name:'第八章',
    }
    ,{
      flag:9,
      name:'第九章',
    }
    ,{
      flag:10,
      name:'第十章',
    }],
    style:['s','m','j','b'],
    quesID:''

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

  random : function (e) {
    let that = this;
    var i = Math.floor(Math.random()*5);
    var style = this.data.style[i];
    var chapter = e.currentTarget.dataset.chapter;
    var type = style + ('0000' + chapter.toString()).substr(-3)
    if(style == "s"){
      var j = 0;
      db.collection("quantity").where({
        type:type,
      }).get().then(res => {
        var n = res.data[0].number;
        j = Math.floor(Math.random()*n);
        that.setData({
          quesID:style + chapter.toString()+ ('0000' + n.toString()).substr(-5)
        })
        console.log(that.data.quesID)
        wx.navigateTo({
          url: '../../pages/s_random/s_random?id=' + that.data.quesID,
        })
      })
      
    };
    if(style == "m"){
      var j = 0;
      db.collection("quantity").where({
        type:type,
      }).get().then(res => {
        var n = res.data[0].number;
        j = Math.floor(Math.random()*n);
        that.setData({
          quesID:style + chapter.toString()+ ('0000' + n.toString()).substr(-5)
        })
        console.log(that.data.quesID)
        wx.navigateTo({
          url: '../../pages/m_random/m_random?id=' + that.data.quesID,
        })
      })
      
    };
    if(style == "j"){
      var j = 0;
      db.collection("quantity").where({
        type:type,
      }).get().then(res => {
        var n = res.data[0].number;
        j = Math.floor(Math.random()*n);
        that.setData({
          quesID:style + chapter.toString()+ ('0000' + n.toString()).substr(-5)
        })
        console.log(that.data.quesID)
        wx.navigateTo({
          url: '../../pages/j_random/j_random?id=' + that.data.quesID,
        })
      })
      
    };
    if(style == "b"){
      var j = 0;
      db.collection("quantity").where({
        type:type,
      }).get().then(res => {
        var n = res.data[0].number;
        j = Math.floor(Math.random()*n);
        that.setData({
          quesID:style + chapter.toString()+ ('0000' + n.toString()).substr(-5)
        })
        console.log(that.data.quesID)
        wx.navigateTo({
          url: '../../pages/b_random/b_random?id=' + that.data.quesID,
        })
      })
      
      
    };
    



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