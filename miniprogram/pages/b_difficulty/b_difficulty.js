// pages/b_difficulty/b_difficulty.js
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
    conLists: [],
    content: ""
  },

  /**
   * 添加内容
   */
  add(e) {
    // 点击添加按钮，就往数组里添加一条空数据
    var _list = this.data.conLists;
    _list.push("")
    this.setData({
      conLists: _list
    })
  },

  /**
   * 删除内容
   */
  del(e) {
    var idx = e.currentTarget.dataset.index;
    var _list = this.data.conLists;
    console.log(idx)
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list.splice(idx, 1)
      }
    }
    this.setData({
      conLists: _list
    })
  },

  /**
   * 获取输入的内容标题
   */
  changeConTitle(e) {
    var idx = e.currentTarget.dataset.index; //当前下标
    var val = e.detail.value; //当前输入的值
    var _list = this.data.conLists; //data中存放的数据
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list[i] = val //将当前输入的值放到数组中对应的位置
      }
    }
    this.setData({
      conLists: _list
    })
  },

  /**
   * 下一步
   */
  next(e) {
    var _conLists = this.data.conLists;
    console.log('这是模板内容标题数组', _conLists)
    for (let i = 0; i < _conLists.length; i++) {
      if (!_conLists[i]) {
        wx.showToast({
          title: '请输入第' + `${i * 1 + 1}` + '条的模板内容标题！',
          icon: 'none'
        })
        return;
      }
    }
  },

  contentinput:function(e){
    this.setData({
      content: e.detail.value
    })
  },

  turntodifficulty:function(){
    var that = this;
    if (!this.data.content) {
      wx.showModal({
        titel: "提示",
        content: "请输入题目的题干",
        duration: 3000,
        success(re) {}
      });
    } else if (this.data.conLists == 0) {
      wx.showModal({
        titel: "提示",
        content: "请至少输入一个答案",
        duration: 3000,
        success(re) {}
      });
    } else if (this.data.conLists.indexOf("") >= 0) {
      wx.showModal({
        titel: "提示",
        content: "请填入所有的填空答案",
        duration: 3000,
        success(re) {}
      });
    } else {
      wx.showModal({
        titel: "提示",
        content: "确认发起？",
        duration: 3000,
        success(re) {
          var number;
          db.collection("quantity").where({type: "b2"}).get().then(res => {
            console.log(res)
            number = res.data[0].number;
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updatequantity',
              // 传给云函数的参数
              data: {
                number: number + 1,
                type: "b2"
              },
            })
            var temp = "00000" + (number + 1).toString()
            var blankid = "b" + temp.substring(temp.length - 5, temp.length)
            var temp3 = [];
            var temp4 = "";
            var temp5 = [];
            for(var j = 0; j < that.data.conLists.length; j++){
              temp4 = that.data.conLists[j];
              temp5 = [];
              while(temp4.indexOf("，") != -1){
                temp5.push(temp4.substring(0, temp4.indexOf("，")));
                temp4 = temp4.substring(temp4.indexOf("，")+1, temp4.length);
              }
              temp5.push(temp4);
              temp3.push(temp5);
            }
            db.collection("blank").add({
              data: {
                content: that.data.content,
                type: 2,
                blankID: blankid,
                answer: temp3
              }
            });
            var homeworkid;
            var temp1 = formatTime(new Date());
            homeworkid = temp1.substring(0, 4) + temp1.substring(5, 7) + temp1.substring(8, 10) + temp1.substring(11, 13) + temp1.substring(14, 16) + temp1.substring(17, 19);
            var temp2 = [];
            temp2.push(blankid);
            var id = wx.getStorageSync('id');
            db.collection("homework").add({
              data:{
                homeworkID: homeworkid,
                name: "难题",
                problem: temp2,
                teacherID: id,
                type: 1
              }
            });
            db.collection("teacher").where({
              teacherID: id
            }).get().then(rm => {
              if (rm.data.length != 0) {
                db.collection("class").where({teacherID: id}).get().then(r => {
                  for(var i = 0; i < r.data.length; i++){
                    var classid = r.data[i].classID;
                    db.collection("release").add({
                      data:{
                        classID: classid,
                        homeworkID: homeworkid,
                        title: "难题",
                        date: temp1,
                        type: 1,
                        correct: 2
                      }
                    })
                  }
                })
              }else{
                db.collection("assist").where({tutorialID: id}).get().then(r => {
                  for(var i = 0; i < r.data.length; i++){
                    var classid = r.data[i].classID;
                    db.collection("release").add({
                      data:{
                        classID: classid,
                        homeworkID: homeworkid,
                        title: "难题",
                        date: temp1,
                        type: 1,
                        correct: 2
                      }
                    })
                  }
                })
              }
            })
          })
          wx.showToast({
            title: '发布成功',
          })
          wx.navigateBack({
            delta: 2,
          })
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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