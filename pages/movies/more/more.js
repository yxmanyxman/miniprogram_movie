const app = getApp();
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {}
    // type
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options.type;
    this.data.type = type;
    let url = '';
    if (type === '正在热映') {
      url = app.globalData.movieApi + "Showtime/LocationMovies.api?locationId=366";
    } else if (type === '即将上映') {
      url = app.globalData.movieApi + "Movie/MovieComingNew.api?locationId=366";
    } else {
      url = app.globalData.movieApi + "PageSubArea/HotPlayMovies.api?locationId=366"
    }
    utils.http(url, this.getMoreData, 'GET');
  },

  getMoreData: function(data) {
    console.log(data);
    let resData = [];
    let type = this.data.type;
    let movies = [];
    let movie = {
      title: '',
      coverimg: '',
      movieid: '',
      average: ''
    };
    switch (type) {
      case '正在热映':
        resData = data.ms;
        break;
      case '即将上映':
        resData = data.moviecomings;
        break;
      case '正在售票':
        resData = data.movies;
        break;
    }
    for (var idx in resData) {
      const subject = resData[idx];
      if (type === '正在热映') {
        movie = {
          title: subject.tCn,
          coverimg: subject.img,
          movieid: subject.id,
          average: subject.r > 0 ? subject.r : 0,
          star: utils.starArray(5 * (subject.r > 0 ? subject.r : 0) / 10)
        }
      } else if (type === '即将上映') {
        movie = {
          title: subject.title,
          coverimg: subject.image,
          movieid: subject.id,
          average: subject.r ? subject.r : 0,
          star: utils.starArray(5 * (subject.r ? subject.r : 0) / 10)
        }
      } else {
        movie = {
          title: subject.titleCn,
          coverimg: subject.img,
          movieid: subject.movieId,
          average: subject.ratingFinal > 0 ? subject.ratingFinal : 0,
          star: utils.starArray(5 * (subject.ratingFinal > 0 ? subject.ratingFinal : 0) / 10)
        }
      }
      if (movie.title.length >= 6) {
        let title = movie.title.substring(0, 6) + '...';
        movie.title = title;
      }
      movies.push(movie);
    }
    this.setData({
      movies: movies
    });
  },

  scrollLoadMore: function(e){
    console.log('加载更多');
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