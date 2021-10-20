// pages/s_checkchal/s_checkchal.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sinid: "",
    items: [],
    content: "",
    answer: ""
  },

  popConfirm: function () {
    var that = this;
    db.collection("challenge").where({
      questionID: this.data.sinid
    }).get().then(res => {
      //修改学生每周积分和总积分
      db.collection('student').where({
        studentID: res.data[0].challengerID
      }).get().then( r => {
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updatestudent',
          // 传给云函数的参数
          data: {
            studentID: r.data[0].studentID,
            experience: r.data[0].experience + 3,
            point: r.data[0].point + 3,
            challenge: r.data[0].challenge,
            answer: r.data[0].answer,
            random: r.data[0].random,
            race: r.data[0].race,
            rockets: r.data[0].rockets,
            peals: r.data[0].peals,
            cards: r.data[0].cards,
            coin: r.data[0].coin,
            challengescore: r.data[0].challengescore + 3
          },
        })
      })
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updatechallenge',
      // 传给云函数的参数
      data: {
        questionid: this.data.sinid,
        state: 1
      },
    })
    wx.showModal({
      content: '是否将此题加入题库？',
      success: function (res) {
        if (res.confirm) {
          // 跳转到选择章节难度的页面
          wx.navigateTo({
            url: '../add_challenge/add_challenge?quesid=' + that.data.sinid,
          })
        } else {
          wx.navigateBack({
            delta: 2,
          })   
          wx.navigateTo({
            url: '../check/check',
          })
        }
      }
    })
  },

  back: function () {
    //将当周挑战次数减一
    db.collection("challenge").where({
      questionID: this.data.sinid
    }).get().then(res => {
      db.collection('student').where({
        studentID: res.data[0].challengerID
      }).get().then( r => {
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updatestudent',
          // 传给云函数的参数
          data: {
            studentID: r.data[0].studentID,
            experience: r.data[0].experience,
            point: r.data[0].point,
            challenge: r.data[0].challenge - 1,
            answer: r.data[0].answer,
            random: r.data[0].random,
            race: r.data[0].race,
            rockets: r.data[0].rockets,
            peals: r.data[0].peals,
            cards: r.data[0].cards,
            coin: r.data[0].coin
          },
        })
      })
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updatechallenge',
      // 传给云函数的参数
      data: {
        questionid: this.data.sinid,
        state: 3
      },
    })
    wx.navigateBack({
      delta: 2,
    })   
    setTimeout(function(){},2000)
    wx.navigateTo({
      url: '../check/check',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sinid = options.chalid;
    this.setData({
      sinid: sinid
    });
    db.collection("sinChoice").where({
      sinID: sinid,
      type: 1
    }).get().then(res => {
      var temp = [];
      for (var i = 0; i < res.data[0].options.length; i++) {
        var data = {
          value: res.data[0].options[i]
        };
        temp.push(data);
      }
      this.setData({
        items: temp,
        content: res.data[0].content,
        answer: res.data[0].answer
      })
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