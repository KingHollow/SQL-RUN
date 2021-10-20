// pages/b_respond/b_respond.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionid: '',
    content: "",
    state: '', //challenge
    flag: 0,
    nbanswer: [],
    answer: []
  },

  answerInput: function (e) {
    var idx = e.currentTarget.dataset.index; //当前下标
    console.log(idx)
    var val = e.detail.value; //当前输入的值
    console.log(val)
    var _list = this.data.answer; //data中存放的数据
    _list[idx] = val
    // for (let i = 0; i < _list.length; i++) {
    //   if (idx == i) {
    //     _list[i] = { val } //将当前输入的值放到数组中对应的位置
    //   }
    // }
    this.setData({
      answer: _list
    })
    console.log(this.data.answer)
  },

  submit: function () {
    var that = this
    wx.showModal({
      content: '是否确认提交？',
      success: function (res) {
        if (res.confirm) {
          var flag = false
          for (var index in that.data.answer) {
            if (that.data.answer[index] != '') {
              flag = true
            }
          }
          if (flag) {
            console.log(that.data.answer)
            console.log(that.data.nbanswer)
            var correct;
            for (var i = 0; i < that.data.answer.length; i++) {

              for (var j = 0; j < that.data.nbanswer[i].length; j++) {
                if (that.data.answer[i] != that.data.nbanswer[i][j]) {
                  correct = false;
                  continue;
                } else {
                  correct = true;
                  break;
                }
              }

              if (!correct) break;

            }
            if (correct) {
              //进行积分更新
              db.collection("challenge").where({
                questionID: that.data.questionid
              }).get().then(res => {
                db.collection('student').where({
                  studentID: res.data[0].challengedID
                }).get().then(r => {
                  wx.cloud.callFunction({
                    // 云函数名称
                    name: 'updatestudent',
                    // 传给云函数的参数
                    data: {
                      studentID: r.data[0].studentID,
                      experience: r.data[0].experience + 2,
                      point: r.data[0].point + 2,
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
                })
              })
            }
            if (!correct) {
              //挑战发起方进行积分更新
              db.collection("challenge").where({
                questionID: that.data.questionid
              }).get().then(res => {
                db.collection('student').where({
                  studentID: res.data[0].challengerID
                }).get().then(r => {
                  wx.cloud.callFunction({
                    // 云函数名称
                    name: 'updatestudent',
                    // 传给云函数的参数
                    data: {
                      studentID: r.data[0].studentID,
                      experience: r.data[0].experience + 1,
                      point: r.data[0].point + 1,
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
                })
              })
              //存错题
              db.collection('mistake').add({
                data: {
                  answer: that.data.answer,
                  questionID: that.data.questionid,
                  studentID: wx.getStorageSync('id'),
                  type: 1
                },
                success: res => {
                  // 在返回结果中会包含新创建的记录的 _id

                  console.log('[数据库] [新增记录] 成功')
                },
                fail: err => {

                  console.error('[数据库] [新增记录] 失败：', err)
                }

              })
              wx.showToast({
                title: '答案错误',
                icon: 'error',
                duration: 1500
              })

            } else {
              wx.showToast({
                title: '答案正确',
                icon: 'success',
                duration: 1500
              })
            }
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updatechallenge',
              // 传给云函数的参数
              data: {
                questionid: that.data.questionid,
                state: 2
              },
            })

            const pages = getCurrentPages(); //获取页面栈堆
            const prev = pages[pages.length - 2]; //-2即为父级页面，想跳两层的话就-3
            let ads = prev.data.list
            for (var i = 0; i < ads.length; i++) {
              if (ads[i].questionID == that.data.questionid) {
                ads[i].state = 2;
                prev.setData({ //用setData()的特性给父级页面赋值并重新渲染
                  list: ads
                })
              }
            }

            that.setData({
              flag: 1
            })

          } else {
            wx.showToast({
              title: '还未作答,无法提交！',
              icon: 'none',
              duration: 1500
            })
          }
        } else if (res.cancel) {}
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < this.data.nbanswer.length; i++) {
      this.data.answer.push("")
    }
    var quesid = options.id;

    db.collection("blank").where({
      blankID: quesid,
      type: 1
    }).get().then(res => {
      console.log(res.data)

      this.setData({
        questionid: quesid,
        content: res.data[0].content,
        nbanswer: res.data[0].answer,
      })
    })
    console.log(this.data)
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