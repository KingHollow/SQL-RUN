const db = wx.cloud.database();
// pages/add_challenge/add_challenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArray1: [{
      "text": "第一章"
    }, {
      "text": "第二章"
    }, {
      "text": "第三章"
    }, {
      "text": "第四章"
    }, {
      "text": "第五章"
    }, {
      "text": "第六章"
    }, {
      "text": "第七章"
    }, {
      "text": "第八章"
    }, {
      "text": "第九章"
    }, {
      "text": "第十章"
    }],
    selectArray2: [{
      "text": "1"
    }, {
      "text": "2"
    }, {
      "text": "3"
    }, {
      "text": "4"
    }, {
      "text": "5"
    }],
    chapter: 0,
    level: 0,
    quesid: ""
  },

  chooseData:function(e){
    if(e.detail.text == "第一章") this.setData({chapter: 1});
    if(e.detail.text == "第二章") this.setData({chapter: 2});
    if(e.detail.text == "第三章") this.setData({chapter: 3});
    if(e.detail.text == "第四章") this.setData({chapter: 4});
    if(e.detail.text == "第五章") this.setData({chapter: 5});
    if(e.detail.text == "第六章") this.setData({chapter: 6});
    if(e.detail.text == "第七章") this.setData({chapter: 7});
    if(e.detail.text == "第八章") this.setData({chapter: 8});
    if(e.detail.text == "第九章") this.setData({chapter: 9});
    if(e.detail.text == "第十章") this.setData({chapter: 10});
    if(e.detail.text == "1") this.setData({level: 1});
    if(e.detail.text == "2") this.setData({level: 2});
    if(e.detail.text == "3") this.setData({level: 3});
    if(e.detail.text == "4") this.setData({level: 4});
    if(e.detail.text == "5") this.setData({level: 5});
  },

  addChallenge:function(){
    if(this.data.chapter == 0){
      wx.showModal({
        content: "请选择题目的章节",
      })
    }else if(this.data.level == 0){
      wx.showModal({
        content: "请选择题目的难度",
      })
    }else{
      var that = this;
      if(that.data.quesid[0] == "s"){
        db.collection("sinChoice").where({
          sinID: that.data.quesid,
          type: 1
        }).get().then(res => {
          var type = "s0" + ("00" + that.data.chapter.toString()).substr(("00" + that.data.chapter.toString()).length-2);
          db.collection("quantity").where({
            type: type
          }).get().then(rm => {
            var number = rm.data[0].number;
            var temp = "00000" + (number + 1).toString()
            var sinid = "s" + that.data.chapter.toString().substring(that.data.chapter.toString().length - 1, that.data.chapter.toString().length) + temp.substring(temp.length - 5, temp.length);
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updatequantity',
              // 传给云函数的参数
              data: {
                number: number + 1,
                type: type
              },
            })
            db.collection("sinChoice").add({
              data: {
                sinID: sinid,
                type: 0,
                options: res.data[0].options,
                level: this.data.level,
                content: res.data[0].content,
                chapter: this.data.chapter,
                answer: res.data[0].answer
              }
            })
            wx.redirectTo({
              url: '../task/task',
            })
          })
        })
      }
      if(that.data.quesid[0] == "m"){
        db.collection("mulChoice").where({
          mulID: that.data.quesid,
          type: 1
        }).get().then(res => {
          var type = "m0" + ("00" + that.data.chapter.toString()).substr(("00" + that.data.chapter.toString()).length-2);
          db.collection("quantity").where({
            type: type
          }).get().then(rm => {
            var number = rm.data[0].number;
            var temp = "00000" + (number + 1).toString()
            var mulid = "m" + that.data.chapter.toString().substring(that.data.chapter.toString().length - 1, that.data.chapter.toString().length) + temp.substring(temp.length - 5, temp.length);
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updatequantity',
              // 传给云函数的参数
              data: {
                number: number + 1,
                type: type
              },
            })
            db.collection("mulChoice").add({
              data: {
                mulID: mulid,
                type: 0,
                options: res.data[0].options,
                level: this.data.level,
                content: res.data[0].content,
                chapter: this.data.chapter,
                answer: res.data[0].answer
              }
            })
            wx.redirectTo({
              url: '../task/task',
            })
          })
        })
      }
      if(that.data.quesid[0] == "j"){
        db.collection("judgement").where({
          judgeID: that.data.quesid,
          type: 1
        }).get().then(res => {
          var type = "j0" + ("00" + that.data.chapter.toString()).substr(("00" + that.data.chapter.toString()).length-2);
          db.collection("quantity").where({
            type: type
          }).get().then(rm => {
            var number = rm.data[0].number;
            var temp = "00000" + (number + 1).toString()
            var judgeid = "j" + that.data.chapter.toString().substring(that.data.chapter.toString().length - 1, that.data.chapter.toString().length) + temp.substring(temp.length - 5, temp.length);
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updatequantity',
              // 传给云函数的参数
              data: {
                number: number + 1,
                type: type
              },
            })
            db.collection("judgement").add({
              data: {
                judgeID: judgeid,
                type: 0,
                level: this.data.level,
                content: res.data[0].content,
                chapter: this.data.chapter,
                answer: res.data[0].answer
              }
            })
            wx.redirectTo({
              url: '../task/task',
            })
          })
        })
      }
      if(that.data.quesid[0] == "b"){
        db.collection("blank").where({
          blankID: that.data.quesid,
          type: 1
        }).get().then(res => {
          var type = "b0" + ("00" + that.data.chapter.toString()).substr(("00" + that.data.chapter.toString()).length-2);
          db.collection("quantity").where({
            type: type
          }).get().then(rm => {
            var number = rm.data[0].number;
            var temp = "00000" + (number + 1).toString()
            var blankid = "b" + that.data.chapter.toString().substring(that.data.chapter.toString().length - 1, that.data.chapter.toString().length) + temp.substring(temp.length - 5, temp.length);
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updatequantity',
              // 传给云函数的参数
              data: {
                number: number + 1,
                type: type
              },
            })
            db.collection("blank").add({
              data: {
                blankID: blankid,
                type: 0,
                level: this.data.level,
                content: res.data[0].content,
                chapter: this.data.chapter,
                answer: res.data[0].answer
              }
            })
            wx.redirectTo({
              url: '../task/task',
            })
          })
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var quesid = options.quesid
    this.setData({quesid: quesid});
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

  },

  chooseData1:function(e){
    
  },
  chooseData2:function(e){
    
  },
})