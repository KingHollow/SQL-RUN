// pages/run_result/run_result.js
const db = wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    node1 : false,
    node2 : false,
    node3 : false,
    node4 : false,
    result : 0,
    back: false
  },

  back:function(){
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.result == 'win'){
      this.setData({
        result: 0
      })
    }
    else{
      this.setData({
        result: 1
      })
    }
    //缓冲条
    var that = this
    setTimeout(function(){
      that.setData({
        node1 : true
      })
      setTimeout(function(){
        that.setData({
          node2 : true
        })
        setTimeout(function(){
          that.setData({
            node3 : true
          })
          setTimeout(function(){
            that.setData({
              node4 : true
            })
            setTimeout(function(){
              if(options.result == 'win'){                     //赢
                db.collection('student').where({
                  studentID: wx.getStorageSync('id')
                }).get().then( res => {
                  var score = res.data[0].race
                  if(score < 4){
                    wx.cloud.callFunction({
                      // 云函数名称
                      name: 'updatestudent',
                      // 传给云函数的参数
                      data: {
                        studentID: wx.getStorageSync('id'),
                        race: score + 2,
                        point: res.data[0].point + 2,
                        experience: res.data[0].experience + 2
                      },
                    })
                    wx.showToast({
                      title: '已获得2分积分',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                  else{
                    wx.showToast({
                      title: '周赛跑积分已满',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                })
              }
              else{                                            //输
                wx.showToast({
                  title: '再接再厉！',
                  icon: 'none',
                  duration: 1500
                })
              }
              that.setData({
                back: true
              })
            },500)
          },500)
        }, 1000)
      }, 1000)
    }, 1000)
    //记录本局结果
    var invite = []
    db.collection('invite').where({
      playerA: wx.getStorageSync('id'),
      state: _.eq(1).or(_.eq(3))
    }).count().then(async res => {
      if (res.total == 0) {} else {
        let total = res.total;
        // 计算需分几次取
        const batchTimes = Math.ceil(total / 20)
        // 循环读取数据库
        for (let i = 0; i < batchTimes; i++) {
          await db.collection('invite').where({
            playerA: wx.getStorageSync('id'),
            state: _.eq(1).or(_.eq(3))
          }).skip(i * 20).limit(20).get().then(async res => {
            invite = invite.concat(res.data)
          })
        }
        if(options.result == 'win'){
          wx.cloud.callFunction({
            // 云函数名称
            name: 'saveresult',
            // 传给云函数的参数
            data: {
              _id: invite[total-1]._id,
              state: 5,
            },
          })
        }
        else{
          wx.cloud.callFunction({
            // 云函数名称
            name: 'saveresult',
            // 传给云函数的参数
            data: {
              _id: invite[total-1]._id,
              state: 6,
            },
          })
        }
      }
    })
    var invite = []
    db.collection('invite').where({
      playerB: wx.getStorageSync('id'),
      state: _.eq(1).or(_.eq(3))
    }).count().then(async res => {
      if (res.total == 0) {} else {
        let total = res.total;
        // 计算需分几次取
        const batchTimes = Math.ceil(total / 20)
        // 循环读取数据库
        for (let i = 0; i < batchTimes; i++) {
          await db.collection('invite').where({
            playerB: wx.getStorageSync('id'),
            state: _.eq(1).or(_.eq(3))
          }).skip(i * 20).limit(20).get().then(async res => {
            invite = invite.concat(res.data)
          })
        }
        if(options.result == 'win'){
          wx.cloud.callFunction({
            // 云函数名称
            name: 'saveresult',
            // 传给云函数的参数
            data: {
              _id: invite[total-1]._id,
              state: 6,
            },
          })
        }
        else{
          wx.cloud.callFunction({
            // 云函数名称
            name: 'saveresult',
            // 传给云函数的参数
            data: {
              _id: invite[total-1]._id,
              state: 5,
            },
          })
        }
      }
    })
    /*db.collection('invite').where({
      playerA: wx.getStorageSync('id'),
      state: _.eq(1).or(_.eq(3))
    }).get().then( res => {
      if(res.data.length == 0){}else{
        if(options.result == 'win'){
          wx.cloud.callFunction({
            // 云函数名称
            name: 'saveresult',
            // 传给云函数的参数
            data: {
              _id: res.data[0]._id,
              state: 5,
            },
          })
        }
        else{
          wx.cloud.callFunction({
            // 云函数名称
            name: 'saveresult',
            // 传给云函数的参数
            data: {
              _id: res.data[0]._id,
              state: 6,
            },
          })
        }
      }
    })
    db.collection('invite').where({
      playerB: wx.getStorageSync('id'),
      state: _.eq(1).or(_.eq(3))
    }).get().then( res => {
      if(res.data.length == 0){}else{
        if(options.result == 'win'){
          wx.cloud.callFunction({
            // 云函数名称
            name: 'saveresult',
            // 传给云函数的参数
            data: {
              _id: res.data[0]._id,
              state: 6,
            },
          })
        }
        else{
          wx.cloud.callFunction({
            // 云函数名称
            name: 'saveresult',
            // 传给云函数的参数
            data: {
              _id: res.data[0]._id,
              state: 5,
            },
          })
        }
      }
    })*/
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