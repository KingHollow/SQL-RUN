// pages/homework/homework.js
const db = wx.cloud.database();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //state默认为0
    release:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    var that = this;
    db.collection("student").where({studentID: id}).get().then(r => {
      var classid = r.data[0].classID;
      db.collection("release").where({classID: classid}).get().then(res => {
        var temp = [];
        for(var i = 0; i < res.data.length; i++){
          var count = 0;
          db.collection("result").where({
            homeworkID: res.data[i].homeworkID,
            studentID: id
          }).get().then(rm => {
            if(res.data[count].type == 0){
              if(rm.data.length == 0){
                var nowtime = formatTime(new Date());
                if(nowtime < res.data[count].deadline){
                  var data = {
                    homeworkid: res.data[count].homeworkID,
                    title: res.data[count].title,
                    state: 0,
                    score: "",
                    deadline: res.data[count].deadline
                  }
                  temp.push(data);
                  that.setData({release: temp});
                }else{
                  var data = {
                    homeworkid: res.data[count].homeworkID,
                    title: res.data[count].title,
                    state: 1,
                    score: "",
                    deadline: res.data[count].deadline
                  }
                  temp.push(data);
                  that.setData({release: temp});
                }
              }else{
                var data = {
                  homeworkid: res.data[count].homeworkID,
                  title: res.data[count].title,
                  state: rm.data[0].state,
                  score: rm.data[0].score,
                  deadline: res.data[count].deadline
                }
                temp.push(data);
                that.setData({release: temp});
              }
            }else{
              if(rm.data.length == 0){
                var data = {
                  homeworkid: res.data[count].homeworkID,
                  title: res.data[count].title,
                  state: 0,
                  score: "",
                  deadline: res.data[count].deadline
                }
                temp.push(data);
                that.setData({release: temp});
              }else{
                var data = {
                  homeworkid: res.data[count].homeworkID,
                  title: res.data[count].title,
                  state: rm.data[0].state,
                  score: rm.data[0].score,
                  deadline: res.data[count].deadline
                }
                temp.push(data);
                that.setData({release: temp});
              }
            }
            count++
          })
        }
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