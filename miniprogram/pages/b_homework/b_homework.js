// pages/b_homework/b_homework.js
var db = wx.cloud.database();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    nbanswer: [],
    answer: [],
    quesid: '',
    homeworkid: '',
    index: 0,
    type: 0,
    //原答案
    oldanswer: [],
  },

  answerInput: function (e) {
    var idx = e.currentTarget.dataset.index; //当前下标
    console.log(idx)
    var val = e.detail.value; //当前输入的值
    console.log(val)
    var _list = this.data.answer; //data中存放的数据
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list[i] = val //将当前输入的值放到数组中对应的位置
      }
    }
    this.setData({
      answer: _list
    })
    console.log(this.data.answer)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      if (r.data[0].answer[index].ans != undefined) {
        this.setData({
          oldanswer: r.data[0].answer[index].ans
        });
      }
      if (type == 0) {
        db.collection("blank").where({
          blankID: quesid,
        }).get().then(res => {
          var temp = [];
          var ans = "";
          for (var i = 0; i < res.data[0].answer.length; i++) {
            ans = "";
            for (var j = 0; j < res.data[0].answer[i].length; j++) {
              ans = ans + res.data[0].answer[i][j] + ",";
            }
            var data = {
              value: ans.substring(0, ans.length - 1)
            };
            temp.push(data);
          }
          this.setData({
            content: res.data[0].content,
            nbanswer: temp
          })
          var that = this;
          for (var index in that.data.nbanswer) {
            that.data.answer.push("")
          }
          if (that.data.oldanswer.length != 0) {
            that.setData({
              answer: that.data.oldanswer
            })
          }
        })
      } else {
        db.collection("blank").where({
          blankID: quesid,
          type: 2
        }).get().then(res => {
          var temp = [];
          var ans = "";
          for (var i = 0; i < res.data[0].answer.length; i++) {
            ans = "";
            for (var j = 0; j < res.data[0].answer[i].length; j++) {
              ans = ans + res.data[0].answer[i][j] + ",";
            }
            var data = {
              value: ans.substring(0, ans.length - 1)
            };
            temp.push(data);
          }
          this.setData({
            content: res.data[0].content,
            nbanswer: temp
          })
          var that = this;
          for (var index in that.data.nbanswer) {
            that.data.answer.push("")
          }
          if (that.data.oldanswer.length != 0) {
            that.setData({
              answer: that.data.oldanswer
            })
          }
        })
      }
    })
  },

  problemChangeNext: function (e) {
    var index = this.data.index;
    var homeworkid = this.data.homeworkid;
    var studentid = wx.getStorageSync('id');
    db.collection("homework").where({
      homeworkID: homeworkid
    }).get().then(r => {
      if (this.data.index + 1 == r.data[0].problem.length) {
        wx.showToast({
          title: '没有下一题啦！',
        })
      } else {
        db.collection("result").where({
          homeworkID: homeworkid,
          studentID: studentid
        }).get().then(res => {
          var answer = res.data[0].answer;
          var state = 0;
          var time = "";
          var score = "";
          answer[this.data.index].ans = this.data.answer;
          wx.cloud.callFunction({
            // 云函数名称
            name: 'updateresult',
            // 传给云函数的参数
            data: {
              homeworkid: homeworkid,
              studentid: studentid,
              answer: answer,
              state: state,
              time: time,
              score: score
            },
          })
          db.collection("homework").where({
            homeworkID: homeworkid
          }).get().then(rm => {
            if (rm.data[0].problem[index + 1][0] == 's') {
              wx.redirectTo({
                url: '../s_homework/s_homework?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
              })
            }
            if (rm.data[0].problem[index + 1][0] == 'm') {
              wx.redirectTo({
                url: '../m_homework/m_homework?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
              })
            }
            if (rm.data[0].problem[index + 1][0] == 'j') {
              wx.redirectTo({
                url: '../j_homework/j_homework?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
              })
            }
            if (rm.data[0].problem[index + 1][0] == 'b') {
              wx.redirectTo({
                url: '../b_homework/b_homework?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
              })
            }
            if (rm.data[0].problem[index + 1][0] == 'o') {
              wx.redirectTo({
                url: '../o_homework/o_homework?quesid=' + rm.data[0].problem[index + 1] + '&homeworkid=' + homeworkid + "&index=" + (index + 1) + "&type=" + rm.data[0].type,
              })
            }
          })
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
      var studentid = wx.getStorageSync('id');
      db.collection("result").where({
        homeworkID: homeworkid,
        studentID: studentid
      }).get().then(res => {
        var answer = res.data[0].answer;
        var state = 0;
        var time = "";
        var score = "";
        answer[this.data.index].ans = this.data.answer;
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updateresult',
          // 传给云函数的参数
          data: {
            homeworkid: homeworkid,
            studentid: studentid,
            answer: answer,
            state: state,
            time: time,
            score: score
          },
        })
        db.collection("homework").where({
          homeworkID: homeworkid
        }).get().then(rm => {
          if (rm.data[0].problem[index - 1][0] == 's') {
            wx.redirectTo({
              url: '../s_homework/s_homework?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[index - 1][0] == 'm') {
            wx.redirectTo({
              url: '../m_homework/m_homework?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[index - 1][0] == 'j') {
            wx.redirectTo({
              url: '../j_homework/j_homework?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[index - 1][0] == 'b') {
            wx.redirectTo({
              url: '../b_homework/b_homework?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[index - 1][0] == 'o') {
            wx.redirectTo({
              url: '../o_homework/o_homework?quesid=' + rm.data[0].problem[index - 1] + '&homeworkid=' + homeworkid + "&index=" + (index - 1) + "&type=" + rm.data[0].type,
            })
          }
        })
      })
    }
  },

  submit: function (e) {
    var that = this;
    wx.showModal({
      titel: "提示",
      content: "确定要提交作业吗？",
      duration: 3000,
      success(r) {
        var homeworkid = that.data.homeworkid;
        var studentid = wx.getStorageSync('id');
        db.collection("result").where({
          homeworkID: homeworkid,
          studentID: studentid
        }).get().then(res => {
          var answer = res.data[0].answer;
          var state = 2;
          var time = formatTime(new Date());
          var score = "";
          answer[that.data.index].ans = that.data.answer;
          wx.cloud.callFunction({
            // 云函数名称
            name: 'updateresult',
            // 传给云函数的参数
            data: {
              homeworkid: homeworkid,
              studentid: studentid,
              answer: answer,
              state: state,
              time: time,
              score: score
            },
          })
          wx.redirectTo({
            url: '../study/study',
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