// pages/b_respond/b_respond.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"按照报表的数据组织形式、显示方式和作用的不同，Access中的报表可以分为4种基本类型，它们分别是：纵栏式报表、_____报表、图表报表和标签报表。",
    nbanswer: [ 
      {value:'表格式'},
      {value:'blank'},
      {value:'也是表格式'},
  ],
    answer:[]
  },

  answerInput:function(e)
  {
    var idx = e.currentTarget.dataset.index; //当前下标
    console.log(idx)
    var val = e.detail.value; //当前输入的值
    console.log(val)
    var _list = this.data.answer; //data中存放的数据
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list[i] = { val } //将当前输入的值放到数组中对应的位置
      }
    }
    this.setData({
      answer: _list
    })
    console.log(this.data.answer)
  },

  submit:function(){
    var that=this
    wx.showModal({  
      content: '是否确认提交？',  
      success: function(res) {
          if (res.confirm) {
            var flag=false
            for(var index in that.data.answer){
              if(that.data.answer[index]!=''){
                flag=true
              }
            }
            if(flag){
              wx.showToast({
                title: '完成挑战！',
                icon: 'success', 
                duration: 1500 
              })
            } 
            else{
              wx.showToast({
                title: '还未作答,无法提交！',
                icon:'none',
                duration: 1500 
              })
            }
          } else if (res.cancel) {  
          }  
      }  
  })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for(var index in this.data.nbanswer){
      this.data.answer.push("")
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