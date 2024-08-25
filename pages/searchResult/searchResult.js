// pages/searchResult/searchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    resultList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({keyword:options.keyword});
    console.log("关键词:" + this.data.keyword);
    var that = this;
    this.getData(that);
  },

  //同步存储搜索框内容
  onInput(e) {
    this.data.keyword = e.detail.value;
    console.log("value：" + e.detail.value)
  },
  //根据keyword搜索商品
  searchGoods() {
    if (this.data.keyword.length != 0) { //搜索框不为空
      wx.redirectTo({
        url: '/pages/searchResult/searchResult?keyword=' + this.data.keyword
      });
    }
  },
  getData(that) {
    wx.request({
      url: getApp().globalData.domainName + '/searchGoods',
      method: 'GET',
      data: {
        keyword: that.data.keyword
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success(res) {
        console.log("与后台连接成功_searchResult");
        let list = res.data;
        //修改数据后，使用setData更新视图
        that.setData({resultList: list});
        if (list.length == 0) {
          wx.showToast({
            title: '搜索无结果',
            duration: 1000,
            icon: 'error'
          })}
      },
      fail() {
        wx.showToast({
          title: '搜索失败',
          duration: 1500,
          icon: 'error',
          mask: true,
        })}
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