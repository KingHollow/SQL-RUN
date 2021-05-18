// pages/askme_detail/askme_detail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quesID: "",
    content: "",
    answers: [],
    myanswer: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var quesid = options.quesid;
    this.setData({
      quesID: quesid
    });
    var that = this;
    db.collection("question").where({
      quesID: quesid
    }).get().then(res => {
      that.setData({
        content: res.data[0].content
      });
      var temp = [];
      for (var i = 0; i < res.data[0].answers.length; i++) {
        var data = {
          index: i,
          id: res.data[0].answers[i].id,
          name: res.data[0].answers[i].name,
          answer: res.data[0].answers[i].answer,
          result: res.data[0].answers[i].result
        }
        temp.push(data);
        that.setData({
          answers: temp
        });
      }
    })
  },

  answerinput: function (e) {
    this.setData({
      myanswer: e.detail.value
    })
  },

  answerquestion: function () {
    var that = this;
    if (that.data.answers.length == 5) {
      wx.showModal({
        titel: "提示",
        content: "已经有五位同学作答，无法提交",
        duration: 3000,
        success(re) {}
      });
    } else if (that.data.myanswer == "") {
      wx.showModal({
        titel: "提示",
        content: "请输入回答后提交",
        duration: 3000,
        success(re) {}
      });
    } else {
      wx.showModal({
        titel: "提示",
        content: "确认回答？",
        duration: 3000,
        success(re) {
          var temp = [];
          for (var i = 0; i < that.data.answers.length; i++) {
            var data = {
              id: that.data.answers[i].id,
              name: that.data.answers[i].name,
              answer: that.data.answers[i].answer,
              result: that.data.answers[i].result
            }
            temp.push(data);
          }
          var id = wx.getStorageSync('id');
          db.collection("student").where({
            studentID: id
          }).get().then(res => {
            var data = {
              id: id,
              name: res.data[0].name,
              answer: that.data.myanswer,
              result: ""
            }
            temp.push(data);
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updatequestion',
              // 传给云函数的参数
              data: {
                quesID: that.data.quesID,
                flag: 1,
                answers: temp
              },
            })
            wx.redirectTo({
              url: '../study/study',
            })
          })
        }
      });
    }
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