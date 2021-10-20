// pages/j_homework/j_homework.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionid: '',
    content: "",
    items: [{
        value: '正确'
      },
      {
        value: '错误'
      },
    ],
    answer: '',
    nbanswer: '',
    state: '', //challenge
    flag: 0
  },

  radioChange: function (e) {
    this.setData({
      answer: e.detail.value
    })
    console.log(this.data.answer)
  },


  submit: function () {
    var that = this
    wx.showModal({
      content: '是否确认提交？',
      success: function (res) {
        if (res.confirm) {
          if (that.data.answer != '') {
            //判断对错
            console.log(that.data.answer)
            console.log(that.data.nbanswer)
            var correct = false;
            if (that.data.answer == that.data.nbanswer) {
              correct = true;
              //根据积分上限进行积分更新
              var id = wx.getStorageSync('id')
              db.collection("student").where({
                studentID: id
              }).get().then(res => {
                if (res.data[0].random == 4) {
                  wx.showToast({
                    title: '本周该项积分已满',
                    icon: 'none',
                    duration: 1500
                  })
                } else {
                  wx.cloud.callFunction({
                    // 云函数名称
                    name: 'updatestudent',
                    // 传给云函数的参数
                    data: {
                      studentID: res.data[0].studentID,
                      experience: res.data[0].experience + 0.5,
                      point: res.data[0].point + 0.5,
                      challenge: res.data[0].challenge,
                      answer: res.data[0].answer,
                      random: res.data[0].random + 0.5,
                      race: res.data[0].race,
                      rockets: res.data[0].rockets,
                      peals: res.data[0].peals,
                      cards: res.data[0].cards,
                      coin: res.data[0].coin + 1
                    },
                  })
                }
              })
            }

            if (!correct) {
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

  finish: function () {
    wx.redirectTo({
      url: '/pages/rank/rank',
    })
  },

  again: function () {
    wx.navigateBack({ //返回上一页面或多级页面

      delta: 1
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var quesid = options.id;

    db.collection("judgement").where({
      judgeID: quesid,
      type: 0
    }).get().then(res => {
      console.log(res.data)

      this.setData({
        questionid: quesid,
        content: res.data[0].content,
        nbanswer: res.data[0].answer,
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