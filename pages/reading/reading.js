// pages/reading/reading.js
var postData_ = require('../../data/mock-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgRoll: [
      '/img/iqiyi.png',
      '/img/vr.png',
      '/img/wx.png'
    ],
    autoplay: true,
    dots: true,
    postData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  // 监听文章浏览数缓存
  getPostView() {
    // 获取文章阅读数量缓存
    let postView = wx.getStorageSync('postView');
    let postD = postData_.readingData;
    if (postView) {
      for (var i = 0; i < postD.length; i++) {
        postD[i].looked = postView[i];
      }
    } else {
      let view = [];
      for (var i = 0; i < postD.length; i++) {
        view[i] = 0;
        postD[i].looked = view[i];
      }
      wx.setStorageSync('postView', view);
    }
    this.setData({
      postData: postD
    });
    console.log(this.data.postData);
  },

  // 跳转到文章详情页
  gotoReadingDetail(e) {
    let postId = e.currentTarget.dataset.postid;
    console.log(postId);
    wx.navigateTo({
      url: 'reading-detail/reading-detail?id=' + postId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 监听浏览缓存
    this.getPostView();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})