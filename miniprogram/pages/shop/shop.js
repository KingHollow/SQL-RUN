// pages/shop/shop.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rocket:'9',
    peal:'6',
    card:'3',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  buyRocket:function() {
    wx.showModal({
      title: '购买提示',
      content: '请问是否购买加速火箭',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          var id = wx.getStorageSync('id');
          db.collection("student").where({
            studentID: id,
          }).get().then(res => {
            var coin = res.data[0].coin;
            var rockets = res.data[0].rockets;
            if (coin < 9) {
              wx.showToast({
                title: '余额不足',          
                icon: 'error',          
                duration: 2000//持续的时           
              })
            } else {
              rockets = rockets+1;
              coin = coin-9;
              wx.cloud.callFunction({
                name: "updatetool", //云函数名
                data: {
                  id: id,
                  coin:coin,
                  tool:"rockets",
                  tooln:rockets
                }
              }).then(res => {
                console.log('更新Sharelist数据库成功')
              })
              wx.showToast({ 
                title: '购买成功',           
                icon: 'success',           
                duration: 2000//持续的时间          
              })
            }        
          })
        } else {//这里是点击了取消以后 
          console.log('用户点击取消')
        }
      }
    })
  },

  buyPeal:function() {
    wx.showModal({
      title: '购买提示',
      content: '请问是否购买香蕉皮',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          var id = wx.getStorageSync('id');
          db.collection("student").where({
            studentID: id,
          }).get().then(res => {
            var coin = res.data[0].coin;
            var peals = res.data[0].peals;
            if (coin < 6) {
              wx.showToast({
                title: '余额不足',           
                icon: 'error',      
                duration: 2000//持续的时间          
              })
            } else {
              peals = peals+1;
              coin = coin-6;
              wx.cloud.callFunction({
                name: "updatetool", //云函数名
                data: {
                  id: id,
                  coin:coin,
                  tool:"peals",
                  tooln:peals
                }
              }).then(res => {
                console.log('更新Sharelist数据库成功')
              })
              wx.showToast({ 
                title: '购买成功',           
                icon: 'success',           
                duration: 2000//持续的时间          
              })
            }        
          })
        } else {//这里是点击了取消以后 
          console.log('用户点击取消')
        }
      }
    })
  },

  buyPass:function() {
    wx.showModal({
      title: '购买提示',
      content: '请问是否购买pass卡',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          var id = wx.getStorageSync('id');
          db.collection("student").where({
            studentID: id,
          }).get().then(res => {
            var coin = res.data[0].coin;
            var cards = res.data[0].cards;
            if (coin < 3) {
              wx.showToast({
                title: '余额不足',          
                icon: 'error',       
                duration: 2000//持续的时间        
              })
            } else {
              cards = cards+1;
              coin = coin-3;
              wx.cloud.callFunction({
                name: "updatetool", //云函数名
                data: {
                  id: id,
                  coin:coin,
                  tool:"cards",
                  tooln:cards
                }
              }).then(res => {
                console.log('更新Sharelist数据库成功')
              })
              wx.showToast({ 
                title: '购买成功',           
                icon: 'success',           
                duration: 2000//持续的时间          
              })
            }        
          })
        } else {//这里是点击了取消以后 
          console.log('用户点击取消')
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