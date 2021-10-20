// pages/correct/correct.js
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

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //班级列表
    selectArray1: [],
    //作业列表，text为release title，id为homeworkID
    selectArray2: [],
    //当前class
    classID: '',
    //当前homework
    homeworkID: '',
    //当前homework的类型
    type: 0,
    ddl: '',  //当前作业（release）是否已经过期（0：否；1：是）
    //当前release是否已经发布成绩（0：否；1：是; 2: 难题）
    correct: 0,
    //题目栏属性
    problem1: {
      value: '',
      index: -1,
      acc: ''
    },
    problem2: {
      value: '',
      index: -1,
      acc: ''
    },
    problem3: {
      value: '',
      index: -1,
      acc: ''
    },
    //学生答题结果
    result: [
      []
    ],
    //所有题目编号
    problem_id: [],
    //所有题目名称
    problem: [],
    //所有题目准确度
    acc: [],
    //所有题目对应难度
    difficulty: [],
    //所有学生姓名,name,state（0完成，1待做或超时）,id
    student: [],
    //总分
    score: []
  },

  left: function () {
    if (this.data.problem1.index == 0) {} else {
      this.setData({
        problem1: {
          value: this.data.problem[this.data.problem1.index - 3],
          index: this.data.problem1.index - 3,
          acc: this.data.acc[this.data.problem1.index - 3]
        },
        problem2: {
          value: this.data.problem[this.data.problem2.index - 3],
          index: this.data.problem2.index - 3,
          acc: this.data.acc[this.data.problem2.index - 3]
        },
        problem3: {
          value: this.data.problem[this.data.problem3.index - 3],
          index: this.data.problem3.index - 3,
          acc: this.data.acc[this.data.problem3.index - 3]
        }
      })
    }
  },

  right: function () {
    if (this.data.problem1.index + 3 >= this.data.problem.length) {} else {
      if (this.data.problem1.index + 3 < this.data.problem.length) {
        this.setData({
          problem1: {
            value: this.data.problem[this.data.problem1.index + 3],
            index: this.data.problem1.index + 3,
            acc: this.data.acc[this.data.problem1.index + 3]
          }
        })
      } else {
        this.setData({
          problem1: {
            value: '',
            index: this.data.problem1.index + 3,
            acc: ''
          }
        })
      }
      if (this.data.problem2.index + 3 < this.data.problem.length) {
        this.setData({
          problem2: {
            value: this.data.problem[this.data.problem2.index + 3],
            index: this.data.problem2.index + 3,
            acc: this.data.acc[this.data.problem2.index + 3]
          }
        })
      } else {
        this.setData({
          problem2: {
            value: '',
            index: this.data.problem2.index + 3,
            acc: ''
          }
        })
      }
      if (this.data.problem3.index + 3 < this.data.problem.length) {
        this.setData({
          problem3: {
            value: this.data.problem[this.data.problem3.index + 3],
            index: this.data.problem3.index + 3,
            acc: this.data.acc[this.data.problem3.index + 3]
          }
        })
      } else {
        this.setData({
          problem3: {
            value: '',
            index: this.data.problem3.index + 3,
            acc: ''
          }
        })
      }
    }
  },

  checkquestion:function (e) {
    var index = e.currentTarget.dataset.index
    var type = this.data.type
    var problemID = this.data.problem_id[index]
    //release里的type=1对应题库里的type=2，转换一下
    if(type == 1){
      type++
    }
    console.log(type)
    if(problemID != undefined){
      wx.navigateTo({
        url: '/pages/' + problemID.substring(0,1) + '_correct/' + problemID.substring(0,1) + '_correct?type=' + type + '&problemID=' + problemID,
      })
    }
  },

  correct: function (e) {
    if (this.data.correct != 1){
      if(this.data.problem_id[e.currentTarget.dataset.problem].substring(0,1) == 'o')
      wx.navigateTo({
        url: '/pages/correct_subj/correct_subj?studentIndex=' + e.currentTarget.dataset.index + '&problemIndex=' + e.currentTarget.dataset.problem + '&studentID=' + this.data.student[e.currentTarget.dataset.index].id + '&problemID=' + this.data.problem_id[e.currentTarget.dataset.problem] + '&homeworkID=' + this.data.homeworkID + '&problemNumber=' + e.currentTarget.dataset.number + '&type=' + this.data.type*2
      })
    }
  },

  confirm: function () {
    var that = this
    wx.showModal({
      content: '是否确认发布成绩？',
      success: function (res) {
        if (res.confirm) {
          var flag = true
          var problem_id = that.data.problem_id
          var s_result = []
          for (var x in problem_id) {
            if (problem_id[x].substring(0, 1) == 'o') {
              s_result = that.data.result[x]
              for (var y in s_result) {
                if (s_result[y] == '') {
                  flag = false
                  break
                }
              }
            }
            if (!flag) {
              break
            }
          }
          if (!flag) {
            wx.showToast({
              title: '打分未完成',
              icon: 'none',
              duration: 1500
            })
          } else {
            if(that.data.ddl == 0){
              wx.showToast({
                title: '尚未到期',
                icon: 'none',
                duration: 1500
              })
            }else{
              var student = that.data.student
              var homeworkid = that.data.homeworkID
              for (var index in student) {
                //修改result的state
                db.collection('result').where({
                    studentID: student[index].id,
                    homeworkID: homeworkid
                  })
                  .get().then(res => {
                    if (res.data.length != 0) {
                      for (var a = 0; a < that.data.student.length; a++) {
                        if (that.data.student[a].id == res.data[0].studentID) break
                      }
                      wx.cloud.callFunction({
                        // 云函数名称
                        name: 'updateresult',
                        // 传给云函数的参数
                        data: {
                          homeworkid: homeworkid,
                          studentid: res.data[0].studentID,
                          answer: res.data[0].answer,
                          state: 3,
                          time: res.data[0].time,
                          score: String(that.data.score[a])
                        },
                      })
                      //修改学生每周积分和总积分
                      db.collection('student').where({
                        studentID: res.data[0].studentID
                      }).get().then(r => {
                        console.log(that.data.student[a].id)
                        wx.cloud.callFunction({
                          // 云函数名称
                          name: 'updatestudent',
                          // 传给云函数的参数
                          data: {
                            studentID: r.data[0].studentID,
                            experience: r.data[0].experience + parseInt(that.data.score[a]),
                            point: r.data[0].point + parseInt(that.data.score[a]),
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
                    }
                  })
              }
              //修改release的发布情况
              db.collection('release').where({
                classID: that.data.classID,
                homeworkID: that.data.homeworkID
              }).get().then(res => {
                console.log(res.data)
                console.log(that.data.classID, that.data.homeworkID)
                wx.cloud.callFunction({
                  // 云函数名称
                  name: 'updaterelease',
                  // 传给云函数的参数
                  data: {
                    classID: that.data.classID,
                    homeworkID: that.data.homeworkID,
                    date: res.data[0].date,
                    deadline: res.data[0].deadline,
                    title: res.data[0].title,
                    type: res.data[0].type,
                    correct: 1
                  },
                })
              })
              wx.showToast({
                title: '成绩已发布！',
                icon: 'none',
                duration: 1500
              })
              that.setData({
                correct: 1
              })
            }
          }
        }
      }
    })
  },

  chooseData: function (e) {
    var inclass = false
    //var inhomework = false
    var cid = '' //班级id
    var hid = '' //作业id
    var pro_num = 0 //单次作业题目数量
    var that = this
    console.log(e.detail.text)
    //是否在进行班级选择
    for (var index in this.data.selectArray1) {
      if (e.detail.text == this.data.selectArray1[index].text) {
        inclass = true
        //获取当前选择的班级id
        cid = this.data.selectArray1[index].id
        this.setData({
          classID: cid
        })
      }
    }
    //已经选择班级，清空原有记录
    if (inclass) {
      this.setData({
        acc: [],
        score: [],
        result: [],
        problem: [],
        problem1: {},
        problem2: {},
        problem3: {}
      })
    }
    //已经选择班级，获取作业列表
    if (inclass) {
      db.collection('release').where({
        classID: cid
      }).get().then(res => {
        var i = 0
        var name1 = ''
        var name2 = ''
        var name3 = ''
        //清空数组
        var selectArray2 = that.data.selectArray2
        selectArray2.splice(0, selectArray2.length)
        that.setData({
          selectArray2: selectArray2
        })
        for (var index in res.data) {
          name1 = "selectArray2[" + i + "].text"
          name2 = "selectArray2[" + i + "].id"
          name3 = "selectArray2[" + i + "].type"
          that.setData({
            [name1]: res.data[index].title,
            [name2]: res.data[index].homeworkID,
            [name3]: res.data[index].type
          });
          i++
        }
      })
    }
    //已经选择班级，获取同学名单
    if (inclass) {
      var student = []
      db.collection('student').where({
        classID: cid
      }).count().then(async res => {
        let total = res.total;
        // 计算需分几次取
        const batchTimes = Math.ceil(total / 20)
        // 循环读取数据库，并将读取的数据存放至student
        for (let i = 0; i < batchTimes; i++) {
          await db.collection('student').where({
            classID: cid
          }).skip(i * 20).limit(20).get().then(async res => {
            student = student.concat(res.data)
          })
        }
        //清空原student
        var student_n = that.data.student
        student_n.splice(0, student_n.length)
        that.setData({
          student: student_n
        })
        //填充学生姓名
        var name1 = ''
        var name2 = ''
        var name3 = ''
        for (var index in student) {
          name1 = "student[" + index + "].name"
          name2 = "student[" + index + "].id"
          name3 = "student[" + index + "].state"
          that.setData({
            [name1]: student[index].name,
            [name2]: student[index].studentID,
            [name3]: 0
          })
        }
      })
    }

    //是否在进行作业选择
    for (var index in this.data.selectArray2) {
      if (e.detail.text == this.data.selectArray2[index].text) {
        //inhomework = true
        //获取当前选择的作业，获取题目id数组
        hid = this.data.selectArray2[e.detail.index].id
        this.setData({
          homeworkID: hid,
        })
        console.log(hid)
        db.collection('release').where({
            classID: that.data.classID,
            homeworkID: hid
          })
          .get().then(res => {
            var nowtime = formatTime(new Date())
            if(nowtime < res.data.deadline){
              var ddl = 0
            }
            else{
              var ddl = 1
            }
            that.setData({
              correct: res.data[0].correct,
              type: res.data[0].type,
              ddl: ddl
            })
          })
        db.collection('homework').where({
            homeworkID: hid
          })
          .get().then(r => {
            //储存原始题目编号
            that.setData({
              problem_id: r.data[0].problem
            })
            //计算各类题目数量,同时记录各题难度分值
            var ques = r.data[0].problem
            var pro = []
            var num_s = 0
            var num_m = 0
            var num_b = 0
            var num_j = 0
            var num_o = 0
            var diff = ''
            that.setData({ //清空difficulty
              difficulty: []
            })
            for (var index in ques) {
              if (ques[index].substring(0, 1) == 's') {
                db.collection('sinChoice').where({
                    sinID: ques[index]
                  })
                  .get().then(res => {
                    //确认所属位置
                    for (var i = 0; i < ques.length; i++) {
                      if (res.data[0].sinID == ques[i]) {
                        diff = "difficulty[" + i + ']'
                        that.setData({
                          [diff]: res.data[0].level
                        })
                        break
                      }
                    }
                  })
                num_s++
                pro[index] = '单选' + num_s
              }
              if (ques[index].substring(0, 1) == 'm') {
                db.collection('mulChoice').where({
                    mulID: ques[index]
                  })
                  .get().then(res => {
                    //确认所属位置
                    for (var i = 0; i < ques.length; i++) {
                      if (res.data[0].mulID == ques[i]) {
                        diff = "difficulty[" + i + ']'
                        that.setData({
                          [diff]: res.data[0].level
                        })
                        break
                      }
                    }
                  })
                num_m++
                pro[index] = '多选' + num_m
              }
              if (ques[index].substring(0, 1) == 'b') {
                db.collection('blank').where({
                    blankID: ques[index]
                  })
                  .get().then(res => {
                    //确认所属位置
                    for (var i = 0; i < ques.length; i++) {
                      if (res.data[0].blankID == ques[i]) {
                        diff = "difficulty[" + i + ']'
                        that.setData({
                          [diff]: res.data[0].level
                        })
                        break
                      }
                    }
                  })
                num_b++
                pro[index] = '填空' + num_b
              }
              if (ques[index].substring(0, 1) == 'j') {
                db.collection('judgement').where({
                    judgeID: ques[index]
                  })
                  .get().then(res => {
                    //确认所属位置
                    for (var i = 0; i < ques.length; i++) {
                      if (res.data[0].judgeID == ques[i]) {
                        diff = "difficulty[" + i + ']'
                        that.setData({
                          [diff]: res.data[0].level
                        })
                        break
                      }
                    }
                  })
                num_j++
                pro[index] = '判断' + num_j
              }
              if (ques[index].substring(0, 1) == 'o') {
                db.collection('subjective').where({
                    subID: ques[index]
                  })
                  .get().then(res => {
                    //确认所属位置
                    for (var i = 0; i < ques.length; i++) {
                      if (res.data[0].subID == ques[i]) {
                        diff = "difficulty[" + i + ']'
                        that.setData({
                          [diff]: 0
                        })
                        break
                      }
                    }
                  })
                num_o++
                pro[index] = '主观' + num_o
              }
            }
            that.setData({
              problem: pro,
              //给四个横轴标题赋初值
              problem1: {
                value: pro[0],
                index: 0,
                acc: 0
              },
              problem2: {
                value: pro[1],
                index: 1,
                acc: 0
              },
              problem3: {
                value: pro[2],
                index: 2,
                acc: 0
              },
            })

            //给学生状态赋初值
            var name = ''
            for (var index in that.data.student) {
              name = "student[" + index + "].state"
              that.setData({
                [name]: 1,
              })
            }

            //进行结果展示
            pro_num = r.data[0].problem.length
            var state = ''
            var r_name = ''
            var x = 0 //学生对应位置下标
            var a = 0
            for (var index in this.data.student) {
              state = "student[" + index + "].state"
              db.collection('result').where({
                homeworkID: hid,
                studentID: that.data.student[index].id
              }).get().then(res => {
                //console.log(index, that.data.student[index])
                //清空result，同时赋初值'-'
                if (a == 0) {
                  that.setData({
                    result:[[]]
                  })
                  for (var i = 0; i < pro_num; ++i) {
                    for (var j = 0; j < that.data.student.length; ++j) {
                      r_name = "result[" + i + "][" + j + "]"
                      that.setData({
                        [r_name]: '-'
                      })
                    }
                  }
                }
                a++ //记录循环次数
                //判断该学生是否有result
                if (res.data.length != 0) { //有result
                  //确定学生对应位置下标
                  for (var i = 0; i < that.data.student.length; ++i) {
                    if (that.data.student[i].id == res.data[0].studentID) {
                      x = i
                    }
                  }
                  //根据作业完成情况修改学生状态
                  state = "student[" + x + "].state"
                  if (res.data[0].state == 2 || res.data[0].state == 3) {
                    that.setData({
                      [state]: 0
                    })
                  } else {
                    that.setData({
                      [state]: 1
                    })
                  }
                  for (var y in res.data[0].answer) {
                    //console.log(y, res.data[0].answer[y].result)
                    r_name = "result[" + y + "][" + x + "]"
                    that.setData({
                      [r_name]: res.data[0].answer[y].result
                    })
                  }
                }

                //根据作业计算单题准确率
                if (a == that.data.student.length) {
                  //清空acc
                  that.setData({
                    acc: []
                  })
                  var result = that.data.result
                  var sum = 0
                  var right = 0
                  var score = 0
                  var acc = 0
                  var accuracy = ''
                  var name = ''
                  for (var x in result) {
                    console.log(result)
                    sum = 0 //题目总数
                    right = 0 //正确题目
                    score = 0 //主观题总分
                    acc = 0 //准确率/平均分
                    if (that.data.problem_id[x].substring(1, 0) == 'o') {
                      for (var y in result[x]) {
                        if (result[x][y] != '-' && result[x][y] != "") {
                          score = score + result[x][y]
                          sum++
                        }
                      }
                      if (score == 0) {
                        acc = 0
                      } else {
                        acc = score / sum
                      }
                      acc = acc.toFixed(0)
                      accuracy = String(acc)
                      name = "acc[" + x + "]"
                      this.setData({
                        [name]: accuracy
                      })
                    } else {
                      for (var y in result[x]) {
                        console.log(result[x][y])
                        if (result[x][y] == "√") {
                          right++
                          sum++
                        }
                        if (result[x][y] == "×") {
                          sum++
                        }
                      }
                      if (right == 0) {
                        acc = 0
                      } else {
                        acc = right / sum
                      }
                      console.log(acc)
                      accuracy = String(acc.toFixed(2) * 100)
                      name = "acc[" + x + "]"
                      console.log(accuracy + '%')
                      this.setData({
                        [name]: accuracy + '%'
                      })
                    }
                  }
                  //给当前展示的题目赋准确率
                  name = "problem1.acc"
                  that.setData({
                    [name]: that.data.acc[0],
                  })
                  name = "problem2.acc"
                  that.setData({
                    [name]: that.data.acc[1],
                  })
                  name = "problem3.acc"
                  that.setData({
                    [name]: that.data.acc[2],
                  })

                  //计算学生总分
                  //清空score
                  that.setData({
                    score: []
                  })
                  var student = that.data.student
                  var difficulty = that.data.difficulty
                  var score = []
                  for (var x in student) {
                    score[x] = 0
                    if (student[x].state == 0) {
                      //普通作业
                      if(that.data.type == 0){
                        for (var y in result) {
                          if (result[y][x] == '√') { //客观题难度分
                            score[x] = score[x] + difficulty[y]
                          } else if (result[y][x] != '×' && result[y][x] != '-' && result[y][x] != '') { //主观题分数
                            score[x] = score[x] + parseInt(result[y][x])
                          }
                        }
                      }
                      //难题，难度分直接为5
                      else{
                        for (var y in result) {
                          if (result[y][x] == '√') { //客观题难度分
                            score[x] = score[x] + 5
                          } else if (result[y][x] != '×' && result[y][x] != '-' && result[y][x] != '') { //主观题分数
                            score[x] = score[x] + parseInt(result[y][x])
                          }
                        }
                      }

                    }
                  }
                  that.setData({
                    score: score
                  })
                }
              })
            }
          })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取老师id
    var id = wx.getStorageSync('id')
    //获取班级列表
    var that = this
    //老师
    db.collection('class').where({
        teacherID: id
      })
      .get({
        success: (res) => {
          if (res.data.length == 0) {
            console.log('无对应班级')
          } else {
            var name1 = ""
            var name2 = ""
            for (var index in res.data) {
              name1 = "selectArray1[" + index + "].text"
              name2 = "selectArray1[" + index + "].id"
              that.setData({
                [name1]: res.data[index].name,
                [name2]: res.data[index].classID
              });
            }
          }
        }
      })
      //助教
      db.collection('assist').where({
        tutorialID: id
      })
      .get({
        success: (res) => {
          if (res.data.length == 0) {
            console.log('无对应班级')
          } else {
            db.collection('class').where({
              classID: res.data[0].classID
            }).get().then( r => {
              var name1 = ""
              var name2 = ""
              for (var index in r.data) {
                name1 = "selectArray1[" + index + "].text"
                name2 = "selectArray1[" + index + "].id"
                that.setData({
                  [name1]: res.data[index].name,
                  [name2]: res.data[index].classID
                });
              }
            })
          }
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