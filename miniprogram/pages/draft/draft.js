// pages/draft/draft.js

const db = wx.cloud.database().collection("homework")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homework: []
  },

  onTapNavigateTo: function(e){
    var homeworkid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../draft_detail/draft_detail?homeworkid=' + homeworkid,
    })
  },

  onLoad: function (options) {
    let that = this;
    var id = wx.getStorageSync('id');
    db.where({
      teacherID: id,
      type: 0
    }).get({
      success(res) {
        var temp = [];
        for(var i = 0; i < res.data.length; i++){
          var data = {
            homeworkid: res.data[i].homeworkID,
            name: res.data[i].name
          }
          temp.push(data);
        }
        that.setData({
          homework: temp
        })
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onShow: function(options){
    let that = this;
    var id = wx.getStorageSync('id');
    db.where({
      teacherID: id,
      type: 0
    }).get({
      success(res) {
        var temp = [];
        for(var i = 0; i < res.data.length; i++){
          var data = {
            homeworkid: res.data[i].homeworkID,
            name: res.data[i].name
          }
          temp.push(data);
        }
        that.setData({
          homework: temp
        })
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  
})