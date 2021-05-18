// pages/askme/askme.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = wx.getStorageSync('id');
    db.collection("student").where({
      studentID: id
    }).get().then(r => {
      var classid = r.data[0].classID;
      db.collection("question").where({
        classID: classid
      }).get().then(res => {
        var temp = [];
        for(var i = 0; i < res.data.length; i++){
          if(res.data[i].stuID != id){
            var flag = 0;
            var result = "";
            for(var j = 0; j < res.data[i].answers.length; j++){
              if(res.data[i].answers[j].id == id){
                flag = 1;
                result = res.data[i].answers[j].result;
              }
            }
            if(flag == 0){
              var data = {
                quesID: res.data[i].quesID,
                content: res.data[i].content,
                stuName: res.data[i].stuName,
                result: '0'
              }
              temp.push(data);
              that.setData({question: temp});
            }else{
              if(result == ""){
                var data = {
                  quesID: res.data[i].quesID,
                  content: res.data[i].content,
                  stuName: res.data[i].stuName,
                  result: '1'
                }
                temp.push(data);
                that.setData({question: temp});
              }
              if(result == "pass"){
                var data = {
                  quesID: res.data[i].quesID,
                  content: res.data[i].content,
                  stuName: res.data[i].stuName,
                  result: '2'
                }
                temp.push(data);
                that.setData({question: temp});
              }
              if(result == "nopass"){
                var data = {
                  quesID: res.data[i].quesID,
                  content: res.data[i].content,
                  stuName: res.data[i].stuName,
                  result: '3'
                }
                temp.push(data);
                that.setData({question: temp});
              }
            }
          }
        }
      })
    })
  },

  GotoQuestion: function(e){
    var quesid = e.currentTarget.dataset.id;
    var result = e.currentTarget.dataset.result;
    if(result == '0'){
      wx.navigateTo({
        url: '../askme_detail/askme_detail?quesid=' + quesid,
      })
    }else{
      wx.navigateTo({
        url: '../tellyou_detail/tellyou_detail?quesid=' + quesid,
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