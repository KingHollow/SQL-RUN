// pages/dismiss_class/dismiss_class.js

const db = wx.cloud.database();
var choosed = [];

Page({
  data: {
    class: {}
  },

  onLoad: function (options) {
    let that = this;
    var id = wx.getStorageSync('id');
    db.collection("class").where({
      teacherID: id
    }).get({
      success(res) {
        console.log('res.data: ', res.data)
        var _collections = new Array()
        for (var i = 0; i < res.data.length; i++) {
          // console.log(i, res.data[i])
          _collections.push(JSON.parse(JSON.stringify(res.data[i])))
          console.log("s")
        }
        for (var j = 0; j < _collections.length; j++) {
          console.log("_collections[" + j + "]=" + _collections[j])
          //_collections.push(JSON.parse(res.data[i]))
        }
        that.setData({
          class: _collections,
        })
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  data: {
    toView: 'green',
    scrollTop: 100
  },

  upper: function (e) {
    console.log(e)
  },

  lower: function (e) {
    console.log(e)
  },

  scroll: function (e) {
    console.log(e)
  },

  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  checkboxChange: function (e) {
    console.log(e.detail.value)
    choosed = e.detail.value;
  },

  dismissclass: function (e) {
    wx.showModal({
      titel: "提示",
      content: "确定要解散班级吗？",
      duration:3000,
      success(res){
        if(res.confirm){
          for (var i = 0; i < choosed.length; i++) {
            var ids = [];
            db.collection("class").where({
              classID: choosed[i]
            }).get().then(res => {
              var _id = res.data[0]._id;
              ids.push(_id);
              if (choosed.length == ids.length) {
                for (var j = 0; j < ids.length; j++) {
                  console.log(ids[j]);
                  db.collection("class").doc(ids[j]).remove({
                    success: res => {
                      wx.showToast({
                        title: '解散成功',
                      })
                    },
                    fail: err => {
                      wx.showToast({
                        icon: 'none',
                        title: '解散失败',
                      })
                      console.error('[数据库] [删除记录] 失败：', err)
                    }
                  })
                }
                wx.redirectTo({
                  url: '../tmine/tmine',
                })
              }
            })
          }
        }
      }
    });
  }
})