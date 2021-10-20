// pages/weekscore/weekscore.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //弹窗参数
    show:false,
    //周总积分
    weekscore:'',
    //成功发起挑战
    challengego:'',
    challengego_top:'6',
    challengego_per: '',
    //成功回答提问
    questionans:'',
    questionans_top:'6',
    questionans_per:'',
    //随机答题
    random:'',
    random_top:'4',
    random_per:'',
    //赛跑
    run:'',
    run_top:'4',
    run_per:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var stuid = wx.getStorageSync('id');
    db.collection("student").where({
      studentID: stuid,
    }).get().then(res => {
      console.log(res.data)
      
      this.setData({
        weekscore:res.data[0].point,
        challengego:res.data[0].challengescore,
        questionans:res.data[0].answer,
        random:res.data[0].random,
        run:res.data[0].race,
      })
      this.setData({
        challengego_per:this.data.challengego/this.data.challengego_top*100,
        questionans_per:this.data.questionans/this.data.questionans_top*100,
        random_per:this.data.random/this.data.random_top*100,
        run_per:this.data.run/this.data.run_top*100,
      })
    })
    
    

  },

  checkrule:function(){
    this.setData({
      show:!this.data.show
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