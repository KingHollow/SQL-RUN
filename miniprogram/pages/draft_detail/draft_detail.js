// pages/draft_detail/draft_detail.js
const db = wx.cloud.database();
var dateTimePicker = require('../../utils/dateTimePicker.js');

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
    name: "",
    list: [],
    sinChoice: [],
    mulChoice: [],
    judgement: [],
    blank: [],
    subjective: [],
    choosed: [],
    homeworkid: "",
    title: "",
    deadline: "",
    dateTime1: null, //开始时间value
    dateTimeArray1: null, //开始时间数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      homeworkid: options.homeworkid
    });
    var homeworkid = options.homeworkid;
    db.collection("homework").where({
      homeworkID: homeworkid
    }).get().then(res => {
      that.setData({
        name: res.data[0].name
      });
      for (var i = 0; i < res.data[0].problem.length; i++) {
        if (res.data[0].problem[i].substring(0, 1) == "s") {
          db.collection("sinChoice").where({
            sinID: res.data[0].problem[i]
          }).get().then(rm => {
            var temp = that.data.sinChoice;
            temp.push(rm.data[0].content);
            that.setData({
              sinChoice: temp
            });
          })
        }
        if (res.data[0].problem[i].substring(0, 1) == "m") {
          db.collection("mulChoice").where({
            mulID: res.data[0].problem[i]
          }).get().then(rm => {
            var temp = that.data.mulChoice;
            temp.push(rm.data[0].content);
            that.setData({
              mulChoice: temp
            });
          })
        }
        if (res.data[0].problem[i].substring(0, 1) == "j") {
          db.collection("judgement").where({
            judgeID: res.data[0].problem[i]
          }).get().then(rm => {
            var temp = that.data.judgement;
            temp.push(rm.data[0].content);
            that.setData({
              judgement: temp
            });
          })
        }
        if (res.data[0].problem[i].substring(0, 1) == "b") {
          db.collection("blank").where({
            blankID: res.data[0].problem[i]
          }).get().then(rm => {
            var temp = that.data.blank;
            temp.push(rm.data[0].content);
            that.setData({
              blank: temp
            });
          })
        }
        if (res.data[0].problem[i].substring(0, 1) == "o") {
          db.collection("subjective").where({
            subID: res.data[0].problem[i]
          }).get().then(rm => {
            var temp = that.data.subjective;
            temp.push(rm.data[0].content);
            that.setData({
              subjective: temp
            });
          })
        }
      }
    })
    var id = wx.getStorageSync('id');
    db.collection("teacher").where({
      teacherID: id
    }).get().then(r => {
      if (r.data.length != 0) {
        db.collection("class").where({
          teacherID: id
        }).get().then(re => {
          var temp1 = [];
          for (var i = 0; i < re.data.length; i++) {
            var data = {
              name: re.data[i].name,
              id: re.data[i].classID
            }
            temp1.push(data);
          }
          that.setData({
            list: temp1
          });
        })
      } else {
        db.collection("assist").where({
          tutorialID: id
        }).get().then(re => {
          var temp1 = [];
          for (var i = 0; i < re.data.length; i++) {
            db.collection("class").where({
              classID: re.data[i].classID
            }).get().then(resource => {
              var data = {
                name: resource.data[0].name,
                id: resource.data[0].classID
              }
              temp1.push(data);
              that.setData({
                list: temp1
              });
            })
          }
        })
      }
    })
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
    });
  },

  /***开始时间改变时出发*/
  changeStartDateTime(e) {
    let arr = e.detail.value
    let dateArr = this.data.dateTimeArray1;
    this.setData({
      deadline: dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
    });
  },
  /**某一列的值改变时触发*/
  changeDateTimeColumn1(e) {
    let arr = this.data.dateTime1
    let dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    this.setData({
      deadline: dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
    });
  },


  HandelItemChange: function (e) {
    this.setData({
      choosed: e.detail.value
    });
  },

  title: function (e) {
    this.setData({
      title: e.detail.value
    });
  },

  release: function (e) {
    var date = formatTime(new Date());
    var that = this;
    if (that.data.choosed.length == 0) {
      wx.showModal({
        titel: "提示",
        content: "请至少选择一个班级发布",
        duration: 3000,
        success(re) {}
      });
    } else if (that.data.title == "") {
      wx.showModal({
        titel: "提示",
        content: "请输入作业发布的题目",
        duration: 3000,
        success(re) {}
      });
    } else if (that.data.deadline == "") {
      wx.showModal({
        titel: "提示",
        content: "请输入作业截止的时间",
        duration: 3000,
        success(re) {}
      });
    } else {
      var flag = 0;
      var count = 0;
      for (var i = 0; i < that.data.choosed.length; i++) {
        db.collection("release").where({
          homeworkID: that.data.homeworkid,
          classID: that.data.choosed[i]
        }).get().then(res => {
          count++;
          if (res.data.length != 0) flag = 1;
          if (count == that.data.choosed.length) {
            if (flag == 1) {
              wx.showModal({
                titel: "提示",
                content: "已经有班级发过该作业",
                duration: 3000,
                success(re) {}
              });
            } else {
              for (var j = 0; j < that.data.choosed.length; j++) {
                db.collection("release").add({
                  data: {
                    classID: that.data.choosed[j],
                    homeworkID: that.data.homeworkid,
                    title: that.data.title,
                    date: date,
                    deadline: that.data.deadline + ":00",
                    type: 0
                  }
                })
              }
              wx.showToast({
                title: '发布成功',
              })
              wx.redirectTo({
                url: '../task/task',
              })
            }
          }
        })
      }
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