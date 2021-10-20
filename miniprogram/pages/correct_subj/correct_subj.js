// pages/correct_subj/correct_subj.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    name: '',
    answer: [],
    answers: {
      ans: '',
      result: ''
    },
    oldresult: '',
    studentIndex: 0,
    problemIndex: 0,
    studentID: '',
    homeworkID: '',
    number: 0,
    type: 0,
    state: 0,
    time: '',
    score: '',
    picurl: "",
    flag: 0
  },

  resultInput: function (e) {
    var name = 'answers.result'
    this.setData({
      [name]: e.detail.value
    })
  },

  submit: function () {
    var that = this
    if (this.data.answers.result == '') {
      wx.showToast({
        title: '您尚未打分！',
        icon: 'none',
        duration: 1500
      })
    } else {
      if (this.data.oldresult == this.data.answers.result) {} else {
        var pages = getCurrentPages();
        var lastpage = pages[pages.length - 2]
        var name1 = 'result[' + this.data.problemIndex + '][' + this.data.studentIndex + ']'
        var name2 = 'score[' + this.data.studentIndex + ']'
        var name3 = 'answer[' + this.data.problemIndex + ']'
        console.log(lastpage.data.result)
        if (this.data.oldresult == '') {
          lastpage.setData({
            [name1]: that.data.answers.result,
            [name2]: lastpage.data.score[that.data.studentIndex] + parseInt(that.data.answers.result)
          })
        } else {
          lastpage.setData({
            [name1]: that.data.answers.result,
            [name2]: lastpage.data.score[that.data.studentIndex] + parseInt(that.data.answers.result) - parseInt(that.data.oldresult)
          })
        }
        console.log(that.data.answer)
        this.setData({
          [name3]: that.data.answers
        })

        //更新平均分
        var result = lastpage.data.result[this.data.problemIndex]
        var sum = 0
        var score = 0
        var avg = 0
        var average = 0
        for (var i in result) {
          if (result[i] != '-' && result[i] != "") {
            score = score + result[i]
            sum++
          }
        }
        if (score == 0) {
          avg = 0
        } else {
          avg = score / sum
        }
        avg = avg.toFixed(0)
        average = String(avg)
        console.log(average)
        var name1 = 'acc[' + this.data.problemIndex + ']'
        var name2 = 'problem' + this.data.number + '.acc'
        lastpage.setData({
          [name1]: average,
          [name2]: average
        })
        console.log(that.data.score)
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updateresult',
          // 传给云函数的参数
          data: {
            homeworkid: that.data.homeworkID,
            studentid: that.data.studentID,
            answer: that.data.answer,
            state: that.data.state,
            time: that.data.time,
            score: that.data.score
          },
        })
        //如果是难题，则直接更新分数
        if (this.data.type == 2) {
          //修改result的state
          db.collection('result').where({
              studentID: this.data.studentID,
              homeworkID: this.data.homeworkID
            })
            .get().then(res => {
              if (res.data.length != 0) {
                wx.cloud.callFunction({
                  // 云函数名称
                  name: 'updateresult',
                  // 传给云函数的参数
                  data: {
                    homeworkid: that.data.homeworkID,
                    studentid: res.data[0].studentID,
                    answer: that.data.answer,
                    state: 3,
                    time: res.data[0].time,
                    score: String(that.data.answers.result)
                  },
                })
                //修改学生每周积分和总积分
                db.collection('student').where({
                  studentID: res.data[0].studentID
                }).get().then(r => {
                  if (that.data.oldresult == '') {
                    wx.cloud.callFunction({
                      // 云函数名称
                      name: 'updatestudent',
                      // 传给云函数的参数
                      data: {
                        studentID: r.data[0].studentID,
                        experience: r.data[0].experience + parseInt(that.data.answers.result),
                        point: r.data[0].point + parseInt(that.data.answers.result),
                        challenge: r.data[0].challenge,
                        answer: r.data[0].answer,
                        random: r.data[0].random,
                        race: r.data[0].race,
                        rockets: r.data[0].rockets,
                        peals: r.data[0].peals,
                        cards: r.data[0].cards,
                        coin: r.data[0].coin
                      },
                    })
                  } else {
                    wx.cloud.callFunction({
                      // 云函数名称
                      name: 'updatestudent',
                      // 传给云函数的参数
                      data: {
                        studentID: r.data[0].studentID,
                        experience: r.data[0].experience - parseInt(that.data.oldresult) + parseInt(that.data.answers.result),
                        point: r.data[0].point - parseInt(that.data.oldresult) + parseInt(that.data.answers.result),
                        challenge: r.data[0].challenge,
                        answer: r.data[0].answer,
                        random: r.data[0].random,
                        race: r.data[0].race,
                        rockets: r.data[0].rockets,
                        peals: r.data[0].peals,
                        cards: r.data[0].cards,
                        coin: r.data[0].coin
                      },
                    })
                  }
                })
              }
              wx.showToast({
                title: '成绩已发布！',
                icon: 'none',
                duration: 1500
              })
            })
        }
      }
      wx.navigateBack({
        delta: 0,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      studentIndex: options.studentIndex,
      problemIndex: options.problemIndex,
      studentID: options.studentID,
      homeworkID: options.homeworkID,
      number: options.problemNumber,
      type: options.type
    })
    var that = this
    console.log(options.problemID, options.type)
    db.collection('subjective').where({
        subID: options.problemID,
        type: parseInt(options.type)
      })
      .get().then(res => {
        console.log(res.data)
        that.setData({
          content: res.data[0].content.split('&hc').join('\n'),
          picurl: res.data[0].picurl
        })
        if(res.data[0].picurl != "" && res.data[0].picurl != undefined){
          that.setData({
            flag: 1
          })
        }
      })
    var name = 'answers.ans'
    db.collection('result').where({
        studentID: options.studentID,
        homeworkID: options.homeworkID
      })
      .get().then(res => {
        console.log(res.data)
        //if (res.data[0].answer[options.problemIndex].result)
        that.setData({
          [name]: res.data[0].answer[options.problemIndex].ans.split('&hc').join('\n'),
          oldresult: res.data[0].answer[options.problemIndex].result,
          answer: res.data[0].answer,
          state: res.data[0].state,
          time: res.data[0].time,
          score: res.data[0].score
        })
      })
    db.collection('student').where({
        studentID: options.studentID,
      })
      .get().then(res => {
        that.setData({
          name: res.data[0].name,
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