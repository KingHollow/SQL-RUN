// pages/b_answer/b_answer.js
var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "按照报表的数据组织形式、显示方式和作用的不同，Access中的报表可以分为4种基本类型，它们分别是：纵栏式报表、_____报表、图表报表和标签报表。",

    myanswer: [{
        value: '嘿嘿'
      },
      {
        value: '哈哈'
      }
    ],
    nbanswer: [{
        value: 'blank'
      },
      {
        value: '表格式'
      }

    ],
    quesid: '',
    homeworkid: '',
    index: 0,
    type: 0,
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
          myanswer: []
        });
      } else {
        if (r.data[0].answer[index].ans == undefined) {
          that.setData({
            myanswer: []
          });
        } else {
          var temp = [];
          for (var i = 0; i < r.data[0].answer[index].ans.length; i++) {
            var data = {
              value: r.data[0].answer[index].ans[i]
            }
            temp.push(data);
          }
          that.setData({
            myanswer: temp
          });
        }
      }
      if (type == 0) {
        db.collection("blank").where({
          blankID: quesid,
        }).get().then(res => {
          var temp1 = [];
          var ans = "";
          for (var i = 0; i < res.data[0].answer.length; i++) {
            ans = "";
            for (var j = 0; j < res.data[0].answer[i].length; j++) {
              ans = ans + res.data[0].answer[i][j] + ",";
            }
            var data = {
              value: ans.substring(0, ans.length - 1)
            };
            temp1.push(data);
          }
          this.setData({
            content: res.data[0].content,
            nbanswer: temp1
          })
        })
      } else {
        db.collection("blank").where({
          blankID: quesid,
          type: 2
        }).get().then(res => {
          var temp1 = [];
          var ans = "";
          for (var i = 0; i < res.data[0].answer.length; i++) {
            ans = "";
            for (var j = 0; j < res.data[0].answer[i].length; j++) {
              ans = ans + res.data[0].answer[i][j] + ",";
            }
            var data = {
              value: ans.substring(0, ans.length - 1)
            };
            temp1.push(data);
          }
          this.setData({
            content: res.data[0].content,
            nbanswer: temp1
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