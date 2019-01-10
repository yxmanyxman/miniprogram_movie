// pages/reading/reading-detail/reading-detail.js
let postData = require('../../../data/mock-data.js');
const bgAudioManager = wx.getBackgroundAudioManager();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
    collect_status: false
    // postId
    // data_
  },

  /**
   * 收藏功能
   */
  collectFunc: function() {
    // this.getPostsCollectedAsy();
    this.getPostsCollectedSyc();
  },

  /**
   * 异步收藏
   */
  getPostsCollectedAsy: function() {
    let that = this;
    wx.getStorage({
      key: 'collect',
      success(res) {
        let collects = res.data;
        let collected = collects[that.data.postId];
        // 如果已收藏，点击则取消收藏
        collected = !collected;
        that.setData({
          collect_status: collected
        });
        collects[that.data.postId] = collected;
        wx.setStorageSync('collect', collects);
        // 收藏反馈
        wx.showToast({
          title: collected ? '收藏成功' : '取消收藏成功',
          duration: 1300
        });
      }
    });
  },

  /**
   * 同步收藏
   */
  getPostsCollectedSyc: function() {
    // 拿到整个收藏数组
    let collects = wx.getStorageSync('collect');
    let collected = collects[this.data.postId];
    // 如果已收藏，点击则取消收藏
    collected = !collected;
    console.log(collected);
    this.setData({
      collect_status: collected
    });
    collects[this.data.postId] = collected;
    wx.setStorageSync('collect', collects);
    // 收藏反馈
    wx.showToast({
      title: collected ? '收藏成功' : '取消收藏成功',
      duration: 1300
    });
  },

  /**
   * 分享功能
   */
  shareFunc: function() {
    const itemList = [
      '分享给微信好友',
      '分享给QQ好友',
      '分享到朋友圈'
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success(res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '暂不支持分享功能',
          showCancel: '取消'
        })
      }
    })
  },

  /**
   * 音乐播放功能
   */
  musicFunc: function(e) {
    let musicData = this.data.data_.detail.music;
    let isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      bgAudioManager.pause();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      bgAudioManager.title = musicData.title;
      bgAudioManager.singer = musicData.singer;
      bgAudioManager.coverImgUrl = musicData.coverImg;
      bgAudioManager.src = musicData.url;
      this.setData({
        isPlayingMusic: true
      });
    }
  },

  // 背景音乐监听
  setMusicMonitor: function() {
    let that = this;
    // 监听背景音乐播放状态--框架调用组件，通过事件驱动监听
    bgAudioManager.onPlay(function() {
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.globalIsPlayingMusic = true;
      app.globalData.globalCurrentMusicPostId = that.data.postId;
    });

    bgAudioManager.onPause(function() {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.globalIsPlayingMusic = false;
      app.globalData.globalCurrentMusicPostId = null;
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let postId = options.id;
    this.data.postId = postId;
    let postData_ = postData.readingData[postId];
    // 不是异步执行数据绑定可以不使用this.setData，用this.data即可；否则，要使用this.setData
    this.setData({
      data_: postData_
    });

    let collects = wx.getStorageSync('collect'); // 1.获取所有收藏数组 collect: [false, false, false, ...]
    if (collects) {
      // 2.如果非空，拿当前详情页的收藏状态
      let collect = collects[postId];
      if (collect == undefined) {
        collects[postId] = false;
        collect = false;
        wx.setStorageSync('collect', collects);
      }
      console.log(collect);
      this.setData({
        collect_status: collect
      });

    } else {
      // 否则，初始化设置缓存
      var nocollect = [];
      nocollect[postId] = false;
      wx.setStorageSync('collect', nocollect);
    }
    // 背景音乐监听
    if (app.globalData.globalIsPlayingMusic && app.globalData.globalCurrentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      });
    }
    this.setMusicMonitor();
    // 设置浏览缓存
    let views = wx.getStorageSync('postView');
    if (views) {
      let view = views[postId];
      view = ++view;
      views[postId] = view;
      wx.setStorageSync('postView', views);

    }
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