const app = getApp();
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
    // type
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options.type;
    this.data.type = type;
    let url = this.chooseType(type);
    utils.http(url, this.getMoreData, 'GET');
  },

  chooseType(tp) {
    let url = '',
      type = tp;
    if (type === '正在热映') {
      // url = app.globalData.doubanApi + "Showtime/LocationMovies.api?locationId=366";
      url = app.globalData.doubanApi + "in_theaters";
    } else if (type === '即将上映') {
      url = app.globalData.doubanApi + "coming_soon";
    } else {
      url = app.globalData.doubanApi + "top250"
    }
    this.data.requestUrl = url;
    return url;
  },

  getMoreData: function(data) {
    console.log(data);
    let resData = data.subjects;
    if (resData.length === 0) {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      return;
    } else {
      let movies = [];
      for (var idx in resData) {
        const subject = resData[idx];
        let title = subject.title;
        if (title.length >= 6) {
          title = title.substring(0, 6) + '...';
        }
        let movie = {
          star: utils.starArray(5 * subject.rating.average / 10),
          title: title,
          average: subject.rating.average,
          coverimg: subject.images.large,
          movieid: subject.id
        }
        movies.push(movie);
      }
      let totalMovies = {};
      if (!this.data.isEmpty) {
        totalMovies = this.data.movies.concat(movies);
      } else {
        totalMovies = movies;
        this.data.isEmpty = false;
      }
      this.setData({
        movies: totalMovies
      });
      this.data.totalCount += 20;
    }

    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  scrollLoadMore: function(e) {
    let nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
    // console.log('加载更多', nextUrl);
    utils.http(nextUrl, this.getMoreData, 'GET');
    wx.showNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.type,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
    // console.log('下拉刷新');
    let url = '';
    wx.showNavigationBarLoading();
    this.data.movies = {};
    this.data.isEmpty = true;
    url = this.chooseType(this.data.type) + '?star=0&count=20';
    utils.http(url, this.getMoreData, 'GET');
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