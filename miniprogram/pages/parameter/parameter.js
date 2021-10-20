// pages/parameter/parameter.js
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

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        value: '第一章'
      },
      {
        value: '第二章'
      },
      {
        value: '第三章'
      },
      {
        value: '第四章'
      },
      {
        value: '第五章'
      },
      {
        value: '第六章'
      },
      {
        value: '第七章'
      },
      {
        value: '第八章'
      },
      {
        value: '第九章'
      },
      {
        value: '第十章'
      }
    ],
    chapter: [],
    sinput: "",
    minput: "",
    jinput: "",
    binput: "",
    oinput: "",
    homeworkname: "",
    number: {}
  },

  HandelItemChange: function (e) {
    this.setData({
      chapter: e.detail.value
    })
  },

  sinput: function (e) {
    this.setData({
      sinput: e.detail.value
    })
  },

  minput: function (e) {
    this.setData({
      minput: e.detail.value
    })
  },

  jinput: function (e) {
    this.setData({
      jinput: e.detail.value
    })
  },

  binput: function (e) {
    this.setData({
      binput: e.detail.value
    })
  },

  oinput: function (e) {
    this.setData({
      oinput: e.detail.value
    })
  },

  form: function () {
    if (this.data.chapter.length == 0) {
      wx.showModal({
        titel: "提示",
        content: "请至少选择一个抽题章节",
        duration: 3000,
        success(re) {}
      });
    } else if (!this.data.sinput && !this.data.minput && !this.data.jinput && !this.data.binput && !this.data.oinput) {
      wx.showModal({
        titel: "提示",
        content: "请至少输入一个题目个数",
        duration: 3000,
        success(re) {}
      });
    } else if ((isNaN(parseInt(this.data.sinput)) && this.data.sinput) || (isNaN(parseInt(this.data.minput)) && this.data.minput) || (isNaN(parseInt(this.data.jinput)) && this.data.jinput) || (isNaN(parseInt(this.data.binput)) && this.data.binput) || (isNaN(parseInt(this.data.oinput)) && this.data.oinput)) {
      wx.showModal({
        titel: "提示",
        content: "请输入数字",
        duration: 3000,
        success(re) {}
      });
    } else if (parseInt(this.data.sinput) > 10 || parseInt(this.data.minput) > 10 || parseInt(this.data.jinput) > 10 || parseInt(this.data.binput) > 10 || parseInt(this.data.oinput) > 10) {
      wx.showModal({
        titel: "提示",
        content: "输入的单个题型请不要多余10",
        duration: 3000,
        success(re) {}
      });
    } else {
      var temp = [];
      var chapter = [];
      if (this.data.chapter.indexOf("第一章") >= 0) chapter.push("1");
      if (this.data.chapter.indexOf("第二章") >= 0) chapter.push("2");
      if (this.data.chapter.indexOf("第三章") >= 0) chapter.push("3");
      if (this.data.chapter.indexOf("第四章") >= 0) chapter.push("4");
      if (this.data.chapter.indexOf("第五章") >= 0) chapter.push("5");
      if (this.data.chapter.indexOf("第六章") >= 0) chapter.push("6");
      if (this.data.chapter.indexOf("第七章") >= 0) chapter.push("7");
      if (this.data.chapter.indexOf("第八章") >= 0) chapter.push("8");
      if (this.data.chapter.indexOf("第九章") >= 0) chapter.push("9");
      if (this.data.chapter.indexOf("第十章") >= 0) chapter.push("10");
      var snum, mnum, jnum, bnum, onum;
      if (isNaN(parseInt(this.data.sinput))) {
        snum = 0;
      } else {
        snum = parseInt(this.data.sinput);
      }
      if (isNaN(parseInt(this.data.minput))) {
        mnum = 0;
      } else {
        mnum = parseInt(this.data.minput);
      }
      if (isNaN(parseInt(this.data.jinput))) {
        jnum = 0;
      } else {
        jnum = parseInt(this.data.jinput);
      }
      if (isNaN(parseInt(this.data.binput))) {
        bnum = 0;
      } else {
        bnum = parseInt(this.data.binput);
      }
      if (isNaN(parseInt(this.data.oinput))) {
        onum = 0;
      } else {
        onum = parseInt(this.data.oinput);
      }
      var that = this;
      db.collection("quantity").get().then(res1 => {
        db.collection("quantity").skip(20).get().then(res2 => {
          db.collection('quantity').skip(40).get().then(res3 => {
            let {
              number
            } = that.data
            number["s001"] = res1.data.concat(res2.data.concat(res3.data))[0].number;
            number["s002"] = res1.data.concat(res2.data.concat(res3.data))[1].number;
            number["s003"] = res1.data.concat(res2.data.concat(res3.data))[2].number;
            number["s004"] = res1.data.concat(res2.data.concat(res3.data))[3].number;
            number["s005"] = res1.data.concat(res2.data.concat(res3.data))[4].number;
            number["s006"] = res1.data.concat(res2.data.concat(res3.data))[5].number;
            number["s007"] = res1.data.concat(res2.data.concat(res3.data))[6].number;
            number["s008"] = res1.data.concat(res2.data.concat(res3.data))[7].number;
            number["s009"] = res1.data.concat(res2.data.concat(res3.data))[8].number;
            number["s010"] = res1.data.concat(res2.data.concat(res3.data))[9].number;
            number["m001"] = res1.data.concat(res2.data.concat(res3.data))[10].number;
            number["m002"] = res1.data.concat(res2.data.concat(res3.data))[11].number;
            number["m003"] = res1.data.concat(res2.data.concat(res3.data))[12].number;
            number["m004"] = res1.data.concat(res2.data.concat(res3.data))[13].number;
            number["m005"] = res1.data.concat(res2.data.concat(res3.data))[14].number;
            number["m006"] = res1.data.concat(res2.data.concat(res3.data))[15].number;
            number["m007"] = res1.data.concat(res2.data.concat(res3.data))[16].number;
            number["m008"] = res1.data.concat(res2.data.concat(res3.data))[17].number;
            number["m009"] = res1.data.concat(res2.data.concat(res3.data))[18].number;
            number["m010"] = res1.data.concat(res2.data.concat(res3.data))[19].number;
            number["b001"] = res1.data.concat(res2.data.concat(res3.data))[20].number;
            number["b002"] = res1.data.concat(res2.data.concat(res3.data))[21].number;
            number["b003"] = res1.data.concat(res2.data.concat(res3.data))[22].number;
            number["b004"] = res1.data.concat(res2.data.concat(res3.data))[23].number;
            number["b005"] = res1.data.concat(res2.data.concat(res3.data))[24].number;
            number["b006"] = res1.data.concat(res2.data.concat(res3.data))[25].number;
            number["b007"] = res1.data.concat(res2.data.concat(res3.data))[26].number;
            number["b008"] = res1.data.concat(res2.data.concat(res3.data))[27].number;
            number["b009"] = res1.data.concat(res2.data.concat(res3.data))[28].number;
            number["b010"] = res1.data.concat(res2.data.concat(res3.data))[29].number;
            number["j001"] = res1.data.concat(res2.data.concat(res3.data))[30].number;
            number["j002"] = res1.data.concat(res2.data.concat(res3.data))[31].number;
            number["j003"] = res1.data.concat(res2.data.concat(res3.data))[32].number;
            number["j004"] = res1.data.concat(res2.data.concat(res3.data))[33].number;
            number["j005"] = res1.data.concat(res2.data.concat(res3.data))[34].number;
            number["j006"] = res1.data.concat(res2.data.concat(res3.data))[35].number;
            number["j007"] = res1.data.concat(res2.data.concat(res3.data))[36].number;
            number["j008"] = res1.data.concat(res2.data.concat(res3.data))[37].number;
            number["j009"] = res1.data.concat(res2.data.concat(res3.data))[38].number;
            number["j010"] = res1.data.concat(res2.data.concat(res3.data))[39].number;
            number["o001"] = res1.data.concat(res2.data.concat(res3.data))[40].number;
            number["o002"] = res1.data.concat(res2.data.concat(res3.data))[41].number;
            number["o003"] = res1.data.concat(res2.data.concat(res3.data))[42].number;
            number["o004"] = res1.data.concat(res2.data.concat(res3.data))[43].number;
            number["o005"] = res1.data.concat(res2.data.concat(res3.data))[44].number;
            number["o006"] = res1.data.concat(res2.data.concat(res3.data))[45].number;
            number["o007"] = res1.data.concat(res2.data.concat(res3.data))[46].number;
            number["o008"] = res1.data.concat(res2.data.concat(res3.data))[47].number;
            number["o009"] = res1.data.concat(res2.data.concat(res3.data))[48].number;
            number["o010"] = res1.data.concat(res2.data.concat(res3.data))[49].number;
            that.setData({
              number
            })
            console.log(that.data.number);
            for (var i = 0; i < snum; i++) {
              var chap = chapter[Math.floor(Math.random() * chapter.length)];
              var temp1 = "0" + chap;
              var typeid = "s0" + temp1.substring(temp1.length - 2, temp1.length);
              var num = that.data.number[typeid];
              var temp2 = "00000" + Math.floor(Math.random() * num + 1).toString();
              var questionid = "s" + chap.substring(chap.length-1,chap.length) + temp2.substring(temp2.length-5, temp2.length);
              temp.push(questionid);
            }
            for (var i = 0; i < mnum; i++) {
              var chap = chapter[Math.floor(Math.random() * chapter.length)];
              var temp1 = "0" + chap;
              var typeid = "m0" + temp1.substring(temp1.length - 2, temp1.length);
              var num = that.data.number[typeid];
              var temp2 = "00000" + Math.floor(Math.random() * num + 1).toString();
              var questionid = "m" + chap.substring(chap.length-1,chap.length) + temp2.substring(temp2.length-5, temp2.length);
              temp.push(questionid);
            }
            for (var i = 0; i < bnum; i++) {
              var chap = chapter[Math.floor(Math.random() * chapter.length)];
              var temp1 = "0" + chap;
              var typeid = "b0" + temp1.substring(temp1.length - 2, temp1.length);
              var num = that.data.number[typeid];
              var temp2 = "00000" + Math.floor(Math.random() * num + 1).toString();
              var questionid = "b" + chap.substring(chap.length-1,chap.length) + temp2.substring(temp2.length-5, temp2.length);
              temp.push(questionid);
            }
            for (var i = 0; i < jnum; i++) {
              var chap = chapter[Math.floor(Math.random() * chapter.length)];
              var temp1 = "0" + chap;
              var typeid = "j0" + temp1.substring(temp1.length - 2, temp1.length);
              var num = that.data.number[typeid];
              var temp2 = "00000" + Math.floor(Math.random() * num + 1).toString();
              var questionid = "j" + chap.substring(chap.length-1,chap.length) + temp2.substring(temp2.length-5, temp2.length);
              temp.push(questionid);
            }
            for (var i = 0; i < onum; i++) {
              var chap = chapter[Math.floor(Math.random() * chapter.length)];
              var temp1 = "0" + chap;
              var typeid = "o0" + temp1.substring(temp1.length - 2, temp1.length);
              var num = that.data.number[typeid];
              var temp2 = "00000" + Math.floor(Math.random() * num + 1).toString();
              var questionid = "o" + chap.substring(chap.length-1,chap.length) + temp2.substring(temp2.length-5, temp2.length);
              temp.push(questionid);
            }
            var homeworkid;
            var temp5 = formatTime ( new Date ());
            homeworkid = temp5.substring(0,4)+temp5.substring(5,7)+temp5.substring(8,10)+temp5.substring(11,13)+temp5.substring(14,16)+temp5.substring(17,19);
            var name = that.data.homeworkname;
            var teacherid = wx.getStorageSync('id');
            db.collection("homework").add({
              data: {
                homeworkID: homeworkid,
                name: name,
                teacherID: teacherid,
                problem: temp,
                type: 0
              }
            })
            wx.showToast({
              title: '创建成功！',
            })
            wx.navigateBack({
              delta: 2,
            })
          })
        })
      })
      // for(var i = 0; i < snum; i++){
      // var chap = chapter[Math.floor(Math.random() * chapter.length)];
      // var temp1 = "0" + chap;
      // var typeid = "s0" + temp1.substring(temp1.length - 2, temp1.length);
      //   var number;
      //   db.collection("quantity").where({
      //     type: typeid
      //   }).get().then(res => {
      //     number = res.data[0].number;
      //     console.log(number)
      //   })
      //   console.log(number)
      // }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      homeworkname: options.homeworkname
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