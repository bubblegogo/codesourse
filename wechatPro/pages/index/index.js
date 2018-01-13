//index.js
//获取应用实例
const app = getApp()
var num1 ={}, num2 = {}; //分别记录已经选过的下标
var allobjAry=[];
var initData = function(){
  allobjAry = [];num1 = {}; num2 = {};
  for (var i = 1; i < 61; i++) {
    num1[i] = { "id": i, "name": "name" + i }
  }
  for (var j = 61; j < 80; j++) {
    num2[j] = { "id": j, "name": "name" + j }
  } 
}
initData();//初实化数据
Page({
  data: {
    motto: 'Hello World',
    iconColor: ['10', '20', '30', '50', '70','30', '50', '70'],
    allobjAry: allobjAry,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        allobjAry: allobjAry,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    initData();
    this.onLoad();
    setTimeout(function () { // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 500);
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  randomNum:function(e){
    if (Object.keys(num1).length == 0 && Object.keys(num2).length == 0){
      console.log("人员已经被抽完")
      return false;
    }
    var that = this;
    if (Object.keys(num1).length <= 6){
      var ranary1 = Object.keys(num1);
    }else{
      var ranary1 = that.myrandom(num1, 6, 1, 60, []);
    }
    for (var i in ranary1) {
    //  console.log(num1[ranary1[i]]["name"]);
      delete num1[ranary1[i]];
    }
    // console.log("########################");
    if (Object.keys(num2).length <= 2 ) { 
      var ranary2 = Object.keys(num2);      
    }else{
      var ranary2 = that.myrandom(num2, 2, 61, 80, []);
    }
    for (var i in ranary2) {
     //  console.log(num2[ranary2[i]]["name"]);
       delete num2[ranary2[i]];
    }

    var newary = ranary1.concat(ranary2); 
    allobjAry.push(newary);
    this.setData({
      allobjAry: allobjAry,
    });
    //console.log(allobjAry)
  },


  //随机生成 Math.random() [0,1)
  myrandom:function(obj,n,min,max,ary){
    var num = parseInt(Math.random() * (max - min + 1) + min);
    if (ary.indexOf(num) == -1 && obj.hasOwnProperty(num)){
        ary.push(num);
    }
    if(ary.length == n){
      return ary;
    }else{
      this.myrandom(obj,n, min, max, ary);
    }
    return ary;
  }
  
})
