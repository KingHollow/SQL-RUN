// pages/cheak/cheak.js
const app = getApp();
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusList: [{//顶部状态按钮
      "statusName": "提问的答案",
      "id": "question"
    },
    {
      "statusName": "挑战题目",
      "id": "challenge"
    },
    ],
    isChecked: "question" ,//判断是否选中
    list1:[],
    list2:[],
  },
  //绑定顶部状态切换的点击事件
  choiceStatus: function (e) {
    var that = this;
    var code = e.currentTarget.id;
    that.setData({
      isChecked: code
    })
  },

  checkanswer: function(e) {
    var quesid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../check_answer/check_answer?quesid=' + quesid,
    })
  },

  checkchallenge: function(e) {
    var chalid = e.currentTarget.dataset.id;
    if(chalid[0] == "s"){
      wx.navigateTo({
        url: '../s_checkchal/s_checkchal?chalid=' + chalid,
      })
    }
    if(chalid[0] == "m"){
      wx.navigateTo({
        url: '../m_checkchal/m_checkchal?chalid=' + chalid,
      })
    }
    if(chalid[0] == "j"){
      wx.navigateTo({
        url: '../j_checkchal/j_checkchal?chalid=' + chalid,
      })
    }
    if(chalid[0] == "b"){
      wx.navigateTo({
        url: '../b_checkchal/b_checkchal?chalid=' + chalid,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = wx.getStorageSync('id');
    var temp1 = [];
    var temp2 = [];
    db.collection("teacher").where({teacherID: id}).get().then(r => {
      if(r.data.length != 0){
        db.collection("class").where({teacherID: id}).get().then(res => {
          for(var i = 0; i < res.data.length; i++){
            db.collection("question").where({
              classID: res.data[i].classID,
              flag: 1
            }).get().then(rm => {
              for(var j = 0; j < rm.data.length; j++){
                var data = {
                  quesid: rm.data[j].quesID,
                  sname: rm.data[j].stuName,
                  cname: rm.data[j].className,
                  content: rm.data[j].content
                }
                temp1.push(data);
                that.setData({list1: temp1});
              }
            })
            db.collection("challenge").where({
              classID: res.data[i].classID,
              state: 0
            }).get().then(re => {
              for(var j = 0; j < re.data.length; j++){
                //var count = 0;
                var data = {
                  chalid: re.data[j].questionID,
                  crname: re.data[j].challengerName,
                  cdname: re.data[j].challengedName,
                  cname: re.data[j].className,
                  content: re.data[j].content
                }
                temp2.push(data);
                that.setData({list2: temp2});
                // if(re.data[j].questionID[0] == "s"){
                //   db.collection("sinChoice").where({
                //     sinID: re.data[j].questionID,
                //     type: 1
                //   }).get().then(reso => {
                //     var data = {
                //       chalid: re.data[count].questionID,
                //       crname: re.data[count].challengerName,
                //       cdname: re.data[count].challengedName,
                //       cname: re.data[count].className,
                //       content: reso.data[0].content
                //     }
                //     count++;
                //     temp2.push(data);
                //     that.setData({list2: temp2});
                //   })
                // }
                // if(re.data[j].questionID[0] == "m"){
                //   db.collection("mulChoice").where({
                //     mulID: re.data[j].questionID,
                //     type: 1
                //   }).get().then(reso => {
                //     var data = {
                //       chalid: re.data[count].questionID,
                //       crname: re.data[count].challengerName,
                //       cdname: re.data[count].challengedName,
                //       cname: re.data[count].className,
                //       content: reso.data[0].content
                //     }
                //     count++;
                //     temp2.push(data);
                //     that.setData({list2: temp2});
                //   })
                // }
                // if(re.data[j].questionID[0] == "j"){
                //   db.collection("judgement").where({
                //     judgeID: re.data[j].questionID,
                //     type: 1
                //   }).get().then(reso => {
                //     var data = {
                //       chalid: re.data[count].questionID,
                //       crname: re.data[count].challengerName,
                //       cdname: re.data[count].challengedName,
                //       cname: re.data[count].className,
                //       content: reso.data[0].content
                //     }
                //     count++;
                //     temp2.push(data);
                //     that.setData({list2: temp2});
                //   })
                // }
                // if(re.data[j].questionID[0] == "b"){
                //   db.collection("blank").where({
                //     blankID: re.data[j].questionID,
                //     type: 1
                //   }).get().then(reso => {
                //     var data = {
                //       chalid: re.data[count].questionID,
                //       crname: re.data[count].challengerName,
                //       cdname: re.data[count].challengedName,
                //       cname: re.data[count].className,
                //       content: reso.data[0].content
                //     }
                //     count++;
                //     temp2.push(data);
                //     that.setData({list2: temp2});
                //   })
                // }
              }
            })
          }
        })
      }else{
        db.collection("assist").where({tutorialID: id}).get().then(res => {
          for(var i = 0; i < res.data.length; i++){
            db.collection("question").where({
              classID: res.data[i].classID,
              flag: 1
            }).get().then(rm => {
              for(var j = 0; j < rm.data.length; j++){
                var data = {
                  quesid: rm.data[j].quesID,
                  sname: rm.data[j].stuName,
                  cname: rm.data[j].className,
                  content: rm.data[j].content
                }
                temp1.push(data);
                that.setData({list1: temp1});
              }
            })
            db.collection("challenge").where({
              classID: res.data[i].classID,
              state: 0
            }).get().then(re => {
              for(var j = 0; j < re.data.length; j++){
                //var count = 0;
                var data = {
                  chalid: re.data[j].questionID,
                  crname: re.data[j].challengerName,
                  cdname: re.data[j].challengedName,
                  cname: re.data[j].className,
                  content: re.data[j].content
                }
                temp2.push(data);
                that.setData({list2: temp2});
                // if(re.data[j].questionID[0] == "s"){
                //   db.collection("sinChoice").where({
                //     sinID: re.data[j].questionID,
                //     type: 1
                //   }).get().then(reso => {
                //     var data = {
                //       chalid: re.data[count].questionID,
                //       crname: re.data[count].challengerName,
                //       cdname: re.data[count].challengedName,
                //       cname: re.data[count].className,
                //       content: reso.data[0].content
                //     }
                //     count++;
                //     temp2.push(data);
                //     that.setData({list2: temp2});
                //   })
                // }
                // if(re.data[j].questionID[0] == "m"){
                //   db.collection("mulChoice").where({
                //     mulID: re.data[j].questionID,
                //     type: 1
                //   }).get().then(reso => {
                //     var data = {
                //       chalid: re.data[count].questionID,
                //       crname: re.data[count].challengerName,
                //       cdname: re.data[count].challengedName,
                //       cname: re.data[count].className,
                //       content: reso.data[0].content
                //     }
                //     count++;
                //     temp2.push(data);
                //     that.setData({list2: temp2});
                //   })
                // }
                // if(re.data[j].questionID[0] == "j"){
                //   db.collection("judgement").where({
                //     judgeID: re.data[j].questionID,
                //     type: 1
                //   }).get().then(reso => {
                //     var data = {
                //       chalid: re.data[count].questionID,
                //       crname: re.data[count].challengerName,
                //       cdname: re.data[count].challengedName,
                //       cname: re.data[count].className,
                //       content: reso.data[0].content
                //     }
                //     count++;
                //     temp2.push(data);
                //     that.setData({list2: temp2});
                //   })
                // }
                // if(re.data[j].questionID[0] == "b"){
                //   db.collection("blank").where({
                //     blankID: re.data[j].questionID,
                //     type: 1
                //   }).get().then(reso => {
                //     var data = {
                //       chalid: re.data[count].questionID,
                //       crname: re.data[count].challengerName,
                //       cdname: re.data[count].challengedName,
                //       cname: re.data[count].className,
                //       content: reso.data[0].content
                //     }
                //     count++;
                //     temp2.push(data);
                //     that.setData({list2: temp2});
                //   })
                // }
              }
            })
          }
        })
      }
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
    app.editTabBar1();    //显示自定义的底部导航
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