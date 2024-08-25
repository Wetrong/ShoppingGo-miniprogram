// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMsgContent();
  },
  getMsgContent() {
    wx.request({
      url: getApp().globalData.domainName + '/get_msg',
      method: 'GET',
      data: {
        customer_id: 4
      },
      success: (res) => {
        console.log("消息列表")
        console.log(res.data)
        this.setData({
          msgList: res.data
        });
      }
    })
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