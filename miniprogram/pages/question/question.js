// pages/question/question.js
const app = getApp();
const db = wx.cloud.database();
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 10 //每页显示多少数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    num:2,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    var state='';
    db.collection("question").where({stuID: id}).skip(0)
    .limit(20).get().then(res => {
      console.log(res.data)
      for(var i = 0;i < res.data.length;i++) {
        //获取状态：answers为空-未回答；不空-只要有pass，就是，已回答
        if (res.data[i].answers.length == 0) {state = '未回答';}
        else {
          for(var j = 0;j<res.data[i].answers.length;j++) {
            if (res.data[i].answers[j].result == 'pass') {
              state='已回答';
              break;} else {
                state = '未回答';
              }
          }
        }
        res.data[i].state = state;
      }
      this.setData({
        list: res.data
      })
    })
  },

  NavigateToQues_de:function(e) {
    console.log(e)
    var quesid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/question_detail/question_detail?id=' + quesid,
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
    console.log('加载更多。。。')
  var id = wx.getStorageSync('id');
    var state='';
    db.collection('question').where({stuID: id})
    .skip((this.data.num - 1) * 20)
    .limit(20)
    .get().then(res => {
      console.log('获取成功', res)
      for(var i = 0;i < res.data.length;i++) {
        //获取状态：answers为空-未回答；不空-只要有pass，就是，已回答
        if (res.data[i].answers.length == 0) {state = '未回答';}
        else {
          for(var j = 0;j<res.data[i].answers.length;j++) {
            if (res.data[i].answers[j].result == 'pass') {
              state='已回答';
              break;} else {
                state = '未回答';
              }
          }
        }
        res.data[i].state = state;
      }
      console.log(res)
      this.setData({
        // 拼接
        list: this.data.list.concat(res.data),
        num: this.data.num + 1
      })
      console.log(this.data.list)
    }).catch(res => {
      console.log('获取失败', res)
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})