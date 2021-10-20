// pages/class/class.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    period: [
      {value: "本周", checked: true},
      {value: "本学期"}
    ],
    timechoosed: "本周",
    selectArray: [],
    classids: [],
    classchoosed: "",
    student:[]
  },

  radioChange: function (e){
    this.setData({timechoosed: e.detail.value});
    this.init(this.data.timechoosed, this.data.classchoosed);
  },

  chooseData: function(e){
    for(var i = 0; i < this.data.selectArray.length; i++){
      if(this.data.selectArray[i].text == e.detail.text){
        this.setData({classchoosed: this.data.classids[i]})
      }
    }
    this.init(this.data.timechoosed, this.data.classchoosed);
  },

  init: function(time, classid){
    this.setData({student: []})
    var that = this;
    if(time != "" && classid != ""){
      if(time == "本周"){
        var temp = [];
        db.collection("student").where({classID: classid}).orderBy("point", "desc").get().then(res1 => {
          db.collection("student").where({classID: classid}).orderBy("point", "desc").skip(20).get().then(res2 => {
            db.collection("student").where({classID: classid}).orderBy("point", "desc").skip(40).get().then(res3 => {
              var temp1 = res1.data.concat(res2.data.concat(res3.data))
              for(var i = 0; i < temp1.length; i++){
                var data = {
                  name: temp1[i].name,
                  score: temp1[i].point
                }
                temp.push(data);
                that.setData({student: temp});
              }
            })
          })
        })
      }else{
        var temp = [];
        db.collection("student").where({classID: classid}).orderBy("experience", "desc").get().then(res1 => {
          db.collection("student").where({classID: classid}).orderBy("experience", "desc").skip(20).get().then(res2 => {
            db.collection("student").where({classID: classid}).orderBy("experience", "desc").skip(40).get().then(res3 => {
              var temp1 = res1.data.concat(res2.data.concat(res3.data))
              for(var i = 0; i < temp1.length; i++){
                var data = {
                  name: temp1[i].name,
                  score: temp1[i].experience
                }
                temp.push(data);
                that.setData({student: temp});
              }
            })
          })
        })
      }
    }
  },

  correct:function(e){
    wx.navigateTo({
      url: '../correct/correct',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    var that = this;
    db.collection("teacher").where({teacherID: id}).get().then(r => {
      if(r.data.length != 0){
        db.collection("class").where({teacherID: id}).get().then(res => {
          var temp1 = [];
          var temp2 = [];
          for(var i = 0; i < res.data.length; i++){
            var data = {text: res.data[i].name};
            temp1.push(data);
            temp2.push(res.data[i].classID);
          }
          that.setData({
            selectArray: temp1,
            classids: temp2
          })
        })
      }else{
        db.collection("assist").where({tutorialID: id}).get().then(res => {
          var temp1 = [];
          var temp2 = [];
          for(var i = 0; i < res.data.length; i++){
            var data = {text: res.data[i].name};
            temp1.push(data);
            temp2.push(res.data[i].classID);
          }
          that.setData({
            selectArray: temp1,
            classids: temp2
          })
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