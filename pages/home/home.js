// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    //存放轮播图数据
    swiperList: [],
    //商品信息数据
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSwiperList();
    this.getGoodsList();
  },

  //实现防抖函数
  /*
  debounce(func, delay) {
    let timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    };
  },*/
  //搜索框输入内容，即时存入data.keyword
  onInput(e) {
    this.data.keyword = e.detail.value;
    console.log("value：" + e.detail.value)
  },
  searchGoods() { //跳转搜索结果页
    if (this.data.keyword.length != 0) { //搜索框不为空
      wx.navigateTo({
        url: '/pages/searchResult/searchResult?keyword=' + this.data.keyword,
      });
      this.setData({keyword: ''});  //开始搜索后清空搜索框，这样返回后直接输入新关键词
    }
  },
  getSwiperList() { //获取轮播图
    wx.request({
      url: getApp().globalData.domainName + '/getSwiperImages',
      method: 'GET',
      success: (res) => {
        
        let list = res.data;
        for(let i=0; i<list.length; i++) {
          list[i] = getApp().globalData.domainName + "/images/" + list[i]
        }
        this.setData({
          swiperList: list
        });
      },
      fail: () => {
        wx.showToast({
          title: '网络出错，轮播图获取失败',
          duration: 1000,
          icon: "error",
          mask: true
        })
      }
    })
  },
  getGoodsList() { //获取商品列表
    wx.request({
      url: getApp().globalData.domainName + '/recomGoods',
      method: 'GET',
      data: {
        count: 6
      },
      success: (res) => {
        this.setData({
          goodsList: res.data
        })
      }
    })
  },

  addGoods() { //添加商品列表
    /*顶部导航栏显示loading效果
    // 显示
    wx.showNavigationBarLoading();
    // 隐藏
    wx.hideNavigationBarLoading()
    */
    wx.request({
      url: getApp().globalData.domainName + '/recomGoods',
      method: 'GET',
      data: {
        count: 6,
        nowlength: this.data.goodsList.length
      },
      success: (res) => {
        this.setData({
          //goodsList: [...this.data.goodsList, ...res.data]//同作用
          goodsList: this.data.goodsList.concat(res.data)
        });
      }
    });

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
    //需要展示loading效果，数据加载中...
    this.addGoods();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
