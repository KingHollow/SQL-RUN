// pages/j_respond/j_respond.js
const app = getApp();
const db = wx.cloud.database();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionid:'',
    content:"",
    items: [
      {value: '正确'},
      {value: '错误'},
    ],
    answer:'',
    nbanswer:'',
    state:'',//challenge
    flag:0
  },

  radioChange: function(e) {
    this.setData({
      answer:e.detail.value
    })
    console.log(this.data.answer)
  },

  submit:function(){
    var that=this
    wx.showModal({  
      content: '是否确认提交？',  
      success: function(res) {  
          if (res.confirm) { 
            if(that.data.answer!=''){
              console.log(that.data.answer)
              console.log(that.data.nbanswer)
              var correct = false;
              if (that.data.answer==that.data.nbanswer) {
                correct = true;
              }

              if (!correct){
                //存错题
                db.collection('mistake').add({
                  data: {
                    answer:Array(that.data.answer),
                    questionID:that.data.questionid,
                    studentID:wx.getStorageSync('id'),
                    type:0
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
                name: 'updatechallenge',
                // 传给云函数的参数
                data: {
                  questionid: that.data.questionid,
                  state: 2
              },
            })

            const pages = getCurrentPages(); //获取页面栈堆
            const prev = pages[pages.length - 2]; //-2即为父级页面，想跳两层的话就-3
            let ads = prev.data.list
            for (var i = 0;i < ads.length;i++) {
              if (ads[i].questionID == that.data.questionid) {
                ads[i].state = 2;
                prev.setData({ //用setData()的特性给父级页面赋值并重新渲染
                  list: ads
              })
              }
            }

              that.setData({
                flag:1
              })
              
            } 
            else{
              wx.showToast({
                title: '还未作答,无法提交！',
                icon:'none',
                duration: 1500 
              })
            }
          } else if (res.cancel) {  
          }  
      }  
  })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var quesid = options.id;

    db.collection("judgement").where({
      judgeID: quesid,
      type:1
    }).get().then(res => {
      console.log(res.data)
      
      this.setData({
        questionid:quesid,
        content: res.data[0].content,
        nbanswer:res.data[0].answer,
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