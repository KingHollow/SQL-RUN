// pages/o_homework/o_homework.js
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
    answer: '',
    quesid: '',
    homeworkid: '',
    index: 0,
    type: 0,
    //原答案
    oldanswer: '',
    picurl: "",
    flag: 0
  },

  answerInput: function (e) {
    this.setData({
      answer: e.detail.value.split('\n').join('&hc')
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
          oldanswer: r.data[0].answer[index].ans.split('&hc').join('\n')
        });
      }
      if (type == 0) {
        db.collection("subjective").where({
          subID: quesid,
        }).get().then(res => {
          this.setData({
            content: res.data[0].content.split('&hc').join('\n'),
            picurl: res.data[0].picurl
          })
          if (res.data[0].picurl != "" && res.data[0].picurl != undefined) {
            this.setData({
              flag: 1
            })
          }
          var that = this;
          if (that.data.oldanswer != '') {
            that.setData({
              answer: that.data.oldanswer
            })
          }

        })
      } else {
        db.collection("subjective").where({
          subID: quesid,
          type: 2
        }).get().then(res => {
          this.setData({
            content: res.data[0].content.split('&hc').join('\n'),
            picurl: res.data[0].picurl
          })
          if (res.data[0].picurl != "" && res.data[0].picurl != undefined) {
            this.setData({
              flag: 1
            })
          }
          var that = this;
          if (that.data.oldanswer != '') {
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
          answer[this.data.index].result = "";
          wx.cloud.callFunction({
            // 云函数名称
            name: 'updateresult',
            // 传给云函数的参数
            data: {
              homeworkid: homeworkid,
              studentid: studentid,
              answer: answer.split('\n').join('&hc'),
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
        answer[this.data.index].result = "";
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updateresult',
          // 传给云函数的参数
          data: {
            homeworkid: homeworkid,
            studentid: studentid,
            answer: answer.split('\n').join('&hc'),
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
      success: function (r) {
        if (r.confirm) {
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
            answer[that.data.index].result = "";
            db.collection('homework').where({
              homeworkID: that.data.homeworkid
            }).get().then(r1 => {
              var problem = r1.data[0].problem
              for (var i = 0; i < answer.length; i++) {
                console.log(i)
                if (answer[i].result == "×") {
                  console.log(i)
                  if (that.data.type == 0) {
                    db.collection('mistake').add({
                      data: {
                        studentID: wx.getStorageSync('id'),
                        questionID: problem[i],
                        answer: answer[i].ans,
                        type: 0
                      }
                    })
                  } else {
                    db.collection('mistake').add({
                      data: {
                        studentID: wx.getStorageSync('id'),
                        questionID: problem[i],
                        answer: answer[i].ans,
                        type: 2
                      }
                    })
                  }
                }
              }
            })
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updateresult',
              // 传给云函数的参数
              data: {
                homeworkid: homeworkid,
                studentid: studentid,
                answer: answer.split('\n').join('&hc'),
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
      }
    })
  },

  save: function () {
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
      answer[this.data.index].result = "";
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
      wx.showToast({
        title: '保存成功！',
        icon: 'none',
        duration: 1500
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