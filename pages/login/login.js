// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity: "null"
  },
  radioChange(e) {
    this.data.identity = e.detail.value;
    console.log('radio发生change事件，当前身份为：', e.detail.value);
  },
  submit() {
    if (this.data.identity == "null") {
      wx.showToast({
        title: '请选择您的身份', //提示的内容
        duration: 1000, //持续的时间
        icon: 'error', //图标有success、error、loading、none四种
        mask: false //true:显示透明蒙层 防止触摸穿透
     });
    }
    else if (this.data.identity == "consumer") {
      wx.switchTab({
        url: '../home/home'
      })
    }
    else {
      wx.showToast({
        title: '您是商家', //提示的内容
        duration: 2000, //持续的时间
        icon: 'success', //图标有success、error、loading、none四种
        mask: false //true:显示透明蒙层 防止触摸穿透
     });
    }
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})