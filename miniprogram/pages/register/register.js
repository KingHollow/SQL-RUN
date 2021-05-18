// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onRegister: function(e) {
    var page = this;
    const db = wx.cloud.database();
    const users = db.collection("student");
    var userid = e.detail.value.userid;
    var password1 = e.detail.value.password1;
    var password2 = e.detail.value.password2;
    var classid = e.detail.value.classid;
    var name = e.detail.value.name;

    users.where({
      studentID: userid
    }).get().then(res => {
      if (res.data.length) {
        wx.showModal({
          title: "提示",
          content: "学号已被占用，请重新输入"
        })
      } else if (!userid.length || !password1.length || !password2.length || !classid.length || !name.length) {
        wx.showModal({
          title: "提示",
          content: "请填完所有必要信息"
        })
      }else{
        if (userid.length != 10 || !(/(^[0-9]*$)/.test(userid))) {
          wx.showModal({
            titel: "提示",
            content: "请输入正确的学号"
          })
        } else if (password1 != password2) {
          wx.showModal({
            titel: "提示",
            content: "两次密码不一致"
          })
        } else if (password1.length < 6) {
          wx.showModal({
            titel: "提示",
            content: "请输入6位及以上密码"
          })
        } else if ((password1.search(/[a-z]/) == -1 & password1.search(/[A-Z]/) == -1 )|| password1.search(/\d/) == -1) {
          wx.showModal({
            titel: "提示",
            content: "密码必须同时包含字母和数字"
          })
        } else {
          // users.add({
          //   data: {
          //     studentID: userid,
          //     password: password1,
          //     name: name,
          //     point: 0,
          //     exxperience: 0,
          //     coin: 0,
          //     classID: classid
          //   }
          // })
          db.collection("class").where({classID: classid}).get().then(rm => {
            if(rm.data.length != 0){
              users.add({
                data: {
                  studentID: userid,
                  password: password1,
                  name: name,
                  point: 0,
                  experience: 0,
                  coin: 0,
                  classID: classid
                }
              })
              wx.showModal({
                titel: "提示",
                content: "注册成功!请登录",
                duration:3000,
                success(res){
                  wx.redirectTo({
                    url: '../login/login',
                  })
                }
              });
            } else {
              wx.showModal({
                titel: "提示",
                content: "请输入已被创建的班级代号"
              })
            }
          })
          
          
        }
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