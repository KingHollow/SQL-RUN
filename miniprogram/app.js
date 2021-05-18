//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'database-9g2ebhk6f5d06c37',
        traceUser: true,
      })
    }

    
  },

  //第一种底部  
  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。
 
    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种底部，原理同上
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true; 
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  globalData: {
    //第一种底部导航栏显示
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/study/study",
          "text": "学习",
          "iconPath": "/images/icon/study.png",
          "selectedIconPath": "/images/icon/study_select.png",
          "clas": "menu-item",
          "selectedColor": "#42589A",
          active: false
        },
        {
          "pagePath": "/pages/rank/rank",
          "text": "排行榜",
          "iconPath": "/images/icon/rank.png",
          "selectedIconPath": "/images/icon/rank_select.png",
          "selectedColor": "#42589A",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath": "/pages/smine/smine",
          "text": "主页",
          "iconPath": "/images/icon/mine.png",
          "selectedIconPath": "/images/icon/mine_select.png",
          "selectedColor": "#42589A",
          "clas": "menu-item",
          active: false
        }
      ],
      "position": "bottom"
    },
    //第二种底部导航栏显示
    tabBar1: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/task/task",
          "text": "审核代办",
          "iconPath": "/images/icon/task.png",
          "selectedIconPath": "/images/icon/task_select.png",
          "clas": "menu-item1",
          "selectedColor": "#42589A",
          active: false
        },
        {
          "pagePath": "/pages/class/class",
          "text": "班级情况",
          "iconPath": "/images/icon/class.png",
          "selectedIconPath": "/images/icon/class_select.png",
          "selectedColor": "#42589A",
          "clas": "menu-item1",
          active: false
        },
        {
          "pagePath": "/pages/tmine/tmine",
          "text": "主页",
          "iconPath": "/images/icon/mine.png",
          "selectedIconPath": "/images/icon/mine_select.png",
          "selectedColor": "#42589A",
          "clas": "menu-item1",
          active: true
        }
      ],
      "position": "bottom"
    }
  }

})
