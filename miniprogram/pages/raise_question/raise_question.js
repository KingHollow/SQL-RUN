// pages/raise_question/raise_question.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quesID:'',
    content:'',
    stuID:'',
    stuName:'',
    classID:'',
    className:'',
    answers:[],
    flag :0,
    num:0,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var n = 0;
    db.collection('quantity').where({
      type:'q'
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        n = res.data[0].number+1
        that.setData({
          quesID:'q' + ('0000' + n.toString()).substr(-5),
          num:n
        })
        console.log(that.data.num)

      }
    })
    var stuID = wx.getStorageSync('id');
    that.setData({
      stuID: stuID
    })
    db.collection('student').where({
      studentID: stuID
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res);
        var stuName = res.data[0].name;
        var classID = res.data[0].classID;
        that.setData({
          stuName:stuName,
          classID:classID,
        })
        db.collection('class').where({classID: classID})
        .get({
          success: function(res) {
            // res.data 是包含以上定义的两条记录的数组
            var className = res.data[0].name;
            that.setData({
              className:className
            })
          }
        })
      }
    })
    
  },


  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.content.length == 0) {
      wx.showToast({
      title: '问题不能为空!',
      icon: 'loading',
      duration: 1500
      })      
      }else{
        that.setData({
          content: e.detail.value.content
        })
        console.log(that.data)
        wx.showLoading({
          title: '数据正在提交中......',
          mask:"true"
        })
        db.collection('question').add({
          data: {
            quesID:that.data.quesID,
            content:that.data.content,
            stuID:that.data.stuID,
            stuName:that.data.stuName,
            classID:that.data.classID,
            className:that.data.className,
            answers:that.data.answers,
            flag :0,
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            this.setData({
              counterId: res._id
            })
            wx.showToast({
              title: '新增记录成功',
            })
            wx.hideLoading()
           console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
           
           wx.navigateBack({
            delta: 1,  // 返回上一级页面。
            success: function() {
                console.log('成功！')
            }
          })
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '新增记录失败'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })  
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updatequantity',
          // 传给云函数的参数
          data: {
            number: that.data.num,
            type: "q"
        },
      })
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