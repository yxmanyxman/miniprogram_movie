// pages/reading/reading-detail/reading-detail.js
let postData = require('../../../data/mock-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // collect_status
    // postId
    // data_
  },
  collectFunc : function() {
    // 拿到整个收藏数组
    let collects = wx.getStorageSync('collect');
    let collected = collects[this.data.postId];
    console.log(collected);    
    // 如果已收藏，点击则取消收藏
    collected = !collected;
    console.log(collected);
    this.setData({
      collect_status: collected
    });
    collects[this.data.postId] = collected;
    wx.setStorageSync('collect', collects);
  

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let postId = options.id;
    this.data.postId = postId;
    let postData_ = postData.readingData[postId];
    // 不是异步执行数据绑定可以不使用this.setData，用this.data即可；否则，要使用this.setData
    this.setData({
      data_: postData_
    });

    let collects = wx.getStorageSync('collect'); // 1.获取所有收藏数组 collect: [false, false, false]
    if (collects) {
      // 2.如果非空，拿当前详情页的收藏状态
      var collect = collects[postId];
      this.setData({
        collect_status: collect
      });
    }else {
      // 否则，初始化设置缓存
      var collect = [];
      collect[postId] = false;
      wx.setStorageSync('collect', collect);
    }
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
