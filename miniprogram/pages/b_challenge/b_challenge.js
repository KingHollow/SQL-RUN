// pages/b_challenge/b_challenge.js
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
    content: "",
    challengedID: "",
    challengedName: "",
    challengerID: "",
    challengerName: "",
    classID: "",
    className: ""
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

  contentinput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  turntochallenge:function(){
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
          db.collection("quantity").where({type: "b1"}).get().then(res => {
            console.log(res)
            number = res.data[0].number;
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updatequantity',
              // 传给云函数的参数
              data: {
                number: number + 1,
                type: "b1"
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
                type: 1,
                blankID: blankid,
                answer: temp3
              }
            });
            var time = formatTime(new Date());
            db.collection("challenge").add({
              data: {
                challengedID: that.data.challengedID,
                challengedName: that.data.challengedName,
                challengerID: that.data.challengerID,
                challengerName: that.data.challengerName,
                classID: that.data.classID,
                className: that.data.className,
                content: that.data.content,
                questionID: blankid,
                state: 0,
                time: time
              }
            })
          })
          wx.showToast({
            title: '发起成功',
          })
          var id = wx.getStorageSync('id')
          db.collection('student').where({studentID: id}).get().then(r => {
            wx.cloud.callFunction({
              // 云函数名称
              name: 'updatestudent',
              // 传给云函数的参数
              data: {
                studentID: id,
                challenge: r.data[0].challenge + 1
              },
            })
          })
          wx.redirectTo({
            url: '../rank/rank',
          })
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    var challengedid = options.challengedid;
    db.collection("student").where({
      studentID: id
    }).get().then(res => {
      this.setData({
        challengerID: id,
        challengerName: res.data[0].name
      })
      db.collection("class").where({
        classID: res.data[0].classID
      }).get().then(rm => {
        this.setData({
          classID: rm.data[0].classID,
          className: rm.data[0].name
        })
      })
    })
    db.collection("student").where({
      studentID: challengedid
    }).get().then(r => {
      this.setData({
        challengedID: challengedid,
        challengedName: r.data[0].name
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