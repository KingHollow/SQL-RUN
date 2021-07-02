// pages/m_answer/m_answer.js
var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    list: [],
    checkedList: [],
    quesid: '',
    homeworkid: '',
    index: 0,
    type: 0,
    answer: "",
    nbanswer: "",

    show: false,
  },

  problemChangeNext: function (e) {
    var index = this.data.index;
    var homeworkid = this.data.homeworkid;
    db.collection("homework").where({
      homeworkID: homeworkid
    }).get().then(r => {
      if (this.data.index + 1 == r.data[0].problem.length) {
        wx.showToast({
          title: '没有下一题啦！',
        })
      } else {


        db.collection("homework").where({
          homeworkID: homeworkid
        }).get().then(rm => {
          if (rm.data[0].problem[index + 1][0] == 's') {
            wx.redirectTo({
              url: '../s_answer/s_answer?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[index + 1][0] == 'm') {
            wx.redirectTo({
              url: '../m_answer/m_answer?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[index + 1][0] == 'j') {
            wx.redirectTo({
              url: '../j_answer/j_answer?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[index + 1][0] == 'b') {
            wx.redirectTo({
              url: '../b_answer/b_answer?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[index + 1][0] == 'o') {
            wx.redirectTo({
              url: '../o_answer/o_answer?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
            })
          }

        })

      }
    })
  },

  problemChangeBack: function (e) {
    var index = this.data.index;
    if (this.data.index == 0) {
      wx.showToast({
        title: '没有上一题啦！',
      })
    } else {
      var homeworkid = this.data.homeworkid;

      db.collection("homework").where({
        homeworkID: homeworkid
      }).get().then(rm => {
        if (rm.data[0].problem[index - 1][0] == 's') {
          wx.redirectTo({
            url: '../s_answer/s_answer?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
          })
        }
        if (rm.data[0].problem[index - 1][0] == 'm') {
          wx.redirectTo({
            url: '../m_answer/m_answer?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
          })
        }
        if (rm.data[0].problem[index - 1][0] == 'j') {
          wx.redirectTo({
            url: '../j_answer/j_answer?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
          })
        }
        if (rm.data[0].problem[index - 1][0] == 'b') {
          wx.redirectTo({
            url: '../b_answer/b_answer?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
          })
        }
        if (rm.data[0].problem[index - 1][0] == 'o') {
          wx.redirectTo({
            url: '../o_answer/o_answer?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
          })
        }

      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var quesid = options.quesid;
    var type = parseInt(options.type);
    var index = parseInt(options.index);
    var homeworkid = options.homeworkid;
    this.setData({
      quesid: quesid,
      type: type,
      index: index,
      homeworkid: homeworkid
    });
    db.collection("result").where({
      homeworkID: homeworkid,
      studentID: wx.getStorageSync('id')
    }).get().then(r => {
      if (r.data.length == 0) {
        that.setData({
          myanswer: ""
        });
      } else {
        if (r.data[0].answer[index].ans == undefined) {
          that.setData({
            myanswer: ""
          });
        } else {
          that.setData({
            myanswer: r.data[0].answer[index].ans
          });
        }
      }
      if (type == 0) {
        db.collection("mulChoice").where({
          mulID: quesid,
        }).get().then(res => {
          var temp = [];
          for (var i = 0; i < res.data[0].options.length; i++) {
            var data = {
              value: res.data[0].options[i]
            };
            temp.push(data);
          }
          this.setData({
            list: temp,
            content: res.data[0].content,
            nbanswer: res.data[0].answer
          })
        })
      } else {
        db.collection("mulChoice").where({
          mulID: quesid,
          type: 2
        }).get().then(res => {
          var temp = [];
          for (var i = 0; i < res.data[0].options.length; i++) {
            var data = {
              value: res.data[0].options[i]
            };
            temp.push(data);
          }
          this.setData({
            list: temp,
            content: res.data[0].content,
            nbanswer: res.data[0].answer
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