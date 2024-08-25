// pages/shoppingCart/shoppingCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    allSelected: false,
    totalPrice: 0.0,
    emptyDisplayClass: "displayBlock",
    cartListDisplayClass: "displayNone"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.getData(this);
  },
  getData(that) { //获取购物车信息
    wx.request({
      url: getApp().globalData.domainName + '/getCart',
      method: 'GET',
      data: {
        customer_id: 4
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success(res) {
        let list = res.data;
        //that.setData({emptyDisplayClass: list.length!=0 ? "displayNone" : "displayBlock"})
        if (list.length != 0) {
          that.setData({
            emptyDisplayClass: "displayNone",
            cartListDisplayClass: "displayBlock"
          })
        } else {
          that.setData({
            emptyDisplayClass: "displayBlock",
            cartListDisplayClass: "displayNone"
          })
        }
        for (let i = 0; i < list.length; i++) {
          list[i].is_selected = list[i].is_selected==0 ? false : true;//给每个项目加上复选框状态
        }
        //修改数据后，使用setData更新视图
        that.setData({ goodsList: list });
      },
      fail() {
        that.setData({emptyDisplayClass: "displayBlock", cartListDisplayClass: "displayNone"})
        wx.showToast({
          title: '网络出错',
          duration: 1500,
          icon: 'error',
          mask: true,
        })
      }
    })
  },

  alterQuantity: function (event) { //加减商品数量
    let op = event.currentTarget.dataset.oprate;
    let goodsId = event.currentTarget.dataset.goodsid;
    let index = event.currentTarget.dataset.index;
    let list = this.data.goodsList;
    let isDelete = false;
    if (op == "+") {
      list[index].quantity += 1;
      //如果当前修改数量项被选中，则修改总价格
      if (list[index].is_selected == true) {
        this.data.totalPrice += list[index].goods_price;
      }
    } else {//减-
      //如果当前修改数量项被选中，则修改总价格
      if (list[index].is_selected == true) {
        this.data.totalPrice -= list[index].goods_price;
      }
      if (list[index].quantity > 1) {
        list[index].quantity -= 1;
      } else {
        //当数量减为0时
        isDelete = true;
        list.splice(index, 1);//删除一个
      }
    }
    console.log("index是"+index)
    console.log(list)
    let url = getApp().globalData.domainName;
    if (isDelete) {
      url = url + '/deleteCartItem';
    } else {
      url = url + '/updateCart';
    }
    wx.request({
      url: url,
      method: 'POST',
      data: {
        oprate: op,
        goods_id: goodsId,
        customer_id: 4
      },
      header: {
        "content-type": 'application/x-www-form-urlencoded' //携带参数的格式
      },
      success: (res) => {
        console.log(res.data);
      }
    });

    /*let initId = 0;
    list.forEach(element => {
      element.id = initId++;
    });*/
    //价格保留2位小数
    this.setData({ goodsList: list, totalPrice: parseFloat(this.data.totalPrice.toFixed(2)) });
  },
  
  selectItem(event) { //单项选中切换
    let index = event.currentTarget.dataset.index;
    let acId = event.currentTarget.dataset.acid;
    //当前项反选
    this.data.goodsList[index].is_selected = !this.data.goodsList[index].is_selected;
    wx.request({//修改数据库中的选中状态
      url: getApp().globalData.domainName + '/selectChange',
      method: 'POST',
      data:{
        addcart_id: acId
      },
      header: {
        "content-type": 'application/x-www-form-urlencoded' //携带参数的格式
      },
      success: (res) => {
        console.log(res.data);
      }
    })
    let list = this.data.goodsList;
    //通过当前选项是添加还是去除，修改总价格
    if (this.data.goodsList[index].is_selected) {
      this.data.totalPrice += list[index].goods_price * list[index].quantity;
    } else {
      this.data.totalPrice -= list[index].goods_price * list[index].quantity;
    }
    //不保留2位小数，运算会出现误差
    this.setData({ totalPrice: parseFloat(this.data.totalPrice.toFixed(2)) });

    for (let i = 0; i < list.length; i++) {
      //存在未选中项，则全选=false
      if (list[i].is_selected == false) {
        this.setData({ allSelected: false });
        break;
      }
      //全部项都选中了，全选=true
      if (i >= list.length - 1) {
        this.setData({ allSelected: true });
      }
    }
  },
  
  selectAll() { //全选切换
    let isAll = this.data.allSelected
    let total = 0;
    if (isAll) {  //从全选到全不选
      isAll = false;
      this.data.goodsList.forEach(element => {
        element.is_selected = false;
      });
    } else {
      isAll = true;
      this.data.goodsList.forEach(element => {
        element.is_selected = true;
        total += element.goods_price * element.quantity;
      });
    }
    this.setData({
      goodsList: this.data.goodsList, //更新列表各项的选中情况
      allSelected: isAll, //全选状态
      totalPrice: parseFloat(total.toFixed(2))//四舍五入保留2位小数
    });
    wx.request({  //修改数据库为全选或全不选
      url: getApp().globalData.domainName + '/selectChange',
      method: 'POST',
      data: {
        is_all_selected: isAll
      },
      header: {
        "content-type": 'application/x-www-form-urlencoded' //携带参数的格式
      },
      success: (res) => {
        console.log(res.data)
      }
    })
  },

  prepareOrder() { //**下单**
    let list = this.data.goodsList;
    let idList = [];
    //收集选中的商品ID
    list.forEach(element => {
      if (element.is_selected) {
        idList.push(element.goods_id);
      }
    });
    if (idList.length == 0) {
      wx.showToast({
        title: '请先选择商品',
        duration: 1200,
        icon: "error",
        mask: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/orderPage/orderPage?idList='+idList
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
    this.getData(this);
    
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