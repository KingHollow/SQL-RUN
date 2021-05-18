// pages/check_answer/check_answer.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quesID:"",
    content:"",
    stuID:"",
    classID:"",
    answers:[],
    c_answers:[],
  
  },


  // 更新data 切换选中状态
  selectedpass: function (e) {
    var that = this;
    var temp = that.data.answers;
    var c_answer = that.data.c_answers;
    var code = "pass";
    //console.log(e.currentTarget.dataset.id);
    temp[e.currentTarget.dataset.id].result = code;
    c_answer.push(temp[e.currentTarget.dataset.id]);
    that.setData({
      answers: temp,
      c_answers:c_answer
    });
    var flag = 0;
    var temp1 = [];
    for(var i = 0; i < temp.length; i++){
      if(temp[i].result == "") flag = 1;
      var data = {
        id: temp[i].id,
        name: temp[i].name,
        answer: temp[i].answer,
        result: temp[i].result
      }
      temp1.push(data);
    }
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updatequestion',
      // 传给云函数的参数
      data: {
        quesID: that.data.quesID,
        flag: flag,
        answers: temp1
      },
    })
  },
  selectednopass: function(e) {
    var that = this;
    var temp = that.data.answers;
    var c_answer = that.data.c_answers;
    var code = "nopass";
    temp[e.currentTarget.dataset.id].result = code;
    c_answer.push(temp[e.currentTarget.dataset.id]);
    that.setData({
      answers: temp,
      c_answers:c_answer
    });
    var flag = 0;
    var temp1 = [];
    for(var i = 0; i < temp.length; i++){
      if(temp[i].result == "") flag = 1;
      var data = {
        id: temp[i].id,
        name: temp[i].name,
        answer: temp[i].answer,
        result: temp[i].result
      }
      temp1.push(data);
    }
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updatequestion',
      // 传给云函数的参数
      data: {
        quesID: that.data.quesID,
        flag: flag,
        answers: temp1
      },
    })
  },

 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var quesid = options.quesid;
    var that = this;
    db.collection("question").where({quesID: quesid}).get().then(res => {
      var temp = [];
      var temp1 = [];
      for(var i = 0; i < res.data[0].answers.length; i++){
        var data = {
          index: i,
          id: res.data[0].answers[i].stuID,
          name: res.data[0].answers[i].name,
          answer: res.data[0].answers[i].answer,
          result: res.data[0].answers[i].result
        }
        temp.push(data);
        if(data.result != "") temp1.push(data);
      }
      that.setData({
        quesID: res.data[0].quesID,
        content: res.data[0].content,
        stuID: res.data[0].stuID,
        classID: res.data[0].classID,
        answers: temp,
        c_answers: temp1
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