// pages/homework_list/homework_list.js

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    selectArray: [{
      "text": "全部"
    }, {
      "text": "第一章"
    }, {
      "text": "第二章"
    }, {
      "text": "第三章"
    }, {
      "text": "第四章"
    }, {
      "text": "第五章"
    }, {
      "text": "第六章"
    }, {
      "text": "第七章"
    }, {
      "text": "第八章"
    }, {
      "text": "第九章"
    }, {
      "text": "第十章"
    }],
    chapter: "",
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    wx.setStorageSync('type', type);
    this.init(type);
    this.setData({type: type})
  },

  init: function(type, chapter=""){
    this.setData({list: []})
    if(type == "s") {
      db.collection("sinChoice").where({
        type: 0,
        sinID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 's' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get().then(res => {
        var temp = [];
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].sinID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
    if(type == "m") {
      db.collection("mulChoice").where({
        type: 0,
        mulID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 'm' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get().then(res => {
        var temp = [];
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].mulID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
    if(type == "j") {
      db.collection("judgement").where({
        type: 0,
        judgeID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 'j' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get().then(res => {
        var temp = [];
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].judgeID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
    if(type == "b") {
      db.collection("blank").where({
        type: 0,
        blankID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 'b' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get().then(res => {
        var temp = [];
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].blankID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
    if(type == "o") {
      db.collection("subjective").where({
        type: 0,
        subID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 'o' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get().then(res => {
        var temp = [];
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].subID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
  },

  chooseData:function(e){
    if(e.detail.text == "全部"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "");
    } 
    if(e.detail.text == "第一章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "1");
    } 
    if(e.detail.text == "第二章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "2");
    }  
    if(e.detail.text == "第三章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "3");
    }
    if(e.detail.text == "第四章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "4");
    }
    if(e.detail.text == "第五章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "5");
    }
    if(e.detail.text == "第六章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "6");
    }
    if(e.detail.text == "第七章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "7");
    }
    if(e.detail.text == "第八章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "8");
    }
    if(e.detail.text == "第九章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "9");
    }
    if(e.detail.text == "第十章"){
      this.setData({chapter: ""})
      this.init(wx.getStorageSync('type'), "0");
    }
  },

  onTapNavigateTo: function(e){
    var id = e.currentTarget.dataset.id;
    if(id.charAt(0) == "s"){
      wx.navigateTo({
        url: '../../pages/s_list/s_list?id=' + id,
      })
    };
    if(id.charAt(0) == "m"){
      wx.navigateTo({
        url: '../../pages/m_list/m_list?id=' + id,
      })
    };
    if(id.charAt(0) == "j"){
      wx.navigateTo({
        url: '../../pages/j_list/j_list?id=' + id,
      })
    };
    if(id.charAt(0) == "b"){
      wx.navigateTo({
        url: '../../pages/b_list/b_list?id=' + id,
      })
    };
    if(id.charAt(0) == "o"){
      wx.navigateTo({
        url: '../../pages/o_list/o_list?id=' + id,
      })
    };
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
    var that = this
    var num = that.data.list.length
    var type = that.data.type
    var chapter = that.data.chapter
    if(type == "s") {
      db.collection("sinChoice").where({
        type: 0,
        sinID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 's' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).skip(num).get().then(res => {
        var temp = that.data.list;
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].sinID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
    if(type == "m") {
      db.collection("mulChoice").where({
        type: 0,
        mulID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 'm' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).skip(num).get().then(res => {
        var temp = that.data.list;
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].mulID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
    if(type == "j") {
      db.collection("judgement").where({
        type: 0,
        judgeID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 'j' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).skip(num).get().then(res => {
        var temp = that.data.list;
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].judgeID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
    if(type == "b") {
      db.collection("blank").where({
        type: 0,
        blankID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 'b' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).skip(num).get().then(res => {
        var temp = that.data.list;
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].blankID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
    if(type == "o") {
      db.collection("subjective").where({
        type: 0,
        subID: { //columnName表示欲模糊查询数据所在列的名
          $regex: 'o' + chapter + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).skip(num).get().then(res => {
        var temp = that.data.list;
        for(var i = 0; i < res.data.length; i++){
          var data = {
            ID: res.data[i].subID,
            content: res.data[i].content
          }
          temp.push(data);
        }
        this.setData({list: temp});
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})