// pages/movies/movies.js
const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const inTheatersUrl = app.globalData.doubanApi + "in_theaters" + "?start=0&count=3";
    const comingSoonUrl = app.globalData.doubanApi + "coming_soon" + "?start=0&count=3";
    const sellingUrl = app.globalData.doubanApi + "top250" + "?start=0&count=3";
    this.getMovieIndexData(inTheatersUrl, 'intheater');
    this.getMovieIndexData(comingSoonUrl, 'comingsoon');
    this.getMovieIndexData(sellingUrl, 'selling');
  },

  getMovieIndexData: function(url, type) {
    const that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.handleMoviesData(res.data, type);
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  handleMoviesData: function(data, type) {
    let resData = data.subjects;
    // 组织首页所需数据
    let movies = [];
    for (var idx in resData) {
      const subject = resData[idx];
      let title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      let movie = {
        star: utils.starArray(5*subject.rating.average/10),
        title: title,
        average: subject.rating.average,
        coverimg: subject.images.large,
        movieid: subject.id
      }
      movies.push(movie);
    }
    var readyData = {};
    readyData[type] = {
      movies: movies,
      type: type === 'intheater' ? '正在热映' : type === 'comingsoon' ? '即将上映' : 'Top250'
    };
    this.setData(readyData);
  },

  gotoMore: function(e) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: 'more/more?type=' + type
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