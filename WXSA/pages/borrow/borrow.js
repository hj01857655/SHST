// pages/borrow/borrow.js
const app = getApp();
const compareTimeInSameDay = (t1, t2) => {
  let d = new Date()
  let ft1 = d.setHours(t1.split(":")[0], t1.split(":")[1])
  let ft2 = d.setHours(t2.split(":")[0], t2.split(":")[1])
  return ft1 > ft2
}

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
    var curData = new Date();
    var startTime = "7:00";
    var endTime = "22:30";
    var curTime = curData.getHours() + ":" + curData.getMinutes();
    if (compareTimeInSameDay(startTime,curTime) || compareTimeInSameDay(curTime,endTime)) {
      app.toast("当前时间图书馆服务已关闭");
      return ;
    }
    var that = this;
    app.ajax({
      url: app.globalData.url + "funct/lib/libquery",
      fun: res => {
        if (res.data.libInfo){
          that.setData({
            data: res.data.libInfo
          })
        }else{
          app.toast("响应超时");
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