// pages/run_wait/run_wait.js
const db = wx.cloud.database();
const app = getApp();

function countdown(that) {
  if (!that.data.yaoqing) {
    console.log(that.data.second)
    var second = that.data.second
    if (second == 0) {
      that.setData({
        second: "计时结束"
      });
      return;
    }
    var time = setTimeout(function () {
      that.setData({
        second: second - 1
      });
      countdown(that);
    }, 1000)
  }
  
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAInfoid: "", //用户信息
    userBInfoid: "", //好友信息
    yaoqing: true, //邀请按钮

    classid: "",
    userInfoAnickname: "",
    userInfoBnickname: "",
    Loadingtime: '', //定时器
    flag: false,
    second: 30

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    let userID = wx.getStorageSync('id');

    db.collection("student").where({
      studentID: userID
    }).get().then(res => {
      this.setData({
        userAInfoid: userID,
        userInfoAnickname: res.data[0].name,
      })
    })

    this.watcher1 = db.collection('invite')
      .where({
        playerB: wx.getStorageSync('id'),
        //作为被挑战者
      })
      .watch({
        onChange: function (snapshot) {
          console.log('docs\'s changed events', snapshot.docChanges)
          if (!snapshot.type && snapshot.docChanges[0].doc.state == 0) {
            wx.showModal({
              content: snapshot.docChanges[0].doc.invite + '邀请您参加赛跑，请问是否接受？',
              success: function (res) {
                if (res.confirm) {
                  db.collection('invite').where({
                    playerB: wx.getStorageSync('id'),
                    state: 0
                  }).get().then(res => {
                    console.log(res.data)
                    if (res.data.length != 0) {
                      that.setData({
                        flag: true
                      })
                    }
                    if (that.data.flag) {
                      //被邀请者同意邀请
                      wx.cloud.callFunction({
                        name: "updateinvite", //云函数名，修改邀请状态
                        data: {
                          playerA: snapshot.docChanges[0].doc.playerA,
                          playerB: wx.getStorageSync('id'),
                        }
                      }).then(res => {
                        console.log('更新Sharelist数据库成功')
                      })
                      wx.redirectTo({
                        url: '../../pages/run_race/run_race?rivalID=' + snapshot.docChanges[0].doc.playerA,
                      })
                    } else {
                      wx.showToast({
                        title: '邀请已被取消',
                        icon: 'error',
                        duration: 1500
                      })
                    }
                  })



                } else {
                  db.collection('invite').where({
                    playerB: wx.getStorageSync('id'),
                    state: 0
                  }).get().then(res => {
                    console.log(res.data)
                    if (res.data.length != 0) {
                      that.setData({
                        flag: true
                      })
                    }
                    if (that.data.flag) {
                      wx.cloud.callFunction({
                        name: "updateinvite_r", //云函数名，修改邀请状态
                        data: {
                          playerA: snapshot.docChanges[0].doc.playerA,
                          playerB: wx.getStorageSync('id'),
                        }
                      }).then(res => {
                        console.log('更新Sharelist数据库成功')
                      })
                    } else {
                      wx.showToast({
                        title: '邀请已被取消',
                        icon: 'error',
                        duration: 1500
                      })
                    }
                  })
                }
              }
            })

          }

          console.log('is init data', snapshot.type === 'init')
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
        }
      })

    this.watcher2 = db.collection('invite').where({
      playerA: wx.getStorageSync('id')
    }).watch({
      onChange: function (snapshot) {
        //监控数据发生变化时触发
        console.log('docs\'s changed events', snapshot.docChanges)
        if (!snapshot.type) {
          if (snapshot.docChanges[0].doc.state == 1) {
            //接受
            wx.showToast({
              title: '邀请已被接受',
              icon: 'success',
              duration: 1500
            })
            wx.redirectTo({
              url: '../../pages/run_race/run_race?rivalID=' + snapshot.docChanges[0].doc.playerB,
            })
          } else if (snapshot.docChanges[0].doc.state == 2) {
            //拒绝
            wx.showToast({
              title: '邀请已被拒绝',
              icon: 'error',
              duration: 1500
            })
            that.setData({
              yaoqing: true,
              second:30
            })
          }
        }


        console.log('is init data', snapshot.type === 'init')
      },
      onError: (err) => {
        console.error(err)
      }
    })




  },

  invite: function (e) {

    wx.navigateTo({
      url: '../../pages/run_competitor/run_competitor',
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
    //跳转回来，拥有了玩家B，计时30s监听变化，如果未有变化，则邀请自动取消
    if (!this.data.yaoqing) {
      let that = this;
      let playerB = this.data.userBInfoid;
      that.setData({
        second:30
      })
      countdown(this);
      setTimeout(function () {
        //要延时执行的代码
        db.collection('invite')
          .where({
            playerA: wx.getStorageSync('id'),
            playerB: playerB,
            state: 0
          }).get().then(res => {

            if (res.data.length != 0) {
              wx.cloud.callFunction({
                name: "updateinvite_o", //云函数名，修改邀请状态
                data: {
                  playerA: wx.getStorageSync('id'),
                  playerB: playerB,
                }
              }).then(res => {
                console.log('更新Sharelist数据库成功')
              })
              wx.showToast({
                title: '邀请已超时',
                icon: 'error',
                duration: 1500
              })
              that.setData({
                yaoqing: true,
                second:30
              })
            }
          })
          
          
      }, 30000) //延迟时间 这里是30秒
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
    this.watcher1.close();
    this.watcher2.close();
    db.collection('invite').where({
      playerA: wx.getStorageSync('id'),
      state: 0
    }).get().then( res => {
      if(res.data.length != 0){
        wx.cloud.callFunction({
          name: "saveresult", //云函数名，修改邀请状态
          data: {
            _id: res.data[0]._id,
            state: 4,
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