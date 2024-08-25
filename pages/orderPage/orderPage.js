// pages/orderPage/orderPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    idList: "",
    totalPrice: 0.0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      idList: "("+options.idList+")"
    });
    let that = this;
    this.getData(that);
    
  },
  getData(that) {
    wx.request({
      url: getApp().globalData.domainName + '/getOrderCheck',
      method: 'GET',
      data: {
        customer_id: 4,
        id_list: that.data.idList
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success(res) {
        console.log("与后台连接成功_shoppingCart");
        that.setData({ goodsList: res.data });
        for (let i = 0; i < res.data.length; i++) {
          var arr = res.data[i].img_url.split(",");
          that.data.goodsList[i].img_url = arr[0];
          that.data.goodsList[i].id = i;
        }
        //修改数据后，使用setData更新视图
        that.setData({ goodsList: that.data.goodsList });
        //计算展示总金额
        that.data.goodsList.forEach(element => {
          that.data.totalPrice += element.goods_price * element.quantity;
        });
        that.setData({totalPrice: that.data.totalPrice});
      },
      fail() {
        wx.showToast({
          title: '网络出错',
          duration: 1500,
          icon: 'error',
          mask: true,
        })
      }
    })
  },
  payment() {
    wx.showToast({
      title: '付款成功',
      duration: 1000,
      icon: "success",
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    });
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/shoppingCart/shoppingCart',
      });
    }, 1200);
    
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