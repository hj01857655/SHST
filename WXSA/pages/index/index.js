//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    account: "",
    password: "",
    openid: ""
  },
  accountInput: function(e) {
    this.setData({
      account: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  enter: function(e) {
    var that = this;
    if (this.data.account.length == 0 || this.data.password.length == 0) {
      toast("用户名和密码不能为空");
    } else {
      app.ajax({
        url: app.globalData.url + 'funct/user/login',
        method: 'POST',
        data: {
          "account": that.data.account,
          "password": that.data.password,
          "openid": that.data.openid
        },
        fun: function(res) {
          console.log(res.data)
          if (res.data.Message == "No") {
            toast(res.data.info);
          } else if (res.data.Message == "Yes") {
            wx.setStorage({
              key: 'flag',
              data: '1',
              success: function() {
                wx.switchTab({
                  url: '/pages/tips/tips'
                })
              }
            })
          } else {
            app.toast("请求错误");
          }
        }
      });
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    wx.getStorage({
      key: 'flag',
      success(res) {
        if (res.data === '1') {
          app.toast("登录中", 5000, 'loading');
        }
      }
    })
    var that = this;
    wx.login({
      success: res => {
        app.ajax({
          url: app.globalData.url + 'funct/user/getOpenid',
          method: 'POST',
          data: {
            "code": res.code
          },
          fun: function(data) {
            if (data.data.Message === "Yes") {
              var openid = data.data.openid;
              that.setData({
                openid: openid
              })
              app.globalData.header.Cookie = 'PHPSESSID=' + data.data.PHPSESSID;
            } else if (data.data.Message === "Ex") {
              var openid = data.data.openid;
              that.setData({
                openid: openid
              })
              app.globalData.header.Cookie = 'PHPSESSID=' + data.data.PHPSESSID;
              wx.setStorage({
                key: 'flag',
                data: '1',
                success: function() {
                  wx.switchTab({
                    url: '/pages/tips/tips'
                  })
                }
              })
            } else if (data.data.Message === "Non") {
              app.toast(data.data.info);
            } else {
              app.toast("获取用户信息失败");
            }
          }
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})