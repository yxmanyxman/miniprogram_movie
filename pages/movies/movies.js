const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intheater: {},
    comingsoon: {},
    selling: {},
    showSearchPanel: false,
    showMoviesPanel: true,
    searchReasult: {},
    inputValue: ''
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
  /**
   * 请求电影数据--get
   */
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

  /**
   * 请求电影数据成功--处理电影数据
   */
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
        star: utils.starArray(5 * subject.rating.average / 10),
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
      type: type === 'intheater' ? '正在热映' : type === 'comingsoon' ? '即将上映' : type === 'top250' ? 'Top250' : '搜索结果'
    };
    this.setData(readyData);
  },

  /**
   * 跳转至更多
   */
  gotoMore: function(e) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: 'more/more?type=' + type
    })
  },

  /**
   * 跳转至电影详情页
   */
  gotoMovieDetail: function(e) {
    const id = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + id
    })
  },

  /**
   * 搜索聚焦
   */
  onBindFocus: function(event) {
    this.setData({
      showSearchPanel: true,
      showMoviesPanel: false
    });
  },

  /**
   * 搜索失焦
   */
  onBindBlur: function(event) {
    let value = event.detail.value;
    let searchUrl = app.globalData.doubanApi + "search?q=" + value;
    this.getMovieIndexData(searchUrl, 'searchReasult');
  },

  /**
   * 搜索取消
   */
  onCancel: function() {
    this.setData({
      showSearchPanel: false,
      showMoviesPanel: true,
      inputValue: '',
      searchReasult: {} // 清空上次搜索结果
    });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})