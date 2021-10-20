// pages/run_racet/run_racet.js
const db = wx.cloud.database();
const _ = db.command

function countdown(that) {
  var time = that.data.time
  if (time <= 0) {
    that.setData({
      flag: false
    })
    wx.showToast({
      title: '罚时结束！',
      duration: 1500
    })
    return
  }
  setTimeout(function () {
    if(that.data.time > 0){
      that.setData({
        time: time - 1
      });
      console.log(that.data.time)
      countdown(that);
    }
  }, 1000)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countP: 0,
    countR: 0,
    problemID: '',
    rivalID: '',
    time: 0, //罚时倒计时
    flag: false, //罚时标志
    //道具清单
    pass: 0,
    peal: 0,
    rocket: 0,
    locked: 0, //被使用香蕉皮标志
    _id: '',   //当前sqlrun数据id
    state: 0,  //刚刚答题的情况，1正确，2错误，3正确但用了香蕉皮
  },

  /*level: function (e) {
    if (this.data.flag) {} else {
      var that = this
      var level = e.currentTarget.dataset.level
      //题号数组
      var num = ['s', 'm', 'j']
      //随机题型
      var t = Math.floor(Math.random() * 3)
      //随机章节
      var p = 0 //章节进度
      db.collection('student').where({
        studentID: wx.getStorageSync('id')
      }).get().then(res => {
        db.collection('class').where({
          classID: res.data[0].classID
        }).get().then(r => {
          p = r.data[0].progress
          console.log(p)
          var c = Math.floor(Math.random() * p) + 1
          //随机题目
          var n = 0
          console.log(level, c, t)
          //单选
          if (t == 0) {
            var problem = []
            db.collection('sinChoice').where({
              level: level,
              chapter: c
            }).count().then(async res => {
              if (res.total == 0) {
                that.setData({
                  problemID: ''
                })
              } else {
                let total = res.total;
                // 计算需分几次取
                const batchTimes = Math.ceil(total / 20)
                // 循环读取数据库
                for (let i = 0; i < batchTimes; i++) {
                  await db.collection('sinChoice').where({
                    level: level,
                    chapter: c
                  }).skip(i * 20).limit(20).get().then(async res => {
                    problem = problem.concat(res.data)
                  })
                }
                n = Math.floor(Math.random() * total)
                console.log(n, problem)
                that.setData({
                  problemID: problem[n].sinID
                })
              }
              if (that.data.problemID == '') {
                wx.showToast({
                  title: '暂无题目！',
                  icon: 'none',
                  duration: 1500
                })
              } else {
                wx.navigateTo({
                  url: '../../pages/s_run/s_run?problemID=' + that.data.problemID + '&level=' + level
                })
              }
            })
          }
          //多选
          if (t == 1) {
            var problem = []
            db.collection('mulChoice').where({
              level: level,
              chapter: c
            }).count().then(async res => {
              if (res.total == 0) {
                that.setData({
                  problemID: ''
                })
              } else {
                let total = res.total
                // 计算需分几次取
                const batchTimes = Math.ceil(total / 20)
                // 循环读取数据库
                for (let i = 0; i < batchTimes; i++) {
                  await db.collection('mulChoice').where({
                    level: level,
                    chapter: c
                  }).skip(i * 20).limit(20).get().then(async res => {
                    problem = problem.concat(res.data)
                  })
                }
                n = Math.floor(Math.random() * total)
                console.log(n, problem)
                that.setData({
                  problemID: problem[n].mulID
                })
              }
              if (that.data.problemID == '') {
                wx.showToast({
                  title: '暂无题目！',
                  icon: 'none',
                  duration: 1500
                })
              } else {
                wx.navigateTo({
                  url: '../../pages/m_run/m_run?problemID=' + that.data.problemID + '&level=' + level
                })
              }
            })
          }
          //判断
          if (t == 2) {
            var problem = []
            db.collection('judgement').where({
              level: level,
              chapter: c
            }).count().then(async res => {
              if (res.total == 0) {
                that.setData({
                  problemID: ''
                })
              } else {
                let total = res.total;
                // 计算需分几次取
                const batchTimes = Math.ceil(total / 20)
                // 循环读取数据库
                for (let i = 0; i < batchTimes; i++) {
                  await db.collection('judgement').where({
                    level: level,
                    chapter: c
                  }).skip(i * 20).limit(20).get().then(async res => {
                    problem = problem.concat(res.data)
                  })
                }
                n = Math.floor(Math.random() * total)
                console.log(n, problem)
                that.setData({
                  problemID: problem[n].judgeID
                })
              }
              if (that.data.problemID == '') {
                wx.showToast({
                  title: '暂无题目！',
                  icon: 'none',
                  duration: 1500
                })
              } else {
                wx.navigateTo({
                  url: '../../pages/j_run/j_run?problemID=' + that.data.problemID + '&level=' + level
                })
              }
            })
          }
        })
      })
    }
  },*/

  level: function (e) {
    if (this.data.flag) {} else {
      var that = this
      var level = e.currentTarget.dataset.level
      db.collection('student').where({
        studentID: wx.getStorageSync('id')
      }).get().then( res => {
        db.collection('class').where({
          classID: res.data[0].classID
        }).get().then( r => {
          var p = parseInt(r.data[0].progress)
          var problem = []
          var problemID = []
          var num1 = 0
          var num2 = 0
          db.collection('sinChoice').where({
            level: level,
            chapter: _.lte(p)
          }).count().then(async res => {
            let total = res.total;
            num1 = res.total
            if (res.total == 0) {} else {
              // 计算需分几次取
              const batchTimes = Math.ceil(total / 20)
              // 循环读取数据库
              for (let i = 0; i < batchTimes; i++) {
                await db.collection('sinChoice').where({
                  level: level,
                  chapter: _.lte(p)
                }).skip(i * 20).limit(20).get().then(async res => {
                  problem = problem.concat(res.data)
                })
              }
              for(let i = 0; i < problem.length; i++){
                problemID.push(problem[i].sinID)
              }
              console.log(problemID)
            }
            db.collection('mulChoice').where({
              level: level,
              chapter: _.lte(p)
            }).count().then(async res => {
              let total = res.total;
              num2 = num1 + res.total
              if (res.total == 0) {
              } else {
                // 计算需分几次取
                const batchTimes = Math.ceil(total / 20)
                // 循环读取数据库
                for (let i = 0; i < batchTimes; i++) {
                  await db.collection('mulChoice').where({
                    level: level,
                    chapter: _.lte(p)
                  }).skip(i * 20).limit(20).get().then(async res => {
                    problem = problem.concat(res.data)
                  })
                }
                for(let i = num1; i < problem.length; i++){
                  problemID.push(problem[i].mulID)
                }
                console.log(problemID)
              }
              db.collection('judgement').where({
                level: level,
                chapter: _.lte(p)
              }).count().then(async res => {
                if (res.total == 0) {} else {
                  let total = res.total;
                  // 计算需分几次取
                  const batchTimes = Math.ceil(total / 20)
                  // 循环读取数据库
                  for (let i = 0; i < batchTimes; i++) {
                    await db.collection('judgement').where({
                      level: level,
                      chapter: _.lte(p)
                    }).skip(i * 20).limit(20).get().then(async res => {
                      problem = problem.concat(res.data)
                    })
                  }
                  for(let i = num2; i < problem.length; i++){
                    problemID.push(problem[i].judgeID)
                  }
                }
                console.log(problem)
                console.log(problemID)
                var n = Math.floor(Math.random() * problemID.length)
                var problemid = problemID[n]
                if(problemid[0] == 's'){
                  wx.navigateTo({
                    url: '../../pages/s_run/s_run?problemID=' + problemid + '&level=' + level + '&_id=' + that.data._id
                  })
                }
                if(problemid[0] == 'm'){
                  wx.navigateTo({
                    url: '../../pages/m_run/m_run?problemID=' + problemid + '&level=' + level + '&_id=' + that.data._id
                  })
                }
                if(problemid[0] == 'j'){
                  wx.navigateTo({
                    url: '../../pages/j_run/j_run?problemID=' + problemid + '&level=' + level + '&_id=' + that.data._id
                  })
                }
              })
            })
          })
        })
      })
    }
  },

  usepass: function () {
    if(this.data.flag){
      if (this.data.pass > 0) {
        var that = this
        this.setData({
          pass: that.data.pass - 1,
          time: 0,
          flag: false
        })
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updatestudent',
          // 传给云函数的参数
          data: {
            studentID: wx.getStorageSync('id'),
            cards: that.data.pass,
          },
        })
      } else {
        wx.showToast({
          title: '道具已用完！',
          icon: 'none',
          duration: 1500
        })
      }
    }else{
      wx.showToast({
        title: '当前不可使用！',
        icon: 'none',
        duration: 1500
      })
    }
  },

  usepeal: function () {
    if (this.data.flag) {} else {
      if (this.data.peal > 0) {
        var that = this
        this.setData({
          peal: that.data.peal - 1
        })
        db.collection('sqlrun').add({
          data: {
            ID: wx.getStorageSync('id'),
            move: 6
          },
        })
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updatestudent',
          // 传给云函数的参数
          data: {
            studentID: wx.getStorageSync('id'),
            peals: that.data.peal,
          },
        })
      } else {
        wx.showToast({
          title: '道具已用完！',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },

  userocket: function () {
    if (this.data.flag) {} else {
      if (this.data.rocket > 0) {
        var that = this
        this.setData({
          rocket: that.data.rocket - 1
        })
        db.collection('sqlrun').add({
          data: {
            ID: wx.getStorageSync('id'),
            move: 7
          },
        })
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updatestudent',
          // 传给云函数的参数
          data: {
            studentID: wx.getStorageSync('id'),
            rockets: that.data.rocket,
          },
        })
        if (that.data.countP + 2 < 10) {
          this.setData({
            countP: that.data.countP + 2
          })
        } else {
          this.setData({
            countP: 10
          })
          var result = 'win'
          wx.redirectTo({
            url: '../../pages/run_result/run_result?result=' + result
          })
        }
      } else {
        wx.showToast({
          title: '道具已用完！',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      rivalID: options.rivalID
    })
    db.collection('student').where({
      studentID: wx.getStorageSync('id')
    }).get().then(res => {
      that.setData({
        pass: res.data[0].cards,
        peal: res.data[0].peals,
        rocket: res.data[0].rockets
      })
    })
    db.collection('sqlrun').add({
      data: {
        ID: wx.getStorageSync('id'),
        move: 0
      },
      success(res){
        that.setData({
          _id: res._id
        })
      }
    })
    this.watcher = db.collection('sqlrun').where({
      ID: that.data.rivalID
    }).watch({
      onChange: snapshot => {
        console.log('docs\'s changed events', snapshot.docChanges)
        if(snapshot.docChanges[0].dataType == "add"){
          //五种难度
        if (snapshot.docChanges[0].doc.move <= 5) {
          if (that.data.countR + snapshot.docChanges[0].doc.move >= 10) {
            that.setData({
              countR: 10
            })
            var result = 'lose'
            wx.redirectTo({
              url: '../../pages/run_result/run_result?result=' + result
            })
          } else {
            that.setData({
              countR: that.data.countR + snapshot.docChanges[0].doc.move
            })
          }
        }
        //香蕉皮
        if (snapshot.docChanges[0].doc.move == 6) {
          that.setData({
            locked: that.data.locked + 1
          })
          wx.showToast({
            title: '你被扔了香蕉皮',
            icon: 'none',
            duration: 1500
          })
        }
        //喷气火箭
        if (snapshot.docChanges[0].doc.move == 7) {
          if (that.data.countR + 2 >= 10) {
            that.setData({
              countR: 10
            })
            var result = 'lose'
            wx.redirectTo({
              url: '../../pages/run_result/run_result?result=' + result
            })
          } else {
            that.setData({
              countR: that.data.countR + 2
            })
          }
        }
        }
      },
      onError: err => {
        console.error('the watch closed because of error', err)
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
    //如果time为5，开始罚时
    if (this.data.time == 5) {
      countdown(this)
    }
    //如果答题回来，步数>10，直接胜利
    if (this.data.countP >= 10) {
      var result = 'win'
      wx.redirectTo({
        url: '../../pages/run_result/run_result?result=' + result
      })
    }
    //判断答题状态决定弹窗内容
    if(this.data.state == 1){
      wx.showToast({
        title: '回答正确！',
        icon: 'none',
        duration: 1500
      })
    }
    if(this.data.state == 2){
      wx.showToast({
        title: '回答错误！',
        icon: 'none',
        duration: 1500
      })
    }
    if(this.data.state == 3){
      wx.showToast({
        title: '香蕉皮生效！',
        icon: 'none',
        duration: 1500
      })
    }
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
    this.watcher.close();
    db.collection('invite').where({
      playerA: wx.getStorageSync('id'),
      state: 1
    }).get().then(res => {
      if (res.data.length != 0) {
        wx.cloud.callFunction({
          name: "saveresult", //云函数名，修改邀请状态
          data: {
            _id: res.data[0]._id,
            state: 3,
          }
        })
      }
    })
    db.collection('invite').where({
      playerB: wx.getStorageSync('id'),
      state: 1
    }).get().then(res => {
      if (res.data.length != 0) {
        wx.cloud.callFunction({
          name: "saveresult", //云函数名，修改邀请状态
          data: {
            _id: res.data[0]._id,
            state: 3,
          }
        })
      }
    })
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