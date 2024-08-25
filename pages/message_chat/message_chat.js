// pages/message_chat/message_chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chat_username:"阿巴啊巴店铺",
    merchant_id: 0,
    msg_list: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("商家id:" + options.merchant_id);
    this.setData({merchant_id: options.merchant_id});
    this.getData();
  },
  getData() {
    wx.request({
      url: getApp().globalData.domainName + '/get_msg_item',
      method: 'GET',
      data: {
        customer_id: 4,
        merchant_id: this.data.merchant_id
      },
      success: (res) => {
        console.log("对话消息")
        console.log(res.data)
        this.setData({
          msg_list: res.data
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