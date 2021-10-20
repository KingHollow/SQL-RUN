// pages/mistake/mistake.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    chapter:["第一章", "第二章", "第三章", "第四章", "第五章", "第六章", "第七章", "第八章", "第九章", "第十章"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var studentid = wx.getStorageSync('id');
    var that = this;
    db.collection("mistake").where({
      studentID: studentid
    }).get().then(res => {
      var temp = [];
      for(var i = 0; i < res.data.length; i++){
        if(res.data[i].questionID[0] == "s"){
          db.collection("sinChoice").where({
            sinID: res.data[i].questionID,
            type: res.data[i].type
          }).get().then(rm => {
            if(rm.data[0].type == 1){
              var data = {
                questionID: rm.data[0].sinID,
                type: rm.data[0].type,
                style: "单选题",
                content: rm.data[0].content,
                chapter: "挑战题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else if(rm.data[0].type == 2){
              var data = {
                questionID: rm.data[0].sinID,
                type: rm.data[0].type,
                style: "单选题",
                content: rm.data[0].content,
                chapter: "难题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else{
              var data = {
                questionID: rm.data[0].sinID,
                type: rm.data[0].type,
                style: "单选题",
                content: rm.data[0].content,
                chapter: that.data.chapter[rm.data[0].chapter-1]
              }
              temp.push(data);
              that.setData({list: temp});
            }
          })
        }
        if(res.data[i].questionID[0] == "m"){
          db.collection("mulChoice").where({
            mulID: res.data[i].questionID,
            type: res.data[i].type
          }).get().then(rm => {
            if(rm.data[0].type == 1){
              var data = {
                questionID: rm.data[0].mulID,
                type: rm.data[0].type,
                style: "多选题",
                content: rm.data[0].content,
                chapter: "挑战题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else if(rm.data[0].type == 2){
              var data = {
                questionID: rm.data[0].mulID,
                type: rm.data[0].type,
                style: "多选题",
                content: rm.data[0].content,
                chapter: "难题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else{
              var data = {
                questionID: rm.data[0].mulID,
                type: rm.data[0].type,
                style: "多选题",
                content: rm.data[0].content,
                chapter: that.data.chapter[rm.data[0].chapter-1]
              }
              temp.push(data);
              that.setData({list: temp});
            }
          })
        }
        if(res.data[i].questionID[0] == "j"){
          db.collection("judgement").where({
            judgeID: res.data[i].questionID,
            type: res.data[i].type
          }).get().then(rm => {
            if(rm.data[0].type == 1){
              var data = {
                questionID: rm.data[0].judgeID,
                type: rm.data[0].type,
                style: "判断题",
                content: rm.data[0].content,
                chapter: "挑战题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else if(rm.data[0].type == 2){
              var data = {
                questionID: rm.data[0].judgeID,
                type: rm.data[0].type,
                style: "判断题",
                content: rm.data[0].content,
                chapter: "难题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else{
              var data = {
                questionID: rm.data[0].judgeID,
                type: rm.data[0].type,
                style: "判断题",
                content: rm.data[0].content,
                chapter: that.data.chapter[rm.data[0].chapter-1]
              }
              temp.push(data);
              that.setData({list: temp});
            }
          })
        }
        if(res.data[i].questionID[0] == "b"){
          db.collection("blank").where({
            blankID: res.data[i].questionID,
            type: res.data[i].type
          }).get().then(rm => {
            if(rm.data[0].type == 1){
              var data = {
                questionID: rm.data[0].blankID,
                type: rm.data[0].type,
                style: "填空题",
                content: rm.data[0].content,
                chapter: "挑战题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else if(rm.data[0].type == 2){
              var data = {
                questionID: rm.data[0].blankID,
                type: rm.data[0].type,
                style: "填空题",
                content: rm.data[0].content,
                chapter: "难题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else{
              var data = {
                questionID: rm.data[0].blankID,
                type: rm.data[0].type,
                style: "填空题",
                content: rm.data[0].content,
                chapter: that.data.chapter[rm.data[0].chapter-1]
              }
              temp.push(data);
              that.setData({list: temp});
            }
          })
        }
      }
    })
  },

  onTapNavigateTo: function(e){
    var quesid = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    if(quesid[0] == "s"){
      wx.navigateTo({
        url: '../s_mistake/s_mistake?quesid=' + quesid + "&type=" + type,
      })
    }
    if(quesid[0] == "m"){
      wx.navigateTo({
        url: '../m_mistake/m_mistake?quesid=' + quesid + "&type=" + type,
      })
    }
    if(quesid[0] == "j"){
      wx.navigateTo({
        url: '../j_mistake/j_mistake?quesid=' + quesid + "&type=" + type,
      })
    }
    if(quesid[0] == "b"){
      wx.navigateTo({
        url: '../b_mistake/b_mistake?quesid=' + quesid + "&type=" + type,
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
    var studentid = wx.getStorageSync('id');
    var that = this;
    var num = that.data.list.length
    db.collection("mistake").where({
      studentID: studentid
    }).skip(num).get().then(res => {
      var temp = that.data.list;
      for(var i = 0; i < res.data.length; i++){
        if(res.data[i].questionID[0] == "s"){
          db.collection("sinChoice").where({
            sinID: res.data[i].questionID,
            type: res.data[i].type
          }).get().then(rm => {
            if(rm.data[0].type == 1){
              var data = {
                questionID: rm.data[0].sinID,
                type: rm.data[0].type,
                style: "单选题",
                content: rm.data[0].content,
                chapter: "挑战题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else if(rm.data[0].type == 2){
              var data = {
                questionID: rm.data[0].sinID,
                type: rm.data[0].type,
                style: "单选题",
                content: rm.data[0].content,
                chapter: "难题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else{
              var data = {
                questionID: rm.data[0].sinID,
                type: rm.data[0].type,
                style: "单选题",
                content: rm.data[0].content,
                chapter: that.data.chapter[rm.data[0].chapter-1]
              }
              temp.push(data);
              that.setData({list: temp});
            }
          })
        }
        if(res.data[i].questionID[0] == "m"){
          db.collection("mulChoice").where({
            mulID: res.data[i].questionID,
            type: res.data[i].type
          }).get().then(rm => {
            if(rm.data[0].type == 1){
              var data = {
                questionID: rm.data[0].mulID,
                type: rm.data[0].type,
                style: "多选题",
                content: rm.data[0].content,
                chapter: "挑战题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else if(rm.data[0].type == 2){
              var data = {
                questionID: rm.data[0].mulID,
                type: rm.data[0].type,
                style: "多选题",
                content: rm.data[0].content,
                chapter: "难题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else{
              var data = {
                questionID: rm.data[0].mulID,
                type: rm.data[0].type,
                style: "多选题",
                content: rm.data[0].content,
                chapter: that.data.chapter[rm.data[0].chapter-1]
              }
              temp.push(data);
              that.setData({list: temp});
            }
          })
        }
        if(res.data[i].questionID[0] == "j"){
          db.collection("judgement").where({
            judgeID: res.data[i].questionID,
            type: res.data[i].type
          }).get().then(rm => {
            if(rm.data[0].type == 1){
              var data = {
                questionID: rm.data[0].judgeID,
                type: rm.data[0].type,
                style: "判断题",
                content: rm.data[0].content,
                chapter: "挑战题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else if(rm.data[0].type == 2){
              var data = {
                questionID: rm.data[0].judgeID,
                type: rm.data[0].type,
                style: "判断题",
                content: rm.data[0].content,
                chapter: "难题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else{
              var data = {
                questionID: rm.data[0].judgeID,
                type: rm.data[0].type,
                style: "判断题",
                content: rm.data[0].content,
                chapter: that.data.chapter[rm.data[0].chapter-1]
              }
              temp.push(data);
              that.setData({list: temp});
            }
          })
        }
        if(res.data[i].questionID[0] == "b"){
          db.collection("blank").where({
            blankID: res.data[i].questionID,
            type: res.data[i].type
          }).get().then(rm => {
            if(rm.data[0].type == 1){
              var data = {
                questionID: rm.data[0].blankID,
                type: rm.data[0].type,
                style: "填空题",
                content: rm.data[0].content,
                chapter: "挑战题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else if(rm.data[0].type == 2){
              var data = {
                questionID: rm.data[0].blankID,
                type: rm.data[0].type,
                style: "填空题",
                content: rm.data[0].content,
                chapter: "难题"
              }
              temp.push(data);
              that.setData({list: temp});
            }else{
              var data = {
                questionID: rm.data[0].blankID,
                type: rm.data[0].type,
                style: "填空题",
                content: rm.data[0].content,
                chapter: that.data.chapter[rm.data[0].chapter-1]
              }
              temp.push(data);
              that.setData({list: temp});
            }
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})