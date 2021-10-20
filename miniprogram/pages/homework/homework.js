// pages/homework/homework.js
const db = wx.cloud.database();
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
    //state默认为0
    release: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    var that = this;
    db.collection("student").where({
      studentID: id
    }).get().then(r => {
      var classid = r.data[0].classID;
      db.collection("release").where({
        classID: classid
      }).orderBy("date", "desc").get().then(res => {
        var temp = [];
        for (var i = 0; i < res.data.length; i++) {

          var nowtime = formatTime(new Date());
          if (res.data[i].type == 1) {
            var data = {
              homeworkid: res.data[i].homeworkID,
              title: res.data[i].title,
              state: 0,
              score: "",
              deadline: res.data[i].deadline
            }
            temp.push(data);
            that.setData({
              release: temp
            })
          } else {
            if (nowtime < res.data[i].deadline) {
              var data = {
                homeworkid: res.data[i].homeworkID,
                title: res.data[i].title,
                state: 0,
                score: "",
                deadline: res.data[i].deadline
              }
              temp.push(data);
              that.setData({
                release: temp
              })
            } else {
              var data = {
                homeworkid: res.data[i].homeworkID,
                title: res.data[i].title,
                state: 1,
                score: "",
                deadline: res.data[i].deadline
              }
              temp.push(data);
              that.setData({
                release: temp
              })
            }
          }
        }
        //   db.collection("result").where({
        //     homeworkID: res.data[i].homeworkID,
        //     studentID: id
        //   }).get().then(rm => {
        //     count++;
        //     if (res.data[count].type == 0) {
        //       if (rm.data.length == 0) {
        //         var nowtime = formatTime(new Date());
        //         if (nowtime < res.data[count].deadline) {
        //           // var data = {
        //           //   homeworkid: res.data[count].homeworkID,
        //           //   title: res.data[count].title,
        //           //   state: 0,
        //           //   score: "",
        //           //   deadline: res.data[count].deadline
        //           // }
        //           // temp.push(data);
        //           temp[count].state = 0;
        //           temp[count].score = "";
        //           that.setData({
        //             release: temp
        //           });
        //         } else {
        //           // var data = {
        //           //   homeworkid: res.data[count].homeworkID,
        //           //   title: res.data[count].title,
        //           //   state: 1,
        //           //   score: "",
        //           //   deadline: res.data[count].deadline
        //           // }
        //           // temp.push(data);
        //           temp[count].state = 1;
        //           temp[count].score = "";
        //           that.setData({
        //             release: temp
        //           });
        //         }
        //       } else {
        //         var nowtime = formatTime(new Date());
        //         if (rm.data[0].state == 0 && nowtime >= res.data[count].deadline && res.data[count].type == 0) {
        //           wx.cloud.callFunction({
        //             // 云函数名称
        //             name: 'updateresult',
        //             // 传给云函数的参数
        //             data: {
        //               homeworkID: res.data[count].homeworkID,
        //               studentID: wx.getStorageSync('id'),
        //               answer: rm.data[0].answer,
        //               state: 1,
        //               time: "",
        //               score: ""
        //             },
        //           })
        //           // var data = {
        //           //   homeworkid: res.data[count].homeworkID,
        //           //   title: res.data[count].title,
        //           //   state: 1,
        //           //   score: rm.data[0].score,
        //           //   deadline: res.data[count].deadline
        //           // }
        //           temp[count].state = 1;
        //           temp[count].score = "";
        //           // temp.push(data);
        //           that.setData({
        //             release: temp
        //           });
        //         } else {
        //           // var data = {
        //           //   homeworkid: res.data[count].homeworkID,
        //           //   title: res.data[count].title,
        //           //   state: rm.data[0].state,
        //           //   score: rm.data[0].score,
        //           //   deadline: res.data[count].deadline
        //           // }
        //           // temp.push(data);
        //           temp[count].state = rm.data[0].state;
        //           temp[count].score = rm.data[0].score;
        //           that.setData({
        //             release: temp
        //           });
        //         }
        //       }
        //     } else {
        //       if (rm.data.length == 0) {
        //         // var data = {
        //         //   homeworkid: res.data[count].homeworkID,
        //         //   title: res.data[count].title,
        //         //   state: 0,
        //         //   score: "",
        //         //   deadline: res.data[count].deadline
        //         // }
        //         // temp.push(data);
        //         temp[count].state = 0;
        //         temp[count].score = "";
        //         that.setData({
        //           release: temp
        //         });
        //       } else {
        //         // var data = {
        //         //   homeworkid: res.data[count].homeworkID,
        //         //   title: res.data[count].title,
        //         //   state: rm.data[0].state,
        //         //   score: rm.data[0].score,
        //         //   deadline: res.data[count].deadline
        //         // }
        //         // temp.push(data);
        //         temp[count].state = rm.data[0].state;
        //         temp[count].score = rm.data[0].score;
        //         that.setData({
        //           release: temp
        //         });
        //       }
        //     }
        //   })
        // }

        for (var i = 0; i < res.data.length; i++) {
          db.collection("result").where({
            homeworkID: res.data[i].homeworkID,
            studentID: id
          }).get().then(rm => {
            if (rm.data.length != 0) {
              if (rm.data[0].state == 0) {
                for (var j = 0; j < temp.length; j++) {
                  if (temp[j].homeworkid == rm.data[0].homeworkID && temp[j].state == 1) {
                    wx.cloud.callFunction({
                      // 云函数名称
                      name: 'updateresult',
                      // 传给云函数的参数
                      data: {
                        homeworkID: rm.data[0].homeworkID,
                        studentID: wx.getStorageSync('id'),
                        answer: rm.data[0].answer,
                        state: 1,
                        time: "",
                        score: ""
                      },
                    })
                  }
                }
              } else {
                for (var j = 0; j < temp.length; j++) {
                  if (temp[j].homeworkid == rm.data[0].homeworkID) {
                    temp[j].state = rm.data[0].state;
                    temp[j].score = rm.data[0].score;
                    that.setData({
                      release: temp
                    })
                  }
                }
              }
            }
          })
        }

      })
    })
  },

  DoHomework: function (e) {
    var homeworkid = e.currentTarget.dataset.id;
    var studentid = wx.getStorageSync('id');
    db.collection("homework").where({
      homeworkID: homeworkid
    }).get().then(rm => {
      console.log("s")
      db.collection("result").where({
        homeworkID: homeworkid,
        studentID: studentid
      }).get().then(res => {
        if (res.data.length == 0) {
          var num = rm.data[0].problem.length;
          var temp = [];
          for (var i = 0; i < num; i++) {
            var data = {};
            temp.push(data);
          }
          db.collection("result").add({
            data: {
              studentID: studentid,
              homeworkID: homeworkid,
              answer: temp,
              state: 0,
              time: "",
              score: ""
            }
          })
          if (rm.data[0].problem[0][0] == 's') {
            wx.navigateTo({
              url: '../s_homework/s_homework?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[0][0] == 'm') {
            wx.navigateTo({
              url: '../m_homework/m_homework?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[0][0] == 'j') {
            wx.navigateTo({
              url: '../j_homework/j_homework?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[0][0] == 'b') {
            wx.navigateTo({
              url: '../b_homework/b_homework?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
            })
          }
          if (rm.data[0].problem[0][0] == 'o') {
            wx.navigateTo({
              url: '../o_homework/o_homework?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
            })
          }
        }
      })
      
    })
  },

  HomeworkResult:function(e){
    var homeworkid = e.currentTarget.dataset.id;
    db.collection("homework").where({
      homeworkID: homeworkid
    }).get().then(rm => {
      if (rm.data[0].problem[0][0] == 's') {
        wx.navigateTo({
          url: '../s_answer/s_answer?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
        })
      }
      if (rm.data[0].problem[0][0] == 'm') {
        wx.navigateTo({
          url: '../m_answer/m_answer?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
        })
      }
      if (rm.data[0].problem[0][0] == 'j') {
        wx.navigateTo({
          url: '../j_answer/j_answer?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
        })
      }
      if (rm.data[0].problem[0][0] == 'b') {
        wx.navigateTo({
          url: '../b_answer/b_answer?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
        })
      }
      if (rm.data[0].problem[0][0] == 'o') {
        wx.navigateTo({
          url: '../o_answer/o_answer?quesid=' + rm.data[0].problem[0] + '&homeworkid=' + homeworkid + "&index=0&type=" + rm.data[0].type,
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
    var id = wx.getStorageSync('id');
    var that = this;
    var num = that.data.release.length
    db.collection("student").where({
      studentID: id
    }).get().then(r => {
      var classid = r.data[0].classID;
      db.collection("release").where({
        classID: classid
      }).orderBy("date", "desc").skip(num).get().then(res => {
        var temp = that.data.release;
        for (var i = 0; i < res.data.length; i++) {

          var nowtime = formatTime(new Date());
          if (res.data[i].type == 1) {
            var data = {
              homeworkid: res.data[i].homeworkID,
              title: res.data[i].title,
              state: 0,
              score: "",
              deadline: res.data[i].deadline
            }
            temp.push(data);
            that.setData({
              release: temp
            })
          } else {
            if (nowtime < res.data[i].deadline) {
              var data = {
                homeworkid: res.data[i].homeworkID,
                title: res.data[i].title,
                state: 0,
                score: "",
                deadline: res.data[i].deadline
              }
              temp.push(data);
              that.setData({
                release: temp
              })
            } else {
              var data = {
                homeworkid: res.data[i].homeworkID,
                title: res.data[i].title,
                state: 1,
                score: "",
                deadline: res.data[i].deadline
              }
              temp.push(data);
              that.setData({
                release: temp
              })
            }
          }
        }
        //   db.collection("result").where({
        //     homeworkID: res.data[i].homeworkID,
        //     studentID: id
        //   }).get().then(rm => {
        //     count++;
        //     if (res.data[count].type == 0) {
        //       if (rm.data.length == 0) {
        //         var nowtime = formatTime(new Date());
        //         if (nowtime < res.data[count].deadline) {
        //           // var data = {
        //           //   homeworkid: res.data[count].homeworkID,
        //           //   title: res.data[count].title,
        //           //   state: 0,
        //           //   score: "",
        //           //   deadline: res.data[count].deadline
        //           // }
        //           // temp.push(data);
        //           temp[count].state = 0;
        //           temp[count].score = "";
        //           that.setData({
        //             release: temp
        //           });
        //         } else {
        //           // var data = {
        //           //   homeworkid: res.data[count].homeworkID,
        //           //   title: res.data[count].title,
        //           //   state: 1,
        //           //   score: "",
        //           //   deadline: res.data[count].deadline
        //           // }
        //           // temp.push(data);
        //           temp[count].state = 1;
        //           temp[count].score = "";
        //           that.setData({
        //             release: temp
        //           });
        //         }
        //       } else {
        //         var nowtime = formatTime(new Date());
        //         if (rm.data[0].state == 0 && nowtime >= res.data[count].deadline && res.data[count].type == 0) {
        //           wx.cloud.callFunction({
        //             // 云函数名称
        //             name: 'updateresult',
        //             // 传给云函数的参数
        //             data: {
        //               homeworkID: res.data[count].homeworkID,
        //               studentID: wx.getStorageSync('id'),
        //               answer: rm.data[0].answer,
        //               state: 1,
        //               time: "",
        //               score: ""
        //             },
        //           })
        //           // var data = {
        //           //   homeworkid: res.data[count].homeworkID,
        //           //   title: res.data[count].title,
        //           //   state: 1,
        //           //   score: rm.data[0].score,
        //           //   deadline: res.data[count].deadline
        //           // }
        //           temp[count].state = 1;
        //           temp[count].score = "";
        //           // temp.push(data);
        //           that.setData({
        //             release: temp
        //           });
        //         } else {
        //           // var data = {
        //           //   homeworkid: res.data[count].homeworkID,
        //           //   title: res.data[count].title,
        //           //   state: rm.data[0].state,
        //           //   score: rm.data[0].score,
        //           //   deadline: res.data[count].deadline
        //           // }
        //           // temp.push(data);
        //           temp[count].state = rm.data[0].state;
        //           temp[count].score = rm.data[0].score;
        //           that.setData({
        //             release: temp
        //           });
        //         }
        //       }
        //     } else {
        //       if (rm.data.length == 0) {
        //         // var data = {
        //         //   homeworkid: res.data[count].homeworkID,
        //         //   title: res.data[count].title,
        //         //   state: 0,
        //         //   score: "",
        //         //   deadline: res.data[count].deadline
        //         // }
        //         // temp.push(data);
        //         temp[count].state = 0;
        //         temp[count].score = "";
        //         that.setData({
        //           release: temp
        //         });
        //       } else {
        //         // var data = {
        //         //   homeworkid: res.data[count].homeworkID,
        //         //   title: res.data[count].title,
        //         //   state: rm.data[0].state,
        //         //   score: rm.data[0].score,
        //         //   deadline: res.data[count].deadline
        //         // }
        //         // temp.push(data);
        //         temp[count].state = rm.data[0].state;
        //         temp[count].score = rm.data[0].score;
        //         that.setData({
        //           release: temp
        //         });
        //       }
        //     }
        //   })
        // }

        for (var i = 0; i < res.data.length; i++) {
          db.collection("result").where({
            homeworkID: res.data[i].homeworkID,
            studentID: id
          }).get().then(rm => {
            if (rm.data.length != 0) {
              if (rm.data[0].state == 0) {
                for (var j = 0; j < temp.length; j++) {
                  if (temp[j].homeworkid == rm.data[0].homeworkID && temp[j].state == 1) {
                    wx.cloud.callFunction({
                      // 云函数名称
                      name: 'updateresult',
                      // 传给云函数的参数
                      data: {
                        homeworkID: rm.data[0].homeworkID,
                        studentID: wx.getStorageSync('id'),
                        answer: rm.data[0].answer,
                        state: 1,
                        time: "",
                        score: ""
                      },
                    })
                  }
                }
              } else {
                for (var j = 0; j < temp.length; j++) {
                  if (temp[j].homeworkid == rm.data[0].homeworkID) {
                    temp[j].state = rm.data[0].state;
                    temp[j].score = rm.data[0].score;
                    that.setData({
                      release: temp
                    })
                  }
                }
              }
            }
          })
        }

      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})