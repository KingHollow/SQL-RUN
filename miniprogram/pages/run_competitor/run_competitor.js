// pages/run_competitor/run_competitor.js
const db = wx.cloud.database();
const app = getApp();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentID: "",
    studentname: "",
    flag: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    var that = this;
    db.collection("student").where({
      studentID: id
    }).get().then(res => {
      this.setData({
        studentID: id,
        studentname: res.data[0].name,
      })
      var classid = res.data[0].classID;
      db.collection("student").where({
        classID: classid
      }).orderBy("point", "desc").get().then(r => {
        var temp = [];
        for (var i = 0; i < r.data.length; i++) {
          if (r.data[i].studentID != id) {
            var data = {
              id: r.data[i].studentID,
              name: r.data[i].name,
              score: r.data[i].point
            }
            temp.push(data);
            that.setData({
              student: temp
            });

          }

        }
      })
    })
  },

  invite: function (e) {
    let that = this;
    console.log(e.currentTarget.dataset);
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    db.collection('invite').where({
      //邀请状态未被回复
      playerA: wx.getStorageSync('id'),
      state: 0
    }).get().then(res => {
      if (res.data.length!=0) {
        that.setData({
          flag: false
        })
        wx.showToast({
          title: '无法同时邀请',
          icon: 'error',
          duration: 1500
        })
      }    
    })
    db.collection('invite').where({
        playerB: id,
        state: _.eq(0).or(_.eq(1))
      }).get().then(res => {
      if (res.data.length!=0) {
        that.setData({
          flag: false
        })
        console.log(that.data.flag)
        wx.showToast({
          title: '对方被他人邀请',
          icon: 'error',
          duration: 1500
        })
      }
     
    })
    setTimeout(function () {
      //要延时执行的代码
      console.log(that.data.flag)
      if (that.data.flag) {
        wx.showModal({
          content: '确认要邀请' + name + '同学吗？',
          success: function (res) {
            if (res.confirm) {
              
              
              //修改invite数据库
              db.collection('invite').add({
                data: {
                  playerA: wx.getStorageSync('id'),
                  invite: that.data.studentname,
                  playerB: id,
                  state: 0 //邀请状态为待回复
                },
                success: res => {
                  // 在返回结果中会包含新创建的记录的 _id
  
                  console.log('[数据库] [新增记录] 成功')
                },
                fail: err => {
  
                  console.error('[数据库] [新增记录] 失败：', err)
                }
              })
  
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2] //上一个页面
              prevPage.setData({
                userBInfoid: id,
                userInfoBnickname: name,
                yaoqing: false
              });
              wx.navigateBack({
                delta: 1,
              });
    
            } else {}
          }
        })
      }
     }, 500) //延迟时间 这里是0.5秒
    
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