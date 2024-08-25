// pages/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: -1,
    imgUrls: [],
    goodsPrice: 0.0,
    goodsTitle: '',
    address: '',
    selection: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({goods_id: options.goods_id});
    console.log("goods_id=" + options.goods_id);
    var that = this;
    this.getData(that);
  },
  getData(that) {
    wx.request({
      url: getApp().globalData.domainName + '/getGoodsInfo',
      method: 'GET',
      data: {
        goodsId: that.data.goods_id
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success(res) {
        console.log("与后台连接成功_goodsDetail");
        var imgUrlArr = res.data.img_url.split(',');
        that.setData({imgUrls: imgUrlArr,
          goodsPrice: res.data.goods_price,
          goodsTitle: res.data.goods_title
        });
      },
      fail() {
        wx.showToast({
          title: '网络错误',
          duration: 1500,
          icon: 'error',
          mask: true,
        });
      }
    })
  },
  addCart() {
    wx.request({
      url: getApp().globalData.domainName + '/addCart',
      method: 'POST',
      data: {
        goods_id: this.data.goods_id,
        customer_id: 4
      },
      header:{
        "content-type" :'application/x-www-form-urlencoded' //携带参数的格式
      },
      success: (res) => {
        console.log(res.data)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})