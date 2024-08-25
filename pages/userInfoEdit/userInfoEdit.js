// pages/userInfoEdit/userInfoEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: 4,
    user_name: "用户昵称",
    phone_number: "电话号码",
    avatar_url: getApp().globalData.defaultAvatarUrl,
    address: "地址"
  },
  getData(that) {
    wx.request({
      url: getApp().globalData.domainName + '/getUserInfo',
      method: 'GET',
      data: {
        user_id: that.data.user_id
      },
      success(res) {
        that.setData({
          user_name: res.data.user_name,
          phone_number: res.data.phone_number,
          avatar_url: res.data.avatar_url,
          address: res.data.address
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData(this)
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