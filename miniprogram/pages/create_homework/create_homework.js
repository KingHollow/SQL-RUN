// pages/create_homework/create_homework.js
const formatTime = date => {
  const year = date .getFullYear ()
  const month = date .getMonth () + 1
  const day = date .getDate ()
  const hour = date .getHours ()
  const minute = date .getMinutes ()
  const second = date .getSeconds ()
  
  return [year , month , day ].map (formatNumber ).join ( '-' ) + ' ' + [hour , minute , second ].map (formatNumber ).join ( ':' )
  }
  
  const formatNumber = n => {
  n = n .toString ()
  return n [ 1 ] ? n : '0' + n
  }
  
  module .exports = {
  formatTime : formatTime
  } 

const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_list: [],
    m_list: [],
    j_list: [],
    b_list: [],
    o_list: [],
    homeworkname: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  turntoh_sl: function () {
    wx.navigateTo({
      url: "../../pages/homework_list/homework_list?type=s",
    })
  },

  turntoh_ml: function () {
    wx.navigateTo({
      url: "../../pages/homework_list/homework_list?type=m",
    })
  },

  turntoh_jl: function () {
    wx.navigateTo({
      url: "../../pages/homework_list/homework_list?type=j",
    })
  },

  turntoh_bl: function () {
    wx.navigateTo({
      url: "../../pages/homework_list/homework_list?type=b",
    })
  },

  turntoh_ol: function () {
    wx.navigateTo({
      url: "../../pages/homework_list/homework_list?type=o",
    })
  },

  homeworkname: function (e) {
    this.setData({
      homeworkname: e.detail.value
    })
  },

  turntoparameter: function (e) {
    if(!this.data.homeworkname){
      wx.showModal({
        titel: "提示",
        content: "请输入作业的题目",
        duration: 3000,
        success(re) {}
      });
    } else {
      wx.navigateTo({
        url: "../../pages/parameter/parameter?homeworkname=" + this.data.homeworkname,
      })
    }
  },

  createhomework: function () {
    var homeworkname = this.data.homeworkname;
    var that = this;
    if (homeworkname == "") {
      wx.showModal({
        titel: "提示",
        content: "请输入作业的题目",
        duration: 3000,
        success(res) {}
      });
    } else if (this.data.s_list.length == 0 && this.data.m_list.length == 0 && this.data.j_list.length == 0 && this.data.b_list.length == 0 && this.data.o_list.length == 0) {
      wx.showModal({
        titel: "提示",
        content: "请挑选至少一道题目",
        duration: 3000,
        success(res) {}
      });
    } else {
      wx.showModal({
        titel: "提示",
        content: "创建成功",
        duration: 3000,
        success(res) {
          var homeworkid;
          var temp = formatTime ( new Date ());
          homeworkid = temp.substring(0,4)+temp.substring(5,7)+temp.substring(8,10)+temp.substring(11,13)+temp.substring(14,16)+temp.substring(17,19);

          var name = that.data.homeworkname;
          var teacherid = wx.getStorageSync('id');
          var problem = [];

          for (var i = 0; i < that.data.s_list.length; i++) {
            problem.push(that.data.s_list[i].sid);
          }
          for (var i = 0; i < that.data.m_list.length; i++) {
            problem.push(that.data.m_list[i].mid);
          }
          for (var i = 0; i < that.data.j_list.length; i++) {
            problem.push(that.data.j_list[i].jid);
          }
          for (var i = 0; i < that.data.b_list.length; i++) {
            problem.push(that.data.b_list[i].bid);
          }
          for (var i = 0; i < that.data.o_list.length; i++) {
            problem.push(that.data.o_list[i].oid);
          }
          db.collection("homework").add({
            data: {
              homeworkID: homeworkid,
              name: name,
              teacherID: teacherid,
              problem: problem,
              type: 0
            }
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      });
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